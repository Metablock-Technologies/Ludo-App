import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { baseURL } from './RegisterPage';
function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const handleValidation = () => {
        // Reset previous error messages
        setEmailError('');
        setPasswordError('');

        // Perform validation
        let isValid = true;

        if (!validator.isEmail(email)) {
            setEmailError('Invalid email format');
            isValid = false;
        }

        if (validator.isEmpty(password)) {
            setPasswordError('Password is required');
            isValid = false;
        }

        return isValid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset previous error messages
        setEmailError('');
        setPasswordError('');

        // Perform validation
        if (!validator.isEmail(email)) {
            setEmailError('Invalid email format');
        }
        if (validator.isEmpty(password)) {
            setPasswordError('Password is required');
        }

        // If no errors, proceed with form submission
        if (validator.isEmail(email) && !validator.isEmpty(password)) {
            // Perform your submission logic here
        }
        if (handleValidation()) {
            // Validation passed, proceed with form submission logic
            console.log('Form submitted successfully');
        }

        const body = {
            email: email,
            password: password
        }
        try {
            const response = await axios.post(baseURL + '/user/login', body)
            console.log(response.data.data.token)
            localStorage.setItem('access_token', response.data.data.token);
            if (response.status === 200) {
                navigate('/UserPage')
            }
        }
        catch (err) {
            console.error(err);


        }

    };
    return (
        <>
            <section id="main-bg">
                <div id="login-container" className="container mx-0">
                    <div className="row " id="login">
                        <div className="card h-100 p-0">
                            <h4 className="text-center py-2">Login</h4>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 my-2 mt-4">
                                        <input type="text" placeholder="Enter  Your Email" onChange={(e) => setEmail(e.target.value)}
                                            style={{ borderColor: emailError ? 'red' : '' }} />
                                        {emailError && <p style={{ color: 'red' }} className="error-message">{emailError}</p>}
                                    </div>
                                    <div className="col-12 my-2 mt-4">
                                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                                            style={{ borderColor: passwordError ? '1px solid red' : '' }} />

                                    </div>
                                    {passwordError && <p style={{ color: 'red' }} className="error-message">{passwordError}</p>}
                                    <div className="col-12 my-2">
                                        <p className="lh-md text-center text-light">
                                            By Continuing You agree to out <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/LegalPage')}> Legal Terms</span> and you are 18 years of older.
                                        </p>
                                    </div>
                                    <div className="col-12 my-2">
                                        <a href>
                                            <button type='submit' className="bg-orange btn" onClick={handleSubmit}>Login </button>
                                        </a>
                                    </div>
                                    <div className="col-12 my-2">
                                        <p className="lh-lg text-center text-light">
                                            Don’t have an account? <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/RegisterPage')}> Register</span> .
                                        </p>
                                    </div>
                                    {/* to be removed row in final project */}
                                    <div className="col-12">
                                        <p className="text-light text-center">go to the <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/PlayPage')}>Home Page</span><br />(this row will be removed in final project)</p>
                                    </div>
                                    {/* to be removed row in final project */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default LoginPage;