import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app) 

base_dir = os.path.abspath(os.path.dirname(__file__))
if os.getenv("DATABASE_URL"):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(base_dir, "lista.db")}'

database = SQLAlchemy(app)

from .actions import Actions

app.add_url_rule('/api/task', 'show', Actions.show, methods=['GET'])
app.add_url_rule('/api/task', 'add', Actions.add, methods=['POST'])
app.add_url_rule('/api/task/<int:taskId>', 'update', Actions.update, methods=['PUT'])
app.add_url_rule('/api/task/<int:taskId>', 'delete', Actions.delete, methods=['DELETE'])