import React, { useState } from "react";
import Pagination from "react-paginate";
import '../assets/pagination.css'

function ExamplePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 100;
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState('');
  const [totalPages, settotalPages] = useState(0)


  const handleSubmit = async (event) => {
    event.preventDefault();
    let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/material/getServiceRequest.php`,
      {
        method: 'POST',
        body: JSON.stringify({
          status: status,
        })
      });

    let resJson = await res.json();
    setPost(resJson.data)
    settotalPages(resJson.total_records);
    setLoading(false);

  };



  const handlePageClick = async (data) => {
    setCurrentPage(data.selected);
    let pageNumber = data.selected + 1;
    let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/material/getServiceRequest.php`,
      {
        method: 'POST',
        body: JSON.stringify({
          status: status,
          pageNumber: pageNumber,
        })
      });

    let resJson = await res.json();



    settotalPages(resJson.total_records);
    setPost(resJson.data)
    setLoading(false);

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

                      <form method="POST">
                        <div className='row'>
                          <div className="col-md-9">
                            <select id="status" className="form-control" onChange={(e) => setStatus(e.target.value)} name="status">
                              <option value="">--Select--</option>
                              <option value="1">Material Requirement</option>
                              <option value="5">Confirm Processed</option>
                              <option value="2">Available</option>

                              <option value="0">Cancelled</option>
                              <option value="3">Not Available</option>
                              <option value="4">Dispatched</option>
                            </select>
                          </div>
                          <div className="col-md-3">
                            <input className="btn btn-primary" type="submit" value="Search" onClick={handleSubmit} />
                          </div>
                        </div>

                      </form>


                    </div>

                  </div>

                  {
                    post && !loading ?
                      <>

                        <div className='card'>

                          <div className='card-body'>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>S No.</th>
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
                          onPageChange={handlePageClick}
                          initialPage={currentPage}
                          containerClassName={"paginationBttns"}
                          activeClassName={"paginationActive"}

                        />
                      </> :
                      ''
                  }


                  {/* <ReactPaginate
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    pageCount={PageCount}
                                    onPageChange={ChangePage}
                                    containerClassName={"paginationBttns"}
                                    activeClassName={"paginationActive"}
                                    disableInitialCallback={true}
                                    initialPage={1}
                                ></ReactPaginate> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  )

}
export default ExamplePagination;
