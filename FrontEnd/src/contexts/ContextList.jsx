import { createContext, useState, useEffect } from 'react';
import ApiTask from '../api/ApiTask';

export const ContextList = createContext();

export const ContextListProvider = ({ children }) => {
    const [list, setList] = useState([]);
    
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await ApiTask.get('/task');
                setList(response.data);
            } catch (error) {
                console.error("Erro ao buscar as tarefas:", error);
                setList([]);
            }
        };

        if (token) {
            fetchTasks();
        } else {
            setList([]);
        }
    }, [token]); 

    return (
        <ContextList.Provider value={{ list, setList }}>
            {children}
        </ContextList.Provider>
    );
};