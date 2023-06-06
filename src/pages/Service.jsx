import React, { useEffect, useState } from "react";
import Pagination from "react-paginate";
import '../assets/pagination.css'
import { Link } from "react-router-dom";
import swal from 'sweetalert';

import ServiceCancelModal from '../child/ServiceCancelModal';


const Service = () => {

    console.log('hi')
    document.title = "Service - CSS Inventory";

    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState({});
    const [totalRecords, settotalRecords] = useState(0)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://sarmicrosystems.in/react_inventory/API/components/get_customer.php`);
            const json = await response.json();
            setCustomer(json);
        }
        fetchData();
    }, [])


    const [currentPage, setCurrentPage] = useState(0);
    const [post, setPost] = useState([])

    const [status, setStatus] = useState('');
    const [totalPages, settotalPages] = useState(0);
    const [rolemodalData, setrolemodalData] = useState();
    const [rolemodalShow, setrolemodalShow] = useState(false);


    const [filter, setFilter] = useState({
        status: '',
        ticketId: '',
        customer: '',
        atmId: ''
    })


    const handleChange = (e) => {
        setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };





    // const acceptRequest = (mis_id) => {
    //     console.log(mis_id);

    //     swal({
    //         title: "Are you sure want to accept it?",
    //         text: "Check before proceed!",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //         confirmButtonText: "Yes, accept it!",
    //         cancelButtonText: "No, cancel plz!",
    //         closeOnConfirm: false,
    //         closeOnCancel: false
    //     })
    //         .then((isConfirm) => {
    //             if (isConfirm) {

    //                 // Here is the API CAlling 

    //                 try {

    //                     fetch(`https://sarmicrosystems.in/react_inventory/API/material/acceptRequestRemark.php`,
    //                         {
    //                             method: 'POST',
    //                             body: JSON.stringify({
    //                                 id: mis_id,
    //                             })
    //                         })
    //                         .then(res => res.json())
    //                         .then((response) => {
    //                             console.log(response);

    //                             if (response.response === 202) {
    //                                 swal(response.message, {
    //                                     icon: "success",
    //                                 });

    //                             } else {
    //                                 swal(response.message, {
    //                                     icon: "error",
    //                                 });

    //                             }

    //                         })
    //                 } catch (e) {
    //                     console.log(e)
    //                 }


    //             } else {
    //                 swal("User is safe!");
    //             }
    //         });

    // }

    const acceptRequest = (mis_id) => {
        console.log(mis_id);
    
        swal({
            title: "Are you sure want to accept it?",
            text: "Check before proceed!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            confirmButtonText: "Yes, accept it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        })
            .then((isConfirm) => {
                if (isConfirm) {
    
                    // Here is the API CAlling 
    
                    try {
    
                        fetch(`https://sarmicrosystems.in/react_inventory/API/material/acceptRequestRemark.php`,
                            {
                                method: 'POST',
                                body: JSON.stringify({
                                    id: mis_id,
                                })
                            })
                            .then(res => res.json())
                            .then((response) => {
                                console.log(response);
    
                                if (response.response === 202) {
                                    swal(response.message, {
                                        icon: "success",
                                    });
    
                                } else {
                                    swal(response.message, {
                                        icon: "error",
                                    });
    
                                }
    
                            })
                    } catch (e) {
                        console.log(e)
                    }
    
    
                } else {
                    swal("User is safe!");
                }
            });
    
    }
    


    const [wait, setWait] = useState(false)

    const handleSubmit = async (event) => {
        setWait(true);
        event.preventDefault()
        let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/material/join_getServiceRequest.php`,
            {
                method: 'POST',
                body: JSON.stringify({
                    'status': filter.status,
                    'ticketId': filter.ticketId,
                    'customer': filter.customer,
                    'atmid': filter.atmId,
                })
            });

        let resJson = await res.json();
        setPost(resJson.data)
        settotalRecords(resJson.total_records);
        settotalPages(resJson.total_records / resJson.items_per_page);
        setLoading(false);
        setWait(false)
    };
    const paginateButton = async (data) => {
        setWait(true);
        setCurrentPage(data.selected);
        console.log(data.selected);
        let pageNumber = data.selected + 1;
        let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/material/join_getServiceRequest.php`,
            {
                method: 'POST',
                body: JSON.stringify({
                    'status': filter.status,
                    'ticketId': filter.ticketId,
                    'customer': filter.customer,
                    'atmid': filter.atmId,
                    'pageNumber': pageNumber,
                })
            });

        let resJson = await res.json();
        settotalPages(resJson.total_records / resJson.items_per_page);
        settotalRecords(resJson.total_records);
        setPost(resJson.data)
        setLoading(false);
        setWait(false);


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
                                            <h5>Service</h5>

                                        </div>
                                        <div className="card-body">

                                            <form method="POST" onSubmit={handleSubmit}>
                                                <div className='row'>
                                                    <div className="col-md-3">
                                                        <select id="status" className="form-control"
                                                            onChange={handleChange}
                                                            // onChange={(e) => setStatus(e.target.value)}
                                                            name="status">
                                                            <option value="">--Select--</option>
                                                            <option value="1">Material Requirement</option>
                                                            <option value="5">Confirm Processed</option>
                                                            <option value="2">Available</option>

                                                            <option value="0">Cancelled</option>
                                                            <option value="3">Not Available</option>
                                                            <option value="4">Dispatched</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-sm-3">
                                                        <input type='text' name="ticketId" onChange={handleChange} className="form-control" placeholder="Ticket ID ... " />
                                                    </div>


                                                    <div className="col-sm-3">
                                                        <select name="customer" onChange={handleChange} className="form-control">
                                                            <option value="">-- Select Customer--</option>
                                                            {
                                                                Object.entries(customer)
                                                                    .map((cust, index) => (
                                                                        <option value={cust[1].customer} key={index}>{cust[1].customer}</option>
                                                                    )
                                                                    )
                                                            }
                                                        </select>
                                                    </div>



                                                    <div className="col-sm-3">
                                                        <input type='text' name="atmId" onChange={handleChange} className="form-control" placeholder="ATM ID ... " />
                                                    </div>


                                                    <div className="col-md-4">
                                                        <button className="btn btn-primary">Submit</button>
                                                    </div>
                                                </div>

                                            </form>


                                        </div>

                                    </div>


