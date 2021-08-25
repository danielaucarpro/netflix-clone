import './Register.css'
import { encode } from "base-64";
import { Link } from "react-router-dom";

import Header from '../header/Header';
import { useState } from 'react';

const Register = () => {

    const [newUser, setNewUser] = useState({ userName: 'email@example.com', password: 'Enter your password.' });

    const loginAutho = async (e) => {
        e.preventDefault();

        fetch("http://localhost:4000/planform", {
            method: 'PUT',
            headers: new Headers({
                'Authorization': 'Basic ' + encode(newUser.userName + ":" + newUser.password),
                "Content-type": "application/json"
            }),
            body: JSON.stringify({
                newUser
            }),
            credentials: 'same-origin'
        }).then(res => {
            console.log(res);
            if (!res.ok) {
                throw res.statusText;
            } else {
                return res.json();
            }
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
            return err;
        })
    }

    return (
        <>
            <Header></Header>
            <form className='register-main'>
                <p className='register-step'>STEP <span className='register-stepNum'>1</span> OF <span className='register-stepNum'>2</span></p>
                <span className='register-title'>Welcome back!</span>
                <span className='register-title'>Joining is easy.</span>
                <p>Enter your password and you'll be watching in no time.</p>
                <span>Email</span>
                <input className='register-input'
                    type='text'
                    value={newUser.userName}
                    onChange={(e) => {e.preventDefault()
                        setNewUser({...newUser, userName: e.target.value})
                    }}
                />
                <span>Password</span>
                <input className='register-input'
                    type='password'
                    value={newUser.password}
                    onChange={(e) => {e.preventDefault()
                        setNewUser({...newUser, password: e.target.value})
                    }}
                />
                <Link to='/loginHelp'>
                    <p className='forgotPassword'>Forgot your password?</p>
                </Link>
                <Link to='/planform'>
                    <button className='register-next-btn' type='submit'>Next</button>
                </Link>
            </form>
        </>
    );
}

export default Register;