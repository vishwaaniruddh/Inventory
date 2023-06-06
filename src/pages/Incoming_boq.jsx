import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import { ShowIncomingBoqData } from '../datatables/ShowIncomingBoqData';
function Incoming_boq() {

    const [post, setPost] = useState([])
    const [number, setNumber] = useState(1);
    const [postPerPage] = useState(10);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            const data = await fetch(`https://sarmicrosystems.in/react_inventory/API/getincoming_boq.php`);
            const dataJ = await data.json();
            setPost(dataJ.data);
            setloading(false);
            //   console.log(dataJ)
        };
        fetchApi();
    }, []);

    if (loading) {

    } else {



        const lastPost = number * postPerPage;
        const firstPost = lastPost - postPerPage;
        const currentPost = post.slice(firstPost, lastPost);
        const PageCount = Math.ceil(post.length / postPerPage);
        const ChangePage = ({ selected }) => {
            console.log(selected + 1);
            setNumber(selected + 1);
        }
        return (
            <div className="pcoded-main-container">
                <div className="pcoded-wrapper">
                    <div className="pcoded-content">
                        <div className="pcoded-inner-content">
                            <div className="main-body">
                                <div className="page-wrapper">
                                    <div className='card'>
                                        <div className='card-header'>
                                            <h5>Incoming BOQ</h5>
                                        </div>
                                        <div className='card-body'>
                                            <table className='table'>
                                                <thead>
                                                    <tr>


                                                        <th>Sr no</th>
                                                        <th>ID</th>
                                                        <th>ATM - ID</th>
                                                        <th>ATM ID -2</th>
                                                        <th>ATM ID -3</th>
                                                        <th>Serial NO</th>
                                                        <th>Bank</th>
                                                        <th>Customer</th>
                                                        <th>Address</th>
                                                        <th>City</th>
                                                        <th>State</th>
                                                        <th>Pincode</th>
                                                        <th>Engineer</th>
                                                        <th>Engineer NO</th>
                                                        <th>BM Name</th>
                                                        <th>Selection type</th>
                                                        <th>Created at</th>
                                                        <th>Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {currentPost.map((users, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{users.srno}</td>
                                                                <td>{users.id}</td>
                                                                <td>{users.atmid}</td>
                                                                <td>{users.atmid2}</td>
                                                                <td>{users.atmid}3</td>
                                                                <td>{users.serial_number}</td>
                                                                <td>{users.bank}</td>
                                                                <td>{users.customer}</td>
                                                                <td>{users.address}</td>
                                                                <td>{users.city}</td>
                                                                <td>{users.state}</td>
                                                                <td>{users.pincode}</td>
                                                                <td>{users.engineer}</td>
                                                                <td>{users.engineer_number}</td>
                                                                <td>{users.bm_name}</td>
                                                                <td>{users.selection_type}</td>
                                                                <td>{users.created_at}</td>
                                                                <td><Link to={'/Edit_boq/' + users.id}><button className="btn btn-primary">Edit</button></Link></td>

                                                            </tr>

                                                        );
                                                    })}
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


        )
    }
}
export default Incoming_boq;