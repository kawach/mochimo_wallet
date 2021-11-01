import {
    _arrayBufferToBase64,
    compute_transaction,
    generateWots,
    getBalance,
    getCurrentBlock,
    hash
} from "../../utils/walletServices";
import {Modal} from "../../components/Modal";
import {Input} from "../../components/input";
import {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {DELETE_BALANCE, SET_BALANCE, UPDATE_BALANCE} from "../../redux/actions";
import {toast} from "react-toastify";

const {Wots} = require('mochimo')

const Balance = (props) => {
    let {balance} = props
    balance = balance[1]
    const [isActive, setIsActive] = useState();
    const [onHover, setHover] = useState("");
    const [amount, setAmount] = useState();
    const [receiver, setReceiver] = useState();
    const [balanceAmount, setBalanceAmount] = useState();
    const [currentBalance, setCurrentBalance] = useState();
    const wallet = useSelector(({wallet}) => wallet)
    const wots = Buffer.from(balance.wots_address[0]).toString("hex")

    const handleClick = (event) => {
        switch (event.target.id) {
            case "send": {
                let source_wots = balance.wots_address[0]
                let source_secret = balance.wots_address[1]
                const change_wots = generateWots(hash(hash(wallet.secret + wallet.many_balances + 1) + 0), balance.tag)
                let TX_fee = 500
                let remaining_amount = currentBalance - (amount + TX_fee);
                let transaction_array = compute_transaction(balance.wots_address[0], balance.wots_address, change_wots[0], receiver.hexToByteArray(), amount, remaining_amount, TX_fee);
                let transaction = _arrayBufferToBase64(transaction_array)
                let url = "http://api.mochimo.org:8888/push";
                let data = JSON.stringify({"transaction": transaction})
                let xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            getCurrentBlock().then((block) => {
                                toast.success("Transaction sent")
                                props.SET_BALANCE(wallet.many_balances, hash(hash(wallet.secret + wallet.many_balances + 1) + 0), 0, block, balance.tag ? balance.tag : "", "Activated", change_wots, 0)
                                props.DELETE_BALANCE(balance.id, balance)
                            })
                        } else if (xhr.status !== 200) {
                            toast.error("Failed to send transaction")
                        }
                    }
                };
                xhr.send(data);
            }
            case "refresh":{
                break
            }
        }
    };

    const handleChange = (event) => {
        switch (event.target.id) {
            case 'amount': {
                setAmount(parseInt(event.target.value))
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

    useEffect(() => {
        getBalance(wots).then(res => res.json()).then(res => props.UPDATE_BALANCE(balance.id, balance,'amount_nmcm',res['quorum'][0].balance))
    }, [wots])

    return (
        <div className="card mb-5">
            <header className="card-header">
                <p className="card-header-title">
                    TAG : {balance.tag}
                </p>
                <button className="card-header-icon" aria-label="more options" onClick={handleClick} id={"refresh"}>
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
                                <p className="heading">Total nMCM</p>
                                <div className="title">{balance.amount_nmcm ? balance.amount_nmcm : (
                                    <p className={"is-loading"}></p>)}</div>
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
        ...bindActionCreators({SET_BALANCE, DELETE_BALANCE,UPDATE_BALANCE}, dispatch),
    }
}

export default connect((state) => {
    return state
}, mapDispatchToProps)(Balance)


