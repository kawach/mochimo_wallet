import {Link} from "react-router-dom";
import logo from '../mochimo-pq-logo.svg'

export const Navbar = (props) => {
    const handleClick = (event) => {
        let test = document.querySelectorAll('[data-target]')
        test.forEach((item) => {
            item.classList.toggle("is-active")
        })
    }

    return (
        <nav className="navbar is-5" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                {props.isAuthenticated ? <Link to={"/logged"}><img src={logo} style={{height: "60px"}} alt={"Mochimo Logo"}/></Link> :
                    <Link to={"/"}><img src={logo} style={{height: "60px"}} alt={"Mochimo Logo"}/></Link>}

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={handleClick}
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className="navbar-menu" data-target="navbarBasicExample">
                <NavbarStart isAuthenticated={props.isAuthenticated}/>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to={props.isAuthenticated ? "/logged" : "/"} className="button is-primary">
                                Current wallet
                                : {props.isAuthenticated ? (props.isAuthenticated.wallet_name ? props.isAuthenticated.wallet_name : "Un-named") : "Not Connected"}
                            </Link>
                            {props.isAuthenticated ?
                                (<>
                                    <Link to={"/"} className="button is-danger"> Logout </Link>
                                </>)
                                :
                                null}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

const NavbarStart = ({isAuthenticated}) => {
    return (
        <div className="navbar-start">
            <Link to={isAuthenticated ? "/logged" : "/"} className="navbar-item">
                Home
            </Link>
            {isAuthenticated ?
                ("")
                :
                (<Link to={"/new"} className="navbar-item">
                    New
                </Link>)
            }

            <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                    More
                </a>
                <div className="navbar-dropdown">
                    <Link to={"/about"} className="navbar-item">
                        About
                    </Link>
                    <hr className="navbar-divider"/>
                    <Link to={"/report"} className="navbar-item">
                        Report an issue
                    </Link>
                </div>
            </div>
        </div>
    )
}