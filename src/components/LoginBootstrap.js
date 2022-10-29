import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const LoginBootstrap = () => {

    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then( result => {
            const user = result.user;
            console.log(user);
            setSuccess(true);
        })
        .catch(error => {
            console.error('error', error);
        })
    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }

    const handleForgetPassword = () => {
        if(!userEmail){
            alert('please enter your email address');
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(() => {
            alert('password reset email send. please check your email')
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'>Please Log In</h3>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Your Email</label>
                    <input onBlur={handleEmailBlur} type="email" className="form-control" id="formGroupExampleInput" name = 'email' placeholder="Enter your email" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Enter your password</label>
                    <input type="password" className="form-control" id="formGroupExampleInput2" name = 'password' placeholder="Enter your password" required/>
                </div>
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>
            {success && <p>Successfully login to the account</p>}
            <p><small>New to this website ? please <Link to='/register'>Register</Link></small></p>
            <p><small>Forget Password? <button type='button' onClick={handleForgetPassword} className='btn btn-link'>Reset password</button></small></p>
        </div>
    );
};

export default LoginBootstrap;