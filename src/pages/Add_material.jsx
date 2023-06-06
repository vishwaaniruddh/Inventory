import React, { useEffect, useState, useRef } from 'react'
import swal from 'sweetalert';
import { getUser } from '../Utils/Common';
import { useForm } from "react-hook-form";

export default function Add_material() {

    const [loading, setLoading] = useState(false);
    const [validate,setValidate] = useState(false);
    const user = getUser();
    const [vendor, setVendor] = useState(false);
    const [material, setMaterial] = useState('');
    const [model, setModel] = useState([{ model: "", pono: "", project: "" }])
    const [items, setItems] = useState([]);

    const { register, watch, formState: { errors } } = useForm();



    useEffect(() => {
        fetch(`https://sarmicrosystems.in/react_inventory/API/get_vendor.php`)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                },
                (error) => {
                    console.log(error)
                }
            );

        buttonRef.current.click();

    }, [])

    let handleChange = (i, e) => {
        let newmodel = [...model];
        newmodel[i][e.target.name] = e.target.value;
        setModel(newmodel);

    }

    let addFormFields = () => {
        setModel([...model, { model: "", pono: "", project: "" }])
    }

    let removeFormFields = (i) => {
        let newmodel = [...model];
        newmodel.splice(i, 1);
        setModel(newmodel)
    }



    let handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        var model_arr = [];
        var pono_ar = [];
        var project_ar = [];

        for (var i = 0; i < model.length; i++) {
            model_arr.push(model[i].model);
            pono_ar.push(model[i].pono);
            project_ar.push(model[i].project);

        }
        if (vendor && material && model_arr && pono_ar && project_ar && user) {
            try {
                let res = await fetch(`https://sarmicrosystems.in/react_inventory/API/add_material.php`, {
                    method: "POST",
                    body: JSON.stringify({
                        'vendor': vendor,
                        'material': material,
                        'model': model_arr,
                        'pono': pono_ar,
                        'project': project_ar,
                        'created_by': user,

                    }),
                });

                let resJson = await res.json();
                setLoading(false);

                if (resJson === 1) {

                    swal("Good job!", "Material added Successfully !", "success");
                    window.location.reload();
                } else {
                    swal("Error !", "Some error occured !", "error");
                }
            }






            catch (err) {
                setLoading(false);

                console.log('err' + err);
            }
        } else {

        }
    }
    const buttonRef = useRef(null);



    return (
        <div className="pcoded-main-container">
            <div className="pcoded-wrapper">
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        <div className="main-body">
                            <div className="page-wrapper">
                            <form onSubmit={handleSubmit}>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>Add Material</h5>
                                            </div>
                                            <div className='card-block'>
                                                <div className="form-group">
                                                    <label className="form-label">Vendor</label>
                                                    <select name='vendor' {...register("vendor")} className='form-control' value={vendor} onChange={(e) => setVendor(e.target.value)} required>
                                                        <option value="">Select</option>
                                                        {items.map((item, index) => (
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Material Name</label>
                                                    <input type="text" name='material' {...register("material")} value={material} onChange={(e) => setMaterial(e.target.value)} className='form-control' required/>
                                                </div>

                                                <div className='card highlight'>
                                                    <div className='card-block'>

                                                        <div className="form-group model">

                                                            {
                                                                model ?
                                                                    model.map((element, index) => (
                                                                        <div className={index === 1 ? 'form-inline row rownumber1' : 'form-inline row'} key={index}>
                                                                            {
                                                                                index
                                                                                    ?
                                                                                    <><div className='col-sm-4'><label className="form-label">Model No</label><input type="text" name="model" className='form-control' value={element.model || ""} onChange={e => handleChange(index, e)} required /></div>
                                                                                        <div className='col-sm-4'><label className="form-label">Po No</label><input type="text" name="pono" className='form-control' value={element.pono || ""} onChange={e => handleChange(index, e)}  required  /></div>
                                                                                        <div className='col-sm-4'><label className="form-label">Project</label><input type="text" name="project" className='form-control' value={element.project || ""} onChange={e => handleChange(index, e)} required  /></div>
                                                                                        <div style={{ 'textAlign': 'right' }}><i className="fa-solid fa-minus remove_danger" onClick={() => removeFormFields(index)}></i></div>
                                                                                    </>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    )) : null}

                                                        </div>
                                                        <i className="fa-solid fa-plus add_success" ref={buttonRef} onClick={() => addFormFields()}></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">

                                            <input type="submit" className="btn btn-primary shadow-2 mb-4" value={loading ? 'Loading...' : 'Submit'} disabled={loading} /><br />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
