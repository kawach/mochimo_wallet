import {connect, useSelector} from "react-redux";
import {BrowserRouter as Router, Link, Route, Switch, useRouteMatch} from "react-router-dom";

import Home from "./Home";
import {Modal} from "../../components/Modal";
import {useEffect, useState} from "react";
import {Input} from "../../components/input";
import {foutainWots, generateString, generateWots, getCurrentBlock, hash} from "../../utils/walletServices";
import {bindActionCreators} from "redux";
import {SET_BALANCE} from "../../redux/actions";
import {isEmpty} from "lodash/lang";
import {toast} from "react-toastify";
import Settings from "../Settings/Settings";

const {Wots} = require('mochimo');

const Logged = (props) => {

    const [tagInput, setTagInput] = useState(undefined)
    const [spentInput, setSpentInput] = useState(0)
    const [inputWallet_Secret, setInputWallet_Secret] = useState()
    const [isActive, setIsActive] = useState()
    const wallet = useSelector(({wallet}) => wallet)
    const {path, url} = useRouteMatch()

    const handleDownload = () => {
        const fileName = "wallet";
        const blob = new Blob([JSON.stringify(wallet)], {type: "application/json"})
        const el = document.createElement('a')
        el.href = URL.createObjectURL(blob)
        el.download = fileName + ".json"
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    }

    const handleClick = (event) => {
        switch (event.target.id) {
            case "newBalance": {
                setIsActive(!isActive)
                break
            }
            case "balanceCreate" : {
                const wots = generateWots(hash(hash(wallet.secret + wallet.many_balances) + spentInput), tagInput);
                return tagInput ? foutainWots(Buffer.from(wots[0]).toString("hex")).then((res) => {
                    return isEmpty(res) ? getCurrentBlock().then((block) => (toast.success(` TAG : "${tagInput}" is pending activation`),props.SET_BALANCE(wallet.many_balances, hash(wallet.secret + wallet.many_balances), 0, block, tagInput, 0, wots, 0), setIsActive(!isActive)))
                        : (toast.error(`Activation TAG : "${tagInput}" failed`))  //TODO: handle this error
                }) : (
                    getCurrentBlock().then((block) => {
                        return (
                            props.SET_BALANCE(wallet.many_balances, hash(hash(wallet.secret + wallet.many_balances) + 0), 0, block, tagInput, "untagged", wots, 0),
                                setIsActive(!isActive)
                        )
                    })
                )
            }
            case "random" : {
                setTagInput(generateString(12))
                break
            }
        }
    }
    const handleChange = (event) => {
        switch (event.target.id) {
            case "tag": {
                setTagInput(event.target.value)
                break
            }
            case "walletPass": {
                setInputWallet_Secret(event.target.value)
                break
            }
            case "spent": {
                setSpentInput(event.target.value)
            }
        }
    }

    const handleBlur = (event) => {
        switch (event.target.id) {
            case "walletPass": {
                setInputWallet_Secret(Array.from(hash(inputWallet_Secret)))
                // let naked = xorArray(inputWallet_Secret,wallet.wallet_public)
            }
        }
    }
    return (
        <Router>
            <section className="hero">
                <div className="hero-body">
                    <div className={"level-right"}>
                        <div className={"level-item p-5"}>
                            <div className={"buttons"}>
                                <button className="button is-medium" onClick={handleDownload}> Download</button>
                                <button className="button is-medium" id={"newBalance"} onClick={handleClick}> New
                                    Balance
                                </button>
                            </div>
                        </div>
                        <Link to={`${url}/settings`}>Settings</Link>
                    </div>
                    <Switch>
                        <Route exact={true} path={"/logged"}>
                            <Home />
                        </Route>
                        <Route exact={true} path={`${path}/settings`}>
                            <Settings />
                        </Route>
                    </Switch>
                </div>
            </section>
            <Modal isActive={isActive} setActive={setIsActive} save={handleClick}
                   title={"Create a new balance"}
                   content={
                       <>
                           <Input id={"tag"} label={"Tag"} type={"text"} placeholder={"Enter a tag"}
                                  onChange={handleChange} value={tagInput}/>
                           <button onClick={handleClick} id={"random"} className={"button is-info"}> random tag</button>
                       </>
                   }
            >
                {/*  let {id,label, type, placeholder, onChange, handleBlur} = props*/}
                <button className="button is-success" onClick={handleClick} id={"balanceCreate"}>
                    Create
                </button>
            </Modal>
        </Router>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({SET_BALANCE}, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(Logged)