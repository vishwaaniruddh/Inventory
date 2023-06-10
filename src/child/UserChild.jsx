import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserChild = (props) => {
  const { userid, updateTableData } = props;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const updateState = (e) => {
    let n = { ...user, [e.target.name]: e.target.value };
    setUser(n);
  };

  let SubmitEditedUsers = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/admin/update_user.php`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          contact: user.contact,
          email: user.email,
          id: userid
        }),
      });
      let resJson = await res.json();
      if (resJson === 200) {
        swal('Good job!', 'User Updated Successfully!', 'success');
        props.onHide();

        // Call the `updateTableData` callback to update the table data in the parent component
        updateTableData();
      } else {
        swal('Error!', 'Some error occurred!', 'error');
      }
    } catch (error) {
      console.log('error = ' + error);
    }
  };

  useEffect(() => {
    fetch(`https://sarmicrosystems.in/react_inventory/API/get_users.php?userid=` + userid)
      .then(res => res.json())
      .then((response) => {
        setUser(response[0]);
        setLoading(false);
      });
  }, [userid]);

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
    );
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
            <b> Edit </b> - <u>{user.name}</u>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='row'>
              <div className='col-sm-12 col-md-4'>
                <label>Name</label>
                <input type="text" name="name" className="form-control" value={user.name} onChange={updateState} />
              </div>
              <div className='col-sm-12 col-md-4'>
                <label>Email</label>
                <input type="email" name="email" className="form-control" value={user.email} onChange={updateState} />
              </div>
              <div className='col-sm-12 col-md-4'>
                <label>Contact</label>
                <input type="number" name="contact" className="form-control" value={user.contact} onChange={updateState} />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <input type="submit" name="submit" onClick={SubmitEditedUsers} className="btn btn-success" />
        </Modal.Footer>
      </Modal>
    );
  }
};

export default UserChild;
