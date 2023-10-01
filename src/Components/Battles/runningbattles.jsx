import React, { useState, useEffect } from 'react'
import HeaderComponent from '../HeaderComponent';
import { useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../token';

function getRandomUsername() {
    const usernameLength = Math.floor(Math.random() * 3) + 8; // Random username length between 8 and 10 characters
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let username = '';
    for (let i = 0; i < usernameLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        username += charset[randomIndex];
    }
    return username;
}

function getRandomPrice() {
    const minPrice = 2; // Minimum multiplier greater than 1
    const maxPrice = 600; // Maximum multiplier
    const randomMultiplier = Math.floor(Math.random() * (maxPrice / minPrice + 1)); // Random multiplier
    const price = minPrice * randomMultiplier * 50; // Ensure it's a multiple of 50 and greater than 50
    return price;
}

function generateRandomBattles(numBattles) {
    const battles = [];
    for (let i = 0; i < numBattles; i++) {
        const battle = {
            price: getRandomPrice(),
            ChallengerUser: { username: getRandomUsername() },
            AcceptorUser: { username: getRandomUsername() },
        };
        battles.push(battle);
    }
    return battles;
}


const Runningbattles = ({ runningBattles }) => {
    const [fakebattles, setFakebattles] = useState([]);
    const navigate = useNavigate();
    const [commission, setCommission] = useState(0);

    const handleOpen = (chid, price, roomcode, id) => {
        console.log("heyy|", id, price, roomcode);
        <HeaderComponent />
        navigate('/EnterFirstGame', { state: { challengeruserid: chid, priceplay: price, roomcode: roomcode, type: "runningbattle", id: id } });
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
            setCommission(response?.data?.data?.commission);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchpenalty();
        const intervalId = setInterval(() => {
            const newBattles = generateRandomBattles(30);   //30 battles
            setFakebattles(newBattles);
        }, 5000);
        const initialBattles = generateRandomBattles(30);
        setFakebattles(initialBattles);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="row">
            <div className="col-12 mb-3 d-flex justify-content-between text-light">
                <div className="d-flex">
                    <h6 className="mb-0"><i className="bi bi-x-circle-fill text-danger" /> Running Battles</h6>
                </div>
            </div>
            <div className='scroll-container'>
                {runningBattles.map((battle, index) => (
                    <div className="col-12 card my-1 walletcard pt-2 px-0 mx-auto text-white" key={index}>
                        <div className="row">
                            <div className="col">
                                <h6 className="mx-2 mb-0 d-flex">PLAYING FOR&nbsp;<span className="material-symbols-outlined text-success">payments</span> {battle.price}</h6>
                            </div>
                            <div className="col d-flex justify-content-end me-2">
                                <p className="mb-0">Prize&nbsp;</p>
                                <h6 className="mb-0 d-flex"><span className="material-symbols-outlined text-success">payments</span> {(battle.price * 2) - ((commission * battle.price * 2) / 100)}</h6>
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
                                {/* <div>
                                    <button className="btn bg-orange" style={{ marginTop: '1em', marginBottom: '1em' }} onClick={() => { handleOpen(battle.challenger, battle.price, battle.roomcode, battle.id) }}>Open</button>
                                </div> */}
                                {/* <button className="btn bg-orange" onClick={() => handleplaybtn(battle.id, battle.price, battle.roomcode, battle.challenger)} >Play</button> */}
                                {/* <button className="btn bg-orange" onClick={handlePlaybtn}>Play</button> */}
                            </div>
                        </div>
                    </div>
                ))}


                {fakebattles.map((battle, index) => (
                    // Your JSX code for rendering each battle here
                    <div className="col-12 card my-1 walletcard pt-2 px-0 mx-auto text-white" key={index}>
                        <div className="row">
                            <div className="col">
                                <h6 className="mx-2 mb-0 d-flex">PLAYING FOR&nbsp;<span className="material-symbols-outlined text-success">payments</span> {battle.price}</h6>
                            </div>
                            <div className="col d-flex justify-content-end me-2">
                                <p className="mb-0">Prize&nbsp;</p>
                                <h6 className="mb-0 d-flex"><span className="material-symbols-outlined text-success">payments</span> {(battle.price * 2) - ((commission * battle.price * 2) / 100)}</h6>
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
                                {/* <div>
                                    <button className="btn bg-orange" style={{ marginTop: '1em', marginBottom: '1em' }} onClick={() => { handleOpen(battle.challenger, battle.price, battle.roomcode, battle.id) }}>Open</button>
                                </div> */}
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

export default Runningbattles


