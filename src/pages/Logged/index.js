import {useSelector} from "react-redux";
import {BrowserRouter as Router, Switch, useRouteMatch} from "react-router-dom";
import _ from 'lodash'
import {Card} from "../../components/Card";

const Logged = () => {
    const wallet = useSelector(({wallet}) => wallet)
    _.mapValues(wallet, (value) => {
        console.log(value)
    })
    let {path, url} = useRouteMatch()
    return (
        <Router>
            <section className="hero">
                <div className="hero-body">
                    <div className={"level-right"}>
                        <div className={"level-item p-5"}>
                            <div className={"buttons"}>
                            <button className="button is-medium"> Download </button>
                            <button className="button is-medium"> New Balance</button>
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Router exact={false} path={url}>
                            <div className={"box"}>
                                <Card />
                            </div>
                        </Router>
                    </Switch>
                </div>
            </section>
        </Router>
    )
}

export {Logged}