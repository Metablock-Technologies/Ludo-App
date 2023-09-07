import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../token';
import { HeadsetSharp } from '@mui/icons-material';

const ScreenshotUpload = ({ amount }) => {
    const [screenshot, setScreenshot] = useState(null);
    const [showRequestButton, setShowRequestButton] = useState(false);
    const [messageError, setMessageError] = useState('');
    // const [imageUrl, setImageUrl] = useState(null); // State to hold the image URL

    const handleScreenshotChange = (e) => {
        setMessageError('');
        const file = e.target.files[0];
        console.log(file.name, amount);
        setScreenshot(file);
        setShowRequestButton(true); // Show the request button after uploading
        // setImageUrl(true);
    };

    const handleRequestClick = async () => {
        setMessageError('');
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
                responsePromise.then(response => {
                    console.log('API response data:', response.data.data);
                    setMessageError("sent request successfully");
                });
            } catch (error) {
                console.error(error);
                setMessageError(error?.response?.data?.message);
            }
        }
    };
    // useEffect(() => {
    //     const fetchImage = async () => {
    //         try {
    //             const accessToken = localStorage.getItem('access_token');
    //             const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

    //             const key = 'file_1692632288642.png';
    //             const response = await axios.get(`${baseURL}/image/${key}`, {
    //                 headers: headers,
    //                 responseType: 'arraybuffer',
    //             });
    //             console.log("response", response.data);

    //             // const imageBlob = new Blob([response.data]);
    //             // console.log(imageBlob);
    //             // const imageUrl = URL.createObjectURL(imageBlob);

    //             // console.log("imageurl", imageUrl);
    //             setImageUrl(response.data); // Update the state with the image URL
    //             console.log("image", imageUrl);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchImage();
    // }, [])

    return (
        <div>
            {/* <input style={{ margin: "auto", display: "flex", justifyContent: "center", marginTop: "20px" }} type="file" accept="image/*" onChange={handleScreenshotChange} /> */}
            <div class="input-group mb-3 mt-3" onChange={handleScreenshotChange} >
                <input type="file" class="form-control" id="inputGroupFile02" accept="image/*" />
            </div>
            {showRequestButton && <button onClick={handleRequestClick} className='btn bg-orange'>Send Request</button>}
            <p>{messageError}</p>
            {/* Display the image */}
            {/* {imageUrl && <img src={imageUrl} alt="Uploaded Screenshot" />} */}
        </div>
    );
};

export default ScreenshotUpload;
