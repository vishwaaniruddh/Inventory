import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Vendor_child = (props) => {
    const { id } = props;
    const [user, setUser] = useState({});
    const [loading, setloading] = useState(true);

    useEffect(() => {
        fetch(`https://sarmicrosystems.in/react_inventory/API/get_vendor.php?id=` + id)
            .then(res => res.json())
            .then(
                (response) => {
                    setUser(response[0]);
                    setloading(false);
                }
            )

    }, [id]);


    if (loading) {

    } else {
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
                                <input type="text" name="username" className="form-control" value={user.name} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" value={user.email} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <label>Contact</label>
                                <input type="number" name="contact" className="form-control" value={user.contact} />
                            </div>

                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }


}

export default Vendor_child;