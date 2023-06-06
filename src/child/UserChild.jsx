import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserChild = (props) => {
    const { userid } = props;
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
   


    const updateState = (e) => {
        let n = {...user, [e.target.name]: e.target.value};
        setUser(n)

        // console.log(newArray)
    }
    let SubmitEditedUsers = async (e) => {
        e.preventDefault();

       
        
           

        
        try {
            let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/update_user.php`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'name': user.name,
                    'contact': user.contact,
                    'email': user.email,
                   
                }),
            });

            let resJson = await res.json();
            console.log(resJson)
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            console.log('err' + err);
        }
    }

    useEffect(() => {
        fetch(`https://sarmicrosystems.in/react_inventory/API/get_users.php?userid=` + userid)
            .then(res => res.json())
            .then(
                (response) => {
                    setUser(response[0]);
                    console.log(response[0])
                    setLoading(false);
                }
            )
                

            
    }, []);


    if (loading) {

    } else {
// console.log(item)
  

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <b> Edit </b> - <u>{user.name}</u>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                
                        <div className='row'>
                            
                            <div className='col-sm-12 col-md-4'>
                                <label>Name</label>
                                <input type="text" name="name" className="form-control" value={user.name}
                                 onChange={updateState} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" value={user.email}
                              onChange ={updateState} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <label>Contact</label>
                                <input type="number" name="contact" className="form-control" value={user.contact}
                             onChange ={updateState} />
                            </div>

                        </div>
                        
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <input type="submit" name="submit"  onClick={SubmitEditedUsers} className="btn btn-success" />
                   {console.log(SubmitEditedUsers)}
                </Modal.Footer>
            </Modal>
        );
    }


}

export default UserChild