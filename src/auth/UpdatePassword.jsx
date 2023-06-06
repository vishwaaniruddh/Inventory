import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
// import swal from 'sweetalert';
import '../style/public.css';
function UpdatePassword() {

    const { userid } = useParams();
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        console.log(userid)

    }, [userid]);

    const updadtePasswordform = async (e) => {
        e.preventDefault();
        setloading(true)
        if (password === confirmPassword) {
            setError('')
        } else {
            setError('Password Not Match !')

        }



    }



    return (
        <div className="auth-wrapper">
            <div className="auth-content">
                <div className="auth-bg">
                    <span className="r"></span>
                    <span className="r s"></span>
                    <span className="r s"></span>
                    <span className="r"></span>
                </div>

                <form >
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <i className="feather icon-mail auth-icon"></i>
                            </div>
                            <h3 className="mb-4">Update Password</h3>
                            <div className="input-group mb-3">
                                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} className="form-control" placeholder="New password" autoComplete="on" />
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} className="form-control" placeholder="Confirm new password" autoComplete="on"/>
                            </div>
                            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />

                            <input type="submit" className="btn btn-success mb-4 shadow-2" value={loading ? 'Please Wait..' : 'Submit'}
                                onClick={updadtePasswordform}
                            />


                            <p className="mb-0 text-muted">Don’t have an account? <a href="./sign_up">Signup</a></p>
                            <p className="mb-0 text-muted">Don’t have an account? <a href="./Login">Login</a></p>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default UpdatePassword;