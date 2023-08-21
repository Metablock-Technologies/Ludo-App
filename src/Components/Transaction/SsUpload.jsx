import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../token';
import { HeadsetSharp } from '@mui/icons-material';

const ScreenshotUpload = ({ amount }) => {
    const [screenshot, setScreenshot] = useState(null);
    const [showRequestButton, setShowRequestButton] = useState(false);

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        console.log(file.name, amount);
        setScreenshot(file);
        setShowRequestButton(true); // Show the request button after uploading
    };

    const handleRequestClick = async () => {
        if (screenshot && amount > 0) {
            try {
                const formData = new FormData();
                formData.append('file', screenshot);
                formData.append('amount', amount);

                const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
                // const accessToken = token;
                // console.log(accessToken);
                const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

                // Make API request using axios
                const responsePromise = axios.post(baseURL + '/user/wallet/moneyrequest', formData, {
                    headers: headers
                })
                // .then((response) => {
                //     // Handle success
                //     console.log('API request successful:', response);
                // })
                // .catch((error) => {
                //     // Handle error
                //     console.error('API request error:', error);
                // });
                responsePromise.then(response => {
                    console.log('API response data:', response.data.data);
                });


            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleScreenshotChange} />
            {/* <button>Upload Screenshot</button> */}
            {showRequestButton && <button onClick={handleRequestClick}>Send Request</button>}
        </div>
    );
};

export default ScreenshotUpload;
