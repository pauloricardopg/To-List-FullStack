from flask import jsonify, request
from . import database
from .models import List

class Actions:

    
    @staticmethod
    def add():        
        data = request.json
        task_text = data.get('task') 

        if task_text:            
            newTask = List(task=task_text)            
            database.session.add(newTask)
            database.session.commit()            
            tasks = List.query.all()
            return jsonify([{'id': t.id, 'task': t.task, 'completed': t.completed, 'data_criacao': t.data_criacao} for t in tasks])

   
    @staticmethod
    def delete(taskId):        
        deleteTask = List.query.get(taskId)
        
        if deleteTask:
            database.session.delete(deleteTask)
            database.session.commit()
        
        
        tasks = List.query.all()
        return jsonify([{'id': t.id, 'task': t.task, 'completed': t.completed, 'data_criacao': t.data_criacao} for t in tasks])

   
    @staticmethod
    def update(taskId):
        data = request.json
        task = List.query.get(taskId)

        if not task:
            return jsonify({"error": "Task not found"}), 404

        
        if 'task' in data:
            task.task = data.get('task')


        if 'completed' in data:
            task.completed = data.get('completed')

        database.session.commit()


        tasks = List.query.all()
        return jsonify([{'id': t.id, 'task': t.task, 'completed': t.completed, 'data_criacao': t.data_criacao} for t in tasks])

    @staticmethod
    def show():
        tasks = List.query.all()
       
        return jsonify([{'id': t.id, 'task': t.task, 'completed': t.completed, 'data_criacao': t.data_criacao} for t in tasks])