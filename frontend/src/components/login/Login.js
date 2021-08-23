import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {

    const showPassword = (event) => {
        event.target.type = 'text'
    }

    return (
        <>
            <header className='login-header'>
                <Link to='/'>
                    <h1>Title</h1>
                </Link>
            </header>
            <main>
                <form className='login-form'>
                    <h1 className='login-h1' >Sign In</h1>
                    <div className='login-input-container'>
                        <label className='login-label' >Email or phone number</label>
                        <br></br>
                        <input className='login-input' type='text' />
                    </div>
                    <div className='login-input-container'>
                        <label className='login-label' >Password</label>
                        <br></br>
                        <input id='password' className='login-input' type='password' />
                        <span className='login-showBtn' onClick={showPassword} >SHOW</span>
                    </div>
                    <button className='login-signBtn' type='submit'>Sign In</button>
                    <div className='login-checkbox-container'>
                        <div className='login-rememberMe'>
                            <input className='login-checkbox' type='checkbox'></input>
                            <label>Remember me</label>
                        </div>
                        <span>Need help?</span>
                    </div>
                    <div className='login-newHere'>
                        <p className='login-newhere-text'>New here?</p>
                        <span className='signUp-span'>Sign up now</span>
                    </div>
                </form>
            </main>
        </>
    );
}

export default Login;