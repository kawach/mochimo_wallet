import {getBalance} from "../../utils/walletServices";
import {Modal} from "../../components/Modal";
import {Input} from "../../components/input";
import {useEffect, useState} from "react";

const {Wots} = require('mochimo')

const Balance = (props) => {
    const balance =  props.balance
    // console.log(Buffer.from(balance[1].wots_address).toString("hex"))
    // getBalance(balance[1].wots_address).then(res => res).then(res => console.log(res))
    const [isActive, setIsActive] = useState();
    const [amount, setAmount] = useState();
    const [receiver, setReceiver] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [currentBalance, setCurrentBalance] = useState();
    const wots = Buffer.from(balance[1].wots_address).toString("hex")

    let handleClick;
    const handleChange = (event) => {
        switch (event.target.id) {
            case 'amount':{
                setAmount(event.target.value)
                break
            }
            case 'receiver':{
                setReceiver(event.target.value)
                break
            }
            case 'source':{

                break
            }
        }
    };
    useEffect(()=>{
        getBalance(wots).then(res=> res.json()).then(res => setCurrentBalance(res['quorum'][0].balance))
    },[wots])

    let handleBlur;
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
                                  <div className="title">{currentBalance ? currentBalance : (<p className={"is-loading"}></p>)}</div>
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
                                  <button className={"button"} onClick={()=>{setIsActive(!isActive)}}> Action </button>
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
                                     <option>{wots}</option>
                                 </select>
                             </div>
                             <Input id={"receiver"} label={"Receiver"} type={"text"} placeholder={"********"}
                                    onChange={handleChange} handleBlur={handleBlur}/>
                             <Input id={"amount"} label={"Amount"} type={"number"} placeholder={"********"}
                                    onChange={handleChange} handleBlur={handleBlur}/>
                         </>
                     }
              >
              </Modal>
          </div>
  )
}

export {Balance}