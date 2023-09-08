import React from 'react'
import HeaderComponent from '../HeaderComponent';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { baseURL } from '../../token';
import axios from 'axios';

const MyBattles = ({ runningBattles, judgement }) => {

    const navigate = useNavigate();
    const [id, setId] = useState('');

    const handleOpen = (chid, price, roomcode, id) => {
        console.log("heyy|", id, price, roomcode);
        <HeaderComponent />
        navigate('/EnterFirstGame', { state: { challengeruserid: chid, priceplay: price, roomcode: roomcode, type: "runningbattle", id: id } });
    }


    const fetchdata = async () => {
        try {

            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await axios.get(baseURL + '/user', {
                headers: headers
            })
            console.log(response.data);
            setId(response?.data?.data?.id);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchdata();

        // Set up a polling interval (e.g., every 5 seconds)
        // const intervalId = setInterval(fetchdata, 5000);

        // // Clean up the interval on component unmount
        // return () => clearInterval(intervalId);
    }, [])

    const challenges = [...runningBattles, ...judgement]

    // Filter challenges based on user participation and status
    const filteredChallenges = challenges.filter((battle) => {
        console.log(battle?.ChallengerUser?.id, id, battle?.AcceptorUser?.id);
        const isChallenger = battle?.ChallengerUser?.id === id;
        const isAcceptor = battle?.AcceptorUser?.id === id;
        const isJudgment = battle.status === 'judgement';
        const isRunning = battle.status === 'running';
        const challengerResponded = battle.result.challenger_responded;
        const acceptorResponded = battle.result.acceptor_responded;

        let user = '';

        if (isChallenger && challengerResponded) {
            user = 'challenger';
        } else if (isAcceptor && acceptorResponded) {
            user = 'acceptor';
        }

        console.log(isChallenger, ' ', isAcceptor, ' ', isJudgment, ' ', isRunning, ' ', challengerResponded, acceptorResponded);

        // Additional condition: Remove battles if the user has already responded
        const userHasResponded =
            (user === 'challenger' && isChallenger && challengerResponded) ||
            (user === 'acceptor' && isAcceptor && acceptorResponded);

        // Additional condition: Remove battles where the acceptor has responded and status is "judgement"
        const acceptorRespondedInJudgment = isAcceptor && acceptorResponded && isJudgment;
        const challengerRespondedInJudgment = isChallenger && challengerResponded && isJudgment;

        let isuser = false;
        if (isChallenger || isAcceptor) {
            isuser = true;
        }

        return (
            isuser &&
            !userHasResponded &&
            !acceptorRespondedInJudgment &&
            !challengerRespondedInJudgment &&
            (
                (isChallenger && !challengerResponded) ||
                (isAcceptor && !acceptorResponded) ||
                (isJudgment && (!challengerResponded || !acceptorResponded)) ||
                (isRunning && (!challengerResponded || !acceptorResponded))
            )
        );
    });

    return (
        <div className="row">
            <div className="col-12 mb-3 d-flex justify-content-between text-light">
                <div className="d-flex">
                    <h6 className="mb-0"><i className="bi bi-x-circle-fill text-danger" /> My Battles</h6>
                </div>
            </div>
            <div className='scroll-container'>
                {filteredChallenges.map((battle, index) => (
                    <div className="col-12 card my-1 walletcard pt-2 px-0 mx-auto text-white" key={index}>
                        <div className="row">
                            <div className="col">
                                <h6 className="mx-2 mb-0 d-flex">PLAYING FOR&nbsp;<span className="material-symbols-outlined text-success">payments</span> {battle.price}</h6>
                            </div>
                            <div className="col d-flex justify-content-end me-2">
                                <p className="mb-0">Prize&nbsp;</p>
                                <h6 className="mb-0 d-flex"><span className="material-symbols-outlined text-success">payments</span> {(battle.price * 2) - ((5 * battle.price * 2) / 100)}</h6>
                            </div>
                        </div>
                        <div className="card-body walletbody mt-2">
                            <div className="row">
                                <div className="col-4">
                                    <p className="text-light mb-0">{battle.ChallengerUser.username}</p>
                                </div>
                                <div className="col-4 d-flex justify-content-center">
                                    <img src="./images/versus.png" className="rounded-circle mx-1" style={{ width: '25%', height: 25 }} alt="" />
                                </div>
                                <div className="col-4 d-flex justify-content-end">
                                    <p className="text-light text-end mb-0">{battle.AcceptorUser.username}</p>
                                </div>
                                <div>
                                    <button className="btn bg-orange" style={{ marginTop: '1em', marginBottom: '1em' }} onClick={() => { handleOpen(battle.challenger, battle.price, battle.roomcode, battle.id) }}>Open</button>
                                </div>
                                {/* <button className="btn bg-orange" onClick={() => handleplaybtn(battle.id, battle.price, battle.roomcode, battle.challenger)} >Play</button> */}
                                {/* <button className="btn bg-orange" onClick={handlePlaybtn}>Play</button> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBattles
