import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseURL, token } from '../../token';
import axios from 'axios';
import HeaderComponent from '../HeaderComponent';
// import Logo from '../styles/logo.jpg'

const Openbattles = ({ openBattles, fetchData }) => {
    const navigate = useNavigate();
    const [messageError, setMessageError] = useState('');
    const [commission, setCommision] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleplaybtn = async (id, price, roomcode, challengeid) => {
        setMessageError('');
        try {
            // navigate('/EnterFirstGame')
            setIsLoading(true);
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
            setMessageError('')
            console.log(response);
            setIsLoading(false);
            if (response) {
                <HeaderComponent />
                navigate('/EnterFirstGame', { state: { challengeruserid: challengeid, priceplay: price, roomcode: roomcode, type: "openbattle" } });
            }
        } catch (error) {
            setMessageError(error?.response?.data?.message);
            console.error("error:--", error?.response?.data?.message);
            setIsLoading(false);
        }
    }
    const handlecancelbtn = async (id) => {
        setMessageError('');
        try {
            console.log(id);
            setIsLoading(true);
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            // console.log(accessToken);
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            console.log(headers);
            const response = await axios.delete(`${baseURL}/challenge/${id}`, {
                headers: headers
            });
            fetchData();
            console.log(response);
            setIsLoading(false);
            // if (response) {
            //     navigate('EnterFirstGame')
            // }
        } catch (error) {
            setMessageError(error?.response?.data?.message);
            console.error("error:--", error);
            setIsLoading(false);
        }
    }

    const fetchpenalty = async () => {
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
        fetchpenalty();
    }, [])
    return (
        <div className="row">
            <div className="col-12  mb-3 d-flex justify-content-between text-light">
                <div className="d-flex">
                    <h6 className="mb-0"><i className="bi bi-x-circle-fill text-danger" /> Open Battles</h6>
                </div>
                <p style={{ color: 'red' }}>{messageError}</p>

                <div className="d-flex">
                    <h6 className="mb-0">Rules <i className="bi bi-info-circle" /></h6>
                </div>
            </div>
            <div className='scroll-container'>
                {/* <p style={{ color: 'white' }}>{messageError}</p> */}
                {openBattles?.map((battle, index) => (
                    <div className="col-12 card my-1 walletcard pt-2 px-0 mx-auto text-white" key={index}>
                        <div className="row">
                            <div className="col d-flex justify-content-between " >
                                <h6 className="mx-2">CHALLENGE FROM <span style={{ textTransform: "capitalize" }} className="text-danger">{battle.ChallengerUser.username}</span></h6>
                                {/* <h6 className="mx-2">{battle.roomcode}</h6> */}
                            </div>
                        </div>
                        <div className="card-body walletbody mt-2">
                            <div className="row">
                                {isLoading && <p>Loading...</p>}
                                <div className="col-12 d-flex justify-content-between">
                                    <div className="d-flex">
                                        <div className="me-2">
                                            <p className="mb-0" id="win-time">Entry Fee</p>
                                            <h6 className="mb-0 d-flex"><span className="material-symbols-outlined text-success">payments</span> {battle.price}</h6>
                                        </div>
                                        <div className="ms-2">
                                            <p className="mb-0" id="win-time">Prize</p>
                                            <h6 className="mb-0 d-flex"><span className="material-symbols-outlined text-success">payments</span> {(battle.price * 2) - ((commission * battle.price * 2) / 100)}</h6>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn bg-orange" onClick={() => handleplaybtn(battle.id, battle.price, battle.roomcode, battle.challenger)} disabled={isLoading} >Play</button>
                                        {/* <button className="btn bg-orange" onClick={handlePlaybtn}>Play</button> */}
                                    </div>
                                    <div>
                                        <button className="btn bg-orange" disabled={isLoading} onClick={() => handlecancelbtn(battle.id)} >Cancel</button>
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
