import {useState} from "react";
import _ from 'lodash'
import {Modal} from "../../components/Modal";
import {connect} from "react-redux";
import {SET_WALLET} from "../../redux/actions";
import {bindActionCreators} from "redux";


const New_Wallet = (props, dispatch) => {
    const [seed, setSeed] = useState(undefined)
    const [pass, setPass] = useState()
    const [isActive, setIsActive] = useState(false)
    const mnemonicWords = require('mnemonic-words');
    const random = Math.floor(Math.random() * mnemonicWords.length);
    const handleClick = event => {
        switch (event.target.id) {
            case "random" : {
                console.log("test random")
                setSeed(_.sampleSize(mnemonicWords, 12))
                break
            }
            case "submit": {
                console.log("test submit")
                setIsActive(!isActive)
                // props.SET_WALLET('test','test','test')
                break
            }
        }
    }
    const handleChange = event => {
        switch (event.target.id) {
            case "pass": {
                setPass(event.target.value)
            }
        }
    }

    return (
        <div className={"container"}>
            <section className="hero">
                <div className="hero-body">
                    <div className={"box"}>
                        <div className="field">
                            <label className="label">You're seed</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="Textarea" value={seed}/>
                            </div>
                        </div>
                        <button className={"button is-primary"} onClick={handleClick} id={"random"}> Generate random seed</button>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" type="password" placeholder="********" id={"pass"} onChange={handleChange}/>
                            </div>
                        </div>
                        <button className="button is-primary" onClick={handleClick} id={"submit"}>Sign in</button>
                    </div>
                </div>
            </section>
            <Modal isActive={isActive} setActive={setIsActive} content={seed} save={handleClick}/>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({ SET_WALLET }, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(New_Wallet)