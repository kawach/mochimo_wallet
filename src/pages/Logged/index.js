import {useSelector} from "react-redux";
import {BrowserRouter as Router, Link, Switch, useRouteMatch} from "react-router-dom";
import Home from "./Home";
import {Modal} from "../../components/Modal";
import {useState} from "react";
import _ from "lodash";
import {hash, xorArray} from "../../utils/walletServices";

const Logged = () => {

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
        }
    }

    console.log(isActive)

    return (
        <Router>
            <section className="hero">
                <div className="hero-body">
                    <div className={"level-right"}>
                        <div className={"level-item p-5"}>
                            <div className={"buttons"}>
                            <button className="button is-medium" onClick={handleDownload}> Download </button>
                            <button className="button is-medium" id={"newBalance"} onClick={handleClick}> New Balance</button>
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
            <Modal isActive={isActive} setActive={setIsActive} content={<p> test </p>} save={handleClick}>
                <Link to={"/logged"} className="button is-success">
                    Create
                </Link>
            </Modal>
        </Router>
    )
}

export {Logged}