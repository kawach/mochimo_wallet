import React, {useState} from 'react';
import {generatePath, Link} from "react-router-dom";
import {Input} from "../../components/input";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {UPDATE_WALLET_NAME, UPDATE_WALLET_PASSWORD} from "../../redux/actions";
import {Modal} from "../../components/Modal";
import {sha256} from "../../utils/wots.mjs";
import {toast} from "react-toastify";

const Settings = (props) => {
    const [wName, setWName] = useState()
    const [isActive , setIsActive] = useState();
    const [oldPasswordInput, setOldPasswordInput] = useState();
    const [newPasswordInput, setNewPasswordInput] = useState();
    const [ConfirmNewPasswordInput, setConfirmNewPassword] = useState();

    const {wallet} = props


    const handleClick = (event) => {
        switch (event.target.id) {
            case "changePassword": {
                setIsActive(!isActive)
                break
            }
            case "saveChangePassword": {
                const currentPasswordHash = wallet.wallet_password_hash
                if (!currentPasswordHash){
                    props.UPDATE_WALLET_PASSWORD(newPasswordInput)
                    setIsActive(!isActive)
                    toast.success("Password changed")
                } else if (currentPasswordHash.toString() === oldPasswordInput.toString()){
                    props.UPDATE_WALLET_PASSWORD(newPasswordInput)
                    setIsActive(!isActive)
                    toast.success("Password changed")
                } else {
                    console.log("something went wrong")
                }
                break
            }
        }
    }

    //    let {id,label, type, placeholder, onChange, handleBlur, value} = props
    const onChange = (event) => {
        const value = event.target.value
        switch (event.target.id) {
            case "wName": {
                setWName(value)
                break
            }
            case "oldPassword": {
                setOldPasswordInput(sha256(value))
                break
            }
            case "newPassword": {
                setNewPasswordInput(sha256(value))
                break
            }
            case "confirmNewPassword": {
                setConfirmNewPassword(sha256(value))
                break
            }
            case "saveAllChanges": {
                break
            }
        }
    }
    return (
        <div>
            <div className={"block"}>
                <i className="fas fa-angle-double-left"><Link to={`/logged`}> Home</Link> </i>
            </div>
            <div className={"box block"}>
                <Input id={"wName"} label={"Wallet Name"} type={"text"} placeholder={"Change wallet name"}
                       onChange={(event)=>{onChange(event)}} value={wName}/>
                <button onClick={handleClick} id={"changePassword"}> Change password </button>
                <button className={"button is-primary"} onClick={(event)=>{onChange(event)}} id={"saveAllChanges"}>Save all changes </button>
            </div>
            <Modal isActive={isActive} setActive={setIsActive} save={handleClick}
                   title={"Change Password"}
                   content={
                       <>
                           <Input id={"oldPassword"} label={"Old Password"} type={"password"} placeholder={"Old Password"}
                                  onChange={(event)=>{onChange(event)}}/>
                           <Input id={"newPassword"} label={"New Password"} type={"password"} placeholder={"New Password"}
                                  onChange={(event)=>{onChange(event)}}/>
                           <Input id={"confirmNewPassword"} label={"Confirm Password"} type={"password"} placeholder={"Confirm Password"}
                                  onChange={(event)=>{onChange(event)}}/>
                       </>
                   }
            >
                <button className="button is-success" onClick={handleClick} id={"saveChangePassword"}>
                    Save
                </button>
            </Modal>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({UPDATE_WALLET_NAME, UPDATE_WALLET_PASSWORD}, dispatch),
    }
}


export default connect((state)=> {
    return state
}, mapDispatchToProps)(Settings);