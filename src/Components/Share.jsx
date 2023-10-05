import React, { useState } from 'react'


import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    WhatsApp as WhatsAppIcon,
    Instagram as InstagramIcon,
} from '@mui/icons-material';
import { Button } from '@mui/material';

import { IconButton, Dialog, DialogContent, DialogActions } from '@mui/material';
import { FileCopy, Share } from '@mui/icons-material';
import HeaderComponent from './HeaderComponent';
import Logo from './Logo';

const SharePage = () => {
    const [activeCard, setActiveCard] = useState(null);
    const [enable, setEnable] = useState(false);
    const [linkToCopy, setLinkToCopy] = useState('http://ludokavish.com');
    const [showDialog, setShowDialog] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleCardClick = (cardNumber) => {
        setEnable(!enable)
        setActiveCard(cardNumber);
    };
    const handleCopyLink = () => {
        navigator.clipboard.writeText(linkToCopy);
        // You can add a message or UI feedback here to indicate that the link has been copied.
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <section id="main-bg">
                <div id="legalterms-container" className="container mx-0">

                    <div className="row">
                        <div className="col-12 mb-5">
                            <HeaderComponent />
                        </div>

                        <div className="col-12 object-fit-contain text-center d-flex justify-content-center">
                            <img id="support-img" src="./images/Support.png" alt />
                        </div>
                        {/* <div className="col d-flex justify-content-between">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowDialog(true)}
                            >
                                Share
                            </button>
                        </div> */}
                        {/* </div>
                        </div> */}

                        {
                            <div>
                                {/* <a className="text-center row my-2 mx-auto text-decoration-none"> */}
                                {/* <button className="col-12 btn rounded btn-primary my-auto d-flex justify-content-center"><span className="material-symbols-outlined">chat</span>Live Chat</button> */}
                                <div  >
                                    <button
                                        style={{ marginBottom: "1" }}
                                        className="col-12 btn rounded btn-primary my-3  d-flex justify-content-center"
                                        onClick={handleCopyLink}
                                        color="primary"
                                        aria-label="Copy Link"
                                    >Copy Link
                                        <FileCopy />
                                    </button>
                                    {/* </a> */}


                                    <button
                                        className="col-12 btn rounded btn-primary my-auto d-flex justify-content-center"
                                        onClick={handleOpenDialog}
                                        style={{ color: 'purple' }}
                                        aria-label="Share"
                                    >
                                        <Share />
                                    </button>
                                </div>
                                <Dialog open={openDialog} onClose={handleCloseDialog}>
                                    <DialogContent>
                                        <h4>Share Link</h4>
                                        <p>Share this link on:</p>
                                        <IconButton
                                            component="a"
                                            href={`https://www.facebook.com/sharer.php?u=${linkToCopy}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FacebookIcon />
                                        </IconButton>
                                        <IconButton
                                            component="a"
                                            href={`https://twitter.com/share?url=${linkToCopy}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <TwitterIcon />
                                        </IconButton>
                                        <IconButton
                                            component="a"
                                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(linkToCopy)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <WhatsAppIcon />
                                        </IconButton>
                                        <IconButton
                                            component="a"
                                            href={`https://www.instagram.com/share?url=${linkToCopy}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <InstagramIcon />
                                        </IconButton>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        }
                    </div>

                    <div className="" style={{ position: 'fixed', top: '50%', left: 'calc(100% - 40%)', transform: `translate(-50%,-50%)`, zIndex: 5 }}>
                        <div className="rcBanner flex-center">
                            <Logo />
                            {/* <picture className="rcBanner-img-containerr">
                            <img style={{ marginLeft: '10px', width: "80% ", borderRadius: '50%' }} src="./images/Ludolkjpg.jpg" alt />
                        </picture>
                        <div className="rcBanner-text">Play Ludo &amp; <span className="rcBanner-text-bold">Win Real Cash!</span></div>
                        <div className="rcBanner-footer">For best experience, open&nbsp;<a href="/">ludokavish.com</a>&nbsp;on&nbsp;&nbsp;chrome </div> */}
                        </div>

                    </div>
                </div>
            </section >
        </>
    )
}

export default SharePage;
