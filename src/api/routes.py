"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Rider, Category, Club, Team, Competition, Championship, Registro_torneo, Inscripcion
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

###revisar
from flask_bcrypt import Bcrypt
app = Flask(__name__)
# Setup B-crypt
bcrypt = Bcrypt(app)

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
    

    if dni is None:
        response_body["msg"] = "dni not found"
        return jsonify(response_body), 400
    

    if fullName is None:
        response_body["msg"] = "fullName not found"
        return jsonify(response_body), 400

    if userName is None:
        response_body["msg"] = "userName not found"
        return jsonify(response_body), 400

    if email is None:
        response_body["msg"] = "email not found"
        return jsonify(response_body), 400

    if password is None:
        response_body["msg"] = "password not found"
        return jsonify(response_body), 400

    # dni = dni.lower().replace(" ", "")
    # full_name = full_name.lower()
    # user_name = user_name.lower().replace(" ", "")
    # email = email.lower().replace(" ", "")

    
    user = User.query.filter_by(
        email=email).first()
   
    if user != None:
        response_body["msg"] = "Email already exist "
        return jsonify(response_body), 401

    user = User.query.filter_by(
        dni=dni).first()

    if user != None:
        response_body["msg"] = "dni already exist "
        return jsonify(response_body), 401
    
    user = User.query.filter_by(
        user_name=userName).first()
 
    if user != None:
        response_body["msg"] = "user_name already exist "
        return jsonify(response_body), 401
    
    #Encrypt password

    pw_hash = bcrypt.generate_password_hash("password")

    print(pw_hash)
    print(password)

    user = User(
        dni=dni, email=email, password=pw_hash)

    db.session.add(user)
    db.session.commit()

    response_body["msg"] = "Ok. User created :)" 

    return jsonify(response_body), 200


# @app.route("/login", methods=["POST"])
# def login():

#     r = request.get_json(force=True)

#     # Check password & user_name|email
#     if "email" in r:
#         user = User.query.filter((
#             User.email == r["email"].replace(" ", "").lower()) | (
#             User.dni == r["email"].replace(" ", "").lower()) | (
#             User.user_name == r["email"].replace(" ", "").lower())
#         ).first()
#     else:
#         return jsonify({"msg": "Email or user_name or DNI property not found"}), 400

#     if user is None:
#         return jsonify({"msg": "User not found on database"}), 401

#     if "password" not in r:
#         return jsonify({"msg": "Password not found"}), 400

#     print(r["password"])
#     # Check password
#     check_password = bcrypt.check_password_hash(user.password, r["password"])
#     if not check_password:
#         return jsonify({"msg": "Incorrect password"}), 401

#     # Create Access Token

#     access_token = create_access_token(
#         identity=user.id, expires_delta=datetime.timedelta(days=36500))

#     response_body = {"msg": "Ok",
#                      "token": access_token,
#                      "user": user.serialize()}

#     return jsonify(response_body), 200


# @app.route("/private", methods=["GET"])
# @jwt_required()
# def private():

#     current_user = get_jwt_identity()

#     user = User.query.get(current_user)

#     if user == None:
#         return jsonify({"msg": "User not found"}), 404

#     return jsonify({"msg": f"Logged in as {user.user_name}",
#                     "response": user.serialize()}), 200
