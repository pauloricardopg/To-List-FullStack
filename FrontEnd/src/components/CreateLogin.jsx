// src/pages/CreateLoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiTask from '../api/ApiTask';

const CreateLoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!username || !email || !password || !confirmPassword) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            const response = await ApiTask.post('/auth/createlogin', {
                username,
                email,
                senha: password
            });
            
            setSuccess(response.data.msg + ' Redirecionando para o login...');

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                setError('Ocorreu um erro ao criar a conta.');
            }
            console.error('Erro no registro:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleRegister} className="space-y-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Criar Nova Conta</h2>

                    {error && <p className="text-sm text-center text-red-600">{error}</p>}
                    {success && <p className="text-sm text-center text-green-600">{success}</p>}

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Nome de Usuário:
                        </label>
                        <input 
                            id="username"
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input 
                            id="email"
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha:
                        </label>
                        <input 
                            id="password"
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirmar Senha:
                        </label>
                        <input 
                            id="confirmPassword"
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Registrar
                    </button>
                </form>
                
                <p className="text-sm text-center text-gray-600">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Faça o login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CreateLoginPage;