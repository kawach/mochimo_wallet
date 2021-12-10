import {connect, useSelector} from "react-redux";
import {BrowserRouter as Router, Link, Route, Switch, useRouteMatch} from "react-router-dom";
import Home from "./Home";
import {Modal} from "../../components/Modal";
import {useState} from "react";
import {Input} from "../../components/input";
import {foutainWots, generateString, generateWots, getCurrentBlock, resolveTag} from "../../utils/walletServices";
import {bindActionCreators} from "redux";
import {SET_BALANCE} from "../../redux/actions";
import {isEmpty} from "lodash/lang";
import {toast} from "react-toastify";
import Settings from "../Settings/Settings";
import {sha256} from "../../utils/wots.mjs";

const Logged = (props) => {

    const [tagInput, setTagInput] = useState(undefined)
    const [spentInput, setSpentInput] = useState(0)
    const [inputWallet_Secret, setInputWallet_Secret] = useState()
    const [isActive, setIsActive] = useState()
    const wallet = useSelector(({wallet}) => wallet)
    const {path, url} = useRouteMatch()
    const handleDownload = () => {
        const fileName = wallet.wallet_name ? wallet.wallet_name : "un-named_wallet";
        const blob = new Blob([JSON.stringify(wallet)], {type: "application/json"})
        const el = document.createElement('a')
        el.href = URL.createObjectURL(blob)
        el.download = fileName + ".json"
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    }

    const handleClick = async (event) => {
        switch (event.target.id) {
            case "newBalance": {
                setIsActive(!isActive)
                break
            }
            case "balanceCreate" : {
                const wots = generateWots(sha256(sha256(wallet.secret + wallet.many_balances) + 0), tagInput);
                let address = Buffer.from(wots[0]).toString("hex")
                const currentBlock = await getCurrentBlock()
                if (tagInput) {
                    const fountain = await foutainWots(address)
                    if (isEmpty(fountain)) {
                        toast.success(` TAG : "${tagInput}" is pending activation`)
                        props.SET_BALANCE(wallet.many_balances, sha256(sha256(wallet.secret + wallet.many_balances) + 0), 0, currentBlock, tagInput, 0, address, 0)
                    } else {
                        if (fountain.error === "Tag already exists") {
                            const response = await resolveTag(tagInput)
                            console.log(address)
                            if (response.address === address) {
                                props.SET_BALANCE(wallet.many_balances, sha256(sha256(wallet.secret + wallet.many_balances) + 0), 0, currentBlock, tagInput, 0, address, 0)
                            } else {
                                toast.error(fountain.error)
                            }
                        } else {
                            toast.error(fountain.error)
                        }
                    }
                } else {
                    props.SET_BALANCE(wallet.many_balances, sha256(sha256(wallet.secret + wallet.many_balances) + 0), 0, currentBlock, tagInput, "untagged", address, 0)
                }
                setIsActive(!isActive)
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
                            <Home/>
                        </Route>
                        <Route exact={true} path={`${path}/settings`}>
                            <Settings wallet={wallet}/>
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