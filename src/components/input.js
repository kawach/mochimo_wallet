import React from "react";

export const Input = ({id,label, type, placeholder, onChange, handleBlur, value})=>{
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <input className="input" type={type} placeholder={placeholder} id={id}
                       onChange={event => onChange(event)} onBlur={handleBlur} value={value}/>
            </div>
        </div>
    )
}