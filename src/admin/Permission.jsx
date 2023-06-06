import React, { useState, useEffect } from 'react'
import swal from 'sweetalert';
import { getUser } from '../Utils/Common';

const Permission = () => {
    const userid = getUser();
    const [permission, setPermission] = useState('');
    const [permissionFor, setPermissionFor] = useState('');

    const [apiPermission, setApiPermission] = useState({})

    const [loading, setLoading] = useState(true)


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/admin/savePermission.php`, {
                method: 'POST',
                body: JSON.stringify({
                    permission: permission,
                    permissionFor: permissionFor,
                    userid :  userid,
                }),
            });

            let resJson = await res.json();
            console.log(resJson);
            if (resJson.response == 202) {
                setPermission(permission);
                setPermissionFor(permissionFor);

                swal('Success', resJson.message, 'success');
                window.location.reload();
            } else if (resJson.response == 102) {
                swal('Error', resJson.message, 'error');
                window.location.reload();
            } else if (resJson.response == 102) {
                swal('Error', resJson.message, 'error');
                window.location.reload();
            }
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        fetch(`https://sarmicrosystems.in/react_inventory/API/admin/getPermission.php`)
            .then(res => res.json())
            .then(
                (response) => {
                    setApiPermission(response)
                    setLoading(false);
                }
            )
    }, [])


    if (loading) {
        return <div>Please Wait ...</div>
    } else {

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
                                                <h5>Permissions</h5>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className='row'>
                                                        <div className='col-sm-12'>
                                                            <label>Permission For</label>
                                                            <input type="text" className='form-control' value={permission} onChange={(e) => setPermission(e.target.value)} required />
                                                        </div>
                                                        <div className='col-sm-12'>
                                                            <label>Permission Name</label>
                                                            <input type="text" className='form-control' value={permissionFor} onChange={(e) => setPermissionFor(e.target.value)} required />
                                                        </div>
                                                        <div className='col-sm-12'>
                                                            <input type="submit" className='btn btn-success' value="Create Permission" />
                                                        </div>
                                                    </div>
                                                </form>


                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header">
                                                <h5> Roles </h5>
                                            </div>
                                            <div className="card-body">
                                                <table className='table'>
                                                    <thead>
                                                        <tr>
                                                            <th>Srno</th>
                                                            <th>Permission Name</th>
                                                            <th>Permission For</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {apiPermission.map((role, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{role.permissionName}</td>
                                                                <td style={{padding: '0.3rem 1.1rem'}}>
                                                                    <ol>{
                                                                        role.permissionFor.map((d, i) => (
                                                                            <li key={i}>
                                                                                {d.permissionFor}
                                                                            </li>
                                                                        ))

                                                                    }
                                                                    </ol>
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
            </div>
        )
    }

}

export default Permission