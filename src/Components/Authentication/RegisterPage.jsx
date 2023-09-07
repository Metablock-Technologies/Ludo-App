import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpPage from './SignUpPage';
// export const baseURL = "https://misty-pelican.cyclic.cloud/api/v1"


import Logo from '../Logo.jsx';

import { baseURL } from '../../token';
function RegisterPage() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [referCode, setReferCode] = useState('');
    const [otpInputs, setOtpInputs] = useState(['', '', '', '']);
    const [showOtpFields, setShowOtpFields] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const [isOtpFieldsShown, setIsOtpFieldsShown] = useState(false);
    const [nameError, setNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [showEmailField, setShowEmailField] = useState(false);
    const [isGetOtpDisabled, setIsGetOtpDisabled] = useState(true); // Add state for Get OTP button
    const [message, setMessage] = useState('');

    const navigate = useNavigate();


    const handleGetOtpClick = async () => {
        setMessage('');
        if (!name.trim()) {
            setNameError('Please enter your name');
            return;
        }
        if (!phoneNumber.trim()) {
            setPhoneNumberError('Please enter your phone number');
            return;
        }
        if (phoneNumber.length !== 10) {
            setPhoneNumberError("The phone number should be of length 10");
            return;
        }

        setIsOtpFieldsShown(true);
        setShowOtpFields(true);
        setIsVerifying(true);
        startTimer();

        try {
            const queryParams = {
                mode: isPhoneNumberVerified ? 'email' : "phone",
            };
            console.log("otpmode", queryParams.mode)

            const requestBody = {
                phone: "91" + phoneNumber,
                OTP: otpInputs.join(""),
                email: email,
                role: 'basic'
            };
            console.log(requestBody.phone);

            const response = await axios.post(baseURL + '/user/otp', requestBody, {
                params: queryParams,
            });

            console.log(response.data);
            console.log("name", response.name);

            if (response.data) {
                setIsVerifying(true);
            }
        } catch (err) {
            console.log(err);
            setMessage(err?.response?.data?.message);
        }
    };

    const handleVerifyNumberClick = async () => {
        setMessage('');
        try {
            const queryParams = {
                mode: isPhoneNumberVerified ? 'email' : "phone",
            }
            console.log("mode", queryParams.mode)
            const requestBody = {
                phone: "91" + phoneNumber,
                OTP: otpInputs.join(""),
                email: email,
                role: 'basic'
            };
            console.log(requestBody);
            const response = await axios.post(baseURL + '/user/verify', requestBody, {
                params: queryParams,
            })

            console.log(response.data.data.accessToken);
            console.log("name", response);

            if (response.status === 200) {
                setIsPhoneNumberVerified(true);
                setShowEmailField(true);
                setIsEmailVerified(true);
                setIsVerifying(false);
                setShowOtpFields(false);
                setIsGetOtpDisabled(true);
                setOtpInputs(['', '', '', '']);

                if (response.status === 200 && isEmailVerified) {
                    // navigate(`/SignUpPage?name=${name}&phoneNumber=${phoneNumber}&email=${email}`);
                    const signupData = {
                        name: name,
                        phoneNumber: phoneNumber,
                        email: email,
                    }
                    navigate(`/SignUpPage`, { state: signupData });
                    localStorage.setItem('access_token', response.data.data.accessToken);
                }
            }
        }
        catch (err) {
            console.log(err);
            // Enable the Get OTP button
            setMessage(err?.response?.data?.message);
        }

        // Add your logic for verifying the number here

    };

    // Handle timer expiry
    const handleTimerExpiry = () => {
        if (!showOtpFields && resendTimer === 0) {
            // Perform the "Get OTP" functionality here
            // console.log("Performing Get OTP functionality");
            // handleGetOtpClick();
            // setIsGetOtpDisabled(false);
            clearInterval(interval)
        }
    };


    // const handleResendClick = (e) => {
    //     e.preventDefault();
    //     console.log("heyy");
    //     setResendTimer(29);
    //     startTimer();
    //     // e.preventDefault();
    //     // // if (resendTimer === 0) {
    //     // // Call the startTimer function to restart the timer
    //     // }
    // };

    const handleResendClick = (e) => {
        e.preventDefault();
        console.log("heyy");
        clearInterval(interval);

        // Set the timer to 29 first
        setResendTimer(29);
        if (resendTimer === 29) {
            console.log(heyy);
            startTimer();
        }
        startTimer();
        handleGetOtpClick();
        // Wait for a brief moment (e.g., 100ms) before starting the timer
        // await new Promise((resolve) => setTimeout(resolve, 10));
        // // Now start the timer
        // startTimer();
    };


    var interval
    var clearTimer = false;
    const startTimer = () => {
        console.log(resendTimer);
        let timer = resendTimer; // Set the initial timer value
        interval = setInterval(() => {
            timer--;
            if (timer <= 0) {
                // Timer has reached 00:00, so clear the interval and show the resend OTP button
                clearInterval(interval);
                setResendTimer(0);
            } else {
                // Update the timer value
                setResendTimer(timer);
            }
        }, 1000);
    };

    useEffect(() => {
        setIsGetOtpDisabled(
            !name.trim() ||
            !phoneNumber.trim() &&
            !email.trim() ||
            (showEmailField && !email)
        );
    }, [name, phoneNumber, email]);

    const handleInputChange = (index, value) => {
        // Create a new array with the updated value at the specified index
        const updatedValues = [...otpInputs];
        updatedValues[index] = value;
        setOtpInputs(updatedValues);
        setMessage('')
    };

    return (
        <>
            <section id="main-bg">
                <div id="register-container" className="container mx-0">
                    <>
                        <div className="row " id="register">
                            <div className="card h-100 p-0">
                                <h4 className="text-center py-2">Register</h4>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 my-2">
                                            <input
                                                type="text"
                                                placeholder="Enter Your Name"
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={isOtpFieldsShown} // Disable the input field if OTP fields are shown
                                            />
                                        </div>
                                        <p style={{ color: 'red' }} > {nameError} </p>
                                        <div className="col-12 my-2">
                                            <input
                                                type="text"
                                                placeholder="Phone number"
                                                disabled={isPhoneNumberVerified} // Disable the input field if OTP fields are shown
                                                onChange={(e) => setPhoneNumber(e.target.value)} />
                                        </div>
                                        <p style={{ color: 'red' }}>{phoneNumberError}</p>
                                        {showEmailField && (
                                            <div className="col-12 my-2">
                                                <input
                                                    type="text"
                                                    placeholder="E-mail"


                                                    onChange={(e) => {
                                                        setEmail(e.target.value)
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="col-12 my-2">
                                            <input
                                                type="text"
                                                placeholder="Refer Code( optional )"
                                                onChange={(e) => setReferCode(e.target.value)} />
                                        </div>
                                        {showOtpFields ? (
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

                                                <div style={{ alignItems: 'centers', paddingTop: "20px" }} className="my-auto col-12">
                                                    <div className="row">
                                                        <div style={{ fontSize: '12px' }} className="d-flex col-6 justify-content-start my-2 text-light">
                                                            Resend in {resendTimer < 10 ? `00:0${resendTimer}` : `00:${resendTimer}`} seconds
                                                        </div>
                                                        <div className="d-flex col-6 justify-content-end my-2">
                                                            {resendTimer === 0 && (
                                                                <button className="btn btn-success ms-2" onClick={handleResendClick}>
                                                                    Resend OTP
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>

                                        ) : null}

                                        <p style={{ color: 'red' }}>{message}</p>
                                        <div className="col-12 my-2">
                                            {isVerifying ? (
                                                <>
                                                    <button className="bg-orange btn" onClick={() => {
                                                        handleVerifyNumberClick()
                                                    }}>
                                                        {isEmailVerified ? "Verify Email" : "Verify Number"}
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="bg-orange btn"
                                                        onClick={(e) => {
                                                            e.preventDefault(); // Add this line to prevent the default behavior
                                                            handleGetOtpClick(e);
                                                        }} disabled={isGetOtpDisabled}
                                                    >
                                                        Get OTP
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                        <div className="col-12 my-2">
                                            <p className="lh-lg text-center text-light">
                                                By Continuing You agree to out<span style={{ color: '#ffb900', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/RegisterLegalPage')}> Legal Terms</span> and you are 18 years of older.
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
        </>
    )
}

export default RegisterPage;