import React,{useState} from 'react'


function Sign_up() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/create_user.php?name=` + name + `&email=` + email + `&contact=` + contact + `&password=` + password, {
                method: "POST",
                body: JSON.stringify({
                    'name': name,
                    'email': email,
                    'contact': contact,
                    'password': password,
                }),
            });
            let resJson = await res.json();
            if (resJson === 1) {
                setName("");
                setEmail("");
                setContact("");
                setPassword("");
                setMessage("User created successfully");
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
                
                <form onSubmit={handleSubmit}>

                
                <div className="card">
                    <div className="card-body text-center">
                        <div className="mb-4">
                            <i className="feather icon-unlock auth-icon"></i>
                        </div>
                        <h3 className="mb-4">Sign Up</h3>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Mobile" value={contact} onChange={(e) => setContact(e.target.value)}/>
                        </div>
                        <div className="input-group mb-4">
                            <input type="password" className="form-control" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button className="btn btn-primary shadow-2 mb-4">Sign Up</button>


                        <div className="message">{message ? <h3><b>{message}</b></h3> : null}</div>
                        <p className="mb-0 text-muted">Allready have an account? <a href="./Login"> Log in</a></p>
                    </div>
                </div>
                </form>

            </div>
        </div>
    )
}

export default Sign_up

