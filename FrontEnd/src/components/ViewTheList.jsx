import { useContext } from 'react';
import { ContextList } from '../contexts/ContextList';
import ButtonActions from './ButtonsActions';

const ViewTheList = () => {
    const { list } = useContext(ContextList);

    return (
        <div className="flex justify-center p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-8">
            <div className="w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Lista de Tarefas</h1>
                <ul className="space-y-4">
                    {list.map(task => (
                        <li 
                            key={task.id} 
                            className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm"
                        >
                            <span>
                                {task.task}
                            </span>
                            
                            <ButtonActions task={task} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewTheList;