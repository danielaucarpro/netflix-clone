import { Link } from "react-router-dom";
import './Register.css'

const url = 'http://localhost:4000/register';

const Register = () => {
    
    const registerUser = (userName, password) => {
        console.log('Register User exe');
        let enteredUserName = document.getElementsByClassName('register-email').value;
        let enteredPassword = document.getElementsByClassName('register-password').value;
        
        var xhr = new XMLHttpRequest(); //making new request every time we request
        xhr.open("PUT", url);

        xhr.setRequestHeader("Authorization", "Bearer test");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
            }
        };

        var data = {
            user: enteredUserName,
            password: enteredPassword
        }
            
        xhr.send(data);
    }

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
            <form className='register-main'>
                <p>Step 1 of 3</p>
                <span className='register-title'>Welcome back!</span>
                <span className='register-title'>Joining is easy.</span>
                <p>Enter your password and you'll be watching in no time.</p>
                <span>Email</span>
                <input className='register-email' />
                <input className='register-password' type='text' />
                <Link to='/loginHelp'>
                    <p className='forgotPassword'>Forgot your password?</p>
                </Link>
                <Link>
                    <button onClick={registerUser} className='register-next-btn'>Next</button>
                </Link>
            </form>
        </>
    );
}

export default Register;