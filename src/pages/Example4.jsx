import React, { useReducer, useRef, useState } from "react";
// import { formReducer, INITIAL_STATE } from "./formReducer";
const style = {
    form :{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        textAlign: 'center',
        marginTop: '5px',
      },
      button :{
        cursor: 'pointer',
      },
      tags:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
      },
      small :{
        border: '1px solid gray',
        borderRadius: '5px',
        padding: '1px 10px',
        cursor: 'pointer',
      },
      quantity:{
        marginTop: '10px',
        display: 'flex',
        gap: '10px',
      },
}



const Form = () => {

    // USING USESTATE

    const [product, setProduct] = useState({
        title: "",
        desc: "",
        price: 0,
        category: "",
        tags: [],
        images: {
            sm: "",
            md: "",
            lg: "",
        },
        quantity: 0,
    });

    const handleChange = (e) => {
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const tagRef = useRef();

    const handleTags = () => {
        const tags = tagRef.current.value.split(",");
        tags.forEach((tag) => {
            setProduct((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
        });
    };

    const handleRemoveTag = (tag) => {
        setProduct((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }));
    };

    const handleIncrease = () => {
        setProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
    };

    const handleDecrease = () => {
        setProduct((prev) => ({
            ...prev,
            quantity: prev.quantity - 1,
        }));
    };

const handleClick = (e) =>{
    e.preventDefault();
    console.log(product)
}


const [selectedOptions, setSelectedOptions] = useState({
    gender: "",
    membership: ""
  });

  const handleOptionChange = (event) => {
    setSelectedOptions({ ...selectedOptions, [event.target.name]: event.target.value });
  };


    //USING USEREDUCER

    //   const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
    //   const tagRef = useRef();

    //   const handleChange = (e) => {
    //     dispatch({
    //       type: "CHANGE_INPUT",
    //       payload: { name: e.target.name, value: e.target.value },
    //     });
    //   };

    //   const handleTags = () => {
    //     const tags = tagRef.current.value.split(",");
    //     tags.forEach((tag) => {
    //       dispatch({ type: "ADD_TAG", payload: tag });
    //     });
    //   };

    return (

        // USING USESTATE
        <div className="pcoded-main-container">
            <div className="pcoded-wrapper">
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        <div className="main-body">
                            <div className="page-wrapper">
                                <div className="row">
                                    <div className="card">
                                        <div className="card-header">

                                        </div>
                                        <div className="card-body">



                                            <div>


                                            <div>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={selectedOptions.gender === "male"}
            onChange={handleOptionChange}
          />
          <label>Male</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={selectedOptions.gender === "female"}
            onChange={handleOptionChange}
          />
          <label>Female</label>
        </div>
        <br />
        <div>
          <input
            type="radio"
            name="membership"
            value="member"
            checked={selectedOptions.membership === "member"}
            onChange={handleOptionChange}
          />
          <label>Member</label>
        </div>
        <div>
          <input
            type="radio"
            name="membership"
            value="non-member"
            checked={selectedOptions.membership === "non-member"}
            onChange={handleOptionChange}
          />
          <label>Non-member</label>
        </div>









                                                <form onSubmit={handleClick} style={style.form}>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        onChange={handleChange}
                                                        placeholder="Title"
                                                        className="form-control"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="desc"
                                                        onChange={handleChange}
                                                        placeholder="Desc"
                                                        className="form-control"
                                                    />
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="price"
                                                        onChange={handleChange}
                                                        placeholder="Price"
                                                    />
                                                    <p>Category:</p>
                                                    <select 
                                                        className="form-control"
                                                        name="category" id="category" onChange={handleChange}>
                                                        <option value="sneakers">Sneakers</option>
                                                        <option value="tshirts">T-shirts</option>
                                                        <option value="jeans">Jeans</option>
                                                    </select>
                                                    <p>Tags:</p>
                                                    <textarea
                                                        className="form-control"
                                                        ref={tagRef}
                                                        placeholder="Seperate tags with commas..."
                                                    ></textarea>
                                                    <button type="button" onClick={handleTags}>
                                                        Add Tags
                                                    </button>
                                                    <div className="tags" style={style.tags}>
                                                        {product.tags.map((tag) => (
                                                            <small key={tag} onClick={() => handleRemoveTag(tag)}>
                                                                {tag}
                                                            </small>
                                                        ))}
                                                    </div>
                                                    <div className="quantity" style={style.quantity}>
                                                        <button type="button" onClick={handleDecrease}>
                                                            -
                                                        </button>
                                                        <span>Quantity ({product.quantity})</span>
                                                        <button type="button" onClick={handleIncrease}>
                                                            +
                                                        </button>
                                                    </div>
<button>Submit</button>
                                                </form>
                                            </div>




                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        //USING USEREDUCER

        // <div>
        //   <form>
        //     <input
        //       type="text"
        //       placeholder="Title"
        //       onChange={handleChange}
        //       name="title"
        //     />
        //     <input
        //       type="text"
        //       placeholder="Desc"
        //       onChange={handleChange}
        //       name="desc"
        //     />
        //     <input
        //       type="number"
        //       placeholder="Price"
        //       onChange={handleChange}
        //       name="price"
        //     />
        //     <p>Category:</p>
        //     <select onChange={handleChange} name="category">
        //       <option value="sneakers">Sneakers</option>
        //       <option value="tshirts">T-shirts</option>
        //       <option value="jeans">Jeans</option>
        //     </select>
        //     <p>Tags:</p>
        //     <textarea
        //       ref={tagRef}
        //       placeholder="Seperate tags with commas..."
        //     ></textarea>
        //     <button onClick={handleTags} type="button">
        //       Add Tags
        //     </button>
        //     <div className="tags">
        //       {state.tags.map((tag) => (
        //         <small
        //           onClick={() => dispatch({ type: "REMOVE_TAG", payload: tag })}
        //           key={tag}
        //         >
        //           {tag}
        //         </small>
        //       ))}
        //     </div>
        //     <div className="quantity">
        //       <button onClick={() => dispatch({ type: "DECREASE" })} type="button">
        //         -
        //       </button>
        //       <span>Quantity ({state.quantity})</span>
        //       <button onClick={() => dispatch({ type: "INCREASE" })} type="button">
        //         +
        //       </button>
        //     </div>
        //   </form>
        // </div>
    );
};

export default Form;
