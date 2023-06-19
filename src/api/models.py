from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum, Integer

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(15), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(20), unique=False, nullable=True)
    surname = db.Column(db.String(80), unique=False, nullable=True)
    nick = db.Column(db.String(20), unique=False, nullable=True)
    dni = db.Column(db.String(9), unique=True, nullable=True)
    uci_id = db.Column(db.Integer, unique=True, nullable=True)
    licencia = db.Column(db.String(9), unique=True, nullable=True)
    # federado = db.Column(Enum('Sí', 'No'), nullable=True)
    # sexo = db.Column(Enum('Hombre', 'Mujer'), nullable=True)
    fecha_nacimiento = db.Column(db.Date, nullable=True)
    club = db.Column(db.String(30), unique=False, nullable=True)
    equipo = db.Column(db.String(30), unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.email}, >'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # # do not serialize the password, its a security breach
            "name": self.name,
            "surname": self.surname,
            "nick": self.nick,
            "dni": self.dni,
            "uci_id": self.uci_id,
            "licencia": self.licencia,
            # "federado": self.federado,
            # "sexo": self.sexo,
            "fecha_nacimiento": self.fecha_nacimiento,
            "club": self.club,
            "equipo": self.equipo
        }


class Riders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(20), unique=False, nullable=True)
    surname = db.Column(db.String(80), unique=False, nullable=True)
    dni = db.Column(db.String(9), unique=True, nullable=True)
    uci_id = db.Column(db.Integer, unique=True, nullable=True)
    licencia = db.Column(db.String(9), unique=True, nullable=True)
    # federado = db.Column(Enum('Sí', 'No'), nullable=True)
    # sexo = db.Column(Enum('Hombre', 'Mujer'), nullable=True)
    fecha_nacimiento = db.Column(db.Date, nullable=True)
    club = db.Column(db.String(30), unique=False, nullable=True)
    equipo = db.Column(db.String(30), unique=False, nullable=True)

    def __repr__(self):
        return f'<Riders {self.name}, >'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "dni": self.dni,
            "uci_id": self.uci_id,
            "licencia": self.licencia,
            # "federado": self.federado,
            # "sexo": self.sexo,
            "fecha_nacimiento": self.fecha_nacimiento,
            "club": self.club,
            "equipo": self.equipo
        }


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(30), unique=True, nullable=True)

    def __repr__(self):
        return f'<Category {self.name}, >'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Club(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(30), unique=True, nullable=True)

    def __repr__(self):
        return f'<Club{self.name}, >'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(30), unique=True, nullable=True)

    def __repr__(self):
        return f'<Team {self.name}, >'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Competition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    title = db.Column(db.String(30), unique=False, nullable=False)
    categoria = db.Column(db.String(30), unique=False, nullable=True)
    fecha_celebracion = db.Column(db.Date, nullable=True)
    hora_clebracion = db.Column(db.Time, nullable=True)
    fecha_verificar_licencia = db.Column(db.Date, nullable=True)
    hora_inicio_verificar_licencia = db.Column(db.Time, nullable=True)
    hora_fin_verificar_licencia = db.Column(db.Time, nullable=True)
    organizador = db.Column(db.String(30), unique=False, nullable=True)
    limite_participacion = db.Column(db.Integer, unique=False, nullable=True)
    email_incidencia = db.Column(db.String(30), unique=False, nullable=True)

    def __repr__(self):
        return f'<Competition{self.title}, >'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
        }


class Championship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    title = db.Column(db.String(30), unique=False, nullable=False)

    def __repr__(self):
        return f'<Championship{self.title}, >'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
        }


class Dorsal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    Dorsal = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return f'<Dorsal{self.title}, >'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
        }


class Calendar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    title = db.Column(db.String(30), unique=False, nullable=False)
    categoria = db.Column(db.String(30), unique=False, nullable=True)
    fecha_celebracion = db.Column(db.Date, nullable=True)
    hora_clebracion = db.Column(db.Time, nullable=True)
    fecha_verificar_licencia = db.Column(db.Date, nullable=True)
    hora_inicio_verificar_licencia = db.Column(db.Time, nullable=True)
    hora_fin_verificar_licencia = db.Column(db.Time, nullable=True)
    organizador = db.Column(db.String(30), unique=False, nullable=True)
    limite_participacion = db.Column(db.Integer, unique=False, nullable=True)
    email_incidencia = db.Column(db.String(30), unique=False, nullable=True)

    def __repr__(self):
        return f'<Calendar{self.title}, >'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
        }