{wait ? 'Please wait..' : ''}
                                    {


 

        totalRecords > 0  ?
             post && !loading ?                  
                <>

                    <div className='card'>


                        <div className='card-body'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>S No.</th>
                                        <th>Actions</th>
                                        <th>Ticket ID</th>
                                        <th>Customer</th>
                                        <th>Bank</th>
                                        <th>ATM ID</th>
                                        <th>CTS BM
                                        </th>
                                        <th>Required Material Name
                                        </th>
                                        <th>Dispatch Address</th>
                                        <th>Contact Person Name</th>
                                        <th>Contact Person Mobile</th>
                                        <th>Remark</th>
                                        <th>Created Date</th>
                                        <th width="50">Location</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Zone</th>
                                        <th>MIS ID</th>
                                        <th>Created By</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {post.map((users, index) => {
                                        return (

                                            <tr key={index}
                                            >
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Link to={'/materialUpdate/' + users.mis_id}>
                                                        <button className="btn btn-info">View</button>
                                                    </Link>

                                                    <a className="btn btn-success" title="Accept" onClick={() => acceptRequest(users.mis_id)}>Accept</a>


                                                    {
                                                        filter.status != 0 ? <a data-toggle="modal" className="open-DetailDialog btn btn-danger" onClick={() => { setrolemodalData(users.mis_id); setrolemodalShow(true); }}
                                                        >Cancel</a> : ''

                                                    }


                                                </td>
                                                <td>{users.ticket_id}</td>
                                                <td>{users.customer}</td>
                                                <td>{users.bank}</td>
                                                <td>{users.atmid}</td>

                                                <td>{users.bm}</td>
                                                <td>{users.material}</td>
                                                <td>{users.delivery_address
                                                }</td>
                                                <td>{users.contact_person_name}</td>
                                                <td>{users.contact_person_mob}</td>
                                                <td>{users.remark}</td>
                                                <td>{users.created_at}</td>
                                                <td>{users.location}</td>
                                                <td>{users.city}</td>

                                                <td>{users.state}</td>
                                                <td>{users.zone}</td>




                                                <td>{users.mis_id}</td>



                                                <td>{users.user_created_by
                                                }</td>


                                            </tr>

                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination
                        pageCount={totalPages}
                        onPageChange={paginateButton}
                        initialPage={currentPage}
                        containerClassName={"paginationBttns"}
                        activeClassName={"paginationActive"}

                    />
                </> 
                :'No Records'
                                            : ''
                                            
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                rolemodalData ?

                    <ServiceCancelModal
                        show={rolemodalShow} mis_id={rolemodalData}
                        onHide={() => { setrolemodalShow(false); setrolemodalData(); }}
                    />
                    : ''
            }


        </div>



    )

}

export default Service