import React, { useContext } from 'react';
import "../../styles/bootstrap.css"
import "../../styles/style.css"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';


function UserSection() {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>

            <section id="main-bg">
                <div id="navbar-container" className="container mx-0">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-end pe-0" id="nav-head">
                            <div id="profile-img-bg" className="rounded-circle">
                                <img src="./images/img.jpg" className="rounded-circle" style={{ width: '100%' }} alt />
                            </div>
                            <div id="profile-info-bg">
                                <h5 className=" text-light pt-2 mb-0 ms-5">{user.name}</h5>
                                <p className="text-light ms-5 mb-0">{user.memberType}</p>
                                <h6 className="text-light ms-5 rounded-pill " id="profile-id">{user.userID}</h6>
                            </div>
                        </div>
     
                        <div onClick={() => navigate('/ProfilePage')} className="col-12 d-flex justify-content-between text-light p-2 nav-item ">
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined me-2">account_circle</span>
                                <h4 className="mb-0">Profile</h4>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined">keyboard_arrow_right</span>
                            </div>
                        </div>
                        <div onClick={() => navigate('/PlayPage')} className="col-12 d-flex justify-content-between text-light p-2 nav-item ">
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined me-2">casino</span>
                                <h4 className="mb-0">Play</h4>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined">keyboard_arrow_right</span>
                            </div>
                        </div>


                        <div onClick={() => navigate('/WalletPage')} className="col-12 d-flex justify-content-between text-light p-2 nav-item ">
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined me-2">wallet</span>
                                <h4 className="mb-0">Wallet</h4>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined">keyboard_arrow_right</span>
                            </div>
                        </div>


                        <div onClick={() => navigate('/HistoryPage')} className="col-12 d-flex justify-content-between text-light p-2 nav-item ">
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined me-2">history</span>
                                <h4 className="mb-0">History</h4>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined">keyboard_arrow_right</span>
                            </div>
                        </div>


                       

                        {/* 
                        <div onClick={() => navigate('/ReferandEarn')} className="col-12 d-flex justify-content-between text-light p-2 nav-item ">
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined me-2">payments</span>
                                <h4 className="mb-0">Refer and Earn</h4>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined">keyboard_arrow_right</span>
                            </div>
                        </div> */}


                        {/* <div onClick={() => { navigate('/SpinandWin') }} className="col-12 d-flex justify-content-between text-light p-2 nav-item ">
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined me-2">emoji_events</span>
                                <h4 className="mb-0">Spin and Win</h4>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined">keyboard_arrow_right</span>
                            </div>
                        </div> */}


                        <div onClick={() => navigate('/LanguagesPage')} className="col-12 d-flex justify-content-between text-light p-2 nav-item ">
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined me-2">translate</span>
                                <h4 className="mb-0">Language</h4>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined">keyboard_arrow_right</span>
                            </div>
                        </div>


                        <div onClick={() => navigate('/SupportPage')} className="col-12 d-flex justify-content-between text-light p-2 nav-item ">
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined me-2">support_agent</span>
                                <h4 className="mb-0">Support</h4>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined">keyboard_arrow_right</span>
                            </div>
                        </div>


                        <div onClick={() => navigate('/LegalPage')} className="col-12 d-flex justify-content-between text-light p-2 nav-item ">
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined me-2">gavel</span>
                                <h4 className="mb-0">Legal Terms</h4>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="material-symbols-outlined">keyboard_arrow_right</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="" style={{ position: 'fixed', top: '50%', left: 'calc(100% - 40%)', transform: `translate(-50%,-50%)`, zIndex: 5 }}>
                    <div className="rcBanner flex-center">
                        <picture className="rcBanner-img-containerr">
                            <img style={{ marginLeft: '10px', width: "80% ", borderRadius: '50%' }} src="./images/Ludolkjpg.jpg" alt />
                        </picture>
                        <div className="rcBanner-text">Play Ludo &amp; <span className="rcBanner-text-bold">Win Real Cash!</span></div>
                        <div className="rcBanner-footer">For best experience, open&nbsp;<a href="/">LudoPlayers.com</a>&nbsp;on&nbsp;&nbsp;chrome </div>
                    </div>

                </div>
            </section>



        </>

    )
}

export default UserSection;