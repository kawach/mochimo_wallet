import {useState} from "react";
import {isArray} from "underscore";
import {render} from "react-dom";
import {isUndefined} from "lodash/lang";

const Modal = (props)=> {
    let isActive = props.isActive ? "is-active" : "none"
    const [active, setActive] = useState()
    return(
        <div className={isActive + " modal"}>
            <div className="modal-background" onClick={()=>{props.setActive(!props.isActive)}}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Did you saved you're mnemonic sentence ?</p>
                    <button className="delete" aria-label="close" onClick={()=>{props.setActive(!props.isActive)}}></button>
                </header>
                <section className="modal-card-body">
                    {props.content}
                </section>
                <footer className="modal-card-foot">
                    {props.children}
                    <button className="button" onClick={()=>{props.setActive(!props.isActive)}}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export {Modal}