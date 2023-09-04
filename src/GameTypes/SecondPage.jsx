import React, { useState, useEffect } from 'react'
import HeaderComponent from '../Components/HeaderComponent';
import { useNavigate, useLocation } from 'react-router-dom';
// import token from '../token';
import { baseURL, token } from '../token';
import axios from 'axios';
import "../styles/bootstrap.css"
import Openbattles from '../Components/Battles/openbattles';
import Runningbattles from '../Components/Battles/runningbattles';
import CreateBattles from '../Components/Battles/CreateBattles';


function SecondPage() {
    const [inputAmount, setInputAmount] = useState(0)
    const [openBattles, setOpenBattles] = useState([])
    const [runningBattles, setRunningBattles] = useState([])
    const navigate = useNavigate();
    // const [sliderValue, setSliderValue] = useState(500)
    const location = useLocation();
    const propValue = location.state.propKey;
    // console.log(propValue);
    // const handleSliderChange = (event) => {
    //     const newValue = parseInt(event.target.value);
    //     setSliderValue(newValue);
    //     console.log(sliderValue);
    // };
    const handleInputamount = (e) => {
        setInputAmount(e.target.value)
    }

    const handleSet = () => {
        fetchData()
    }

    const fetchData = async () => {
        try {
            let roundedAmount = inputAmount;
            if (roundedAmount % 50 != 0) {
                const roundedValue = Math.round(inputAmount / 50);
                roundedAmount = roundedValue * 50;
            }
            let queryParams;
            if (inputAmount != 0) {
                queryParams = {
                    limit: 10,
                    offset: 0,
                    price: roundedAmount
                };
            }
            else {
                queryParams = {
                    limit: 10,
                    offset: 0
                };
            }
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            // const accessToken = token;
            // console.log(accessToken);
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const response = await axios.get(baseURL + '/challenge', {
                params: queryParams,
                headers: headers
            });

            // console.log(response);
            const responsedata = response.data.data.rows;
            console.log("response", responsedata);
            const filteredCreated = responsedata.filter(battle => battle.category === propValue && battle.status === 'created');
            // console.log(filteredCreated);
            setOpenBattles(filteredCreated)
            // console.log(responsedata);

            const filteredRunning = responsedata.filter(battle => battle.category === propValue && battle.status === 'running');
            setRunningBattles(filteredRunning);
            // console.log(filteredRunning);

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData()
    }, [])
    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         fetchData()
    //     }, 300);
    //     return () => clearTimeout(timeoutId);
    // }, [inputAmount, 300]);

    return (
        <>
            <section id="main-bg">
                <div id="challengeset-container" className="container mx-0">
                    <div className="row">
                        <div className="col-12">
                            <HeaderComponent />
                        </div>
                        <div className="col-12 my-3">
                            <button type="button" className="btn btn-primary d-flex " onClick={() => navigate('/PlayPage')}><span className="material-symbols-outlined mb-0" >arrow_back</span>Back</button>
                        </div>
                        <div className="col-12 ">
                            <label htmlFor className="text-left text-yellow">Enter Amount</label>
                        </div>
                        <div className="col-12 mb-4 d-flex justify-content-center">
                            <input id="amount-input" className="text-yellow" type="text" onChange={handleInputamount} />
                            <button id="amount-btn" className="text-light" onClick={handleSet}>Set</button>
                        </div>
                        {/* <div className="col-12">
                            <div className="slidecontainer">
                                <input type="range" min={500} max={20000} defaultValue={500} className="slider" id="myRange" onChange={handleSliderChange} />
                                <p className="text-light"><span id="demo">{sliderValue}</span></p>
                            </div>
                        </div> */}
                        <div className="col-12 my-2 bg-purple2 py-3">
                            <CreateBattles fetchData={fetchData} battletype={propValue} />
                        </div>
                        <div className="col-12 my-2 bg-purple2 py-3">
                            <Openbattles openBattles={openBattles} fetchData={fetchData} />
                        </div>
                        <div className="col-12 my-2 bg-purple2 py-3">
                            <Runningbattles runningBattles={runningBattles} />
                        </div>
                    </div>
                </div >
                <div className="" style={{ position: 'fixed', top: '50%', left: 'calc(100% - 40%)', transform: `translate(-50%,-50%)`, zIndex: 5 }}>
                    <div className="rcBanner flex-center">
                        <picture className="rcBanner-img-containerr">
                            <img style={{ marginLeft: '10px', width: "80% ", borderRadius: '50%' }} src="./images/Ludolkjpg.jpg" alt />
                        </picture>
                        <div className="rcBanner-text">Play Ludo &amp; <span className="rcBanner-text-bold">Win Real Cash!</span></div>
                        <div className="rcBanner-footer">For best experience, open&nbsp;<a href="/">LudoPlayers.com</a>&nbsp;on&nbsp;&nbsp;chrome </div>
                    </div>

                </div>
            </section >

        </>
    )
}

export default SecondPage;