import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/main-logo.png";
import { useHamburger } from '../../hooks/useCustomHooks';
import "./Header.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMenuActive = useHamburger();

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
        <nav className="nav-links flex gap-20">
          <Link className="header-logo" to="/">
            <img src={logo} alt="BurnByte Logo"/>
          </Link>

          <Link className="desktop-only" to="/">Home</Link>

          {!isLoggedIn ? (
            <>
              <Link className="desktop-only" to="/login">Login</Link>
              <Link className="desktop-only" to="/registration">Registration</Link>
            </>
          ) : (
            <>
              <Link className="desktop-only" to="/history">History</Link>
              <Link className="desktop-only" to="/logout">Logout</Link>
            </>
          )}

          <div className={`icon-hamburger trigger-menu ${isMenuActive ? 'menu-active' : ''}`}>
				    <span></span>
			    </div>
        </nav>
      </div>

      <div className={`site-responsive-menu ${isMenuActive ? 'menu-active' : ''}`}>
        <nav className="nav-links flex gap-20">
          <div className="link-wrap">
            <Link to="/">Home</Link>
          </div>

          {!isLoggedIn ? (
            <>
              <div className="link-wrap">
                <Link to="/login">Login</Link>
              </div>

              <div className="link-wrap">
                <Link to="/registration">Registration</Link>
              </div>
            </>
          ) : (
            <>
              <div className="link-wrap">
                <Link to="/history">History</Link>
              </div>

              <div className="link-wrap">
                <Link to="/logout">Logout</Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}