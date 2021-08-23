import './index.css'
import { Link } from 'react-router-dom';

const index = () => {

    return (
        <>
            <header className='navbar-header'>
                <nav className='navbar-nav'>
                    <h2 className='logo'>Title</h2>
                    <Link to='/login'>
                        <button className='navbar–singInbtn'>Sing In</button>
                    </Link>
                </nav>
            </header>
            <main className='main-container'>
                <h1 className='index-main-h1'>Unlimited movies, TV shows, and more.</h1>
                <h2 className='index-main-h2'>Watch anywhere. Cancel anytime</h2>
                <h4 className='index-main-h4'>Ready to watch? Enter your email to create or restart your membership.</h4>
                <div className='index-email-container'>
                    <label>Email address</label>
                    <br></br>
                    <input />
                    <Link to='/register'>
                        <button>Get Started</button>
                    </Link>
                </div>
            </main>
        </>
    );
}

export default index