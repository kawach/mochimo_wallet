import {useSelector} from "react-redux";
import {BrowserRouter as Router, Switch, useRouteMatch} from "react-router-dom";
import Home from "./Home";

const Logged = () => {
    const wallet = useSelector(({wallet}) => wallet)

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

    let {path, url} = useRouteMatch()
    return (
        <Router>
            <section className="hero">
                <div className="hero-body">
                    <div className={"level-right"}>
                        <div className={"level-item p-5"}>
                            <div className={"buttons"}>
                            <button className="button is-medium" onClick={handleDownload}> Download </button>
                            <button className="button is-medium"> New Balance</button>
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
        </Router>
    )
}

export {Logged}