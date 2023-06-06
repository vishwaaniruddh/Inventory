import React from 'react';
import sparcle1 from '../assets/sparcle-1.png';
import sparcle2 from '../assets/sparcle-2.png';

import ship from '../assets/ship.png';
import sark from '../assets/sark.png';

function Offline() {
    return (
        <div>
            <div className="auth-wrapper offline">
                <div className="offline-wrapper">
                    <img src={sparcle1} alt="User" className="img-fluid s-img-1" />
                    <img src={sparcle2} alt="User" className="img-fluid s-img-2" />
                    <div className="container off-main">
                        <div className="row justify-content-center">
                            <div className="col-6">
                                <div className="text-center">
                                    <div className="moon"></div>
                                    <img src={ship} alt="" className="img-fluid boat-img" />
                                </div>
                            </div>
                        </div>
                        <div className="row m-0 justify-content-center off-content">
                            <div className="col-sm-12 p-0">
                                <div className="text-center">
                                    <h1 className="text-white text-uppercase">Offline</h1>
                                    <h5 className="text-white font-weight-normal m-b-30">Your Network Connection is Disturb ! Please check before try again ! </h5>
                                    <button className="btn btn-primary mb-4"><i className="feather icon-refresh-ccw me-2"></i>Reload</button>
                                </div>
                            </div>
                            <div className="sark">
                                <img src={sark} alt="" className="img-fluid img-sark" />
                                <div className="bubble"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Offline;