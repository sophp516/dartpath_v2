import { NavLink } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    return (
        <div id="navbar">
            <NavLink className="navbar-link" to="/profile">User</NavLink>
            <NavLink className="navbar-link" to="/">Home</NavLink>
            <NavLink className="navbar-link" to="/community">Community</NavLink>
        </div>
    )
}

export default Navbar;
