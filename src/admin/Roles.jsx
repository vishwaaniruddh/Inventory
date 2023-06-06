import React, { useState } from 'react'
import { useEffect } from 'react';
import swal from 'sweetalert';
import { getUser } from '../Utils/Common';
const Roles = () => {

    const userid = getUser();
    const [roleName, setRoleName] = useState('');

    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState({});

    let handleSubmit = async (e) => {
        e.preventDefault();
        let res = await fetch('http://sarmicrosystems.in/react_inventory/API/roles.php', {
            method: 'POST',
            body: JSON.stringify({
                roleName: roleName,
                userid: userid,
            }),
        });
        let resJson = await res.json()
        console.log(resJson)
        setRoleName(roleName)
        if (resJson.status === 202) {
            swal("Good job!", resJson.message, "success");
            window.location.reload();
        } else if (resJson.status === 103) {
            swal("Error !", resJson.message, "error");
        }
        else if (resJson.status === 502) {
            swal("Error !", resJson.message, "error");
        }
        else if (resJson.status === 302) {
            swal("Error !", resJson.message, "error");
        }
    }



    useEffect(() => {
        fetch(`https://sarmicrosystems.in/react_inventory/API/getRoles.php`)
            .then(res => res.json())
            .then(
                (response) => {
                    setRoles(response);
                    setLoading(false);
                },
                (error) => {
                    console.warn(error);
                }
            )
    }, [])


    if (loading) {

    } else {
        return (
            <div className="pcoded-main-container">
                <div className="pcoded-wrapper">
                    <div className="pcoded-content">
                        <div className="pcoded-inner-content">
                            <div className="main-body">
                                <div className="page-wrapper">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5> Roles </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className='row'>
                                                        <div className='col-sm-12'>
                                                            <input type="text" name="rolename" value={roleName} onChange={(e) => setRoleName(e.target.value)} className="form-control" placeholder="Role Name" required />
                                                        </div>

                                                        <div className='col-sm-3'>
                                                            <input type="submit" name='submit' value="Add Role" className='btn btn-success' />
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="card">
                                        <div className="card-header">
                                            <h5> Roles </h5>
                                        </div>
                                        <div className="card-body">
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th>Srno</th>
                                                        <th>Role</th>
                                                        <th>Created At</th>
                                                        <th>Created By</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {roles.map((role, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{role.role}</td>
                                                            <td>{role.created_at}</td>
                                                            <td>{role.created_by}</td>
                                                            <td className="actiondiv">
                                                                <a className="fa-background" href={'/admin/permission/' + role.id} data-permission='Edit Role'>
                                                                    <i className="fas fa-pen"></i>
                                                                </a>
                                                                <a href="" className="fa-background"><i className="fas fa-trash color-danger"></i></a>
                                                            </td>
                                                        </tr>

                                                    ))}


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

export default Roles