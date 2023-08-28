import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseURL, token } from '../../token';
import axios from 'axios';
import HeaderComponent from '../HeaderComponent';

const Openbattles = ({ openBattles, fetchData }) => {
    const navigate = useNavigate();
    const [messageError, setMessageError] = useState('');

    const handleplaybtn = async (id, price, roomcode, challengeid) => {
        setMessageError('');
        try {
            // navigate('/EnterFirstGame')
            console.log(id);
            const requestbody = {
                challengeId: id
            }
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            // console.log(accessToken);
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const response = await axios.post(baseURL + '/challenge/accept', requestbody, {
                headers: headers
            });
            fetchData();
            console.log(response);
            if (response) {
                <HeaderComponent />
                navigate('/EnterFirstGame', { state: { challengeruserid: challengeid, priceplay: price, roomcode: roomcode } });
            }
        } catch (error) {
            setMessageError(error.response.data.message);
            console.error("error:--", error.response.data.message);
        }
    }
    const handlecancelbtn = async (id) => {
        setMessageError('');
        try {
            console.log(id);
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            // console.log(accessToken);
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            console.log(headers);
            const response = await axios.delete(`${baseURL}/challenge/${id}`, {
                headers: headers
            });
            fetchData();
            console.log(response);
            // if (response) {
            //     navigate('EnterFirstGame')
            // }
        } catch (error) {
            setMessageError(error.response.data.message);
            console.error("error:--", error);
        }
    }

    return (
        <div className="row">
            <div className="col-12  mb-3 d-flex justify-content-between text-light">
                <div className="d-flex">
                    <h6 className="mb-0"><i className="bi bi-x-circle-fill text-danger" /> Open Battles</h6>
                </div>
                <div className="d-flex">
                    <h6 className="mb-0">Rules <i className="bi bi-info-circle" /></h6>
                </div>
            </div>
            <div className='scroll-container'>
                <p style={{ color: 'white' }}>{messageError}</p>
                {openBattles.map((battle, index) => (
                    <div className="col-12 card my-1 walletcard pt-2 px-0 mx-auto text-white" key={index}>
                        <div className="row">
                            <div className="col">
                                <h6 className="mx-2">CHALLENGE FROM <span className="text-danger">{battle.ChallengerUser.username}</span></h6>
                            </div>
                        </div>
                        <div className="card-body walletbody mt-2">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-between">
                                    <div className="d-flex">
                                        <div className="me-2">
                                            <p className="mb-0" id="win-time">Entry Fee</p>
                                            <h6 className="mb-0 d-flex"><span className="material-symbols-outlined text-success">payments</span> {battle.price}</h6>
                                        </div>
                                        <div className="ms-2">
                                            <p className="mb-0" id="win-time">Prize</p>
                                            <h6 className="mb-0 d-flex"><span className="material-symbols-outlined text-success">payments</span> {battle.price}</h6>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn bg-orange" onClick={() => handleplaybtn(battle.id, battle.price, battle.roomcode, battle.challenger)} >Play</button>
                                        {/* <button className="btn bg-orange" onClick={handlePlaybtn}>Play</button> */}
                                    </div>
                                    <div>
                                        <button className="btn bg-orange" onClick={() => handlecancelbtn(battle.id)} >Cancel</button>
                                        {/* <button className="btn bg-orange" onClick={handlePlaybtn}>Play</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Openbattles
