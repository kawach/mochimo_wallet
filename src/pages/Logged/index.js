import {connect, useSelector} from "react-redux";
import {BrowserRouter as Router, Link, Switch, useRouteMatch} from "react-router-dom";
import Home from "./Home";
import {Modal} from "../../components/Modal";
import {useState} from "react";
import {Input} from "../../components/input";
import {generateString, generateWots, hash} from "../../utils/walletServices";
import {bindActionCreators} from "redux";
import {SET_BALANCE} from "../../redux/actions";
const { Wots } = require('mochimo');

const Logged = (props) => {

    const [tagInput, setTagInput] = useState(undefined)
    const [spentInput, setSpentInput] = useState(undefined)
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
            case "balanceCreate" :{
                // const wots = Wots.generate(hash(wallet.secret + wallet.many_balances).toUpperCase());
                // const addresse =  Buffer.from(wots.address).toString('hex')
                // const wots = generateWots(hash(wallet.secret + wallet.many_balances))
                    // wots[0]
                const wots = generateWots(hash(hash(wallet.secret + wallet.many_balances) + spentInput), tagInput)
                props.SET_BALANCE(wallet.many_balances ,hash(wallet.secret + wallet.many_balances),"test","test",tagInput,wots,0)
                setIsActive(!isActive)
                break
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
            case "spent":{
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

    console.log(props)
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
                    </div>
                    <Switch>
                        <Router exact={false} path={url}>
                            <Home />
                        </Router>
                    </Switch>
                </div>
            </section>
            <Modal isActive={isActive} setActive={setIsActive} save={handleClick}
                   title={"Create a new balance"}
                   content={
                       <>
                           <Input id={"tag"} label={"Tag"} type={"text"} placeholder={"Enter a tag"}
                                  onChange={handleChange} value={tagInput}/>
                           <Input id={"spent"} label={"spent"} type={"text"} placeholder={"Enter spent times"}
                                  onChange={handleChange} value={spentInput}/>
                           <button onClick={handleClick} id={"random"} className={"button is-info"}> random tag </button>
                       </>
                   }
            >
                {/*  let {id,label, type, placeholder, onChange, handleBlur} = props*/}
                <button  className="button is-success" onClick={handleClick} id={"balanceCreate"}>
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

export default connect(null,mapDispatchToProps)(Logged)