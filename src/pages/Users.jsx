import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import '../assets/pagination.css'
import swal from 'sweetalert';
import UserChild from '../child/UserChild';
import RoleModal from '../child/RoleModal';

const Users = () => {
  // Modal

  const [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState();

  const [rolemodalShow, setrolemodalShow] = useState(false);
  const [rolemodalData, setrolemodalData] = useState();

  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(10);

  useEffect(() => {
    document.title = "Users - CSS Inventory";

    const fetchApi = async () => {
      const data = await fetch(`https://sarmicrosystems.in/react_inventory/API/get_users.php`);
      const dataJ = await data.json();
      setPost(dataJ);
      setLoading(false);
    };
    fetchApi();
  }, []);

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = post.slice(firstPost, lastPost);
  const PageCount = Math.ceil(post.length / postPerPage);
  const ChangePage = ({ selected }) => {
    console.log(selected + 1);
    setNumber(selected + 1);
  };

  const deleteuser = async (userid) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this User!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          try {
            const res = await fetch(
              "https://sarmicrosystems.in/react_inventory/API/deleteUser.php",
              {
                method: 'POST',
                body: JSON.stringify({
                  userid: userid,
                }),
              }
            );
            const resJson = await res.json();
            if (resJson.response === '202') {
              swal({
                title: 'Success',
                text: resJson.message,
                icon: 'success',
              }).then(() => {
                // Call `updateTableData` here to refresh the table data after deletion
                updateTableData();
              });
            } else if (resJson.response === '102') {
              swal('Error', resJson.message, 'error');
            } else if (resJson.response === '302') {
              swal('Error', resJson.message, 'error');
            }
          } catch (error) {
            swal('Error', 'An error occurred', 'error');
          }

          swal("Poof! User has been deleted!", {
            icon: "success",
          });
        } else {
          swal("User is safe!");
        }
      });
  };

  const updateTableData = () => {
    const fetchApi = async () => {
      const data = await fetch(`https://sarmicrosystems.in/react_inventory/API/get_users.php`);
      const dataJ = await data.json();
      setPost(dataJ);
    };
    fetchApi();
  };

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
                <div className="row">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="card">
                        <div className='card-header'>
                          <h5>Users</h5>
                        </div>
                        <div className='card-body'>
                          <table className="table">
                            <thead>
                              <tr>
                                <th>S No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentPost.map((users, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                    <td>{users.contact}</td>
                                    <td className="actiondiv">
                                      <a className="fa-background" title="Edit">
                                        <i className="fas fa-pen" onClick={() => {
                                          setModalData(users.userid);
                                          setModalShow(true);
                                        }}></i>
                                      </a>
                                      <a className="fa-background" title="Roles & Permission" onClick={() => {
                                        setrolemodalData(users.userid);
                                        setrolemodalShow(true);
                                      }}>
                                        <i className="fa-solid fa-shield-halved"></i>
                                      </a>
                                      <a className="fa-background" title="Delete">
                                        <i className="fa-solid fa-trash cursor color-danger" onClick={() => deleteuser(users.userid)}></i>
                                      </a>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        pageCount={PageCount}
                        onPageChange={ChangePage}
                        containerClassName={"paginationBttns"}
                        activeClassName={"paginationActive"}
                        disableInitialCallback={true}
                        initialPage={0}
                      ></ReactPaginate>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalData ? (
        <UserChild
          show={modalShow}
          userid={modalData}
          onHide={() => {
            setModalShow(false);
            setModalData();
          }}
          updateTableData={updateTableData} // Pass the function to update table data as a prop
        />
      ) : null}


      {rolemodalData ? (
        <RoleModal
          show={rolemodalShow}
          userid={rolemodalData}
          onHide={() => {
            setrolemodalShow(false);
            setrolemodalData();
          }}
        />
      ) : null}
    </div>
  );
        }
};

export default Users;
