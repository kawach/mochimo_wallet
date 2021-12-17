const Modal = (props)=> {
    let isActive = props.isActive ? "is-active" : "none"
    return(
        <div className={isActive + " modal"}>
            <div className="modal-background" onClick={()=>{props.setActive("send")}}> </div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{props.title}</p>
                    <button className="delete" aria-label="close" onClick={()=>{props.setActive("send")}}> </button>
                </header>
                <section className="modal-card-body">
                    {props.content}
                </section>
                <footer className="modal-card-foot">
                    {props.children}
                    <button className="button" onClick={()=>{props.setActive("send")}}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export {Modal}