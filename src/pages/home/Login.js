import {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {hash} from "../../utils/walletServices"
import {bindActionCreators} from "redux";
import {SET_WALLET} from "../../redux/actions";
import {connect} from "react-redux";

const Login = (props) => {
    const [selected, setSelected] = useState()
    const [file, setFile] = useState(null)
    const [handleFile, setHandleFile] = useState(null)
    const [input, setInput] = useState()
    const history = useHistory()

    const handleClick = (event) => {
        switch (event.target.id) {
            case "submit" : {
                let wallet = handleFile
                if (wallet.wallet_password_hash.toString().localeCompare(hash(input)) === 0){
                    props.SET_WALLET(wallet.wallet_secret, wallet.wallet_password_hash)
                    history.push("/logged")
                }
            }
        }
    }

    useEffect(()=>{
        console.log("file changed")
        let blob = file ? file : new Blob([])
        console.log("blob", blob)
        let reader = new FileReader()
        reader.readAsText(blob)
        reader.onload = (data)=>{
            return data.target.result ?
            setHandleFile(JSON.parse(data.target.result)) : null
        }
    },[file])

    const handleInput = (event) => {
        event.target.files ? setFile(event.target.files[0]) : setInput(event.target.value)
    }

    return (
        <section className="hero">
            <div className="hero-body">
                <div className={"box"}>
                    <div className="tabs">
                        <ul onClick={handleClick}>
                            <li><a id={"file"}>File</a></li>
                            <li><a id={'other'}>Other method</a></li>
                            <li><a id={'recovery'}>Mnemonic phrase</a></li>
                        </ul>
                    </div>
                    <div className="file has-name is-fullwidth">
                        <label className="file-label">
                            <input className="file-input" type="file" name="resume" onChange={handleInput}/>
                            <span className="file-cta">
                              <span className="file-icon">
                                <i className="fas fa-upload"></i>
                              </span>
                              <span className="file-label">
                                Choose a file…
                              </span>
                            </span>
                            <span className="file-name">
                              {file ? file.name : "load wallet file"}
                            </span>
                        </label>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="********" onChange={handleInput}
                                   id={"input"}/>
                        </div>
                    </div>
                    <button className="button is-primary" onClick={handleClick} id={"submit"}>Sign in</button>
                </div>
            </div>
        </section>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({SET_WALLET}, dispatch),
    }
}

export default connect(null,mapDispatchToProps)(Login)