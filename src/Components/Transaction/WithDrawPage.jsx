import React, { useState } from 'react';
import HeaderComponent from '../HeaderComponent';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import { baseURL } from '../../token';
import axios from 'axios';
function WithDrawPage() {
    const navigate = useNavigate();
    const [upiId, setUpiId] = useState('');
    const [confirmUpiId, setConfirmUpiId] = useState('');
    const [chipAmount, setChipAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        setErrorMessage('');
        console.log(upiId);
        console.log(confirmUpiId);
        if (upiId !== confirmUpiId) {
            setErrorMessage('UPI IDs do not match.');
            return;
        }

        if (!upiId && !chipAmount) {
            setErrorMessage("please fill all feilds");
            return;
        }

        try {
            const reqbody = {
                amount: chipAmount,
                details: upiId
            }
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            console.log(headers);
            console.log(reqbody);
            const response = await axios.post(baseURL + `/user/wallet/withdrawrequest`, reqbody, {
                headers: headers
            });
            console.log(response);
            if (response) {
                // API request was successful, handle success here
                // You can redirect to a success page or show a success message
                // navigate('/SuccessPage');
                setErrorMessage('Withdraw request sent')
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
        }
    };

    const handleUpi = (e) => {
        setErrorMessage('');
        setUpiId(e.target.value);
    }
    const handleConfirmupi = (e) => {
        setErrorMessage('');
        setConfirmUpiId(e.target.value);
    }
    const handleAmount = (e) => {
        setErrorMessage('');
        setChipAmount(e.target.value);
    }

    return (
        <>
            <section id="main-bg">
                <div id="wallet-container" className="container mx-0">
                    <div className="row">
                        <div className="col-12">
                            <HeaderComponent />
                        </div>
                        <div className="col-12 my-3">
                            <div className="row align-items-center my-2">
                                <div className="my-auto col-6 text-white" onClick={() => navigate('/WalletPage')}>
                                    <button type="button" className="btn btn-primary d-flex "><span className="material-symbols-outlined mb-0">arrow_back</span>Back</button>
                                </div>
                                <div className="col-6 d-flex justify-content-end">
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2" id="guide-btn" className="btn btn-outline-primary bg-light">Guide</button>
                                    {/* Modal */}
                                    <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Guide Vedio</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                </div>
                                                <div className="modal-body">
                                                    <iframe width="100%" height="350px" src="https://www.youtube.com/embed/38y_1EWIE9I" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 card mt-3 walletcard pt-2 px-0 mx-auto text-white">
                            <div className="text-center">Payment Mode</div>
                            <div className="card-body walletbody mt-2">
                                <div className="col-12 py-3 ">
                                    <h6 className="text-center text-purple">Withdraw Chips: <span>7.00</span></h6>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <p className="text-light">Minimum:95</p>
                                    <p className="text-light text-end">Maximum:1,00,000</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 card mt-3 walletcard pt-2 px-0 mx-auto text-white">
                            <div className="text-center">Payment Details</div>
                            <div className="card-body walletbody mt-2">
                                <div className="col-12 my-1">
                                    <label htmlFor="username" className="text-left text-yellow">UPI ID</label>
                                </div>
                                <div className="col-12 mb-4">
                                    <input type="text" className="details" placeholder="1234567890@paytm" onChange={(e) => { handleUpi(e) }} />
                                </div>
                                <div className="col-12 my-1">
                                    <label htmlFor="username" className="text-left text-yellow" >Re Enter UPI ID</label>
                                </div>
                                <div className="col-12 mb-4">
                                    <input type="text" className="details" placeholder="1234567890@paytm" onChange={(e) => { handleConfirmupi(e) }} />
                                </div>
                                <div className="col-12 my-1">
                                    <label htmlFor="username" className="text-left text-yellow">Chips</label>
                                </div>
                                <div className="col-12 mb-4">
                                    <input type="text" className="details" placeholder="Chips" onChange={(e) => { handleAmount(e) }} />
                                </div>
                                <div className="col-12">
                                    <p className="lh-md text-center text-light">
                                        By Continuing You agree to our <a href="legalterms.html"> Legal Terms</a> and you are 18 years or older.
                                    </p>
                                </div>
                                {errorMessage && (
                                    <div className="col-12 text-danger text-center mt-3">{errorMessage}</div>
                                )}
                                <div className="col-12">
                                    <button onClick={handleSubmit} className="bg-orange btn">Submit</button>
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
                        <div className="rcBanner-footer">For best experience, open&nbsp;<a href="/">LudoPlayers.com</a>&nbsp;on&nbsp;&nbsp;chrome </div> */}
                    </div>

                </div>
            </section>

        </>
    )
}

export default WithDrawPage;