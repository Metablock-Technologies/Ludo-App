import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function HeaderComponent() {
  const navigate = useNavigate();
  return (
    <>

      <div className="row py-2 align-items-center" style={{ backgroundColor: '#371B58' }}>
        <div className="col-1 d-flex align-items-center">
          <h4 className="mb-0"><i onClick={() => navigate('/UserPage')} className="bi bi-list" style={{ color: 'white', cursor: 'pointer' }} /></h4>
        </div>
        <div className="col-3">
          <span style={{cursor:'pointer'}} onClick={()=>navigate('/PlayPage')}><img src="./images/logo.png" alt /></span>
        </div>
        <div className="col-8 d-flex justify-content-end">

          <button className="btn btn-light mx-2 align-items-center" onClick={() => navigate('/LanguagesPage')}><i className="bi bi-translate text-primary" /> Language</button>


          <button onClick={() => navigate('/WalletPage')} className="btn btn-light align-items-center"><i className="bi bi-wallet-fill text-success" /> 0.00</button>

        </div>
      </div>



    </>
  )
}

export default HeaderComponent;