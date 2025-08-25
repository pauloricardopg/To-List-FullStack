const LogoutButton = ({ onLogoutClick }) => {
    return (
        <button 
            onClick={onLogoutClick}           
            className="px-4 py-2 font-semibold text-white bg-gray-600 rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
        >
            Sair
        </button>
    );
};

export default LogoutButton;