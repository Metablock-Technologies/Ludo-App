import React, { useEffect, useState } from 'react'
import HeaderComponent from './HeaderComponent';
import { baseURL, token } from '../token';
import axios from 'axios';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

// import "./bootstrap.css";
// import "./style.css";

function ProfilePage() {
    const [gameplayed, setGamesplayed] = useState('');
    const [chipswon, setChipsWon] = useState('');
    const [referral, setReferral] = useState('');
    const [penalty, setPenalty] = useState('');
    const [responsedetails, setResponsedetails] = useState({
        name: '',
        phone: ''
    });
    const [name, setName] = useState('');
    const [enable, setEnable] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const fetchdata = async () => {
        setMessage('')
        try {
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const responsedetail = await axios.get(baseURL + '/user', {
                headers: headers,
            });

            const responseData = responsedetail.data.data;

            // Update the state with the name and phone
            setResponsedetails({
                name: responseData.name,
                phone: responseData.phone
            });

            console.log("response", responsedetail);
            setName(responseData.name);
            console.log("name:", responseData.name);
            console.log("Phone:", responseData.phone);

            const response = await axios.get(baseURL + '/user/wallet', {
                headers: headers,
            });
            console.log(response.data.data);
            const responsedata = response.data.data;
            // setGamesplayed(responsedata.)
            setChipsWon(responsedata.won);
            setPenalty(responsedata.penalty);
            setReferral(responsedata.referral);

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchdata();
    }, [])
    const handleEdit = async () => {
        setEnable(false)
        // fetchdata();
    }
    const handleCancel = async () => {
        setEnable(true);
        fetchdata();
    }
    const handleSave = async () => {
        setMessage('');
        try {
            const reqbody = {
                name: name
            }
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const responsedetail = await axios.put(baseURL + '/user/profile', reqbody, {
                headers: headers,
            });
            console.log(responsedetail)
            if (responsedetail) {
                fetchdata();
                setEnable(true);
                setMessage("edited successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleLogout = async () => {
        // logout();
        localStorage.removeItem('access_token');
        navigate('/LoginPage')
    }
    return (
        <>
            <section id="main-bg">
                <div id="profile-container" className="container mx-0">
                    <div className="row">
                        <div className="col-12">
                            <HeaderComponent />
                        </div>
                        <div className="col-12 card mt-3 walletcard pt-2 px-0 mx-auto text-white">
                            <div className="text-center">Profile</div>
                            <div className="card-body walletbody mt-2">
                                <div className="row p-1">
                                    <div className="col-12 d-flex justify-content-center">
                                        <div id="profile-img-bg" className="rounded-circle">
                                            <img src="./images/img.jpg" className="rounded-circle mw-100" alt />
                                        </div>
                                    </div>
                                    <div className="col-12 my-2">
                                        <label htmlFor="name" className="text-left text-yellow">Name</label>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <input style={{ textTransform: "capitalize" }} type="text" className="col-9 text-left d-flex details-1 " defaultValue="name" value={name}
                                            onChange={(e) => { setName(e.target.value) }}
                                            disabled={enable} />
                                        <a href="#" className="col-3 mx-1 d-flex justify-content-end text-decoration-none">
                                            {enable ?
                                                (<button className="bg-orange btn" onClick={handleEdit}>Edit</button>) :
                                                (<>
                                                    <div className='d-flex justify-content-center gap-2' style={{}}>

                                                        <button className="bg-orange btn " onClick={handleCancel}>Cancel</button>
                                                        <button className="bg-orange btn" onClick={handleSave}>Save</button>
                                                    </div>
                                                </>
                                                )}
                                        </a>
                                        <p>{message}</p>
                                    </div>
                                    <div className="col-12 my-2">
                                        <label htmlFor="mobile number" className="text-left text-yellow">Mobile Number</label>
                                    </div>
                                    <div className="col-12 my-1">
                                        <input type="number" className="col-12 text-left d-flex details" value={responsedetails?.phone} disabled />
                                    </div>

                                    <div className="col-12" style={{ display: 'none' }}>
                                        <div className="card container border border-success mt-2 kycbox text-success">
                                            <div className="row align-items-center my-2">
                                                <div className=" my-auto col-6">
                                                    <p className="mb-0">KYC status </p>
                                                    <div className="d-flex">
                                                        <h6><strong>Verified</strong></h6>
                                                        <span className="material-symbols-outlined">check_circle</span>
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex justify-content-end">
                                                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-success float-right">View Kyc Details</button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Modal */}
                                        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">KYC Details</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h6><strong>Name</strong></h6>
                                                            </div>
                                                            <div className="col-6">
                                                                <h6 className="text-end">Dheeraj Meena</h6>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h6><strong>Dob</strong></h6>
                                                            </div>
                                                            <div className="col-6">
                                                                <h6 className="text-end">30-07-0222</h6>
                                                            </div>
                                                        </div><hr />
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h6><strong>Gender</strong></h6>
                                                            </div>
                                                            <div className="col-6">
                                                                <h6 className="text-end">M</h6>
                                                            </div>
                                                        </div><hr />
                                                        <div className="row">
                                                            <div className="col-3">
                                                                <h6><strong>Address</strong></h6>
                                                            </div>
                                                            <div className="col-9">
                                                                <h6 className="text-end">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati, laboriosam.</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 card mt-3 walletcard pt-2 px-0 mx-auto text-white">
                            <div className="text-center">Metrics</div>
                            <div className="card-body walletbody mt-2">
                                <div className="col-12">
                                    <div className="row mt-2 p-1">
                                        <div className="col-6 p-1">
                                            <div className="card profile-category text-white text-center px-0">
                                                <p className="mt-2">Games Played</p>
                                                <div className="card-body profilecard text-center align-items-center justify-content-center">
                                                    <h5 className>0.00</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 p-1">
                                            <div className="card profile-category text-white text-center px-0">
                                                <p className="mt-2">Chips Won</p>
                                                <div className="card-body profilecard text-center align-items-center justify-content-center">
                                                    <h5 className>{chipswon}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-6 p-1">
                                            <div className="card profile-category text-white text-center px-0">
                                                <p className="mt-2">Refferal Earning</p>
                                                <div className="card-body profilecard text-center align-items-center justify-content-center">
                                                    <h5 className>{referral}</h5>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="col-6 p-1">
                                            <div className="card profile-category text-white text-center px-0">
                                                <p className="mt-2">Penalty</p>
                                                <div className="card-body profilecard text-center align-items-center justify-content-center">
                                                    <h5 className>{penalty}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="text-center my-2 row mt-2 mx-auto text-decoration-none" onClick={handleLogout}>
                            <button className="col-12 btn rounded btn-danger px-2">Logout</button>
                        </a>
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

export default ProfilePage;