import {useState} from "react";

const Modal = (props)=> {
    let isActive = props.isActive ? "is-active" : "none"
    const [active, setActive] = useState()
    return(
        <div className={isActive + " modal"}>
            <div className="modal-background" onClick={()=>{props.setActive(!props.isActive)}}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Modal title</p>
                    <button className="delete" aria-label="close" onClick={()=>{props.setActive(!props.isActive)}}></button>
                </header>
                <section className="modal-card-body">
                    <p> {props.content} </p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={(event)=>{props.save()}}>Save changes</button>
                    <button className="button" onClick={()=>{props.setActive(!props.isActive)}}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export {Modal}