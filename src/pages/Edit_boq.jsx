import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getUser } from '../Utils/Common';

function Edit_boq() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [not_Remark, setNot_Remark] = useState("");
    const [boq, setBoq] = useState([{ material: "", serial_number: "", qty: "", remark: "" }]);
    const userid = getUser();
    const [id, setId] = useState();

    useEffect(() => {
        const url = window.location.href;
        const materialIdParam = url.split('/').pop();
        setId(materialIdParam);
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            if (Number.isInteger(+id) && +id > 0) { // Check if id is a valid integer greater than 0
                try {
                    const response = await fetch(`https://sarmicrosystems.in/react_inventory/API/editBoq.php?id=${id}`);
                    const result = await response.json();
                    setData(result);
                    setBoq(result.boq_data);
                    setNot_Remark(result.not_remark);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);


    if (loading) {
        return <div>Please Wait...</div>
    }
    else {

        delete data.boq_data;
        const updateState = (index) => (e) => {
            const newArray = boq.map((item, i) => {
                if (index === i) {
                    return { ...item, [e.target.name]: e.target.value };
                } else {
                    return item;
                }
            });
            setBoq(newArray)
        };

        delete data.not_remark;

        function handleChange(event) {
            setNot_Remark(event.target.value);
        }


        let SubmitEditBoq = async (e) => {
            e.preventDefault();

            console.log(boq)
            var boqId_arr = [];
            var material_arr = [];
            var srno_arr = [];
            var quantity_arr = [];
            var remark_arr = [];

            for (var i = 0; i < boq.length; i++) {
                boqId_arr.push(boq[i].boq_id);

                material_arr.push(boq[i].material);
                srno_arr.push(boq[i].serial_number);
                quantity_arr.push(boq[i].qty);
                remark_arr.push(boq[i].remark);

            }

            try {
                let res = await fetch(`${process.env.REACT_APP_API_URL}update_boq.php`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'childBoq_id': boqId_arr,
                        'material': material_arr,
                        'serial_number': srno_arr,
                        'qty': quantity_arr,
                        'remark': remark_arr,
                        'not_remark': not_Remark,
                        'userid': userid,
                        'boq_id': id,
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

        if (loading) {
            return (
                <div className="pcoded-main-container">
                    <div className="pcoded-wrapper">
                        <div className="pcoded-content">
                            <div className="pcoded-inner-content">
                                <div className="main-body">
                                    <h3>Please wait ...</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )

        } else {


            return (

                <div className="pcoded-main-container">

                    <div className="pcoded-wrapper">
                        <div className="pcoded-content">
                            <div className="pcoded-inner-content">
                                <div className="main-body">
                                    <div className="page-wrapper">

                                        <div className='card'>
                                            <div className='card-header'>
                                                <h5>Edit BOQ</h5>
                                            </div>
                                            <div className='card-body'>
                                                <section>

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
                                                                                            <th scope="row">ATM ID </th>
                                                                                            <td >
                                                                                                {data.atmid}
                                                                                            </td>

                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th scope="row">ATM ID 2 </th>
                                                                                            <td>{data.atmid2}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th scope="row">ATM ID 3</th>

                                                                                            <td>{data.atmid3}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th scope="row">Tracker No</th>

                                                                                            <td>{data.serial_number}</td>
                                                                                        </tr>

                                                                                        <tr>
                                                                                            <th scope="row">Bank</th>

                                                                                            <td>{data.bank}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th scope="row">Customer</th>

                                                                                            <td>{data.customer}</td>
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
                                                                                            <th scope="row">City</th>

                                                                                            <td>{data.city}</td>
                                                                                        </tr>

                                                                                        <tr><th scope="row">State</th>

                                                                                            <td>{data.state}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th scope="row">Pincode </th>

                                                                                            <td>{data.pincode}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th scope="row">Address</th>

                                                                                            <td>{data.address}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th scope="row">Engineer Name &amp; Number</th>

                                                                                            <td>{data.engineer}-{data.engineer_number}</td>

                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th scope="row">BM Name</th>

                                                                                            <td>{data.bm_name}</td>
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
                                                </section>
                                            </div>

                                        </div>

                                        <div className='card'>
                                            <div className='card-header'>
                                                <h5>Edit BOQ</h5>
                                            </div>
                                            <div className='card-body'>
                                                {boq.map((item, index) => (
                                                    <div className="row highlight" key={index}>
                                                        <div className="col-sm-6 material">
                                                            <label>{index + 1}. Material</label>
                                                            <input type="text"
                                                                name="material"
                                                                className="form-control"
                                                                value={item.material}
                                                                onChange={updateState(index)} />
                                                        </div>

                                                        <div className="col-sm-2 serial_number">
                                                            <label>Serial Number</label>
                                                            <input type="text"
                                                                className="form-control"

                                                                name="serial_number"
                                                                onChange={updateState(index)}
                                                            />
                                                        </div>
                                                        <div className="col-sm-1 qty">
                                                            <label> Quantity </label>
                                                            <input type="text"
                                                                className="form-control"
                                                                name='qty'
                                                                value={item.qty}
                                                                onChange={updateState(index)}
                                                            />
                                                        </div>
                                                        <div className="col-sm-3 remark">
                                                            <label>Remark</label>
                                                            <input type="text"
                                                                className="form-control"
                                                                name='remark'
                                                                value={item.remark}
                                                                onChange={updateState(index)}
                                                            />
                                                        </div>

                                                    </div>
                                                ))}
                                                <div className="col-sm-12" >
                                                    <label>Remark</label>

                                                    <input type="text" name="not_remark" value={not_Remark} onChange={handleChange} className="form-control" />


                                                    <input type="submit" name="submit" onClick={SubmitEditBoq} className="btn btn-success" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default Edit_boq;