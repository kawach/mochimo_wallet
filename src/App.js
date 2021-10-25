import './App.css';
import {Navbar} from "./components/navbar"
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import {connect} from "react-redux";
import {Login} from "./components/Login";
import New_Wallet from "./pages/New/new";

function App(props) {
    console.log(props)
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Router exact={true} path={"/"}>
                    <div className={"container"}>
                        <Login />
                    </div>
                </Router>
                <Router exact={true} path={"/new"}>
                    <New_Wallet />
                </Router>
                <Router exact={true} path={"/logged"}>
                    <p> logged page </p>
                </Router>
            </Switch>
        </Router>
    );
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, null)(App);
