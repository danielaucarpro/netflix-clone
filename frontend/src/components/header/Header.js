import './Header.css';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <>
            <header className='navbar-header'>
                <nav className='navbar-nav'>
                    <Link to='/'>
                        <h2 className='logo'>Title</h2>
                    </Link>
                    <Link to='/login'>
                        <button className='navbar–singInbtn'>Sing In</button>
                    </Link>
                </nav>
            </header>
        </>
    );
}

export default Header;