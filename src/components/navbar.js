import {Link} from "react-router-dom";
import logo from '../mochimo-pq-logo.svg'

export const Navbar = (props) => {

    const handleClick = (event) => {
        let test = document.querySelectorAll('[data-target]')
        // test.classList.toggle("is-active")
        test.forEach((item)=>{item.classList.toggle("is-active")})
        // let target = test.dataset.target
        // let menu = document.getElementById(target)
        // menu.classList.toggle('is-active')
    }
    return (
        <nav className="navbar is-5" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                {props.isAuthenticated ? <Link to={"/logged"}><img src={logo} style={{height: "60px"}}/></Link> : <Link to={"/"}><img src={logo} style={{height: "60px"}}/></Link>}

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={handleClick}
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className="navbar-menu" data-target="navbarBasicExample">
                <NavbarStart/>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to={"/"} className="button is-primary">
                                Current wallet
                                : {props.isAuthenticated ? (props.isAuthenticated.wallet_name ? props.isAuthenticated.wallet_name : "Un-named") : "Not Connected"}
                            </Link>
                            {props.isAuthenticated ?
                                <Link to={"logged/settings"} className="button"> Settings </Link> : null}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
//     return !props.isAuthenticated ? (
//         <nav className="navbar is-5" role="navigation" aria-label="main navigation">
//             <div className="navbar-brand">
//                 <Link to={"/"}>
//                     <img src={logo} style={{height: "50px"}}/>
//                 </Link>
//                 <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
//                    data-target="navbar-menu" onClick={handleClick}>
//                     <span aria-hidden="true"></span>
//                     <span aria-hidden="true"></span>
//                     <span aria-hidden="true"></span>
//                 </a>
//             </div>
//
//             <div className="navbar-menu" id={"navbar-menu"}>
//                 <NavbarStart/>
//
//                 <div className="navbar-end">
//                     <div className="navbar-item">
//                         <div className="buttons">
//                             <Link to={"/new"} className="button is-primary">
//                                 New Wallet
//                             </Link>
//                             <Link to={"/"} className="button is-light">
//                                 Log-in
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     ) : (
//         <nav className="navbar is-5" role="navigation" aria-label="main navigation">
//             <div className="navbar-brand">
//                 <Link to={"/"}>
//                     <img src={logo} height={"150px"}/>
//                 </Link>
//                 <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
//                    data-target="navbarBasicExample">
//                     <span aria-hidden="true"></span>
//                     <span aria-hidden="true"></span>
//                     <span aria-hidden="true"></span>
//                 </a>
//             </div>
//
//             <div className="navbar-menu">
//                 <NavbarStart/>
//
//                 <div className="navbar-end">
//                     <div className="navbar-item">
//                         <div className="buttons">
//                             <Link to={"/new"} className="button is-primary">
//                                 New Balance
//                             </Link>
//                             <Link to={"/"} className="button">
//                                 Current wallet
//                                 : {props.isAuthenticated.wallet_name ? props.isAuthenticated.wallet_name : "un-named wallet"}
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }

const NavbarStart = () => {
    return (
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
                    <hr className="navbar-divider"/>
                    <a className="navbar-item">
                        Report an issue
                    </a>
                </div>
            </div>
        </div>
    )
}