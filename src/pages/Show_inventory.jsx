import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import '../assets/pagination.css'
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import ShowInventory_child from "../child/ShowInventory_child";
function Show_Inventory() {

  const [loading, setloading] = useState(true);

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(10);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetch(`https://sarmicrosystems.in/react_inventory/API/getInventory.php`);
      const dataJ = await data.json();
      setPost(dataJ);
      setloading(false);

    };
    fetchApi();
  }, []);
  const deleteuser = (materialId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this User !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {

          // Here is the API CAlling 

          swal("Poof! User has been deleted!", {
            icon: "success",
          });

        } else {
          swal("User is safe!");
        }
      });

  }

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = post && post.slice(firstPost, lastPost);
  const PageCount = post &&  Math.ceil(post.length / postPerPage);
  const ChangePage = ({ selected }) => {
    console.log(selected + 1);
    setNumber(selected + 1);
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
                      <h5>Inventory</h5>
                    </div>
                    <div className='card-body'>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>S No.</th>
                            <th>Vendor</th>
                            <th>Material</th>
                            <th>Model</th>
                            <th>Po NO</th>
                            <th>Project</th>
                            <th>Invoice</th>
                            <th>Quantity</th>
                            <th>View Details</th>
                            <th>Created by</th>
                            <th>Created at</th>
                            <th>See Details</th>

                          </tr>
                        </thead>
                        <tbody>
                          {currentPost && currentPost.map((users, index) => {
                            return (

                              <tr key={index}
                              >
                                <td>{index + 1}</td>
                                <td>{users.vendor}</td>
                                <td>{users.material}</td>
                                <td>{users.model}</td>
                                <td>{users.pono}</td>
                                <td>{users.project}</td>
                                <td>{users.invoice}</td>
                                <td>{users.quantity}</td>
                                <td><Link to={'/ShowInventoryDetail/' + users.materialId}> <p>View details</p></Link></td>
                                <td>{users.created_by}</td>
                                <td>{users.created_at}</td>
                                <td>
                                  <i className="fa-solid fa-pen-to-square cursor color-success" onClick={() => { setModalData(users.materialId); setModalShow(true); }} ></i>
                                  <i className="fa-solid fa-trash cursor color-danger" onClick={() => deleteuser(users.materialId)}></i>
                                </td>

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
        {
          modalData ?
            <ShowInventory_child
              show={modalShow} materialId={modalData}
              onHide={() => { console.log(modalData); setModalShow(false); setModalData(); }}
            />
            : ''
        }
      </div>
    );
  }
}

export default Show_Inventory;