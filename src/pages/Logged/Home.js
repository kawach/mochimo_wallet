import {connect, useSelector} from "react-redux";
import Balance from "../../Views/Logged/Balance";
import {
    _arrayBufferToBase64,
    compute_transaction,
    generateWots,
    getCurrentBlock,
    hash,
    hexToByteArray,
    resolveTag
} from "../../utils/walletServices";
import {Input} from "../../components/input";
import {Modal} from "../../components/Modal";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {bindActionCreators} from "redux";
import {DELETE_BALANCE, SET_BALANCE, UPDATE_BALANCE} from "../../redux/actions";

const Home = (props) => {

    const [amount, setAmount] = useState();
    const [receiver, setReceiver] = useState();
    const [receiverAddress, setReceiverAddress] = useState();

    const [sourceBalance, setSourceBalance] = useState();
    const [sourceWots, setSourceWots] = useState();
    const [sourceAddress, setSourceAddress] = useState();
    const [sourceRemainingAmount, setSourceRemainingAmount] = useState();
    const [sourceTotal, setSourceTotal] = useState();

    const [isActive, setIsActive] = useState();
    const wallet = useSelector(({wallet}) => wallet)

    const handleClick = async (action, balance) => {
        switch (action) {
            case "send" : {
                if (isActive) {
                    setIsActive(!isActive)
                    setSourceBalance(null)
                } else {
                    setSourceTotal(balance.amount_nmcm)
                    setSourceBalance(balance)
                    setIsActive(!isActive)
                }
                break
            }
            case "push": {
                let wots = generateWots(hash(hash(wallet.mnemonic_hash + sourceBalance.id) + sourceBalance.many_spent),sourceBalance.tag)
                let wots_receiver = receiver
                if (wots_receiver.length <= 24) {
                    let response = await resolveTag(receiver)
                    let {address} = await response
                    wots_receiver = address
                }
                const balanceHash = hash(hash(wallet.mnemonic_hash + sourceBalance.id) + (sourceBalance.many_spent + 1))
                let source_wots = wots[0]
                let source_secret = wots[1]
                const change_wots = generateWots(balanceHash, sourceBalance.tag)
                const change_wots_address = Buffer.from(change_wots[0]).toString("hex")
                let TX_fee = 500
                console.log(amount)
                let remaining_amount = sourceTotal - (amount + TX_fee);
                let transaction_array = compute_transaction(source_wots, source_secret, change_wots[0], hexToByteArray(wots_receiver), amount, remaining_amount, TX_fee);
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
                let responseData = await response.text()
                responseData = JSON.parse(responseData.substr(0, responseData.length - 1))
                if (responseData.sent === 0) {
                    toast.error(`${responseData.error}`)
                } else {
                    toast.success("Transaction sent")
                    toast.info("TX ID : " + responseData.txid)
                    props.SET_BALANCE(sourceBalance.id, balanceHash, remaining_amount, currentBlock, sourceBalance.tag, 2, Buffer.from(change_wots[0]).toString("hex"), sourceBalance.many_spent + 1, wallet.many_balances)
                }
                break;
            }
            default:
                break;
        }
    }

    useEffect(() => {

        if (sourceBalance) {
            console.log(sourceBalance.id)
            const wots = generateWots(hash(hash(wallet.mnemonic_hash + sourceBalance.id) + sourceBalance.many_spent), sourceBalance.tag)
            setSourceWots(wots)
            const address = Buffer.from(wots[0]).toString("hex")
            setSourceAddress(address)
        }
    }, [sourceBalance])

    useEffect(() => {
        if (receiver) {
            if (receiver.length === 24) {
                resolveTag(receiver).then(({address}) => {
                    setReceiverAddress(address)
                })
            }
        }
    }, [receiver])

    const handleChange = (event) => {
        switch (event.target.id) {
            case 'amount': {
                if (isNaN(parseInt(parseFloat(event.target.value).toFixed(9).toString().replaceAll(".", "")))) {
                    event.target.classList.add("is-danger")
                    event.target.classList.remove("is-success")

                } else {
                    setAmount(parseInt(parseFloat(event.target.value).toFixed(9).toString().replaceAll(".", "")))
                    setSourceRemainingAmount(sourceTotal - parseInt(parseFloat(event.target.value).toFixed(9).toString().replaceAll(".", "")))
                    event.target.classList.remove("is-danger")
                    event.target.classList.add("is-success")
                }
                break
            }
            case 'receiver': {
                setReceiver(event.target.value)
                if (event.target.value) {
                    if (event.target.value.length === 24) {
                        event.target.classList.remove("is-danger")
                        event.target.classList.toggle("is-success")
                    } else {
                        event.target.classList.remove("is-success")
                        event.target.classList.add("is-danger")
                    }
                }
                break
            }
            case 'source': {
                break
            }
            default:
                break;
        }
    };

    return wallet.balances ? (
        <>
            <h1 className={"title"}> Balances </h1>
            {
                wallet.many_balances > 0 ? Object.entries(wallet.balances).map((balance, index) => {
                    return (
                        <>
                            <Balance balance={balance} key={balance[1].id} index={index} onClick={handleClick}/>
                            {sourceBalance ?
                                <Modal isActive={isActive} setActive={handleClick} save={handleClick}
                                       title={"Send MCM"}
                                       content={
                                           <>
                                                   <p className={"label"}> Source </p>
                                                   <div className="select is-link">
                                                       <select>
                                                           <option> {sourceBalance.tag ? sourceBalance.tag : hash(sourceAddress)} </option>
                                                       </select>
                                                   </div>

                                               <span className={"control"}>
                                                   <p className={"control"}>
                                                      Total MCM :
                                                       {Number((parseInt(sourceTotal) / 1000000000)).toFixed(9)}
                                                   </p>
                                               </span>

                                               <Input id={"receiver"} label={"Receiver"} type={"text"}
                                                      placeholder={"TAG or Address will received the MCM"}
                                                      onChange={handleChange}/>
                                               <Input id={"amount"} label={"Amount"} type={"number"}
                                                      placeholder={"i.eg 1.52"}
                                                      onChange={handleChange}/>
                                               <span className={"control"}>
                                                       Remaining :
                                                   {sourceRemainingAmount}
                                               </span>
                                           </>
                                       }
                                >
                                    <button className="button is-success" onClick={() => {
                                        handleClick("push")
                                    }} id={"push"}>
                                        Send
                                    </button>
                                </Modal> : ""}
                        </>
                    )
                }) : ("")
            }
        </>
    ) : (
        <div className={"box"}>
            <p> no balances </p>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({SET_BALANCE, DELETE_BALANCE, UPDATE_BALANCE}, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(Home)

