import React, { useState } from 'react';

const Button = ({ text }) => {
    const [buttonStyle, setButtonStyle] = useState('primary');

    const handleClick = () => {
        if (buttonStyle === 'primary') {
            setButtonStyle('primary');
        } else if (buttonStyle === 'secondary') {
            setButtonStyle('secondary');
        } else if (buttonStyle === 'success') {
            setButtonStyle('success');
        } else if (buttonStyle === 'danger') {
            setButtonStyle('danger');
        } else if (buttonStyle === 'warning') {
            setButtonStyle('warning');
        } else if (buttonStyle === 'info') {
            setButtonStyle('info');
        } else if (buttonStyle === 'light') {
            setButtonStyle('light');
        } else if (buttonStyle === 'dark') {
            setButtonStyle('dark');
        } else {
            setButtonStyle('primary');
        }
    };

    return (
        <div className="pcoded-main-container">
            <div className="pcoded-wrapper">
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        <div className="main-body">
                            <div className="page-wrapper">
                                <div className="row">
                                    <div className="card">
                                        <div className="card-header">

                                        </div>
                                        <div className="card-body">
                                            <button className={`btn btn-${buttonStyle}`} onClick={handleClick}>
                                                {text}
                                            </button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Button;