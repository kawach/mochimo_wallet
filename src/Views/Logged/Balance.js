import {
    _arrayBufferToBase64,
    compute_transaction,
    generateWots,
    getBalance,
    getCurrentBlock,
    hash,
    resolveTag,
    hexToByteArray
} from "../../utils/walletServices";
import {Modal} from "../../components/Modal";
import {Input} from "../../components/input";
import {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {DELETE_BALANCE, SET_BALANCE, UPDATE_BALANCE} from "../../redux/actions";
import {toast} from "react-toastify";
import {sha256} from "../../utils/wots.mjs";

const {Wots} = require('mochimo')

const Balance = (props) => {
    let {balance} = props
    balance = balance[1]
    const [isActive, setIsActive] = useState();
    const [onHover, setHover] = useState("");
    const [amount, setAmount] = useState();
    const [receiver, setReceiver] = useState();
    const wallet = useSelector(({wallet}) => wallet)
    let wots = balance.wots_address
    let wotsType = typeof wots
    wots = wotsType === "String" ? wots : Buffer.from(wots).toString("hex")
    const [runEffect, setRunEffect] = useState(true)

    const handleRun = () => {
        setRunEffect(!runEffect)
    }

    useEffect(() => {
        const test = generateWots(hash(hash(wallet.secret + balance.id) + 0)) //TODO: Change this
        const addtest = Buffer.from(test[0]).toString("hex")
        if (balance.tag) {
            if (parseInt(balance.status) !== 1) {
                resolveTag(balance.tag).then((tag) => {
                    if (tag.address === wots) {
                        props.UPDATE_BALANCE(balance.id, balance, "status", "1")
                        getBalance(wots).then(result => props.UPDATE_BALANCE(balance.id, balance, "amount_nmcm", result))
                        toast.success(balance.tag + " is now activated")
                    } else if (tag.error === "Not Found") {
                        getCurrentBlock().then(res =>
                            (res < parseInt(balance.blockStatus) + 3 ? (
                                        toast.info(tag.message + " waiting another block"), setTimeout(() => {
                                            handleRun()
                                        }, 40000)) :
                                    props.UPDATE_BALANCE(balance.id, balance, "status", 12)
                            )
                        )
                    }
                })
            }
        }
    }, [runEffect])

    const handleClick = async (event) => {
        switch (event.target.id) {
            case "send": {
                if(receiver.length <= 24){
                    let response = await resolveTag(receiver)
                    let {address} = await response
                    await setReceiver(address)
                }
                const balanceHash = sha256(sha256(wallet.secret + balance.id) + balance.many_spent)
                const wots = generateWots(balanceHash, balance.tag);
                let source_wots = wots[0]
                let source_secret = wots[1]
                const change_wots = generateWots(sha256(sha256(wallet.secret + balance.id) + balance.many_spent + 1), balance.tag);
                let TX_fee = 500
                let remaining_amount = balance.amount_nmcm - (amount + TX_fee);
                let transaction_array = compute_transaction(source_wots, source_secret, change_wots[0], hexToByteArray(receiver), amount, remaining_amount, TX_fee);
                let transaction = _arrayBufferToBase64(transaction_array)
                let url = "https://wallet.mochimo.com/rendpoint/";
                let data = JSON.stringify({"transaction": transaction})
                const currentBlock = await getCurrentBlock()
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: data
                })
                const responseData = await response.json()
                if (responseData.sent === 0){
                    toast.error(`${responseData.error}`)
                } else {
                    toast.success("Transaction sent")
                    toast.info("TX ID : " + responseData.txid)
                    props.SET_BALANCE(balance.id,balanceHash,remaining_amount,currentBlock,balance.tag,2,Buffer.from(wots[0]).toString("hex"),balance.many_spent + 1, wallet.many_balances)
                    setRunEffect(!runEffect)
                }
            }
            case "refresh": {
                break
            }
        }
    };

    const handleChange = (event) => {
        switch (event.target.id) {
            case 'amount': {
                setAmount(parseInt(parseFloat(event.target.value).toFixed(9).toString().replaceAll(".", "")))
                break
            }
            case 'receiver': {
                setReceiver(event.target.value)
                break
            }
            case 'source': {

                break
            }
        }
    };
    const handleHover = (event) => {
        switch (event.type) {
            case "mouseenter": {
                setHover("is-active")
                break
            }
            case "mouseleave": {
                setHover("")
                break
            }
        }
    }

    return (
        <div className="card mb-5">
            <header className="card-header">
                <p className="card-header-title">
                    TAG : {balance.tag}
                </p>
                <button className="card-header-icon" aria-label="more options" onClick={() => {
                    getBalance(wots).then(result => props.UPDATE_BALANCE(balance.id , balance, "amount_nmcm", parseInt(parseFloat(result).toFixed(9))))
                }}>
                      <span className="icon">
                        <i className="fas fa-sync" aria-hidden="true"></i>
                      </span>
                </button>
            </header>
            <div className="card">
                <div className="card-content">
                    <nav className="level">
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading">Show QR code</p>
                                <p className="title"></p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading">Total MCM</p>
                                <div
                                    className="title">{balance.amount_nmcm ? Number((parseInt(balance.amount_nmcm) / 1000000000)).toFixed(9) : (
                                    <a className="button is-loading">Loading</a>)}</div>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            {balance.name ? (
                                <div>
                                    <p className="heading">Name</p>
                                    <p className="title">{balance.name}</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="heading">Un-named</p>
                                </div>
                            )}
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <div className={`dropdown ` + onHover} onMouseEnter={handleHover}
                                     onMouseLeave={handleHover}>
                                    <div className="dropdown-trigger">
                                        <button className="button" aria-haspopup="true" data-id={props.index}
                                                aria-controls="dropdown-menu">
                                            <span>Action</span>
                                            <span className="icon is-small">
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                             </span>
                                        </button>
                                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                            <div className="dropdown-content">
                                                <button className="dropdown-item button" onClick={() => {
                                                    navigator.clipboard.writeText(wots)
                                                }}>
                                                    Copy Wots
                                                </button>
                                                <hr className="dropdown-divider"/>
                                                <div className="dropdown-item" onClick={() => {
                                                    setIsActive(!isActive)
                                                }}>
                                                    Send
                                                </div>
                                                <hr className="dropdown-divider"/>
                                                <div className="dropdown-item button is-danger is-outlined"
                                                     onClick={() => {
                                                         props.DELETE_BALANCE(balance.id, balance)
                                                     }}>
                                                    Delete
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <Modal isActive={isActive} setActive={setIsActive} save={handleClick}
                   title={"Send MCM"}
                   content={
                       <>
                           <p className={"label"}> Source </p>
                           <div className="select is-link">
                               <select>
                                   <option>{balance.tag ? balance.tag : hash(wots)}</option>
                               </select>
                           </div>
                           <Input id={"receiver"} label={"Receiver"} type={"text"} placeholder={"********"}
                                  onChange={handleChange}/>
                           <Input id={"amount"} label={"Amount"} type={"number"} placeholder={"********"}
                                  onChange={handleChange}/>
                       </>
                   }
            >
                <button className="button is-success" onClick={handleClick} id={"send"}>
                    Send
                </button>
            </Modal>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({SET_BALANCE, DELETE_BALANCE, UPDATE_BALANCE}, dispatch),
    }
}

export default connect((state) => {
    return state
}, mapDispatchToProps)(Balance)


