import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ViewMaterial = () => {

    const { materialId } = useParams();
    const [data, setData] = useState({});
    const [loading, setloading] = useState(true);


    console.log(materialId)

    useEffect(() => {

        fetch(`https://sarmicrosystems.in/react_inventory/API/getSingleMaterial.php?materialId=` + materialId)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.response == 202) {
                        setData(result);
                        setloading(false);
                    }

                },
                (error) => {
                    console.warn(error);
                }
            )
    }, [materialId])


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
                                            <h5>View Material</h5>
                                        </div>
                                        <div className='card-body'>

                                            <table className="table m-0" border="1">
                                                <tbody>
                                                    <tr>
                                                        <th>Vendor</th>
                                                        <td>{data.vendor}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Material</th>
                                                        <td>{data.material}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Created By</th>
                                                        <td>{data.created_by}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Details</h5>
                                        </div>
                                        <div className="card-body">
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th>Sr No</th>
                                                        <th>Model</th>
                                                        <th>PONO</th>
                                                        <th>Project</th>
                                                    </tr>
                                                </thead>

                                                <tbody>


                                                    {
                                                        data.model_data.map((model, index) => (
                                                            <tr key={index}>
                                                                <td>{++index}</td>
                                                                <td>{model.model}</td>
                                                                <td>{model.pono}</td>
                                                                <td>{model.project}</td>
                                                            </tr>
                                                        ))
                                                    }
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

export default ViewMaterial