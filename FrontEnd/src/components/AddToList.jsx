import { useState, useContext } from "react";
import ApiTask from "../api/ApiTask";
import { ContextList } from "../contexts/ContextList";

const AddToList = () => {
    const { setList } = useContext(ContextList);
    const [taskText, setTaskText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        if (taskText.trim() !== '') {
            try {
                const response = await ApiTask.post('/task', { task: taskText });
                setTaskText(''); 
                setList(response.data);
            } catch (error) {
                console.error("Erro ao adicionar a tarefa:", error);
            }
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Adicionar Tarefa</h2>
                <input 
                    type="text" 
                    value={taskText} 
                    onChange={(e) => setTaskText(e.target.value)} 
                    placeholder="Digite a nova tarefa..."
                    className="flex-1 w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <button 
                    type="submit" 
                    className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                    Adicionar
                </button>
            </form>
        </div>
    );
};

export default AddToList;