import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {hash, xorArray} from "../../utils/walletServices"
import {bindActionCreators} from "redux";
import {SET_WALLET} from "../../redux/actions";
import {connect} from "react-redux";
import FileInput from "../../components/fileInput";
import {Input} from "../../components/input";
import Textarea from "../../components/Textarea";
import {sha256} from "../../utils/wots.mjs";

const Login = (props) => {
    const [selected, setSelected] = useState()
    const [file, setFile] = useState(null)
    const [handleFile, setHandleFile] = useState(null)
    const [input, setInput] = useState()
    const [method, setMethod] = useState("file")
    const history = useHistory()
    // eslint-disable-next-line no-unused-vars

    const handleClick = (event) => {
        switch (event.target.id) {
            case "submit" : {
                switch (method) {
                    case "file": {
                        let wallet = handleFile
                        const version = parseInt(wallet.version)
                        if (version > 1) {
                            if (wallet.wallet_password_hash.toString().localeCompare(sha256(input)) === 0) {
                                wallet.secret = xorArray(wallet.wallet_public, sha256(input))
                                props.SET_WALLET(wallet)
                                history.push('/logged')
                            }
                        } else
                        {
                            if (wallet.wallet_password_hash.toString().localeCompare(hash(input)) === 0) {
                                wallet.secret = xorArray(wallet.wallet_public, sha256(input))
                                props.SET_WALLET(wallet)
                                history.push('/logged')
                            }
                        }
                        break
                    }
                    case "recovery": {
                        props.SET_WALLET("", "", hash(input))
                        history.push('/logged')
                        break
                    }
                }
            }
                break
            case "recovery": {
                setMethod("recovery")
                break
            }
            case "file": {
                setMethod("file")
                break
            }
        }

    }

    useEffect(() => {
        let blob = file ? file : new Blob([])
        let reader = new FileReader()
        reader.readAsText(blob)
        reader.onload = (data) => {
            return data.target.result ?
                setHandleFile(JSON.parse(data.target.result)) : null
        }
    }, [file])

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
                            <li><a id={'recovery'}>Mnemonic phrase</a></li>
                        </ul>
                    </div>
                    {method === "file" ? <> <FileInput handleInput={handleInput} file={file}/> <Input type={"password"}
                                                                                                      id={'input'}
                                                                                                      label={"Password"}
                                                                                                      placeholder={"*******"}
                                                                                                      onChange={handleInput}/> </> :
                        <Textarea value={input} onChange={handleInput}/>}
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

export default connect(null, mapDispatchToProps)(Login)