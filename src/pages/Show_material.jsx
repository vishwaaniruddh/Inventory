import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import '../assets/pagination.css'
import Material_child from "../child/Material_child";
import swal from 'sweetalert';
import { Link } from "react-router-dom";

function Show_material() {
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(10);

  const [loading, setloading] = useState(true)
  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetch(`https://sarmicrosystems.in/react_inventory/API/get_all_material.php`);
      const dataJ = await data.json();    
      console.log(data)

      setPost(dataJ);
      setloading(false);
      
    };
    fetchApi();
  }, []);
  const deleteuser = (id) => {
    console.log(id);

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

          swal("Poof! Material has been deleted!", {
            icon: "success",
          });

        } else {
          swal("Material is safe!");
        }
      });

}


if(loading){
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

}else{
  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = post && post.slice(firstPost, lastPost);
  const PageCount = post && Math.ceil(post.length / postPerPage);
  const ChangePage = ({ selected }) => {
    console.log(selected + 1);
    setNumber(selected + 1);
  };


  return (
    <div className="pcoded-main-container">
      <div className="pcoded-wrapper">
        <div className="pcoded-content">
          <div className="pcoded-inner-content">
            <div className="main-body">
              <div className="page-wrapper">
                <div className='card'>
                  <div className='card-header'>
                    <h5>Materials</h5>
                  </div>
                  <div className='card-body'>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>S No.</th>
                          <th>Vendor</th>
                          <th>Material</th>
                          <th>Model</th>
                          <th>Created by </th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPost && currentPost.map((users, index) => {
                          return (

                            <tr key={index}
                            >
                              <td>{index + 1}</td>
                              <td>{users.vendor_name}</td>
                              <td>{users.material}</td>
                              <td><Link to ={'/viewMaterial/'+ users.id }> <p>View details</p></Link></td>
                              <td>{users.created_by_name}</td>
                              <td>
                                <i style={{margin:'10px'}} className="fa-solid fa-pen-to-square cursor color-success" onClick={() => { setModalData(users.id); setModalShow(true); }}  ></i>
                                <i className="fa-solid fa-trash cursor color-danger" onClick={() => deleteuser(users.userid)} ></i>
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
                    <Material_child
                        show={modalShow} id={modalData}
                        onHide={() => { console.log(modalData); setModalShow(false); setModalData(); }}
                    />
                    : ''
            }
    </div>


  );

}


}

export default Show_material;






