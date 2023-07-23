import { Link, NavLink } from "react-router-dom";
import "./Menu.css";
import { JSX } from "react";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
//navbar - login and signup
function Menu(): JSX.Element {
    return (
        <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/sign-in'}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/register'}>
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
    );
}

export default Menu;
