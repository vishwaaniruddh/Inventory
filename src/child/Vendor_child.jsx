import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getUser } from '../Utils/Common';

const Vendor_child = (props) => {
    const user = getUser();

    const { id,onHide } = props;
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        fetch(`https://sarmicrosystems.in/react_inventory/API/get_vendor.php?id=` + id)
            .then((res) => res.json())
            .then((response) => {
                setName(response[0].name);
                setContact(response[0].contact);
                setEmail(response[0].email);
                setAddress(response[0].address);
                setLoading(false);
            });
    }, [id]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleContactChange = (e) => {
        setContact(e.target.value);
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const updateVendor = async (e) => {
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    contact: contact,
                    address: address,
                    vendorid: id,
                    userid: user,
                }),
            };
            console.log(requestOptions);
            let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/admin/updateVendor.php`, requestOptions);
            let resJson = await res.json();
            console.log(resJson);
            if (resJson === 200) {
                swal('Good job!', 'Vendor Updated Successfully!', 'success');
                props.onHide();
                // window.location.reload();
            } else {
                swal('Error!', 'Some error occurred!', 'error');
            }
        } catch (error) {
            console.log('error = ' + error);
        }
    };

    const buttonRef = useRef(null);

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <b> Edit </b> - <u>{name}</u>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={updateVendor} ref={buttonRef}>
                        <div className="row">
                            <div className="col-sm-12 col-md-4">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <label>Contact</label>
                                <input
                                    type="number"
                                    name="contact"
                                    className="form-control"
                                    value={contact}
                                    onChange={handleContactChange}
                                />
                            </div>
                            <div className="col-sm-12">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={address}
                                    onChange={handleAddressChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success">
                                {loading ? 'Loading...' : 'Submit'}
                            </button>
                            <Button onClick={props.onHide}>Close</Button>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        );
    }
};

export default Vendor_child;
