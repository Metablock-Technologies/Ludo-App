import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { baseURL } from '../token';
import axios from 'axios';
import Logo from './Logo';

function HeaderComponent() {
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

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
    useEffect(() => {
        fetchtransaction();

        const intervalId = setInterval(fetchtransaction, 2000);

        return () => clearInterval(intervalId);
    }, [])

    return (
        <>

            <div className="row py-2 align-items-center" style={{ backgroundColor: '#371B58' }}>
                <div className="col-1 d-flex align-items-center">
                    <h4 className="mb-0"><i onClick={() => navigate('/UserPage')} className="bi bi-list" style={{ color: 'white', cursor: 'pointer' }} /></h4>
                </div>
                <div className="col-3" style={{ width: '90px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => navigate('/PlayPage')}>
                    {/* <span style={{ cursor: 'pointer' }} onClick={() => navigate('/PlayPage')}><img style={{ width: '40px', borderRadius: '50%' }} src={Logo} alt /></span> */}
                    <Logo />
                </div>
                <div className="col-8 d-flex justify-content-end">
                    <button className="btn btn-light mx-2 align-items-center" onClick={() => navigate('/LanguagesPage')}><i className="bi bi-translate text-primary" /> Language</button>
                    <button onClick={() => navigate('/WalletPage')} className="btn btn-light align-items-center"><i className="bi bi-wallet-fill text-success" />{amount}</button>
                </div>
            </div>
        </>
    )
}

export default HeaderComponent;