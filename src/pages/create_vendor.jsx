import React ,{ useState,useEffect} from 'react';
import { getUser } from '../Utils/Common';
import swal from 'sweetalert';
import Vendor_child from '../child/Vendor_child';
function Create_vendor() {
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(10);
  const user = getUser();

  const closeBootstrapModal = () => {
    setModalShow(false);
    setModalData();
  };





  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetch(`https://sarmicrosystems.in/react_inventory/API/get_vendor.php`);
      const dataJ = await data.json();
      setPost(dataJ);
    };
    fetchApi();
  }, []);

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = post && post.slice(firstPost, lastPost); // Check if post is not null or undefined
  const PageCount = post ? Math.ceil(post.length / postPerPage) : 0; // Check if post is not null or undefined
  


  const ChangePage = ({ selected }) => {
    console.log(selected + 1);
    setNumber(selected + 1);
  }
  
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
            swal("Poof! User has been deleted!", {
                icon: "success",
              });
            } else {
              swal("User is safe!");
            }
          });
        };


    

    let addVendor = async (e) =>{
        e.preventDefault();
        try{

            let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/create_vendor.php?name=`+name+`&email=`+email+`&contact=`+contact+`&address=`+address+`&created_by=`+user,{
                method:'POST',
                body:JSON.stringify({
                    name:name,
                    email:email,
                    contact:contact,
                    address:address
                }),
            });

            let resJson = await res.json();
            
            if(resJson===1){
                swal("Good job!", "Vendor added Successfully !", "success");
                // window.location.reload();
            }else{
                swal("Error !", "Vendor added Error !", "error");
            }

        }catch(error){
            console.log(error);
            setMessage('Error : ' + error);
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
                                    <div className="col-sm-12">                                
                                        <form onSubmit={addVendor}>
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5> Create Vendor </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label className="form-label">Name</label>
                                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">Email</label>
                                                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label" >Contact</label>
                                                        <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">Address</label>
                                                        <input type="text" className="form-control" placeholder="" value={address} onChange={(e) => setAddress(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <button className="btn btn-primary me-2">Submit</button>
                                                </div>
                                                <div className="message">{message ? <p>{message}</p> : null}</div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className='card'>
                  <div className='card-header'>
                    <h5>All Vendors</h5>

                 {/* <Link to ='/admin/create_vendor'><button className="btn-primary">Add vendor</button></Link> */}
                  </div>
                  <div className='card-body'>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>S No.</th>
                          <th>Vendor</th>
                          <th>Email</th>
                          <th>Contact</th>
                          <th>Actions</th>

                        </tr>
                      </thead>
                      <tbody>
                        {currentPost && currentPost.map((users, index) => {
                          return (

                            <tr key={index}
                            >
                              <td>{index + 1}</td>
                              <td>{users.name}</td>
                              <td>{users.email}</td>
                              <td>{users.contact}</td>
                              <td className="actiondiv">
                                <i className="fa-solid fa-pen-to-square cursor color-success"  onClick={() => { setModalData(users.id); setModalShow(true); }} ></i>
                                <i className="fa-solid fa-trash cursor color-danger"  onClick={() => deleteuser(users.userid)}></i>
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
                    <Vendor_child
                    show={modalShow}
                    id={modalData}
                    onHide={closeBootstrapModal} // 

                        // show={modalShow} id={modalData}
                        // onHide={() => { setModalShow(false); setModalData(); }}
                    />
                    : ''
            }
        </div >

    );
}

export default Create_vendor;
