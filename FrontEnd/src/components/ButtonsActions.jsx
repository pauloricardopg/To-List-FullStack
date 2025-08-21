import { useState, useContext } from 'react';
import { ContextList } from "../contexts/ContextList"; 
import ApiTask from '../api/ApiTask'; 


const ButtonActions = ({ task }) => {
    const { setList } = useContext(ContextList);

 
    const [isEditing, setIsEditing] = useState(false);
 
    const [taskText, setTaskText] = useState(task.task);



    const deleteTask = async () => {
        try {
            const response = await ApiTask.delete(`/task/${task.id}`);
            setList(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Erro ao deletar a tarefa:", error);
        }
    };

    const toggleCompleted = async () => {
        try {
            
            const response = await ApiTask.put(`/task/${task.id}`, { completed: !task.completed });
            setList(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Erro ao atualizar status da tarefa:", error);
        }
    };

   
    const handleUpdateAndSave = async () => {
        try {
            
            const response = await ApiTask.put(`/task/${task.id}`, { task: taskText });
            setList(Array.isArray(response.data) ? response.data : []);
            
        
            setIsEditing(false);
        } catch (error) {
            console.error("Erro ao atualizar a tarefa:", error);
        }
    };


   

   
    if (isEditing) {
        return (
            <div className="flex items-center gap-2">
                <input 
                    type="text" 
                    value={taskText} 
                    onChange={(e) => setTaskText(e.target.value)}
                    className="flex-1 w-full px-2 py-1 border border-gray-300 rounded-md"
                />
                <button onClick={handleUpdateAndSave} className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Salvar
                </button>
                <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                    Cancelar
                </button>
            </div>
        );
    }

   
    return (
        <div className="flex items-center gap-2">
            <button onClick={toggleCompleted} className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                {task.completed ? 'Reabrir' : 'Concluir'}
            </button>
            <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                Editar
            </button>
            <button onClick={deleteTask} className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
                Deletar
            </button>
        </div>
    );
}

export default ButtonActions;