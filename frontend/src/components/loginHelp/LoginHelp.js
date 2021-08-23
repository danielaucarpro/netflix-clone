import './LoginHelp.css';
import { Link } from 'react-router-dom'

const LoginHelp = () => {
    return (
        <>
            <header className='register-header'>
                <Link to='/'>
                    <h1 className='logo'>Title</h1>
                </Link>
                <Link to='/login'>
                    <button>Sign In</button>
                </Link>
            </header>
            <main>
                <form className='loginHelp-form'>
                    <h2 className='loginHelp-title'>Forgot Email/Password</h2>
                    <p className='loginHelp-p'>How would you like to reset your password?</p>
                    <div className='loginHelp-radio'>
                        <input type='radio' name='loginHelp' className='radio-input' />
                        <label>Email</label>
                    </div>
                    <div className='loginHelp-radio'>
                        <input type='radio' name='loginHelp' className='radio-input' />
                        <label>Text Message</label>
                    </div>
                    <p className='loginHelp-p'>We will send you an email with instructions on how to reset your password.</p>
                    <input className='loginHelp-password' value='name@example.com' />
                    <Link>
                        <button className='emailMe' >Email Me</button>
                    </Link>
                    <a className='logingHelp-link' >I don't remember my email or phone.</a>
                </form>
            </main>
        </>
    );
}

export default LoginHelp;