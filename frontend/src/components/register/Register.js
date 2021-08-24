import './Register.css'
import { Link } from "react-router-dom";

import Header from '../header/Header';


const Register = () => {

    return (
        <>
        <Header></Header>
            <form className='register-main'>
                <p className='register-step'>STEP <span className='register-stepNum'>1</span> OF <span className='register-stepNum'>2</span></p>
                <span className='register-title'>Welcome back!</span>
                <span className='register-title'>Joining is easy.</span>
                <p>Enter your password and you'll be watching in no time.</p>
                <span>Email</span>
                <input className='register-input' type='text' value='email@example.com'/>
                <span>Password</span>
                <input className='register-input' type='text' value='Enter your password' />
                <Link to='/loginHelp'>
                    <p className='forgotPassword'>Forgot your password?</p>
                </Link>
                <Link to='/planform'>
                    <button className='register-next-btn'>Next</button>
                </Link>
            </form>
        </>
    );
}

export default Register;