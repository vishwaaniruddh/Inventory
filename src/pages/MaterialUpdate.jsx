import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getUser } from '../Utils/Common';


const MaterialUpdate = () => {
    const { id } = useParams();
    const user = getUser()

    const dateValue = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2);
    // const dateValue = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();


    const [data, setData] = useState({
        availability: '',
        remark: '',
        addressType: '',
        address: '',
        contactPersonName: '',
        contactPersonMob: '',
        dispatchDate: '',
        serialNumber: '',
    });

    const [apiData, setApiData] = useState({})


    useEffect(() => {

        fetch(`https://sarmicrosystems.in/react_inventory/API/material/getMaterialUpdate.php`, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
            })
        })
            .then(res => res.json())
            .then(
                response => {
                    setApiData(response.data);
                }
            )
    }, [id])



    const handleChange = (e) => {

        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/material/setMaterialUpdate.php`, {
                method: 'POST',
                body: JSON.stringify({
                    'id': id,
                    'address': data.address,
                    'addressType': data.addressType,
                    'availability': data.availability,
                    'contactPersonMob': data.contactPersonMob,
                    'contactPersonName': data.contactPersonName,
                    'dispatchDate': data.dispatchDate,
                    'remark': data.remark,
                    'serialNumber': data.serialNumber,
                    'userid': user,
                })
            });

            let resJson = res.json();
            console.log(resJson)

        } catch (error) {
            console.log(error);
        }



    }
    return (
        <div className="pcoded-main-container">
            <div className="pcoded-wrapper">
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        <div className="main-body">
                            <div className="page-wrapper">
                                <div className="row">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Material Update</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="view-info">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="general-info">
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div className="table-responsive">
                                                                        <table className="table" border="1">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <th scope="row">Ticket ID </th>
                                                                                    <td >
                                                                                        {apiData.ticket_id}
                                                                                    </td>

                                                                                </tr>
                                                                                <tr>
                                                                                    <th scope="row">ATM ID </th>
                                                                                    <td>
                                                                                        {apiData.atmid}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th scope="row">Bank</th>

                                                                                    <td>
                                                                                        {apiData.bank}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th scope="row">Location</th>

                                                                                    <td>
                                                                                        {apiData.location}
                                                                                    </td>
                                                                                </tr>


                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-6">
                                                                    <div className="table-responsive">
                                                                        <table className="table" border="1">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <th scope="row">CITY</th>

                                                                                    <td>
                                                                                        {apiData.city}
                                                                                    </td>
                                                                                </tr>

                                                                                <tr><th scope="row">STATE</th>

                                                                                    <td>
                                                                                        {apiData.state}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th scope="row">Zone </th>

                                                                                    <td>
                                                                                        {apiData.zone}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th scope="row">Status</th>

                                                                                    <td>
                                                                                        {apiData.status}
                                                                                    </td>
                                                                                </tr>

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-body">
                                            <form method='POST' onSubmit={handleSubmit}>


                                                <div className='col-sm-12'>
                                                    <label>Availability</label>
                                                    <select className="form-control" name="availability"
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">--Select--</option>
                                                        <option value="available">Material dispatch</option>
                                                        <option value="not_available">Material not available</option>
                                                    </select>
                                                </div>

                                                <div className={data.availability == 'available' ? 'custcard row materialAvailable' : 'row materiUnalAvailable'}>


                                                    <div className="row address_type" >
                                                        <div className="col-sm-4">
                                                            <label>Address Type</label>
                                                            <select className="form-control" name="addressType"
                                                                onChange={handleChange}>
                                                                <option value="">--Select--</option>
                                                                <option value="Branch">Branch</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <label>Address</label>
                                                            <input className="form-control" name="address" onChange={handleChange} value={data.addressType == 'Branch' ? 'Branch' : data.address} readOnly={data.addressType == 'Branch' ? 'readonly' : ''} />
                                                        </div>
                                                    </div>


                                                    <div className={data.addressType == 'Other' ? 'row branchUnavailable' : 'row branchAvailable'}>
                                                        <div className="col-sm-6" id="Contactperson_name" >
                                                            <label htmlFor="Contactperson_name">Contact Person Name</label>
                                                            <input type="text" className="form-control" name="contactPersonName" onChange={handleChange} tabIndex="0" />
                                                        </div>
                                                        <div className="col-sm-6" id="Contactperson_mob" >
                                                            <label htmlFor="Contactperson_mob">Contact Person Mobile</label>
                                                            <input type="text" className="form-control" name="contactPersonMob" onChange={handleChange} tabIndex="0" />
                                                        </div>
                                                    </div>

                                                    <div className="row cust_hide" >

                                                        <div className="col-sm-6">
                                                            <label>Dispatch Date</label>
                                                            <input type="date" name="dispatchDate"
                                                                className="form-control"
                                                                onChange={handleChange}
                                                            // value={ dateValue }
                                                            />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label>Serial Number</label>
                                                            <input type="text" name="serialNumber" className="form-control" onChange={handleChange} required="" />
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <label>POD</label>
                                                            <input type="text" name="POD" className="form-control" onChange={handleChange} required="" />
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <label>Serial Number</label>
                                                            <select className='form-control' name='courier' required>
                                                                <option>--Select Courier--</option>
                                                                <option value="Trackon">Trackon</option>
                                                                <option value="Dehlivery.com">Dehlivery.com</option>
                                                                <option value="Nandan Courier">Nandan Courier</option>
                                                                <option value="Shree Nandan Courier"> Shree Courier</option>
                                                                <option value="Blue Dart">Blue dart</option>

                                                            </select>

                                                        </div>

                                                    </div>
                                                </div>



                                                <div className="col-sm-12">
                                                    <label>Remark</label>
                                                    <input type="text" name="remark" className='form-control'
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className='col-sm-12'>
                                                    <button className='btn btn-primary'>Submit</button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default MaterialUpdate