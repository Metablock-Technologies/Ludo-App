import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios, { Axios } from 'axios';
import { baseURL } from '../../token';
import Logo from '../Logo';

function ForgetEmail() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const body = {
                email: email,
                role: 'basic'
            }
            const response = await axios.post(baseURL + '/user/otpemail', body)
            if (response) {
                const handlestate = {
                    email: email
                }
                navigate("/getForgetOtp", { state: handlestate })
            }
        } catch (error) {
            console.log(error);
            setMessage(error?.response?.data?.message);
        }
    }
    return (
        <>
            <section id="main-bg">
                <div id="login-container" className="container mx-0">
                    <div className="row " id="login">
                        <div className="card h-100 p-0">
                            <h4 className="text-center py-2">Forget Password</h4>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 my-2 mt-4">
                                        <input type="text" placeholder="Enter  Your Email" onChange={(e) => setEmail(e.target.value)}
                                            style={{ borderColor: emailError ? 'red' : '' }} />
                                        {emailError && <p style={{ color: 'red' }} className="error-message">{emailError}</p>}
                                    </div>
                                    <div className="col-12 my-2">
                                        <a href>
                                            <button type='submit' className="bg-orange btn" onClick={handleSubmit}>Get Otp </button>
                                        </a>
                                    </div>
                                    <div>
                                        <p style={{ color: 'red' }}>{message}</p>
                                    </div>
                                    <div className="col-12 my-2">
                                        <p className="lh-md text-center text-light">
                                            By Continuing You agree to out <span style={{ color: '#ffb900', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/RegisterLegalPage')}> Legal Terms</span> and you are 18 years of older.
                                        </p>
                                    </div>
                                    <div className="col-12 my-2">
                                        <p className="lh-lg text-center text-light">
                                            Don’t have an account? <span style={{ color: '#ffb900', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/RegisterPage')}> Register</span> .
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="" style={{ position: 'fixed', top: '50%', left: 'calc(100% - 40%)', transform: `translate(-50%,-50%)`, zIndex: 5 }}>
                    <div className="rcBanner flex-center">
                        <Logo />
                        {/* <picture className="rcBanner-img-containerr">
                            <img style={{ marginLeft: '10px', width: "80% ", borderRadius: '50%' }} src="./images/Ludolkjpg.jpg" alt />
                        </picture>
                        <div className="rcBanner-text">Play Ludo &amp; <span className="rcBanner-text-bold">Win Real Cash!</span></div>
                        <div className="rcBanner-footer">For best experience, open&nbsp;<a href="/">ludokavish.com</a>&nbsp;on&nbsp;&nbsp;chrome </div> */}
                    </div>

                </div>
            </section >

        </>
    )
}

export default ForgetEmail;