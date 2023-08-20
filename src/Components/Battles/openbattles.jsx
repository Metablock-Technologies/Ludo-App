import React from 'react'
import { useNavigate } from 'react-router-dom';
import { baseURL, token } from '../../token';
import axios from 'axios';

const Openbattles = ({ openBattles, fetchData }) => {
    const navigate = useNavigate();

    const handleplaybtn = async (id) => {
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
                navigate('EnterFirstGame')
            }
        } catch (error) {
            console.error(error);
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
                                        <button className="btn bg-orange" onClick={() => handleplaybtn(battle.id)} >Play</button>
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
