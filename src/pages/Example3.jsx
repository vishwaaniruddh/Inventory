import React, { useState, useEffect, useRef } from "react";

const Example3 = () => {

    const [check, setCheck] = useState(false)

    const generateRandomString = () => {
        let result = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let charactersLength = characters.length;
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const [number, setNumber] = useState(0);
    const setNumberOfInput = (count) => {
      setNumber(count);
    };
    const fields = [];
    for (let i = 1; i <= number; i++) {
      fields.push("Enter Serial Number: "+i);
    }
   
    
    return (
      <div className="App">
        <input type="number" onChange={(e) => setNumberOfInput(e.target.value)} />
        Generate Automatically &nbsp;&nbsp; <input type="checkbox" onChange={(e)=>setCheck(e.target.checked)} />
        <br/>
        {fields.map((str) => {
          return(
            <>
              <span>{str}</span>
              <input type="text" value={check ? generateRandomString() : ''}/>
              <br/>
            </>
          )
        })}
      </div>
    );
};

export default Example3;
