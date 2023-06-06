import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Material_child = (props) => {
    const { id } = props;
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);


    const updateState = (e) => {
        let n = {...user, [e.target.name]: e.target.value};
        setUser(n)
    }

    let SubmitEditedMaterial = async (e) => {
        e.preventDefault();
            try {
            let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/update_user.php`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'vendor_name': user.vendor_name,
                    'material': user.material,
                   
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
        fetch(`https://sarmicrosystems.in/react_inventory/API/get_all_material.php?id=` + id)
            .then(res => res.json())
            .then(
                (response) => {
                    setUser(response[0]);
                    setLoading(false);
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
                            <div className='col-sm-12 col-md-6'>
                                <label>Vendor</label>
                                <input type="text" name="vendor_name" className="form-control" value={user.vendor_name} 
                                 onChange={updateState}/>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <label>Material</label>
                                <input type="text" name="material" className="form-control" value={user.material} 
                                 onChange={updateState}/>
                            </div>
                            

                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <input type="submit" name="submit"  onClick={SubmitEditedMaterial} className="btn btn-success" />

                </Modal.Footer>
            </Modal>
        );
    }


}

export default Material_child;