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
      {/* LEFT SIDE — LOGO */}
      <Link to="/">
        <img src={logo} alt="BurnByte Logo" className="header-logo" />
      </Link>

      {/* RIGHT SIDE — LINKS */}
      <nav className="nav-links">
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
    </header>
  );
}

