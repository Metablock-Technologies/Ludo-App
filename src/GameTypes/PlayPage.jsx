import React, { useState, useEffect } from 'react'
import HeaderComponent from '../Components/HeaderComponent';
import { useNavigate } from 'react-router-dom';
import Logo from '../Components/Logo';
// import { useHistory } from 'react-router-dom';
import { baseURL } from '../token';
import axios from 'axios';

function PlayPage() {
    const [commision, setCommision] = useState('');
    const navigate = useNavigate();
    // const history = useHistory();

    const navigateToComponent = (propValue) => {
        navigate('/SecondPage', { state: { propKey: propValue } });
    };

    const fetchData = async () => {
        console.log("ahdfnjm");
        try {
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const response = await axios.get(baseURL + '/user/penalties', {
                headers: headers
            });
            console.log("responseee", response);
            console.log(response?.data?.data?.id, "response");
            setCommision(response?.data?.data?.commission);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData()

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, [])

    return (
        <>
            <section id="main-bg">
                <div id="home-container" className="container mx-0">
                    <div className="row mb-5">
                        <div className="col-12 bg-orange text-center m-0">
                            Commission: {commision}% ◉ For All Games
                        </div>
                        <div className="col-12">
                            <HeaderComponent />
                            {/* <div className="col-12">
                                <div className="card container border border-danger mt-3 kycbox text-danger">

                                    <div style={{ width: '100%' }} className=" my-auto col-6">
                                        <h6 style={{ lineHeight: '1.6' }}>KYC Pending Do not share OTP with anyone. Our team does not request OTP for any task. If you provide OTP to anyone, you yourself will be held responsible 🙏 </h6>
                                    </div>


                                </div>
                            </div> */}

                        </div>
                        <div className="col-12">
                            <div className="row align-items-center my-2">
                                <div className="my-auto col-6 text-white">
                                    <h2>Games</h2>
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
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6 " style={{ cursor: 'pointer' }}>
                                    <div className="card gamecard card-body" onClick={() => navigateToComponent('quick')}>
                                        <img src="./images/classic.jpeg" alt />
                                    </div>
                                </div>
                                <div className="col-6" style={{ cursor: 'pointer' }}>
                                    <div className="card gamecard card-body" onClick={() => navigateToComponent('rich')}>
                                        <img src="./images/snakemode.jpeg" alt height="200px" />
                                        {/* <img style={{ height: "13.2em" }} src="./images/snakemode.jpeg" alt /> */}
                                    </div>
                                </div>
                                <div className="col-6" style={{ opacity: '50%', cursor: "not-allowed" }}>

                                    <div className="card gamecard card-body" >
                                        <img src="./images/WhatsApp18.jpg" alt />
                                    </div>

                                </div>
                                <div className="col-6" style={{ cursor: 'pointer' }}>

                                    <div style={{ background: 'black', opacity: '50%', cursor: "not-allowed" }} className="card gamecard card-body" >
                                        <img src="./images/WhatsApp3.jpg" alt />
                                    </div>

                                </div>
                                <div className="col-6" style={{ cursor: 'pointer' }}>

                                    <div style={{ background: 'black', opacity: '50%', cursor: "not-allowed" }} className="card gamecard card-body" >
                                        <img src="./images/WhatsApp2.jpg" alt />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row  sticky-bottom ">
                        <div className="col d-flex justify-content-end mb-2 mt-5">
                            <div style={{ cursor: 'pointer' }} href="support.html" className="d-flex justify-content-end" onClick={() => navigate('/SupportPage')}>
                                <img className="supportimg" src="./images/contact.jpg" alt />
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

            </section>

        </>
    )
}

export default PlayPage;