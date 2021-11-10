import './App.css';
import {Navbar} from "./components/navbar"
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./pages/home/Login";
import New_Wallet from "./pages/New/new";
import Logged from "./pages/Logged";
import {toast} from "react-toastify";
import {useEffect} from "react";

function App(props) {
    toast.configure()
    const isAuthenticated = props.wallet ? props.wallet : undefined
    // console.log(isAuthenticated)
    useEffect(()=>{
        window.onbeforeunload = confirmExit;
        function confirmExit() {
            toast.error("Save you're wallet")
            return "You have attempted to leave this page. Are you sure?";
        }
    },[])
    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated}/>
            <Switch>
                <Route exact={true} path={"/mochimo_wallet"}>
                    <div className={"container"}>
                        <Login/>
                    </div>
                </Route>
                <Route exact={true} path={"/new"}>
                    <New_Wallet/>
                </Route>
                <Route path={"/logged"}>
                    <Logged />
                </Route>
            </Switch>
        </Router>
    )
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, null)(App);