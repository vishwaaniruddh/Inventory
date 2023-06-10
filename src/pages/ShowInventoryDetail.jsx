import React, { useEffect, useState } from 'react';
import { Barcode } from 'react-barcode';
import BarcodeComponent from './BarcodeComponent';


const ShowInventoryDetail = () => {



  const [materialId, setMaterialId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const url = window.location.href;
    const materialIdParam = url.split('/').pop();
    setMaterialId(materialIdParam);
  }, []);

  useEffect(() => {
    if (materialId) {
      fetch(`https://sarmicrosystems.in/react_inventory/API/ShowInventoryDetail.php?materialId=${materialId}`)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            setData(result);
            setLoading(false);
          },
          (error) => {
            console.warn(error);
          }
        );
    }
  }, [materialId]);

  if (loading) {
    return <div style={{ textAlign: 'center' }}>Please Wait .. </div>;
  } else {
    return (
      <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <div className="main-body">
                <div className="page-wrapper">
                  <div className="card">
                    <div className="card-header">
                      <h5>View Inventory Detail</h5>
                    </div>
                    <div className='card-body'>
                      <div className="row">
                        <div className="col-lg-12 col-xl-6">
                          <div className="table-responsive">
                            <table className="table m-0">
                              <tbody>
                                <tr>
                                  <th className='row'>Vendor</th>
                                  <td>{data.vendor}</td>
                                </tr>
                                <tr>
                                  <th className='row'>Material</th>
                                  <td>{data.material}</td>
                                </tr>
                                <tr>
                                  <th className='row'>Model</th>
                                  <td>{data.model}</td>
                                </tr>
                                <tr>
                                  <th className='row'>PO</th>
                                  <td>{data.po}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="col-lg-12 col-xl-6">
                          <div className="table-responsive">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <th className='row'>Project</th>
                                  <td>{data.project}</td>
                                </tr>

                                <tr>
                                  <th className='row'>Invoice</th>
                                  <td>{data.invoice}</td>
                                </tr>
                                <tr>
                                  <th className='row'>Quantity</th>
                                  <td>{data.quantity}</td>
                                </tr>
                                <tr>

                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Srno</th>
                            <th width="40%" style={{ textAlign: 'center' }}>Serial Number</th>
                            <th width="50%" style={{ textAlign: 'right' }}>Barcode</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.invdata && data.invdata.length > 0 && data.invdata.map((inv, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td style={{ textAlign: 'center' }}>{inv.serial_number}</td>
                              <td style={{ textAlign: 'right' }}><BarcodeComponent serialNumbers={inv.serial_number} /></td>
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
    );
  }
};

export default ShowInventoryDetail;
