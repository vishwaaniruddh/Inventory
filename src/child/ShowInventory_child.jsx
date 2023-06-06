import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ShowInventory_child = (props) => {
    const { materialId } = props;
    const [material, setMaterial] = useState({});
    const [loading, setLoading] = useState(true);


    const updateState = (e) => {
        let n = { ...material, [e.target.name]: e.target.value };
        setMaterial(n)

        // console.log(newArray)
    }
    let SubmitEditedInventory = async (e) => {
        e.preventDefault();


        var serial_number_arr = [];
        
        for (var i = 0; i < material.length; i++) {
            serial_number_arr.push(material[i].invdata.serial_number);
           

        }



        try {
            let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/update_inventory.php`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'vendor': material.vendor,
                    'material': material.material,
                    'model': material.model,
                    'po': material.po,
                    'project': material.project,
                    'invoice': material.invoice,
                    'quantity': material.quantity,
                    'invdata': serial_number_arr,
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
        fetch(`https://sarmicrosystems.in/react_inventory/API/ShowInventoryDetail.php?materialId=` + materialId)
            .then(res => res.json())
            .then(
                (response) => {
                    setMaterial(response);
                    setLoading(false);
                }
            )

    }, []);


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
                        <b> Edit </b> - <u>Inventory detail</u>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='row'>
                            <div className='col-sm-12 col-md-4'>
                                <label>Vendor</label>
                                <input type="text" className="form-control" name='vendor' value={material.vendor}
                                    onChange={updateState} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <label>Material</label>
                                <input type="text" className="form-control" name='material' value={material.material}
                                    onChange={updateState} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <label>Model</label>
                                <input type="text" className="form-control" name='model' value={material.model}
                                    onChange={updateState} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <label>Po No</label>
                                <input type="text" className="form-control" name=' po' value={material.po}
                                    onChange={updateState} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <label>Project </label>
                                <input type="text" className="form-control" name='project' value={material.project}
                                    onChange={updateState} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <label>Invoice</label>
                                <input type="text" className="form-control" name='invoice' value={material.invoice}
                                    onChange={updateState} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <label>Quantity</label>
                                <input type="text" className="form-control" name='invoice' value={material.quantity}
                                    onChange={updateState} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <label>Created at </label>
                                <input type="text" className="form-control" name='created_at' value={material.created_at}
                                    onChange={updateState} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <label>Created by </label>
                                <input type="text" className="form-control" name='created-by' value={material.created_by}
                                    onChange={updateState} />
                            </div>

                        </div>
                        <br></br>
                        <div className='row'>
                            {material.invdata.map((item, index) => (
                                <div className="row highlight" key={index}>
                                    <div className="col-sm-12 material">
                                        {console.log(item)}
                                        <label>{index + 1}.Serial number</label>
                                        <input type="text"
                                             onChange={updateState}
                                             name='invdata'
                                            className="form-control"
                                            value={item.serial_number}
                                        />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <input type="submit" name="submit" onClick={SubmitEditedInventory} className="btn btn-success" />
                    {console.log(SubmitEditedInventory)}
                </Modal.Footer>
            </Modal>
        );
    }


}

export default ShowInventory_child;