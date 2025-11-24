import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/main-logo.png";
import { useHamburger, useCurrentMenuItem } from '../../hooks/useCustomHooks';
import "./Header.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMenuActive = useHamburger();
  const currentPath = useCurrentMenuItem();

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

          <Link className={`desktop-only ${currentPath === '/' ? 'active' : ''}`} to="/">Home</Link>

          {!isLoggedIn ? (
            <>
              <Link className={`desktop-only ${currentPath === '/login' ? 'active' : ''}`} to="/login">Login</Link>
              <Link className={`desktop-only ${currentPath === '/registration' ? 'active' : ''}`} to="/registration">Registration</Link>
            </>
          ) : (
            <>
              <Link className={`desktop-only ${currentPath === '/body-calculator' ? 'active' : ''}`} to="/body-calculator">Body Calculator</Link>
              <Link className={`desktop-only ${currentPath === '/history' ? 'active' : ''}`} to="/history">History</Link>
              <Link className={`desktop-only ${currentPath === '/logout' ? 'active' : ''}`} to="/logout">Logout</Link>
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
            <Link className={currentPath === '/' ? 'active' : ''} to="/">Home</Link>
          </div>

          {!isLoggedIn ? (
            <>
              <div className="link-wrap">
                <Link className={currentPath === '/login' ? 'active' : ''} to="/login">Login</Link>
              </div>

              <div className="link-wrap">
                <Link className={currentPath === '/registration' ? 'active' : ''} to="/registration">Registration</Link>
              </div>
            </>
          ) : (
            <>
              <div className="link-wrap">
                <Link className={currentPath === '/body-calculator' ? 'active' : ''} to="/body-calculator">Body Calculator</Link>
              </div>

              <div className="link-wrap">
                <Link className={currentPath === '/history' ? 'active' : ''} to="/history">History</Link>
              </div>

              <div className="link-wrap">
                <Link className={currentPath === '/logout' ? 'active' : ''} to="/logout">Logout</Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}