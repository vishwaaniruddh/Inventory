import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { getUser } from '../Utils/Common';


export default function AddInventory() {
  const user = getUser();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vendor, setVendor] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [material, setMaterial] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState();
  const [model, setModel] = useState("");

  const [selectedModel, setSelectedModel] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedPO, setSelectedPO] = useState("");

  const [invoice, setInvoice] = useState("");




  useEffect(() => {
    fetch(`https://sarmicrosystems.in/react_inventory/API/get_vendor.php`)
      .then(res => res.json())
      .then(
        (result) => {
          setVendor(result);
          setLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch(`https://sarmicrosystems.in/react_inventory/API/get_mat.php`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'vendor': selectedVendor }),
    })
      .then(res1 => res1.json())
      .then(
        (result2) => {
          setMaterial(result2);
        },
        (error) => {
          setError(error);
        }
      )
      .finally(() => setLoading(false));
  }, [selectedVendor]);



  useEffect(() => {
    fetch(`https://sarmicrosystems.in/react_inventory/API/getmodel.php`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'material': selectedMaterial }),
    })
      .then(res3 => res3.json())
      .then(
        (result3) => {
          // console.log(result3);
          setModel(result3);
        },
        (error) => {
          setError(error);
        }
      )
      .finally(() => setLoading(false));
  }, [selectedMaterial]);

  const [number, setNumber] = useState(0);
  const setNumberOfInput = (count) => {
    setNumber(count);
  };
  const fields = [];
  for (let i = 1; i <= number; i++) {
    fields.push("Enter Serial Number: " + i);
  }

  const [serialNumbers, setSerialNumbers] = useState([]);

  let handleChanger = (i, e) => {
    let newSerialNumbers = [...serialNumbers];
    newSerialNumbers[i] = e.target.value;
    setSerialNumbers(newSerialNumbers);
  };

  const handleSerialNumberChange = (index, value) => {
    const updatedSerialNumbers = [...serialNumbers];
    updatedSerialNumbers[index] = value;
    setSerialNumbers(updatedSerialNumbers);
  };



  const buttonRef = useRef(null);

  const [check, setCheck] = useState(false);

  const handleCheckboxChange = async () => {
    setCheck(!check);

    if (check) {
      setSerialNumbers([]);
    } else {
      try {
        const response = await axios.get('https://sarmicrosystems.in/react_inventory/API/serialNumber.php');

        fetch(`https://sarmicrosystems.in/react_inventory/API/serialNumber.php`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 'qty': number }),
        })
          .then(res3 => res3.json())
          .then(
            (result3) => {
              setSerialNumbers(result3);

            },
            (error) => {
              setError(error);
            }
          )
          .finally(() => setLoading(false));

      } catch (error) {
        console.error('Error fetching serial numbers:', error);
      }
    }
  };


  let handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    console.log(serialNumbers);
    var serial_ar = [];
    for (var i = 1; i < serialNumbers.length; i++) {
      serial_ar.push(serialNumbers[i].model);
    }
  
    if (selectedVendor && selectedMaterial && selectedModel && selectedProject && selectedPO && serial_ar) {
      try {
        const requestOptions = {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vendor: selectedVendor,
            material: selectedMaterial,
            model: selectedModel,
            po: selectedPO,
            project: selectedProject,
            invoice: invoice,
            quantity: number,
            serial_num: serialNumbers,
            created_by: user
          })
        };
  
        let res = await fetch("https://sarmicrosystems.in/react_inventory/API/addInventory.php", requestOptions);
        let resJson = await res.json();
        console.log(resJson);
        setLoading(false);
  
        if (resJson === 200) {
          swal("Good job!", "Added To Inventory Successfully !", "success");
          window.location.reload();
        } else {
          swal("Error !", "Some error occurred !", "error");
        }
      } catch (error) {
        setLoading(false);
        console.log('error = ' + error);
      }
    } else {
      swal("Error !", "Please fill all fields !", "error");
      setLoading(false);
    }
  }
  





  if (loading) {
    return <div>Please wait...</div>;
  } else {
    return (
      <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <div className="main-body">
                <div className="page-wrapper">
                  <div className="row">
                    <form onSubmit={handleSubmit} ref={buttonRef}>

                      <div className="card">
                        <div className="card-header"><h5> Add Inventory</h5></div>
                        <div className="card-body">

                          <div className="highlight">
                            <div className="row">
                              <div className="col-sm-4">
                                <label>Vendor Name</label>
                                <select
                                  className="form-control"
                                  value={selectedVendor}
                                  onChange={(e) => setSelectedVendor(e.target.value)}
                                >
                                  <option>--Choose Vendor--</option>
                                  {vendor && vendor.map((value, key) => (
                                    <option value={value.id} key={key}>
                                      {value.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="col-sm-4">
                                <label>Material</label>
                                <select
                                  className="form-control"
                                  value={selectedMaterial}
                                  onChange={(e) => setSelectedMaterial(e.target.value)}
                                >
                                  <option>--Select Material--</option>
                                  {material
                                    && material.map((value, key) => (
                                      <option value={value.material_id} key={key}>
                                        {value.material_name}
                                      </option>
                                    ))
                                  }
                                </select>
                              </div>

                              <div className="col-sm-4">
                                <label>Model</label>
                                <select
                                  className="form-control"
                                  value={selectedModel}
                                  onChange={(e) => setSelectedModel(e.target.value)}
                                >
                                  <option>--Select Model--</option>
                                  {model
                                    && model.map((value, key) => (
                                      <option value={value.model} key={key}>
                                        {value.model}
                                      </option>
                                    ))
                                  }
                                </select>
                              </div>

                              <div className="col-sm-3">
                                <label>PO NO.</label>
                                <select
                                  className="form-control"
                                  value={selectedPO}
                                  onChange={(e) => setSelectedPO(e.target.value)}

                                >
                                  <option>--Select PO--</option>
                                  {model
                                    && model.map((value, key) => (
                                      <option value={value.pono} key={key}>
                                        {value.pono}
                                      </option>
                                    ))
                                  }
                                </select>
                              </div>

                              <div className="col-sm-3">
                                <label>Project Name</label>
                                <select
                                  className="form-control"
                                  value={selectedProject}
                                  onChange={(e) => setSelectedProject(e.target.value)}
                                >
                                  <option>--Select Project--</option>
                                  {model
                                    && model.map((value, key) => (
                                      <option value={value.id} key={key}>
                                        {value.project}
                                      </option>
                                    ))
                                  }
                                </select>
                              </div>

                              <div className="col-sm-3">
                                <label>Invoice No</label>
                                <input className="form-control" type="text" value={invoice} onChange={(e) => setInvoice(e.target.value)} />
                              </div>

                              <div className="col-sm-3">
                                <label>Quantity</label>
                                <input className="form-control" type="number" value={number} onChange={(e) => setNumberOfInput(e.target.value)} />
                              </div>

                              <div className="col-sm-6">
                                <br />
                                <input type="checkbox" checked={check} onChange={handleCheckboxChange} /> &nbsp; Auto Generate Serial Number ?
                              </div>
                            </div>
                          </div>

                          <hr />

                          {number > 0 && (
                            <div className="highlight row">
                              <div className="col-sm-12">
                                {fields.map((str, index) => (
                                  <div key={index}>
                                    <span>{str}</span>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={serialNumbers[index] || ''}
                                      onChange={(e) => handleSerialNumberChange(index, e.target.value)}
                                    />
                                    <br />
                                  </div>
                                ))}

                              </div>
                            </div>
                          )}


                        </div>
                        <div className="card-footer">
                          <button type="submit" className="btn btn-primary">
                            {loading ? 'Loading...' : 'Submit'}
                          </button>
                          {/* <button type="button" className="btn btn-primary">{loading ? 'Loading...' : 'Submit'}</button> */}
                          {/* <input type="submit" className="btn btn-primary shadow-2 mb-4" value={loading ? 'Loading...' : 'Submit'} disabled={loading} /><br /> */}

                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
