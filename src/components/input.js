import React, {useState} from "react";

export const Input = (props)=>{
    let {id,label, type, placeholder, onChange, handleBlur} = props
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <input className="input" type={type} placeholder={placeholder} id={id}
                       onChange={event => onChange(event)} onBlur={handleBlur} />
            </div>
        </div>
    )
}