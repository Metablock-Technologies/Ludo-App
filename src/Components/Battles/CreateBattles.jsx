import React, { useState } from 'react'
import { baseURL } from '../../token';
import axios from 'axios';

function CreateBattles({ fetchData, battletype }) {
    const [createBattles, setCreateBattles] = useState([]);
    // const [messageError, setMessageError] = useState('');

    // console.log(createBattles);
    const handlecreate = async () => {
        try {
            let roundedAmount = createBattles;
            if (roundedAmount % 50 != 0) {
                const roundedValue = Math.round(createBattles / 50);
                roundedAmount = roundedValue * 50;
            }
            const requestbody = {
                category: battletype,
                price: roundedAmount
            }
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            // const accessToken = token;
            console.log("accesstoken", localStorage.getItem('accessToken'));
            console.log(accessToken);
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const response = await axios.post(baseURL + '/challenge', requestbody, {
                headers: headers
            });

            if (response.data) {
                fetchData()
            }
            // console.log(response);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="row">
            <div className="col-12 mb-3 d-flex justify-content-be tween text-light">
                <div className="d-flex">
                    <h6 className="mb-0"><i className="bi bi-x-circle-fill text-danger" /> Create Battles</h6>
                </div>
            </div>

            <div className="col-12 card my-1 walletcard pt-2 px-0 mx-auto text-white" >
                <div className="row">
                </div>
                <div className="card-body walletbody mt-2">
                    <div className="row">
                        <div className="col-12 my-2">
                            <input className='create-battles-input'
                                type="text"
                                onChange={(e) => setCreateBattles(e.target.value)}
                                placeholder='enter amount'
                            />
                        </div>
                    </div>
                    {/* <p>{messageError}</p> */}
                    <button className="bg-orange-create-battles-button btn " onClick={handlecreate}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateBattles
