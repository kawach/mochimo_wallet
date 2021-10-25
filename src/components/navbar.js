import {Link} from "react-router-dom";
import logo from '../mochimo-pq-logo.svg'

export const Navbar = () => {

    return (
        <nav className="navbar is-5" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to={"/"}>
                    <img src={logo} height={"150px"}/>
                </Link>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link to={"/"} className="navbar-item">
                        Home
                    </Link>

                    <Link to={"/new"} className="navbar-item">
                        New
                    </Link>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            More
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                About
                            </a>
                            <a className="navbar-item">
                                Jobs
                            </a>
                            <a className="navbar-item">
                                Contact
                            </a>
                            <hr className="navbar-divider"/>
                            <a className="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to={"/new"} className="button is-primary">
                               New Wallet
                            </Link>
                            <Link to={"/"} className="button is-light">
                               Log-in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}