"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Rider, Category, Club, Team, Competition, Championship, Registro_torneo, Inscripcion
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

###revisar
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

    dni = request.json.get("dni", None)
    fullName = request.json.get("fullName", None)
    userName = request.json.get("userName", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

# Check if properties of user exist
    response_body = {}
         
    user = User.query.filter_by(
        email=email).filter_by(dni=dni).filter_by(user_name=userName).first()
   
    if user != None:
        response_body["msg"] = "Email or dni or user_name already exist "
        return jsonify(response_body), 401
 
    # #Encrypt password 

    pw_hash = current_app.bcrypt.generate_password_hash(password).decode("utf-8")

    user = User(
        email=email, password=pw_hash, name= None, surname=None, full_name=fullName,phone=None,user_name=userName,dni=dni,uci_id=None,licencia=None,federado=None, sexo=None,fecha_nacimiento=None, club=None,equipo=None)
    

    db.session.add(user)
    db.session.commit()

    response_body["msg"] = "Ok. User created :)" 

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():

    r = request.get_json(force=True)

    # Check password & user_name|email
    if "email" in r:
        user = User.query.filter_by((
            User.email == r["email"].replace(" ", "").lower()).filter_by(
            User.dni == r["email"].replace(" ", "").lower()).filter_by(
            User.user_name == r["email"].replace(" ", "").lower())
        ).first()
    else:
        return jsonify({"msg": "Email or user_name or DNI property not found"}), 400

    if user is None:
        return jsonify({"msg": "User not found on database"}), 401

    if "password" not in r:
        return jsonify({"msg": "Password not found"}), 400

    print(r["password"])
    # Check password
    check_password = current_app.bcrypt.check_password_hash(user.password, r["password"])
    if not check_password:
        return jsonify({"msg": "Incorrect password"}), 401

    # Create Access Token

    access_token = create_access_token(
        identity=user.id, expires_delta=datetime.timedelta(days=3650))

    response_body = {"msg": "Ok",
                     "token": access_token,
                     "user": user.serialize()}

    return jsonify(response_body), 200


# @app.route("/private", methods=["GET"])
# @jwt_required()
# def private():

#     current_user = get_jwt_identity()

#     user = User.query.get(current_user)

#     if user == None:
#         return jsonify({"msg": "User not found"}), 404

#     return jsonify({"msg": f"Logged in as {user.user_name}",
#                     "response": user.serialize()}), 200
