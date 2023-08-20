import React from 'react'

const Runningbattles = ({ runningBattles }) => {
    return (
        <div className="row">
            <div className="col-12 mb-3 d-flex justify-content-between text-light">
                <div className="d-flex">
                    <h6 className="mb-0"><i className="bi bi-x-circle-fill text-danger" /> Running Battles</h6>
                </div>
            </div>
            <div className='scroll-container'>
                {runningBattles.map((battle, index) => (
                    <div className="col-12 card my-1 walletcard pt-2 px-0 mx-auto text-white" key={index}>
                        <div className="row">
                            <div className="col">
                                <h6 className="mx-2 mb-0 d-flex">PLAYING FOR&nbsp;<span className="material-symbols-outlined text-success">payments</span> {battle.price}</h6>
                            </div>
                            <div className="col d-flex justify-content-end me-2">
                                <p className="mb-0">Prize&nbsp;</p>
                                <h6 className="mb-0 d-flex"><span className="material-symbols-outlined text-success">payments</span> {battle.price}</h6>
                            </div>
                        </div>
                        <div className="card-body walletbody mt-2">
                            <div className="row">
                                <div className="col-4">
                                    <p className="text-light mb-0">{battle.ChallengerUser.username}</p>
                                </div>
                                <div className="col-4 d-flex justify-content-center">
                                    <img src="./images/versus.png" className="rounded-circle mx-1" style={{ width: '25%', height: 25 }} alt="" />
                                </div>
                                <div className="col-4 d-flex justify-content-end">
                                    <p className="text-light text-end mb-0">{battle.AcceptorUser.username}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Runningbattles
