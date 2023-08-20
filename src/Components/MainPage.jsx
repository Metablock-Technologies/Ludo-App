import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {

  const navigate =useNavigate();
  return (
    <>
      <section id="main-bg">
        <div id="index-container" className="container mx-0">
          <div id="index-nav" className="row py-2 align-items-center">
            <div className="col-7 text-light "><strong><i className="bi bi-arrow-down-circle-fill" />&nbsp;Download App</strong></div>
            <div className="col-5 d-flex justify-content-end text-light btn " onClick={()=>navigate('/RegisterPage')}><strong>Register&nbsp;<i className="bi bi-person-circle" /></strong></div>
          </div>
          <div className="row">
            <div className="col=12 d-flex justify-content-center">
              <img id="image-dice" src="./images/ludo 2.png" className="card-img-top" alt />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <img id="image-winner" src="./images/winner.png" className="card-img-top" alt />
            </div>
            <div className="col-12">
              <h4 className="text-light text-center" id="play-tag">Play, Win, Flourish</h4>
              <h6 className="text-light text-center"><strong id="win-tag">WIN UPTO 1 LAC</strong></h6>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default MainPage;