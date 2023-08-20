import React from 'react'
import HeaderComponent from './HeaderComponent';

function SupportPage() {
  return (
   <>
         <section id="main-bg">
  <div id="support-container" className="container mx-0">
    <div className="row">
      <div className="col-12">
        <HeaderComponent/>
         
      </div>
      <div className="col-12">
        <div className="card container border border-danger mt-3 kycbox text-danger">
          <div className="row align-items-center my-2">
            <div className="d-flex my-auto col-6">
              <h6>KYC Pending </h6><span className="material-symbols-outlined">error</span>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <a href="completekyc.html">
                <button type="button" className="btn btn-danger float-right">Complete here</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-12" style={{display: 'none'}}>
        <div className="card container border border-success mt-2 kycbox text-success">
          <div className="row align-items-center my-2">
            <div className=" my-auto col-6">
              <p className="mb-0">KYC status </p>
              <div className="d-flex">
                <h6><strong>Verified</strong></h6>
                <span className="material-symbols-outlined">check_circle</span>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-success float-right">View Kyc Details</button>
            </div>
          </div>
        </div>
        
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> */}
      <div className="col-12 object-fit-contain text-center">
        <img id="support-img" src="./images/Support.png" alt />
      </div>
    </div>
    <a href="#" className="text-center row my-2 mx-auto text-decoration-none">
      <button className="col-12 btn rounded btn-primary my-auto d-flex justify-content-center"><span className="material-symbols-outlined">chat</span>Live Chat</button>
    </a>
    <a href="#" className="text-center row my-2 mx-auto text-decoration-none">
      <button className="col-12 btn rounded my-auto instabtn"><strong className="text-light"> <i className="fa fa-instagram" /> Connect On Instagram</strong></button>
    </a>
    <a href="#" className="text-center row my-2 mx-auto text-decoration-none">
      <button id="guide-btn" className="btn btn-outline-primary bg-light my-auto"><i className="fa fa-envelope" /> Reach Us Via Email</button>
    </a>
  </div>
</section>

   </>
  )
}

export default SupportPage;