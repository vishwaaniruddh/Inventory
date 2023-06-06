import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { getUser } from '../Utils/Common';
import Swal from 'sweetalert2';

const RoleModal = (props) => {
  const { userid, onHide } = props;
  const user = getUser();
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState({});
  const [selectedRoles, setSelectedRoles] = useState('');
  const [permission, setPermission] = useState({});
  const [rolesPermission, setRolesPermission] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(true); // State to track modal visibility

  useEffect(() => {
    async function getAssignedPermissions() {
      let response = await fetch(
        `https://sarmicrosystems.in/react_inventory/API/user/getAssignedPermissions.php`,
        {
          method: 'POST',
          body: JSON.stringify({
            userid: userid,
          }),
        }
      );
      response = await response.json();
      setRolesPermission(response);
      setSelectedRoles(response.role);
      const permString = response.permission;
      setCheckedItems(permString.split(','));
    }
    getAssignedPermissions();

    const fetchData = async () => {
      const rolesdata = await axios.get(
        `https://sarmicrosystems.in/react_inventory/API/getRoles.php`
      );
      const permissiondata = await axios.get(
        `https://sarmicrosystems.in/react_inventory/API/admin/getPermission.php`
      );
      setRoles(rolesdata.data);
      setPermission(permissiondata.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        `https://sarmicrosystems.in/react_inventory/API/admin/saveRolePermission.php`,
        {
          method: 'POST',
          body: JSON.stringify({
            role: selectedRoles,
            rolepermission: checkedItems,
            user: userid,
            created_by: user,
          }),
        }
      );
      let resJson = await res.json();
      if (resJson.response === '202') {
        swal({
          title: 'Success',
          text: resJson.message,
          icon: 'success',
        }).then(() => {
          props.onHide(); // Close the modal when swal is closed
        });
      } else if (resJson.response === '102') {
        swal('Error', resJson.message, 'error');
      } else if (resJson.response === '302') {
        swal('Error', resJson.message, 'error');
      }
    } catch (error) {}
  };
  

  if (loading) {
    return null; // Return null or a loading indicator while loading
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalVisible} // Use the state variable to control modal visibility
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <b> Roles & Permission </b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {roles.map((role, index) => (
              <div className="col-sm-4" key={index}>
                <input
                  type="radio"
                  value={role.id}
                  name="roles"
                  onChange={(e) => setSelectedRoles(e.target.value)}
                  defaultChecked={
                    rolesPermission.role === role.id ? 'defaultChecked' : ''
                  }
                />{' '}
                &nbsp; {role.role}
              </div>
            ))}
          </div>
          <hr />

          <div className="permissions">
            <div className="row">
              {permission.map((perm, index) => (
                <div
                  key={index}
                  className="col-sm-4"
                  style={{ padding: '10px' }}
                >
                  <p style={{ padding: '1px' }}>
                    <b>{perm.permissionName}</b>
                  </p>
                  <div className="subpermission">
                    {perm.permissionFor.map((nestperm, ind) => (
                      <div
                        key={ind}
                        nestperm={nestperm.permissionId}
                        className="custom-control custom-switch"
                      >
                        <input
                          type="checkbox"
                          name="permissionid[]"
                          className="custom-control-input"
                          id={'customSwitch' + index + ind}
                          value={nestperm.permissionId}
                          checked={
                            checkedItems.indexOf(nestperm.permissionId) !== -1
                          }
                          onChange={() => {
                            if (
                              checkedItems.indexOf(nestperm.permissionId) === -1
                            ) {
                              setCheckedItems([
                                ...checkedItems,
                                nestperm.permissionId,
                              ]);
                            } else {
                              setCheckedItems(
                                checkedItems.filter(
                                  (i) => i !== nestperm.permissionId
                                )
                              );
                            }
                          }}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={'customSwitch' + index + ind}
                        >
                          {nestperm.permissionFor}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <input
              type="submit"
              name="submit"
              value="Assign Roll & Permission"
              className="btn btn-success"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoleModal;
