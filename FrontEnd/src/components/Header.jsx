import LogoutButton from './LogoutButton';

const Header = ({ token, onLogout }) => {
    return (
        <header className='flex items-center justify-between h-20 px-8 bg-slate-950 text-slate-200 shadow-xl z-10 sticky top-0'>
            <div className="flex items-center space-x-4">
                <h1 className="text-3xl font-bold">ToDoList</h1>
            </div>

            <div>
                {token && <LogoutButton onLogoutClick={onLogout} />}
            </div>
        </header>
    );
};

export default Header;