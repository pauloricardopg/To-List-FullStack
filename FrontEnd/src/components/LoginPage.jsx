import { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiTask from '../api/ApiTask';

const LoginPage = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await ApiTask.post('/auth/login', { email, password });
            const { access_token } = response.data;

            if (access_token) {
                onLoginSuccess(access_token);
            }
        } catch (err) {
            setError('E-mail ou senha inválidos.');
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleLogin} className="space-y-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
                    
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

                    {error && <p className="text-sm text-center text-red-600">{error}</p>}

                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Entrar
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600">
                    Não tem uma conta?{' '}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Crie uma aqui
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;