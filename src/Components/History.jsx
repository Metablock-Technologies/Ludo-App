import React, { useEffect, useState } from 'react';
import HeaderComponent from './HeaderComponent';
import { baseURL, token } from '../token';
import axios from 'axios';
import Logo from '../styles/logo.jpg'

function HistoryPage() {
    const [selectedType, setSelectedType] = useState('classic');
    const [wallettransaction, setWalletTransaction] = useState([]);
    const [cointransaction, setCoinTransaction] = useState([]);
    const [accessUserId, setAccessUserID] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                setCoinTransaction(response.data.data.coinTransaction);
            } else if (transactiontype === 'moneyTransaction') {
                setWalletTransaction(response.data.data.moneyTransaction);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleClassic = () => {
        setSelectedType('classic');
        fetchdata('coinTransaction');
    };

    const handleWallet = () => {
        setSelectedType('wallet');
        fetchdata('moneyTransaction');
    };

    const selectedTransactionData = selectedType === 'classic' ? cointransaction : wallettransaction;

    useEffect(() => {
        fetchdata('coinTransaction'); // Fetch data based on the selected type when component mounts
    }, []); // Trigger useEffect when selectedType changes


    return (
        <>
            <section id="main-bg">
                <div id="challengeset-container" className="container mx-0">
                    <div className="row">
                        <div className="col-12">
                            <HeaderComponent />
                        </div>
                        <div className="col-12 my-4">
                            <button className="history-btn rounded-pill mx-2" id="classic-btn" onClick={handleClassic}>Classic</button>
                            <button className="history-btn rounded-pill mx-2" id="wallet-btn" onClick={handleWallet}>Wallet</button>
                        </div>
                    </div>
                    <div className="row" id="all">
                        <div className="col-12">
                            {selectedTransactionData.map(item => (
                                <div key={item.id} className="row bg-light p-1 mb-2">
                                    <div className="col-3 border-end d-flex" >
                                        <img src='./images/img.jpg' className="rounded-circle" style={{ width: '20%' }} alt="" />
                                        <span className="mb-0"><strong>{item.Sender.username}</strong></span>
                                    </div>
                                    <div className="col-9">
                                        <div className="row">
                                            <div className="col-12 d-flex justify-content-between ">
                                                <h6 className="mb-0"><strong>{item.message}</strong></h6>
                                                <h6 className="mb-0"><strong>{item.Receiver.username}</strong></h6>
                                                <h6 className={`mb-0 text-end ${item.amount < 0 ? 'text-danger' : 'text-success'}`}>
                                                    ({item.sender === accessUserId ? '+' : '-'}){item.amount}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                <div className="" style={{ position: 'fixed', top: '50%', left: 'calc(100% - 40%)', transform: `translate(-50%,-50%)`, zIndex: 5 }}>
                    <div className="rcBanner flex-center">
                        <Logo />
                        {/* <picture className="rcBanner-img-containerr">
                            <img style={{ marginLeft: '10px', width: "80% ", borderRadius: '50%' }} src="./images/Ludolkjpg.jpg" alt />
                        </picture>
                        <div className="rcBanner-text">Play Ludo &amp; <span className="rcBanner-text-bold">Win Real Cash!</span></div>
                        <div className="rcBanner-footer">For best experience, open&nbsp;<a href="/">LudoPlayers.com</a>&nbsp;on&nbsp;&nbsp;chrome </div> */}
                    </div>

                </div>
            </section>
        </>
    );
}

export default HistoryPage;
