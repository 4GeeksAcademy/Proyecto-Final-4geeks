from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import Enum

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(15), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(20), unique=False, nullable=True)
    surname = db.Column(db.String(80), unique=False, nullable=True)
    full_name = db.Column(db.String(80), unique=False, nullable=True)
    phone = db.Column(db.Integer, unique=False, nullable=True)
    user_name = db.Column(db.String(20), unique=True, nullable=True)
    dni = db.Column(db.String(9), unique=True, nullable=True)
    uci_id = db.Column(db.Integer, unique=True, nullable=True)
    licencia = db.Column(db.String(9), unique=True, nullable=True)
    federado = db.Column(db.Enum('Sí', 'No', name="federado"), nullable=True)
    sexo = db.Column(db.Enum('Hombre', 'Mujer', name="sexo"), nullable=True)
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
            "full_name": self.full_name,
            "phone": self.phone,
            "user_name": self.user_name,
            "dni": self.dni,
            "uci_id": self.uci_id,
            "licencia": self.licencia,
            "federado": self.federado,
            "sexo": self.sexo,
            "fecha_nacimiento": self.fecha_nacimiento,
            "club": self.club,
            "equipo": self.equipo
        }


class Rider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(20), unique=False, nullable=True)
    surname = db.Column(db.String(80), unique=False, nullable=True)
    dni = db.Column(db.String(9), unique=True, nullable=True)
    uci_id = db.Column(db.Integer, unique=True, nullable=True)
    licencia = db.Column(db.String(9), unique=True, nullable=True)
    federado = db.Column(db.Enum('Sí', 'No', name="federado"), nullable=True)
    sexo = db.Column(db.Enum('Hombre', 'Mujer', name="sexo"), nullable=True)
    fecha_nacimiento = db.Column(db.Date, nullable=True)
    category = db.Column(db.String(20), unique=False, nullable=True)
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
            "federado": self.federado,
            "sexo": self.sexo,
            "fecha_nacimiento": self.fecha_nacimiento,
            "category": self.category,
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
    club_id = db.Column(db.Integer, db.ForeignKey('club.id'))

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
    hora_celebracion = db.Column(db.Time, nullable=True)
    fecha_verificar_licencia = db.Column(db.Date, nullable=True)
    hora_inicio_verificar_licencia = db.Column(db.Time, nullable=True)
    hora_fin_verificar_licencia = db.Column(db.Time, nullable=True)
    organizador = db.Column(db.String(30), unique=False, nullable=True)
    limite_participacion = db.Column(db.Integer, unique=False, nullable=True)
    email_incidencias = db.Column(db.String(30), unique=False, nullable=True)

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
    title = db.Column(db.String(30), unique=True, nullable=False)

    def __repr__(self):
        return f'<Championship{self.title}, >'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
        }


class Registro_torneo (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rider_id = db.Column(db.Integer, db.ForeignKey('rider.id'))
    riders = db.relationship("Rider", backref="registro_torneo", lazy=True)
    championship_id = db.Column(db.Integer, db.ForeignKey('championship.id'))
    championships = db.relationship(
        "Championship", backref="registro_torneo", lazy=True)
    dorsal = db.Column(db.Integer)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    categories = db.relationship(
        "Category", backref="registro_torneo", lazy=True)

    def __repr__(self):
        return '<Registro_torneo %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "rider_id": self.rider_id,
            "riders": self.rider_id,
            "championship_id": self.championship_id,
            "championships": self.championships,
            "dorsal": self.dorsal,
            "category_id": self.category_id,
            "categories": self.categories
        }


class Inscripcion (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    competition_id = db.Column(db.Integer, db.ForeignKey('competition.id'))
    registro_torneo_id = db.Column(
        db.Integer, db.ForeignKey('registro_torneo.id'))

    def __repr__(self):
        return '<Competition %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "competition_id": self.competition_id,
            "registro_torneo_id": self.registro_torneo_id,
        }
