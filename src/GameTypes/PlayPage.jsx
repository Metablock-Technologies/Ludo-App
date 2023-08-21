import React, { useState, useEffect } from 'react'
import HeaderComponent from '../Components/HeaderComponent';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

function PlayPage() {
    const navigate = useNavigate();
    // const history = useHistory();

    const navigateToComponent = (propValue) => {
        navigate('/SecondPage', { state: { propKey: propValue } });
    };

    return (
        <>
            <section id="main-bg">
                <div id="home-container" className="container mx-0">
                    <div className="row mb-5">
                        <div className="col-12 bg-orange text-center m-0">
                            Commission: 5% ◉ Referral: 2% For All Games
                        </div>
                        <div className="col-12">
                            <HeaderComponent />


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
                                        <img src="./images/gameimage.jpg" alt />
                                    </div>
                                </div>
                                <div className="col-6" style={{ cursor: 'pointer' }}>
                                    <div className="card gamecard card-body" onClick={() => navigateToComponent('rich')}>
                                        <img src="./images/gameimage.jpg" alt />
                                    </div>
                                </div>
                                <div className="col-6" style={{ cursor: 'pointer' }}>

                                    <div className="card gamecard card-body" onClick={() => { navigate('/FirstGame') }}>
                                        <img src="./images/gameimage.jpg" alt />
                                    </div>

                                </div>
                                <div className="col-6" style={{ cursor: 'pointer' }}>

                                    <div className="card gamecard card-body" onClick={() => navigate('/SecondPage')}>
                                        <img src="./images/gameimage.jpg" alt />
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
            </section>

        </>
    )
}

export default PlayPage;