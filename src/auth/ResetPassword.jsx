import React, { useState } from "react";
import swal from 'sweetalert';
import '../style/public.css';
function ResetPassword() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [validation, setvalidation] = useState({email:false});

    let resetPasswordHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(email){
            setvalidation({email:false}) ;
        }else{
            setvalidation({email:true})
            setLoading(false);
            return ;
        }
        
        

        // setvalidation();
        try {
            let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/resetPassword.php`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'email': email
                }),
            });
            let resJson = await res.json();
            console.log(resJson);
            setError(false);
            if(resJson === 1){

                swal(
                    "Good job", 
                     "Password reset Mail sent succesfully!", 
                     "success"
                ).then(function(){
                    window.location.reload();
                });

            }else{
                    swal(" Ooops !", "Mail sent error!", "error").then(function(){
                        window.location.reload();
                });
            }

        } catch (error) {
            setError("Something went wrong. Please try again later.");
            console.log('error = ' + error)
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
                <form>
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <i className="feather icon-mail auth-icon"></i>
                            </div>
                            <h3 className="mb-4">Reset Password</h3>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" required/>
                            </div>

                            {error && validation.email && <><small style={{ color: 'red' }}>Ooops ! Email is require field...</small><br /></>}<br />
                           
                            <input className="btn btn-primary mb-4 shadow-2" type="submit" name="submit" value={!loading ? 'Reset Password' : 'Please Wait ...'} onClick={resetPasswordHandler} />
                            <p className="mb-0 text-muted">Don’t have an account? <a href="./sign_up">Signup</a></p>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default ResetPassword;