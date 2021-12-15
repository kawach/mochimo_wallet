import {useState} from "react";
import _ from 'lodash'
import {Modal} from "../../components/Modal";
import {connect} from "react-redux";
import {SET_WALLET} from "../../redux/actions";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import {hash} from "../../utils/walletServices";
import Textarea from "../../components/Textarea";

const New_Wallet = (props) => {
    const [mnemonic, setMnemonic] = useState(undefined)
    const [pass, setPass] = useState()
    const [isActive, setIsActive] = useState(false)
    const mnemonicWords = require('mnemonic-words');

    const handleClick = event => {
        switch (event.target.id) {
            case "random" : {
                setMnemonic(_.sampleSize(mnemonicWords, 12))
                break
            }
            case "confirmSeed": {
                setIsActive(!isActive)
                break
            }
            case "submit": {
                let seed = hash(mnemonic.toString().replaceAll(","," "))
                let passHash = hash(pass)
                const wallet = {
                    // wallet_public: _public,
                    password_hash: passHash,
                    mnemonic_hash: seed,
                    many_balances: 0,
                    version: 1.1,
                }
                props.SET_WALLET(wallet)
                setIsActive(!isActive)
                break
            }
            default : break
        }
    }

    const handleChange = event => {
        switch (event.target.id) {
            case "password": {
                setPass(event.target.value)
                break
            }
            case "mnemonic": {
                setMnemonic(event.target.value)
                break
            }
            default:
                break;
        }
    }

    // useEffect(()=>{
    //     setHashedPass(hash(pass))
    // },[pass])

    return (
        <div className={"container"}>
            <section className="hero">
                <div className="hero-body">
                    <div className={"box"}>
                        <Textarea value={mnemonic} onChange={handleChange} id={"mnemonic"}/>
                        <button className={"button is-primary"} onClick={handleClick} id={"random"}> Generate random
                            mnemonic words
                        </button>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" type="password" placeholder="********" id={"password"}
                                       onChange={handleChange} />
                            </div>
                        </div>
                        <button className="button is-primary" onClick={handleClick} id={"confirmSeed"}>Sign in</button>
                    </div>
                </div>
            </section>
            <Modal isActive={isActive} setActive={setIsActive} content={mnemonic ? mnemonic.toString() : null} save={handleClick}
                title={"Save you're mnemonic words !"}
                >
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