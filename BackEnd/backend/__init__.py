import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app) 

base_dir = os.path.abspath(os.path.dirname(__file__))
if os.getenv("DATABASE_URL"):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(base_dir, "lista.db")}'

app.config["JWT_SECRET_KEY"] = "sua_chave_super_secreta"

jwt = JWTManager(app)
database = SQLAlchemy(app)
bcrypt = Bcrypt(app)

from .actions import Actions

app.add_url_rule('/api/task', 'show', Actions.show, methods=['GET'])
app.add_url_rule('/api/task', 'add', Actions.add, methods=['POST'])
app.add_url_rule('/api/task/<int:taskId>', 'update', Actions.update, methods=['PUT'])
app.add_url_rule('/api/task/<int:taskId>', 'delete', Actions.delete, methods=['DELETE'])
app.add_url_rule('/api/auth/login', 'login', Actions.login, methods=['POST'])
app.add_url_rule('/api/auth/createlogin', 'createLogin', Actions.createLogin, methods=['POST'])