import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../Logo.jsx';
import { baseURL } from '../../token.js';


const GetForgetOtp = () => {
    const navigate = useNavigate()
    const [otpInputs, setOtpInputs] = useState(['', '', '', '']);
    const [message, setMessage] = useState("");
    const location = useLocation();
    const { state } = location;

    // Access the data from state or query parameters
    const email = state ? state.email : '';


    const handleInputChange = (index, value) => {
        // Create a new array with the updated value at the specified index
        const updatedValues = [...otpInputs];
        updatedValues[index] = value;
        setOtpInputs(updatedValues);
        setMessage('')
    };

    const handleSubmit = async () => {
        try {
            const body = {
                email: email,
                role: 'basic',
                OTP: otpInputs.join("")
            }
            const response = await axios.post(baseURL + '/user/verifyemail', body)
            if (response.data) {
                localStorage.setItem('access_token', response.data.data.accessToken);
                navigate("/changePassword")
            }
        } catch (error) {
            console.log(error);
            setMessage(error?.response?.data?.message);
        }
    }
    return (

        <section id="main-bg">
            <div id="register-container" className="container mx-0">
                <>
                    <div className="row " id="register">
                        <div className="card h-100 p-0">
                            <h4 className="text-center py-2">Forget Password</h4>
                            <div className="card-body">
                                <div className="row">


                                    <>
                                        <div style={{ paddingTop: '20px' }} className="col-12 d-flex my-2 otp-input">
                                            <div className="card card-body p-0 mx-1">
                                                <input
                                                    className="border rounded p-2 text-center otp-input"
                                                    id="otp1"
                                                    value={otpInputs[0]}
                                                    onChange={(e) => handleInputChange(0, e.target.value)}

                                                    type="text"
                                                    maxLength={1}
                                                    style={{ outline: 'none', border: 'none', width: '100%' }}
                                                />
                                            </div>
                                            <div className="card card-body p-0 mx-1">
                                                <input
                                                    className="border rounded p-2 text-center otp-input"
                                                    id="otp2"
                                                    type="text"
                                                    value={otpInputs[1]}
                                                    onChange={(e) => handleInputChange(1, e.target.value)}
                                                    maxLength={1}
                                                    style={{ outline: 'none', border: 'none', width: '100%' }}
                                                />
                                            </div>
                                            <div className="card card-body p-0 mx-1">
                                                <input
                                                    className="border rounded p-2 text-center otp-input"
                                                    id="otp3"
                                                    type="text"
                                                    value={otpInputs[2]}
                                                    onChange={(e) => handleInputChange(2, e.target.value)}
                                                    maxLength={1}
                                                    style={{ outline: 'none', border: 'none', width: '100%' }}
                                                />
                                            </div>
                                            <div className="card card-body p-0 mx-1">
                                                <input
                                                    className="border rounded p-2 text-center otp-input"
                                                    id="otp4"
                                                    type="text"
                                                    value={otpInputs[3]}
                                                    onChange={(e) => handleInputChange(3, e.target.value)}
                                                    maxLength={1}
                                                    style={{ outline: 'none', border: 'none', width: '100%' }}
                                                />
                                            </div>

                                        </div>


                                    </>
                                    <div className="col-12 my-2">
                                        <button
                                            className="bg-orange btn"
                                            onClick={handleSubmit}

                                        >
                                            Verify
                                        </button>

                                        <p style={{ color: 'red' }}>{message}</p>


                                    </div>
                                </div>
                                <div className="col-12 my-2">
                                    <p className="lh-lg text-center text-light">
                                        By Continuing You agree to out<span style={{ color: '#ffb900', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/RegisterLegalPAge')}> Legal Terms</span> and you are 18 years of older.
                                    </p>
                                </div>
                                <div className="col-12 my-2">
                                    <p className="lh-lg text-center text-light">
                                        Already have an account?  <span style={{ color: '#ffb900', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/LoginPage')}> Login</span>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
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
        </section>
    )
}

export default GetForgetOtp