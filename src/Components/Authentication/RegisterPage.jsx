import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpPage from './SignUpPage';
export const baseURL = "https://misty-pelican.cyclic.cloud/api/v1"

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


    const navigate = useNavigate();


    const handleGetOtpClick = async () => {
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
        }
    };

    const handleVerifyNumberClick = async () => {
        try {
            const queryParams = {
                mode: isPhoneNumberVerified ? 'email' : "phone",
            }
            console.log("mode", queryParams.mode)
            const requestBody = {
                phone: "91" + phoneNumber,
                OTP: otpInputs,
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

                if (response.status === 200 && isEmailVerified) {
                    navigate(`/SignUpPage?name=${name}&phoneNumber=${phoneNumber}&email=${email}`);
                    localStorage.setItem('access_token', response.data.data.accessToken);
                }
            }
        }
        catch (err) {
            console.log(err);
            // Enable the Get OTP button
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


    const handleResendClick = () => {
        if (resendTimer === 0) {
            handleGetOtpClick();
            setResendTimer(30);
            startTimer();
        }
    };
    var interval
    var clearTimer = false;
    const startTimer = () => {
        let timer = 30;
        interval = setInterval(() => {
            timer--;

            setResendTimer(timer);
            handleTimerExpiry();
            clearInterval(interval)


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
                                                disabled={isOtpFieldsShown} // Disable the input field if OTP fields are shown
                                                onChange={(e) => setPhoneNumber(e.target.value)} />
                                        </div>
                                        <p style={{ color: 'red' }}>{phoneNumberError}</p>
                                        <div className="col-12 my-2">
                                            <input
                                                type="text"
                                                placeholder="Refer Code( optional )"
                                                onChange={(e) => setReferCode(e.target.value)} />
                                        </div>
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
                                                        onClick={handleGetOtpClick}
                                                        disabled={isGetOtpDisabled}
                                                    >
                                                        Get OTP
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                        <div className="col-12 my-2">
                                            <p className="lh-lg text-center text-light">
                                                By Continuing You agree to out<span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/LegalPage')}> Legal Terms</span> and you are 18 years of older.
                                            </p>
                                        </div>
                                        <div className="col-12 my-2">
                                            <p className="lh-lg text-center text-light">
                                                Already have an account?  <span style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/LoginPage')}> Login</span>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </section>
        </>
    )
}

export default RegisterPage;