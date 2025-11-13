import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/burnbyte-logo.png";
import "./Header.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    window.addEventListener("authChange", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authChange", checkAuthStatus);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        {/* LEFT SIDE — LOGO */}


        {/* RIGHT SIDE — LINKS */}
        <nav className="nav-links flex gap-20">
          <Link className="header-logo" to="/">
            <img src={logo} alt="BurnByte Logo" className="" />
          </Link>

          <Link to="/">Home</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registration">Registration</Link>
            </>
          ) : (
            <Link to="/logout">Logout</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

