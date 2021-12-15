import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Input} from "../../components/input";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {UPDATE_WALLET_NAME, UPDATE_WALLET_PASSWORD} from "../../redux/actions";
import {Modal} from "../../components/Modal";
import {sha256} from "../../utils/wots.mjs";
import {toast} from "react-toastify";

const Settings = (props) => {
    const [wName, setWName] = useState()
    const [isActive, setIsActive] = useState();
    const [oldPasswordInput, setOldPasswordInput] = useState();
    const [newPasswordInput, setNewPasswordInput] = useState();
    const [confirmNewPasswordInput, setConfirmNewPassword] = useState();

    const {wallet} = props

    useEffect(() => {
        setNewPasswordInput("")
        setOldPasswordInput("")
        setConfirmNewPassword("")
    }, [isActive])

    const handleClick = (event) => {
        switch (event.target.id) {
            case "changePassword": {
                setIsActive(!isActive)
                break
            }
            case "saveChangePassword": {
                const currentPasswordHash = wallet.wallet_password_hash
                const hashedInput = sha256(newPasswordInput)
                if (!currentPasswordHash) {
                    props.UPDATE_WALLET_PASSWORD(hashedInput)
                    setIsActive(!isActive)
                    toast.success("Password changed")
                } else if (currentPasswordHash.toString() === sha256(oldPasswordInput).toString()) {
                    props.UPDATE_WALLET_PASSWORD(hashedInput)
                    setIsActive(!isActive)
                    toast.success("Password changed")
                } else {
                    toast.error("something went wrong")
                    setIsActive(!isActive)
                }
                break
            }
            case "saveAllChanges":{
                console.log("test")
                props.UPDATE_WALLET_NAME(wName)
                toast.success("Wallet name changed")
            }
                break;
            default:
                break;
        }
    }

    const onChange = (event) => {
        const value = event.target.value
        switch (event.target.id) {
            case "wName": {
                setWName(value)
                break
            }
            case "oldPassword": {
                setOldPasswordInput(value)
                break
            }
            case "newPassword": {
                setNewPasswordInput(value)
                break
            }
            case "confirmNewPassword": {
                setConfirmNewPassword(value)
                break
            }
            case "saveAllChanges": {
                break
            }
            default:
                break;
        }
    }
    return (
        <div>
            <div className={"block"}>
                <i className="fas fa-angle-double-left"><Link to={`/logged`}> Home</Link> </i>
            </div>
            <div className={"box block"}>
                <Input id={"wName"} label={"Wallet Name"} type={"text"} placeholder={"Change wallet name"}
                       onChange={(event) => {
                           onChange(event)
                       }} value={wName}/>
                <button onClick={handleClick} id={"changePassword"}> Change password</button>
                <button className={"button is-primary"} onClick={handleClick} id={"saveAllChanges"}>Save all changes
                </button>
            </div>
            <Modal isActive={isActive} setActive={setIsActive} save={handleClick}
                   title={"Change Password"}
                   content={
                       <>
                           <Input id={"oldPassword"} label={"Old Password"} type={"password"}
                                  placeholder={"Old Password"} value={oldPasswordInput}
                                  onChange={(event) => {
                                      onChange(event)
                                  }}/>
                           <Input id={"newPassword"} label={"New Password"} type={"password"}
                                  placeholder={"New Password"} value={newPasswordInput}
                                  onChange={(event) => {
                                      onChange(event)
                                  }}/>
                           <Input id={"confirmNewPassword"} label={"Confirm Password"} type={"password"}
                                  placeholder={"Confirm Password"} value={confirmNewPasswordInput}
                                  onChange={(event) => {
                                      onChange(event)
                                  }}/>
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


export default connect((state) => {
    return state
}, mapDispatchToProps)(Settings);