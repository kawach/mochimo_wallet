import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {bArr_toString, hash, hexToByteArray, xorArray} from "../../utils/walletServices"
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

    const handleClick = (event) => {
        switch (event.target.id) {
            case "submit" : {
                switch (method) {
                    case "file": {
                        let wallet = handleFile
                        const version = parseFloat(wallet.version)
                        const passwordHash = wallet.wallet_password_hash || wallet.password_hash
                        if (version > 1) {
                            if (passwordHash === "" || !passwordHash){
                                props.SET_WALLET(wallet)
                                history.push('/logged')
                            } else if (passwordHash.toString().localeCompare(hash(input)) === 0) {
                                console.log(wallet)
                                // wallet.mnemonic_hash = xorArray(wallet.wallet_public, sha256(input))
                                // hexToByteArray(wallet.mnemonic_hash)
                                props.SET_WALLET(wallet)
                                history.push('/logged')
                            }
                        } else
                        {
                            if (passwordHash.localeCompare(Buffer.from(sha256(input)).toString("hex").toUpperCase()) === 0) {
                                // wallet.mnemonic_hash = xorArray(hexToByteArray(wallet.mnemonic_hash), sha256(input))
                                console.log(wallet.mnemonic_hash)
                                props.SET_WALLET(wallet)
                                history.push('/logged')
                            }
                        }
                        break
                    }
                    case "recovery": {
                        const seed = input.toString().replaceAll(","," ").trim()
                        const wallet = {
                            mnemonic_hash: hash(seed),
                            many_balances: 0,
                            balances: null,
                            wallet_name: "recovered",
                        }
                        props.SET_WALLET(wallet)
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