import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { getUser,getUserName } from '../Utils/Common';
import swal from 'sweetalert';

const ServiceCancelModal = (props) => {

console.log(props)
    const userid = getUser();
    const username = getUserName();
    const [remark, setRemark] = useState('')

    const acceptRequest = async (e) => {
        e.preventDefault();
        if (remark.length > 0) {

            try {
                let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/material/cancelRequestRemark.php`,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            'id' : props.mis_id,
                            'remark' : remark,
                            'userid' : userid,
                            'username' : username,
                        })
                    });
                    let resJson = await res.json();

                    if (resJson.response == 202) {
                        swal('success', resJson.message, 'success')
                        // window.location.reload();
                    } else if (resJson.response == 102) {
                        swal('Error', resJson.message, 'error')
                        // window.location.reload();
                    } else if (resJson.response == 302) {
                        swal('Error', resJson.message, 'error')
                        // window.location.reload();
                    }


                    console.log(resJson)


            } catch (error) {
                console.log(error)
            }

        }
    }




    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <b> Cancel Remark {props.mis_id}</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <input type="text" name="remark" onChange={(e) => setRemark(e.target.value)} className='form-control' />
                <button type="submit" value="submit" className='btn btn-success'
                    onClick={acceptRequest}
                >Submit</button>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ServiceCancelModal