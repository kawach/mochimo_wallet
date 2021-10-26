import {useState} from "react";
import _ from 'lodash'
import {Modal} from "../../components/Modal";
import {connect} from "react-redux";
import {SET_WALLET} from "../../redux/actions";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import {hash, xorArray} from "../../utils/walletServices";

const New_Wallet = (props, dispatch) => {
    const [seed, setSeed] = useState(undefined)
    const [pass, setPass] = useState()
    const [isActive, setIsActive] = useState(false)
    const mnemonicWords = require('mnemonic-words');
    const random = Math.floor(Math.random() * mnemonicWords.length);

    const handleClick = event => {
        switch (event.target.id) {
            case "random" : {
                setSeed(_.sampleSize(mnemonicWords, 12))
                break
            }
            case "confirmSeed": {
                setIsActive(!isActive)
                break
            }
            case "submit": {
                let hashed_char_array_seed = Array.from(hash(seed))
                let hashed_char_array_pass = Array.from(pass)
                let secret = xorArray(hashed_char_array_seed, hashed_char_array_pass)
                props.SET_WALLET(secret,pass)
                setIsActive(!isActive)
            }
        }
    }

    const handleChange = event => {
        switch (event.target.id) {
            case "password": {
                setPass(event.target.value)
            }
        }
    }

    const handleBlur = (event) => {
        switch (event.target.id) {
            case "password": {
                return pass ?
                setPass(hash(pass)) : null
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
                        <button className={"button is-primary"} onClick={handleClick} id={"random"}> Generate random
                            seed
                        </button>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" type="password" placeholder="********" id={"password"}
                                       onChange={handleChange} onBlur={handleBlur} />
                            </div>
                        </div>
                        <button className="button is-primary" onClick={handleClick} id={"confirmSeed"}>Sign in</button>
                    </div>
                </div>
            </section>
            <Modal isActive={isActive} setActive={setIsActive} content={seed} save={handleClick}>
                <Link to={"/logged"} className="button is-success" onClick={handleClick} id={"submit"}>
                    Words Saved
                </Link>
            </Modal>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({SET_WALLET}, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(New_Wallet)