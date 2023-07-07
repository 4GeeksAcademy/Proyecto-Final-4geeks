from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import Enum


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    user_name = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(20), unique=False, nullable=False)
    subname = db.Column(db.String(80), unique=False, nullable=False)
    dni = db.Column(db.String(9), unique=True, nullable=False)

    phone = db.Column(db.Integer, unique=False, nullable=True)
    sexo = db.Column(db.Enum('Hombre', 'Mujer', name="sexo"), nullable=True)
    fecha_nacimiento = db.Column(db.Date, nullable=True)
    uci_id = db.Column(db.BigInteger, unique=True, nullable=True)
    licencia = db.Column(db.String(20), unique=True, nullable=True)
    federado = db.Column(db.Enum('Sí', 'No', name="federado"), nullable=True)
    role = db.Column(db.Enum('User', 'Manager', 'Admin',
                     name="role"), nullable=False, server_default="User")
    rider = db.Column(db.Enum('Yes', 'No',
                              name="rider"), nullable=True, server_default="No")

    category_id = db.Column(db.Integer, db.ForeignKey(
        "category.id"), nullable=True)
    team_id = db.Column(db.Integer, db.ForeignKey(
        "team.id"), nullable=True)

    competition_data = db.relationship(
        "Competition_Data", backref="user", lazy=True)

    inscriptions = db.relationship(
        "Inscriptions", backref="user", lazy=True)

    def __repr__(self):
        return f'<User {self.name}, {self.id}>'

    def serialize(self):
        category = Category.query.filter_by(id=self.category_id).first()
        team = Team.query.filter_by(id=self.team_id).first()

        return {
            "id": self.id,
            "role": self.role,
            "email": self.email,
            "name": self.name,
            "subname": self.subname,
            "phone": self.phone,
            "user_name": self.user_name,
            "dni": self.dni,
            "uci_id": self.uci_id,
            "licencia": self.licencia,
            "federado": self.federado,
            "sexo": self.sexo,
            "fecha_nacimiento": str(self.fecha_nacimiento),
            "role": self.role,
            "rider": self.rider,
            "category": category.serialize() if category != None else category,
            "team": team.serialize() if team != None else team

        }


class Team(db.Model):
    __tablename__ = "team"
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(30), unique=True, nullable=False)

    club_id = db.Column(db.Integer, db.ForeignKey(
        "club.id"), nullable=False)

    user = db.relationship("User", backref="team", lazy=True)

    def __repr__(self):
        return f'<Team {self.name}, {self.id}>'

    def serialize(self):
        club = Club.query.filter_by(id=self.club_id).first()
        return {
            "id": self.id,
            "name": self.name,

            "club": club.serialize() if club != None else club
        }


class Club(db.Model):
    __tablename__ = "club"
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(30), unique=True, nullable=False)

    team = db.relationship("Team", backref="club", lazy=True)

    def __repr__(self):
        return f'<Club {self.name}, {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Category(db.Model):
    __tablename__ = "category"
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(30), unique=True, nullable=False)

    user = db.relationship("User", backref="category", lazy=True)
    category_competition = db.relationship(
        "Category_Competition", backref="category", lazy=True)

    def __repr__(self):
        return f'<Category {self.name}, {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Category_Competition(db.Model):
    __tablename__ = "category_competition"
    id = db.Column(db.Integer, primary_key=True)

    category_id = db.Column(db.Integer, db.ForeignKey(
        "category.id"), nullable=False)
    competition_id = db.Column(db.Integer, db.ForeignKey(
        "competition.id"), nullable=False)

    def __repr__(self):
        return f'<Category {self.id}, {self.id}>'

    def serialize(self):
        category = Category.query.get(self.category_id)
        competition = Competition.query.get(self.competition_id)

        return {
            "id": self.id,
            "category": category.serialize()["name"],
            "competition": competition.title

        }


class Competition(db.Model):
    __tablename__ = "competition"
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(30), unique=False, nullable=False)
    fecha_celebracion = db.Column(db.Date, nullable=True)
    hora_celebracion = db.Column(db.Time, nullable=True)
    location = db.Column(db.String(30), unique=False, nullable=True)
    fecha_verificar_licencia = db.Column(db.Date, nullable=True)
    organizador = db.Column(db.String(30), unique=False, nullable=True)
    limite_participacion = db.Column(db.Integer, unique=False, nullable=True)
    email_incidencias = db.Column(db.String(30), unique=False, nullable=True)

    championship_id = db.Column(db.Integer, db.ForeignKey(
        "championship.id"), nullable=False)

    competition_data = db.relationship(
        "Competition_Data", backref="competition", lazy=True)
    category_competition = db.relationship(
        "Category_Competition", backref="competition", lazy=True)
    inscriptions = db.relationship(
        "Inscriptions", backref="competition", lazy=True)

    def __repr__(self):
        return f'<Competition {self.title}, {self.id}>'

    def serialize(self):

        championship = Championship.query.filter_by(
            id=self.championship_id).first()

        aux = Category_Competition.query.filter_by(
            competition_id=self.id).all()

        categories = list(map(lambda item: item.serialize()["category"], aux))

        return {
            "id": self.id,
            "name": self.title,
            "date_celebration": str(self.fecha_celebracion),
            "time_celebration": str(self.hora_celebracion),
            "date_license": str(self.fecha_verificar_licencia),
            "location": self.location,

            "organizer": self.organizador,
            "participation_limit": self.limite_participacion,
            "email_incidents": self.email_incidencias,
            "categories": categories,
            "tournament": championship.serialize()["title"] if championship != None else championship
        }


class Championship (db.Model):
    __tablename__ = "championship"
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(30), unique=True, nullable=False)

    competition = db.relationship(
        "Competition", backref="championship", lazy=True)

    def __repr__(self):
        return f'<Championship {self.title}, {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
        }


class Competition_Data (db.Model):
    __tablename__ = "competition_data"
    id = db.Column(db.Integer, primary_key=True)

    dorsal = db.Column(db.Integer, unique=False)
    time = db.Column(db.Date, unique=False, nullable=True)
    points = db.Column(db.Integer, unique=False, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competition.id'))

    def __repr__(self):
        return f'<Competition_Data {self.id}>'

    def serialize(self):
        user = User.query.filter_by(id=self.user_id).first()
        competition = Competition.query.filter_by(
            id=self.competition_id).first()

        return {
            "id": self.id,
            "dorsal": self.dorsal,
            "time": self.time,
            "points": self.points,

            "user": user.serialize() if user != None else user,
            "competition": competition.serialize() if competition != None else competition,
        }


class Inscriptions (db.Model):
    __tablename__ = "inscriptions"
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    competition_id = db.Column(db.Integer, db.ForeignKey('competition.id'))

    def __repr__(self):
        return f'<Competition_Data {self.id}>'

    def serialize(self):
        user = User.query.filter_by(id=self.user_id).first()
        competition = Competition.query.filter_by(
            id=self.competition_id).first()

        return {
            "id": self.id,

            "user": user.serialize() if user != None else user,
            "competition": competition.serialize() if competition != None else competition,
        }
