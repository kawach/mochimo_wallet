import React from "react";

export const Input = ({id,label, type, placeholder, onChange, handleBlur, value,classes})=>{
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <input className={`input ${classes}`} type={type} placeholder={placeholder} id={id}
                       onChange={event => onChange(event)} onBlur={handleBlur} value={value}/>
            </div>
        </div>
    )
}