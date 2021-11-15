import React, {useState} from 'react';
import {generatePath, Link} from "react-router-dom";
import {Input} from "../../components/input";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {UPDATE_WALLET_NAME} from "../../redux/actions";

const Settings = (props) => {
    const test = generatePath('/logged')
    const [wName, setWName] = useState()
    console.log(test)
    //    let {id,label, type, placeholder, onChange, handleBlur, value} = props
    const onChange = (event) => {
        switch (event.target.id) {
            case "wName": {
                setWName(event.target.value)
                break
            }
            case "send": {
                console.log(props)
                props.UPDATE_WALLET_NAME(wName)
                break
            }
        }
    }
    return (
        <div>
            <div className={"block"}>
                <Link to={`/logged`} className={"button is-info"}>Home</Link>
            </div>
            <div className={"box block"}>
                <Input id={"wName"} label={"Wallet Name"} type={"text"} placeholder={"Change wallet name"}
                       onChange={(event)=>{onChange(event)}} value={wName}/>
                <button className={"button is-primary"} onClick={(event)=>{onChange(event)}} id={"send"}> test</button>
            </div>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({UPDATE_WALLET_NAME}, dispatch),
    }
}


export default connect((state)=> {
    return state
}, mapDispatchToProps)(Settings);