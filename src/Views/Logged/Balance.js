import {_arrayBufferToBase64, compute_transaction, generateWots, getBalance, hash} from "../../utils/walletServices";
import {Modal} from "../../components/Modal";
import {Input} from "../../components/input";
import {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";

const {Wots} = require('mochimo')

const Balance = (props) => {
    const {balance} = props
    // console.log(Buffer.from(balance[1].wots_address).toString("hex"))
    // getBalance(balance[1].wots_address).then(res => res).then(res => console.log(res))
    const [isActive, setIsActive] = useState();
    const [amount, setAmount] = useState();
    const [receiver, setReceiver] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [currentBalance, setCurrentBalance] = useState();
    const wallet = useSelector(({wallet}) => wallet)
    const wots = Buffer.from(balance[1].wots_address[0]).toString("hex")
    // console.log(balance[1].wots_address[0])
    console.log(wots)
    const handleClick = () => {
        let source_wots = balance[1].wots_address[0]
        let source_secret = balance[1].wots_address[1]
        const change_wots = generateWots(hash(hash(wallet.secret + wallet.many_balances + 1) + 0), balance[1].tag)
        let TX_fee = 500
        let remaining_amount = currentBalance - (amount + TX_fee);

        let transaction_array = compute_transaction(balance[1].wots_address[0], balance[1].wots_address[1], change_wots[0], receiver.hexToByteArray(), amount, remaining_amount, TX_fee);
        console.log(_arrayBufferToBase64(transaction_array))
        fetch("http://api.mochimo.org:8888/api/v2/push", {
            headers: {
                "Content-Type": "application/json"
            },
            body: {"transaction":_arrayBufferToBase64(transaction_array),"recipients":"5"},
            method: "POST"
        }).then(res => console.log(res))
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
    useEffect(() => {
        getBalance(wots).then(res => res.json()).then(res => setCurrentBalance(res['quorum'][0].balance))
    }, [wots])

    console.log(typeof amount)

    return (
        <div className="card mb-5">
            <header className="card-header">
                <p className="card-header-title">
                    TAG : {balance[1].tag}
                </p>
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
                                <div className="title">{currentBalance ? currentBalance : (
                                    <p className={"is-loading"}></p>)}</div>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading">Name</p>
                                <p className="title">{balance[1].name ? balance[1].name : "un-named balance"}</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <button className={"button"} onClick={() => {
                                    setIsActive(!isActive)
                                }}> Action
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <Modal isActive={isActive} setActive={setIsActive} save={handleClick}
                   title={"Send MCM"}
                   content={
                       <>
                           <div className="select is-link">
                               <select>
                                   <option>{hash(wots)}</option>
                               </select>
                           </div>
                           <Input id={"receiver"} label={"Receiver"} type={"text"} placeholder={"********"}
                                  onChange={handleChange}/>
                           <Input id={"amount"} label={"Amount"} type={"number"} placeholder={"********"}
                                  onChange={handleChange}/>
                       </>
                   }
            >
                <button className="button is-success" onClick={handleClick} id={"balanceCreate"}>
                    Send
                </button>
            </Modal>
        </div>
    )
}

export default connect((state) => {
    return state
}, null)(Balance)


