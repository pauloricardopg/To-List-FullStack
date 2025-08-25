from backend import database
from datetime import datetime


__tablename__ = 'Usuario'

class User(database.Model):
    id = database.Column(database.Integer, primary_key=True)
    username = database.Column(database.String, nullable=False)
    email = database.Column(database.String, nullable=False, unique=True)
    password = database.Column(database.String, nullable=False)


__tablename__ = 'Lista'

class List(database.Model):
    id = database.Column(database.Integer, primary_key=True)
    task = database.Column(database.String, nullable=False)
    completed = database.Column(database.Boolean, default=False)
    data_criacao = database.Column(database.DateTime, nullable=False, default=datetime.utcnow)
    user_id = database.Column(database.Integer, database.ForeignKey('user.id'), nullable=False)