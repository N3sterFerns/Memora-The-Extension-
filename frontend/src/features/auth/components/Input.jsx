import React from "react";

const Input = ({type="text", id="email", value="", title="Email", placeholder="email@gmail.com", setUserDetails}) => {

    const handleUserDetails = (e)=>{
        const val = e.target.value;
        setUserDetails((prev)=> ({...prev, [id]: val}))
    }

  return (
    <div className="field">
      <label>{title}</label>
      <div className="input-wrapper">
        <span className="icon">📧</span>
        <input onChange={handleUserDetails} value={value} placeholder={placeholder} type={type}  />
      </div>
    </div>
  );
};

export default Input;
