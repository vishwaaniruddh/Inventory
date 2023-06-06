import React, { useState } from 'react'
import { useHistory } from "react-router-dom";



const Demo = () => {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/demo.php`, {
                method: "POST",
                headers: {
                    'Application-Id': 'something',
                    'Master-Key': 'somekey',
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                }),
            });
            let resJson = await res.json();
            if (resJson.is_authenticate == 1) {
                localStorage.setItem('user', JSON.stringify(resJson))
                history.push("/");
            } else {
                setMessage("Some error occured");
            }
        }
        catch (err) {
            console.log(err);
        }
    };




    return (
        <div className="auth-wrapper">
            <div className="auth-content">

                <div className="auth-bg">
                    <span className="r"></span>
                    <span className="r s"></span>
                    <span className="r s"></span>
                    <span className="r"></span>
                </div>
                <div className="card">
                    <div className="card-body text-center">
                        <div className="mb-4">
                            <i className="feather icon-unlock auth-icon"></i>
                        </div>
                        <h3 className="mb-4">Login</h3>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-group mb-4">
                            <input type="password" className="form-control" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-primary shadow-2 mb-4" onClick={handleSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Demo