import React from 'react'
import HeaderComponent from '../Components/HeaderComponent';
import { Navigate, useNavigate } from 'react-router-dom';

function EnterFirstGame() {
    const navigate = useNavigate();

    const handleBackbtn = () => {
        navigate(-1)
        // console.log("heyy");
        // console.log(navigate);
    }
    return (
        <>
            <section id="main-bg">
                <div id="wallet-container" className="container mx-0">
                    <div className="row">
                        <div className="col-12">
                            <HeaderComponent />
                        </div>
                        <div className="col-12 my-3">
                            <div className="row align-items-center my-2">
                                <div className="my-auto col-6 text-white">

                                    <button type="button" className="btn btn-primary d-flex " onClick={handleBackbtn}><span className="material-symbols-outlined mb-0" >arrow_back</span>Back</button>

                                </div>
                                <div className="col-6 d-flex justify-content-end">
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2" id="guide-btn" className="btn btn-outline-primary bg-light">Rules</button>
                                    {/* Modal */}
                                    <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Updated Game Rules (From 7th Feb 2023)</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                </div>
                                                <div className="modal-body">
                                                    <p className="text-center lh-md">
                                                        यदि आपको लगता है की Opponent ने जान भूझकर गेम को Autoexit में छोड़ा है लेकिन Admin ने कैंसिल कर दिया है तो आपसे वीडियो प्रूफ माँगा जायेगा इसलिए हर गेम को रिकॉर्ड करना जरूरी है ! यदि आप वीडियो प्रूफ नहीं देते है तो गेम रिजल्ट एडमिन के अनुसार ही अपडेट किया जायेगा चाहे आप विन हो या गेम कैंसिल हो !
                                                        <br />
                                                        Game समाप्त होने के 15 मिनट के अंदर रिजल्ट डालना आवश्यक है अन्यथा Opponent के रिजल्ट के आधार पर गेम अपडेट कर दिया जायेगा चाहे आप जीते या हारे और इसमें पूरी ज़िम्मेदारी आपकी होगी इसमें बाद में कोई बदलाव नहीं किया जा सकता है!
                                                        <br />
                                                        Win होने के बाद आप गलत स्क्रीनशॉट डालते है तो गेम को सीधा Cancel कर दिया जायेगा इसलिए यदि आप स्क्रीनशॉट लेना भूल गए है तो पहले Live Chat में एडमिन को संपर्क करे उसके बाद ही उनके बताये। अनुसार रिजल्ट पोस्ट करे !
                                                        <br />
                                                        दोनों प्लेयर की टोकन (काटी) घर से बाहर न आयी हो तो लेफ्ट होकर गेम कैंसिल किया&nbsp;जा&nbsp;सकता&nbsp;है
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12   pt-2 px-0 mx-auto text-white d-flex justify-content-center">
                            <div className="card-body card  mx-2 walletcard mt-2">
                                <div className="row">
                                    <div className="col-4">
                                        <img src="./images/img.jpg" className="rounded-circle mx-1 " style={{ width: '25%' }} alt />
                                    </div>
                                    <div className="col-4 d-flex justify-content-center">
                                        <img src="./images/versus.png" className="rounded-circle mx-1" style={{ width: '25%' }} alt />
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <img src="./images/img.jpg" className="rounded-circle mx-1" style={{ width: '25%' }} alt />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <p className="text-light">Avni</p>
                                    </div>
                                    <div className="col-4 d-flex justify-content-center">
                                        <p className="text-success text-end"><strong> Rs 50</strong></p>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <p className="text-light text-end">Avni</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card mt-2 prplbox p-1">
                                <p className="text-center mb-0 text-light">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quidem, fuga vitae doloremque excepturi
                                    maxime architecto
                                </p>
                            </div>
                        </div>
                        <div className="col-12 card mt-3 walletcard pt-2 px-0 mx-auto text-white">
                            <div className="text-center">Room Code</div>
                            <div className="card-body walletbody mt-2">
                                <div className="col-12 py-2 ">
                                    <h5 className="text-center text-purple"><strong><span>73435570</span></strong></h5>
                                </div>
                                <a href="#" className="text-center row my-2 mx-auto text-decoration-none">
                                    <button className="col-12 btn rounded btn-primary my-auto d-flex justify-content-center"><i className="bi bi-clipboard2-check" />Copy Code</button>
                                </a>
                                <a data-bs-toggle="modal" data-bs-target="#exampleModal2" className="text-center row my-2 mx-auto text-decoration-none">
                                    <button className="col-12 btn  my-auto btn-danger">Game Rules Updated</button>
                                </a>
                                {/* Modal */}
                                <div className="modal fade" id="exampleModal3" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Updated Game Rules (From 7th Feb 2023)</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <p className="text-center lh-md">
                                                    यदि आपको लगता है की Opponent ने जान भूझकर गेम को Autoexit में छोड़ा है लेकिन Admin ने कैंसिल कर दिया है तो आपसे वीडियो प्रूफ माँगा जायेगा इसलिए हर गेम को रिकॉर्ड करना जरूरी है ! यदि आप वीडियो प्रूफ नहीं देते है तो गेम रिजल्ट एडमिन के अनुसार ही अपडेट किया जायेगा चाहे आप विन हो या गेम कैंसिल हो !
                                                    <br />
                                                    Game समाप्त होने के 15 मिनट के अंदर रिजल्ट डालना आवश्यक है अन्यथा Opponent के रिजल्ट के आधार पर गेम अपडेट कर दिया जायेगा चाहे आप जीते या हारे और इसमें पूरी ज़िम्मेदारी आपकी होगी इसमें बाद में कोई बदलाव नहीं किया जा सकता है!
                                                    <br />
                                                    Win होने के बाद आप गलत स्क्रीनशॉट डालते है तो गेम को सीधा Cancel कर दिया जायेगा इसलिए यदि आप स्क्रीनशॉट लेना भूल गए है तो पहले Live Chat में एडमिन को संपर्क करे उसके बाद ही उनके बताये। अनुसार रिजल्ट पोस्ट करे !
                                                    <br />
                                                    दोनों प्लेयर की टोकन (काटी) घर से बाहर न आयी हो तो लेफ्ट होकर गेम कैंसिल किया&nbsp;जा&nbsp;सकता&nbsp;है
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 card mt-3 walletcard pt-2 px-0 mx-auto text-white">
                            <div className="text-center">Game Results</div>
                            <div className="card-body walletbody mt-2">
                                <div className="col-12 py-2 ">
                                    <p className="text-center text-light">
                                        After completion of your game select the status of the game and post your screenshot below.
                                    </p>
                                </div>
                                <a href="#" className="text-center row my-2 mx-auto text-decoration-none">
                                    <button className="col-12 btn rounded btn-success my-auto d-flex justify-content-center" data-bs-toggle="modal" data-bs-target="#exampleModal1">I Won</button>
                                </a>
                                <a href="#" className="text-center row my-2 mx-auto text-decoration-none">
                                    <button className="col-12 btn  my-auto btn-danger">I Lost</button>
                                </a>
                                <a data-bs-toggle="modal" data-bs-target="#exampleModal4" className="text-center row my-2 mx-auto text-decoration-none">
                                    <button className="col-12 btn  my-auto btn-warning">Cancel</button>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 card my-3 walletcard pt-2 px-0 mx-auto text-white">
                            <div className="text-center">Penalty</div>
                            <div className="card-body walletbody mt-2">
                                <table className="table table-bordered table-bg">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="bg-transparent text-light w-25">Amount</th>
                                            <th scope="col" className="bg-transparent text-light w-75">Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-bg-body">
                                        <tr>
                                            <td className="bg-transparent  text-light"><i className="bi bi-currency-rupee" />100</td>
                                            <td className="bg-transparent text-light">
                                                <h6 className="text-center">Fraud/ Fake Screenshot</h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="bg-transparent  text-light"><i className="bi bi-currency-rupee" />50</td>
                                            <td className="bg-transparent text-light">
                                                <h6 className="text-center">Wrong Update</h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="bg-transparent  text-light"><i className="bi bi-currency-rupee" />50</td>
                                            <td className="bg-transparent text-light">
                                                <h6 className="text-center">No Update</h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="bg-transparent  text-light"><i className="bi bi-currency-rupee" />25</td>
                                            <td className="bg-transparent text-light">
                                                <h6 className="text-center">Abusing</h6>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Modal */}
                    <div className="modal fade" id="exampleModal4" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog  modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header ">
                                    <div>
                                        <h4 className="modal-title fs-5" id="exampleModalLabel">We Would Like To Know More</h4>
                                        <p className="mb-0">Select Reason For Cancelling</p>
                                    </div>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12 d-flex  my-1">
                                            <div className="bg-secondary text-light rounded-pill px-2 py-1 mx-2 btn"><p className="mb-0 text-center">No Room Code</p> </div>
                                            <div className="bg-secondary text-light rounded-pill px-2 py-1 mx-2 btn"><p className="mb-0 text-center">No Joined</p></div>
                                        </div>
                                        <div className="col-12 d-flex my-1">
                                            <div className="bg-secondary text-light rounded-pill px-2 py-1 mx-2 btn"><p className="mb-0 text-center">No Playing</p></div>
                                            <div className="bg-secondary text-light rounded-pill px-2 py-1 mx-2 btn"><p className="mb-0 text-center">Dont't want to play</p></div>
                                        </div>
                                        <div className="col-12 d-flex my-1">
                                            <div className="bg-secondary text-light rounded-pill px-2 py-1 mx-2 btn"><p className="mb-0 text-center">Game Not Start</p></div>
                                            <div className="bg-secondary text-light rounded-pill px-2 py-1 mx-2 btn"><p className="mb-0 text-center">Other</p></div>
                                        </div>
                                        <div className="col-12 d-flex my-1">
                                            <div className="bg-secondary text-light rounded-pill px-2 py-1 mx-2 btn"><p className="mb-0 text-center">Opponent Abusing</p></div>
                                        </div>
                                    </div>
                                    <a href="#" className="text-center row my-2 mx-auto text-decoration-none">
                                        <button className="col-12 btn rounded btn-primary my-auto d-flex justify-content-center">Confirm</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Modal */}
                    <div className="modal fade" id="exampleModal1" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog  modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Upload Result</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <a href="#" className="text-center row my-2 mx-auto text-decoration-none">
                                        <button className="col-12 btn rounded btn-primary my-auto d-flex justify-content-center">Upload Image</button>
                                    </a>
                                    <a href="#" className="text-center row my-2 mx-auto text-decoration-none">
                                        <button className="col-12 btn  my-auto btn-success">Post Result</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default EnterFirstGame;