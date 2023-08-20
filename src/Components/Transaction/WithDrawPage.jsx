import React from 'react'
import HeaderComponent from '../HeaderComponent';
import { useNavigate } from 'react-router-dom';

function WithDrawPage() {
    const navigate = useNavigate();
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
                                    <input type="text" className="details" placeholder="1234567890@paytm" />
                                </div>
                                <div className="col-12 my-1">
                                    <label htmlFor="username" className="text-left text-yellow">Re Enter UPI ID</label>
                                </div>
                                <div className="col-12 mb-4">
                                    <input type="text" className="details" placeholder="1234567890@paytm" />
                                </div>
                                <div className="col-12 my-1">
                                    <label htmlFor="username" className="text-left text-yellow">Chips</label>
                                </div>
                                <div className="col-12 mb-4">
                                    <input type="text" className="details" placeholder="Chips" />
                                </div>
                                <div className="col-12">
                                    <p className="lh-md text-center text-light">
                                        By Continuing You agree to out <a href="legalterms.html"> Legal Terms</a> and you are 18 years of older.
                                    </p>
                                </div>
                                <div className="col-12">
                                    <a href="#">
                                        <button className="bg-orange btn">Submit</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default WithDrawPage;