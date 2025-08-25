from flask import jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from . import database, bcrypt
from .models import List, User

class Actions:
    
    @staticmethod
    @jwt_required()
    def add(): 
        current_user_id = get_jwt_identity()
        data = request.json
        task_text = data.get('task')

        if task_text:
            newTask = List(task=task_text, user_id=int(current_user_id))
            database.session.add(newTask)
            database.session.commit()
        
        tasks = List.query.filter_by(user_id=int(current_user_id)).all()
        return jsonify([{'id': t.id, 'task': t.task, 'completed': t.completed, 'data_criacao': t.data_criacao} for t in tasks])

   
    @staticmethod
    @jwt_required()
    def delete(taskId): 
        current_user_id = int(get_jwt_identity())
        deleteTask = List.query.filter_by(id=taskId, user_id=current_user_id).first()
        
        if deleteTask:
            database.session.delete(deleteTask)
            database.session.commit()
        
        tasks = List.query.filter_by(user_id=current_user_id).all()
        return jsonify([{'id': t.id, 'task': t.task, 'completed': t.completed, 'data_criacao': t.data_criacao} for t in tasks])

   
    @staticmethod
    @jwt_required()
    def update(taskId):
        current_user_id = int(get_jwt_identity())
        data = request.json
        task = List.query.filter_by(id=taskId, user_id=current_user_id).first()

        if not task:
            return jsonify({"error": "Task not found or permission denied"}), 404
        
        if 'task' in data:
            task.task = data.get('task')

        if 'completed' in data:
            task.completed = data.get('completed')

        database.session.commit()

        tasks = List.query.filter_by(user_id=current_user_id).all()
        return jsonify([{'id': t.id, 'task': t.task, 'completed': t.completed, 'data_criacao': t.data_criacao} for t in tasks])

    @staticmethod
    @jwt_required()
    def show():
        current_user_id = int(get_jwt_identity())
        tasks = List.query.filter_by(user_id=current_user_id).all()
        return jsonify([{'id': t.id, 'task': t.task, 'completed': t.completed, 'data_criacao': t.data_criacao} for t in tasks])
    
    @staticmethod
    def login():
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"msg": "E-mail e senha são obrigatórios"}), 400

        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(identity=str(user.id))
            return jsonify(access_token=access_token), 200
        
        return jsonify({"msg": "E-mail ou senha inválidos"}), 401

    @staticmethod
    def createLogin():
        data = request.json
        saveUsername = data.get('username')
        saveEmail = data.get('email')
        savePassword = data.get('senha')
        user_exists = User.query.filter_by(email=saveEmail).first()
        if user_exists:
            return jsonify({"msg": "Este e-mail já está cadastrado."}), 409
        if saveEmail and savePassword and saveUsername:
            password_cript = bcrypt.generate_password_hash(savePassword).decode("utf-8")
            newUser = User(username = saveUsername, email = saveEmail, password = password_cript)
            database.session.add(newUser)
            database.session.commit()
        return jsonify({"msg": "Usuário criado com sucesso!"}), 201