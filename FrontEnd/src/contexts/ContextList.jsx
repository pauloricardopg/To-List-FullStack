import { createContext, useState, useEffect } from 'react';
import ApiTask from '../api/ApiTask';


export const ContextList = createContext();


export const ContextListProvider = ({ children }) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await ApiTask.get('/task');
                setList(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Erro ao buscar as tarefas:", error);
            }
        };

        fetchTasks();
    }, []);

    
    return (
        <ContextList.Provider value={{ list, setList }}>
            {children}
        </ContextList.Provider>
    );
};