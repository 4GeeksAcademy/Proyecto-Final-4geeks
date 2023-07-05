"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import json
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint, current_app, render_template
from api.models import db, User, Category, Club, Team, Competition, Championship, Competition_Data, Category_Competition, Inscriptions
from api.utils import generate_sitemap, APIException
from sqlalchemy import or_

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_bcrypt import Bcrypt
from flask_mail import Message, Mail
from threading import Thread

# import timedelta

api = Blueprint('api', __name__)


@api.route("/recoverPassword", methods=["POST"])
def recoverPassword():

    try:

        email = request.get_json(force=True)
        url = os.getenv('FRONTEND_URL') + 'reset-password/'

        user = User.query.filter_by(email=email).first()

        if user == None:
            return jsonify({"msg": "Email no existe"}), 401

        expires = datetime.timedelta(hours=24)
        reset_token = create_access_token(str(user.id), expires_delta=expires)

        reset_token = reset_token.replace(".", "&")

        print(reset_token)

        msg = Message(subject='BTFX - Recuperar contraseña',
                      sender='rob_mb@outlook.es', recipients=[email])

        msg.body = 'Pulsa en el link a continuación para crear una nueva contraseña: ' + \
            url + reset_token

        current_app.mail.send(msg)

        return jsonify({"msg": "Ok",
                        "response": "ok"
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/resetPassword", methods=["PUT"])
@jwt_required()
def resetPassword():
    try:
        password = request.get_json(force=True)
        pw_hash = current_app.bcrypt.generate_password_hash(
            password).decode("utf-8")

        current_user = get_jwt_identity()

        user = User.query.get(current_user)
        print(pw_hash)

        user.password = pw_hash
        db.session.commit()

        return jsonify({"msg": "ok"}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Empiezo los ENDPOINT de USUARIO


@api.route('/signup', methods=['POST'])
def signup():
    try:

        dni = request.json.get("dni", None)
        name = request.json.get("name", None)
        subname = request.json.get("subName", None)
        phone = request.json.get("mobile", None)
        user_name = request.json.get("username", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)

    # #Encrypt password

        pw_hash = current_app.bcrypt.generate_password_hash(
            password).decode("utf-8")

        user = User(
            email=email, password=pw_hash, name=name,
            subname=subname, phone=phone, user_name=user_name,
            dni=dni, uci_id=None, licencia=None,
            federado=None, sexo=None, fecha_nacimiento=None
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({'msg': "Ok. User created :)"}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/login", methods=["POST"])
def login():

    try:
        first_field = request.json.get("firstField", None)
        password = request.json.get("password", None)
        remember = request.json.get("remember", None)

        user = User.query.filter((User.email == first_field) | (
            User.dni == first_field) | (User.user_name == first_field)).first()

        if user is None:
            return jsonify({"msg": "El usuario no fue encontrado."}), 401

        # Check password
        check_password = current_app.bcrypt.check_password_hash(
            user.password, password)
        if not check_password:
            return jsonify({"msg": "Incorrect password"}), 401

        if remember:
            access_token = create_access_token(
                identity=user.id, expires_delta=False)
        else:
            access_token = create_access_token(
                identity=user.id, expires_delta=datetime.timedelta(days=1))

        return jsonify({"msg": "Ok",
                        "token": access_token,
                        "user": user.serialize()
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/profile/edit", methods=["PUT"])
@jwt_required()
def edit_profile():

    try:
        dni = request.json.get("dni", None)
        name = request.json.get("name", None)
        subname = request.json.get("subname", None)
        phone = request.json.get("phone", None)
        user_name = request.json.get("username", None)
        email = request.json.get("email", None)

        current_user = get_jwt_identity()
        user = User.query.get(current_user)

        if user == None:
            return jsonify({"msg": "User not found"}), 404

        user.dni = dni
        user.name = name
        user.subname = subname
        user.phone = phone
        user.user_name = user_name
        user.email = email

        print(current_user)
        db.session.commit()

        return jsonify({'msg': "Ok. User edited",
                        "user": user.serialize()}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/trials", methods=["GET"])
def trials():

    try:

        def query_trials(item):
            obj = item.serialize()
            # CONVERT TIME AND DATE TO STRING FOR JSONIFY
            for key in obj:
                if isinstance(obj[key], datetime.date) or isinstance(obj[key], datetime.time):
                    obj[key] = str(obj[key])

            # ADD RUNNERS TO RESPONSE
            runners = list(map(lambda item: item.serialize(), Competition_Data.query.filter_by(
                competition_id=obj["id"]).all()))

            run = []
            for x in runners:
                aux = {}
                aux["name"] = x["user"]["name"]
                aux["team"] = x["user"]["team"]["name"] if x["user"]["team"] != None else x["user"]["team"]

                aux["points"] = x["points"]
                aux["categorie"] = x["user"]["category"]["name"] if x["user"]["category"] != None else x["user"]["category"]
                run.append(aux)

            obj["runners"] = run

            return obj

        trials = list(
            map(query_trials, Competition.query.all()))

        if not trials:
            # No content
            return jsonify({"msg": "No existen torneos",
                            "response": []}), 204

        return jsonify({"msg": "Ok",
                        "response": trials
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/tournaments", methods=["GET"])
def tournaments():
    try:
        tournaments = list(
            map(lambda item: item.serialize()["title"], Championship.query.all()))

        return jsonify({"msg": "Ok",
                        "response": tournaments
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/inscriptions", methods=["GET"])
def inscriptions():
    try:
        ins = list(
            map(lambda item: item.serialize(), Inscriptions.query.all()))
        print(ins)
        return jsonify({"msg": "Ok",
                        "response": ins
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/categories", methods=["GET"])
def categories():
    try:
        categories = list(
            map(lambda item: item.serialize(), Category.query.all()))

        return jsonify({"msg": "Ok",
                        "response": categories
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/teams", methods=["GET"])
def teams():
    try:
        teams = list(
            map(lambda item: item.serialize(), Team.query.all()))

        return jsonify({"msg": "Ok",
                        "response": teams
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@api.route("/event-results", methods=["GET"])
def event_results():
    try:
        event_results = list(
            map(lambda item: item.serialize(), Competition_Data.query.all()))

        print(event_results)

        return jsonify({"msg": "Ok",
                        "response": event_results
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400
