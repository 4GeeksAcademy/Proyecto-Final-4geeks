"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Category, Club, Team, Competition, Championship, Tournament_Registration, Competition_Data
from api.utils import generate_sitemap, APIException
from sqlalchemy import or_

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

# revisar
from flask_bcrypt import Bcrypt


import datetime
# import timedelta

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


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


@api.route("/clasificacion", methods=["GET"])
def clasificacion_all():

    try:

        tournament = list(
            map(lambda item: item.serialize(), Championship.query.all()))
        name = list(
            map(lambda item: item.serialize(), Competition.query.all()))
        categories = list(
            map(lambda item: item.serialize(), Category.query.all()))
        runners = list(
            map(lambda item: item.serialize(), Rider.query.all()))

        if not tournament:
            # No content
            return jsonify({"msg": "No existen torneos"}), 204

        return jsonify({"msg": "Ok",
                        "response": [tournament, name, categories, runners]
                        }
                       ), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400
