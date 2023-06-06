import React from 'react';
import notFoundImage from './assets/404.png';


function NotFound(props) {
    return (
        <div>
            <div className="auth-wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="text-center">
                                <img src={notFoundImage} alt="" className="img-fluid" />
                                <h5 className="text-muted my-4">Oops! Page not found!</h5>
                                <form action="index.html">
                                    <button className="btn  btn-primary mb-4"><i className="feather icon-refresh-ccw me-2"></i>Reload</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default NotFound;