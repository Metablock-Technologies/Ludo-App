import React, { useState } from 'react';
// import "./bootstrap.css";
// import "./style.css";
import HeaderComponent from './HeaderComponent';

function HistoryPage() {

  const data = [
    {
      id: 1,
      image: './images/img.jpg',
      date: '24 jul',
      time: '2:05 am',
      name: 'ABCD talk_abcd264',
      amount: -50,
      orderId: '12233654',
      closingBalance: 7.1,
    },
    {
      id: 2,
      image: './images/img.jpg',
      date: '24 jul',
      time: '2:05 am',
      name: 'ABCD talk_abcd264',
      amount: 50,
      orderId: '12233654',
      closingBalance: 7.1,
    },
    {
      id: 3,
      image: './images/img.jpg',
      date: '25 jul',
      time: '3:30 pm',
      name: 'Jane Doe',
      amount: -20,
      orderId: '12233655',
      closingBalance: 5.1,
    },
    {
      id: 4,
      image: '.images/img.jpg',
      date: '25 jul',
      time: '3:30 pm',
      name: 'John Smith',
      amount: 30,
      orderId: '12233656',
      closingBalance: 8.1,
    },
    {
      id: 5,
      image: './images/img.jpg',
      date: '26 jul',
      time: '10:15 am',
      name: 'Alice Johnson',
      amount: -10,
      orderId: '12233657',
      closingBalance: 7.0,
    },
    {
      id: 6,
      image: './images/img.jpg',
      date: '26 jul',
      time: '10:15 am',
      name: 'Bob Anderson',
      amount: 15,
      orderId: '12233658',
      closingBalance: 8.5,
    },
    {
      id: 7,
      image: './images/img.jpg',
      date: '27 jul',
      time: '8:45 pm',
      name: 'EFGH talk_efgh123',
      amount: 70,
      orderId: '12233659',
      closingBalance: 15.5,
    },
    {
      id: 8,
      image: './images/img.jpg',
      date: '27 jul',
      time: '8:45 pm',
      name: 'IJKL talk_ijkl567',
      amount: -35,
      orderId: '12233660',
      closingBalance: 10.5,
    },
    // Add more data entries as needed
  ];
    const itemsPerPage = 6; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = data.slice(startIndex, endIndex);
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  return (
   <>
      <section id="main-bg">
  <div id="challengeset-container" className="container mx-0">
    <div className="row">
      <div className="col-12">
        <HeaderComponent/>
          
      </div>
      <div className="col-12 my-4">
        <button className="history-btn rounded-pill mx-2" id="all-btn">All</button>
        <button className="history-btn rounded-pill mx-2" id="classic-btn">Classic</button>
        <button className="history-btn rounded-pill mx-2" id="wallet-btn">Wallet</button>
      </div>
    </div>
    <div className="row" id="all">
          
              <div className="col-12">
                {slicedData.map(item => (
                  <div key={item.id} className="row bg-light p-1 mb-2">
                    <div className="col-3 border-end">
                      <img src={item.image} className="rounded-circle" style={{ width: '20%' }} alt="" />
                      <p className="mb-0 history-date-info">{item.date}</p>
                      <p className="mb-0 history-date-info">{item.time}</p>
                    </div>
                    <div className="col-9">
                      <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                          <h6 className="mb-0"><strong>{item.name}</strong></h6>
                          <h6 className={`mb-0 text-end ${item.amount < 0 ? 'text-danger' : 'text-success'}`}>
                            ({item.amount < 0 ? '-' : '+'}){Math.abs(item.amount)}
                          </h6>
                        </div>
                      </div>
                      <div className="row history-info-row">
                        <div className="col-12 d-flex justify-content-between">
                          <p className="mb-0">Order ID: <span>{item.orderId}</span> </p>
                          <p className="mb-0 text-end ">closing balance: <span>{item.closingBalance}</span> </p>
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
                disabled={endIndex >= data.length}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next <i className="bi bi-caret-right" />
              </button>
              <button
                className="btn btn-primary mx-2"
                disabled={endIndex >= data.length}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <i className="bi bi-caret-right-square-fill" />
              </button>

      </div>
    </div>
   
   
  </div>
</section>

   </>
  )
}

export default HistoryPage;