import './App.css';
import {Navbar} from "./components/navbar"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./pages/home/Login";
import New_Wallet from "./pages/New/new";
import Logged from "./pages/Logged";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {About} from "./pages/about/About";
import {Report} from "./pages/report/Report";

function App(props) {
    toast.configure()
    const isAuthenticated = props.wallet ? props.wallet : undefined
    // console.log(isAuthenticated)
    useEffect(() => {
        window.onbeforeunload = confirmExit;

        function confirmExit() {
            toast.error("Save you're wallet")
            return "You have attempted to leave this page. Are you sure?";
        }
    }, [])
    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated}/>
            <Switch>
                <Route exact={true} path={"/mochimo_wallet/"}>
                    <div className={"container"}>
                        <Login/>
                    </div>
                </Route>
                <Route exact={true} path={"/new"}>
                    <New_Wallet/>
                </Route>
                <Route path={"/logged"}>
                    <Logged/>
                </Route>
                <Router exact={true} path={"/about"}>
                    <About/>
                </Router>
                <Router exact={true} path={"/report"}>
                    <Report/>
                </Router>
            </Switch>
            <footer className="footer">
                <div className="content has-text-centered">
                    <div className="columns">
                        <div className="column">
                            <ul className="menu-list">
                                <p className="menu-label">
                                    Official Links
                                </p>
                                <li><a href={"https://mochimo.org/"} target="_blank">Mochimo.org</a></li>
                                <li><a href={"https://discord.gg/sjyNHWJ2Kc"} target="_blank">Mochimo discord</a></li>
                            </ul>
                        </div>
                        <div className="column is-half">
                            <p>
                                <strong>Mochimo wallet</strong> by <a href="https://github.com/kawach">Easy
                                Peasy#6972</a> & <a href="https://github.com/NickP005">NickP05#6940</a>.
                            </p>
                        </div>
                        <div className="column">
                            <nav className={"menu"}>
                                <ul className="menu-list">
                                    <p className="menu-label">
                                        Other links
                                    </p>
                                    <li><a href={"https://www.mochimap.com/explorer"} target="_blank">Mochimap - Explorer</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </footer>
        </Router>
    )
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, null)(App);
