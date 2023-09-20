import React, { useEffect, useState } from 'react';
import HeaderComponent from './HeaderComponent';
import { baseURL, token } from '../token';
import axios from 'axios';
// import Logo from '../styles/logo.jpg'
import Logo from './Logo';
import { Button, TablePagination, TextField } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

function HistoryPage() {
    const [selectedType, setSelectedType] = useState('classic');
    const [wallettransaction, setWalletTransaction] = useState([]);
    const [cointransaction, setCoinTransaction] = useState([]);
    const [accessUserId, setAccessUserID] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusdata, setStatusData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [amount, setAmount] = useState("");
    const [challenges, setChallenges] = useState([]);

    const itemsPerPage = 5; // Updated to display 5 items per page initially
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const fetchtransaction = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const response = await axios.get(baseURL + '/user/wallet', {
                headers: headers,
            });
            console.log(response.data);
            setAmount(response.data.data.amount);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchdata = async (transactiontype) => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const responsedetails = await axios.get(baseURL + '/user', {
                headers: headers,
            });
            setAccessUserID(responsedetails.data.data.id);

            const response = await axios.get(baseURL + '/user/transaction', {
                headers: headers,
            });

            if (transactiontype === 'coinTransaction') {
                setCoinTransaction(response?.data?.data?.coinTransaction);
            }
            // else if (transactiontype === 'moneyTransaction') {
            //     setWalletTransaction(response.data.data.moneyTransaction);
            // }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchamountstatus = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const responsedetails = await axios.get(baseURL + '/user/wallet/moneyrequest', {
                headers: headers,
            });
            setStatusData(responsedetails?.data?.data)
        } catch (error) {
            console.error(error);
        }
    };

    const handleClassic = () => {
        setSelectedType('classic');
        fetchdata('coinTransaction');
        fetchtransaction();
    };

    const handleWallet = () => {
        setSelectedType('status');
        fetchamountstatus();
        fetchtransaction();
    };

    const selectedTransactionData = selectedType === 'classic' ? cointransaction : wallettransaction;

    const fetchchallenges = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            const responsedetails = await axios.get(baseURL + '/challenge/played', {
                headers: headers,
            });
            setChallenges(responsedetails?.data?.data?.rows)
        } catch (error) {
            console.error(error);
        }
    }
    const handleChallenges = () => {
        setSelectedType("challenges");
        fetchchallenges();
    }
    useEffect(() => {
        fetchtransaction();
        fetchdata('coinTransaction'); // Fetch data based on the selected type when component mounts
    }, []); // Trigger useEffect when selectedType changes

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setImageSrc("");
    };
    const handleOpenDialog = (imageUrl) => {
        setOpenDialog(true);
        setImageSrc(imageUrl);
    };
    return (
        <>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Image</DialogTitle>
                <DialogContent>
                    {/* Add your dialog content here */}
                    {imageSrc ? <img src={`https://backened.ludokavish.com/api/v1/image/${imageSrc}`} alt="Preview" /> : 'Loading...'}
                    {/* <p>This is the dialog content.</p> */}
                </DialogContent>
            </Dialog>
            <section id="main-bg">
                <div id="challengeset-container" className="container mx-0">
                    <div className="row">
                        <div className="col-12">
                            <HeaderComponent />
                        </div>
                        <div className="col-12 my-4">
                            <button className="history-btn rounded-pill mx-2" id="classic-btn" onClick={handleClassic}>Transactions</button>
                            <button className="history-btn rounded-pill mx-2" id="wallet-btn" onClick={handleWallet}>Payment Status</button>
                            <button className="history-btn rounded-pill mx-2" id="wallet-btn" onClick={handleChallenges}>All Challenges</button>
                        </div>
                    </div>
                    <div className="row" id="all">
                        <div className="col-12">
                            {selectedType === "classic" &&
                                cointransaction?.map(item => {
                                    // Extract date and time from "createdAt"
                                    const createdAtDate = new Date(item?.createdAt);
                                    const date = createdAtDate.toLocaleDateString(); // Extract date
                                    const time = createdAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Extract time

                                    return (
                                        <div key={item?.id} className="transaction-item" style={{ fontSize: "15px" }}>
                                            <div className="row bg-light p-2 mb-3 rounded">
                                                <div className="col-2 border-end d-flex flex-column align-items-center justify-content-center">
                                                    <img src="./images/img.jpg" className="rounded-circle" style={{ width: '30px', height: '30px' }} alt="" />
                                                    <div className="d-flex flex-column align-items-center">
                                                        <p className="mb-0 time">{time}</p>
                                                        <p className="mb-0 date">{date}</p>
                                                    </div>
                                                </div>
                                                <div className="col-8 d-flex flex-column justify-content-center">
                                                    <h5 className="mb-0" style={{ margin: '0' }}><strong>{item?.message}</strong></h5>
                                                    <div className="row mt-2">
                                                        <div className="col-6">
                                                            <p className="mb-0"><strong>Sender:</strong> {item?.Sender?.username}</p>
                                                        </div>
                                                        <div className="col-7">
                                                            <p className="mb-0"><strong>Receiver:</strong> {item?.Receiver?.username}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-2 border-start d-flex flex-column align-items-center ">
                                                    <h5 className={`mb-0 ${item?.amount < 0 ? 'text-danger' : 'text-success'}`}>
                                                        {item?.sender === accessUserId ? '-' : '+'}{item?.amount}
                                                    </h5>
                                                    <h5 className="mb-0" style={{ margin: '0', fontSize: "15px" }}><strong>Amount:- </strong>{amount}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            {selectedType == "status" &&
                                statusdata?.map(item => {
                                    // Extract date and time from "createdAt"
                                    const createdAtDate = new Date(item?.createdAt);
                                    const date = createdAtDate.toLocaleDateString(); // Extract date
                                    const time = createdAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Extract time

                                    return (
                                        <div key={item?.id} className="transaction-item" style={{ fontSize: "15px" }}>
                                            <div className="row bg-light p-2 mb-3 rounded">
                                                <div className="col-2 border-end d-flex flex-column align-items-center justify-content-center">
                                                    <img src="./images/img.jpg" className="rounded-circle" style={{ width: '30px', height: '30px' }} alt="" />
                                                    <div className="d-flex flex-column align-items-center">
                                                        <p className="mb-0 time">{time}</p>
                                                        <p className="mb-0 date">{date}</p>
                                                    </div>
                                                </div>
                                                <div className="col-8 d-flex flex-column justify-content-center">
                                                    <h5 className="mb-0" style={{ margin: '0', fontSize: "15px" }}><strong>Status:- </strong>{item?.status}</h5>
                                                    <h5 className="mb-0" style={{ margin: '0', fontSize: "15px" }}><strong>Message:- </strong>{item?.message}</h5>
                                                    <div className=" mb-0 row col-2">
                                                        <Button color="primary" className="ml-auto" onClick={() => handleOpenDialog(item?.image)}>
                                                            <Visibility />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="col-2 border-start d-flex flex-column align-items-center ">
                                                    <h5 className={`mb-0 ${item?.amount < 0 ? 'text-danger' : 'text-success'}`}>
                                                        {item?.sender === accessUserId ? '-' : '+'}{item?.amount}
                                                    </h5>
                                                    <h5 className="mb-0" style={{ margin: '0', fontSize: "15px" }}><strong>Amount:- </strong>{amount}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            {
                                selectedType == "challenges" &&
                                challenges?.map(item => {
                                    // Extract date and time from "createdAt"
                                    const createdAtDate = new Date(item?.createdAt);
                                    const date = createdAtDate.toLocaleDateString(); // Extract date
                                    const time = createdAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Extract time

                                    return (
                                        <div key={item?.id} className="transaction-item" style={{ fontSize: "15px" }}>
                                            <div className="row bg-light p-2 mb-3 rounded">
                                                <div className="col-2 border-end d-flex flex-column align-items-center justify-content-center">
                                                    <img src="./images/img.jpg" className="rounded-circle" style={{ width: '30px', height: '30px' }} alt="" />
                                                    <div className="d-flex flex-column align-items-center">
                                                        <p className="mb-0 time">{time}</p>
                                                        <p className="mb-0 date">{date}</p>
                                                    </div>
                                                </div>
                                                <div className="col-8 d-flex flex-column justify-content-center">
                                                    <h5 className="mb-0" style={{ margin: '0', fontSize: "15px" }}><strong>Status:- </strong>{item?.status}</h5>
                                                    <h5 className="mb-0" style={{ margin: '0', fontSize: "15px" }}><strong>Roomcode:- </strong>{item?.roomcode}</h5>
                                                    <h5 className="mb-0" style={{ margin: '0', fontSize: "15px" }}><strong>Category:- </strong>{item?.category}</h5>

                                                </div>
                                                <div className="col-2 border-start d-flex flex-column align-items-center justify-content-center">
                                                    <h5 className={`mb-0 ${item?.amount < 0 ? 'text-danger' : 'text-success'}`}>
                                                        {item?.price}
                                                    </h5>
                                                    {/* <h5 className="mb-0" style={{ margin: '0', fontSize: "15px" }}><strong>Amount:- </strong>{amount}</h5> */}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="col-12 d-flex justify-content-center my-3">
                            <button
                                className="btn btn-primary mx-2"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <i className="bi bi-caret-left-square-fill" />
                            </button>
                            <button
                                className="btn btn-primary mx-2"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <i className="bi bi-caret-left" /> Previous
                            </button>
                            <button
                                className="btn btn-primary mx-2"
                                // disabled={endIndex >= data.length}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next <i className="bi bi-caret-right" />
                            </button>
                            <button
                                className="btn btn-primary mx-2"
                                // disabled={endIndex >= data.length}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <i className="bi bi-caret-right-square-fill" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="rightContainer" style={{ position: 'fixed', top: 0, bottom: 0, left: 900, zIndex: 5 }}>
                    <div className="rcBanner flex-center">
                        <Logo />
                        {/* <picture className="rcBanner-img-container">
                            <img style={{ width: "100% ", borderRadius: '50%' }} src="./images/Ludolkjpg.jpg" alt />
                        </picture>
                        <div className="rcBanner-text">Play Ludo  <span className="rcBanner-text-bold">Win Real Cash!</span></div>
                        <div className="rcBanner-footer">For best experience  , open&nbsp;<span style={{ cursor: "pointer", color: '#ffb900' }}>ludokavish.com</span>
                            &nbsp;on&nbsp;&nbsp;chrome </div> */}
                    </div>
                </div>
            </section>
        </>
    );
}

export default HistoryPage;
