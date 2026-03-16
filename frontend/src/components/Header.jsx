import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined, EditOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Detect scroll to trigger compact header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in (from localStorage)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.log("No user data found");
    }
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    window.location.href = "/";
  };

  const handleEditProfile = () => {
    setDropdownOpen(false);
    navigate("/edit-profile");
  };

  return (
    <header className={`hero__header ${scrolled ? "header--scrolled" : ""}`}>
      {/* Brand / Logo */}
      <Link to="/" className="header__brand">
        <div className="header__brand-icon">🍵</div>
        <span className="header__brand-name">Medi-Tea</span>
      </Link>

      {/* Navigation */}
      <nav className="header__nav">
        <Link className="nav__link active" to="/">
          Home
        </Link>
        <Link className="nav__link" to="/about">
          About us
        </Link>
        <Link className="nav__link" to="/product-list">
          Products
        </Link>
        <a className="nav__link" href="#">
          Blog
        </a>
        <a className="nav__link" href="#">
          Gallery
        </a>
        <a className="nav__link" href="#">
          Contacts
        </a>
        <div className="nav__dropdown">
          <a className="nav__link" href="#">
            Pages
          </a>
          <span className="nav__caret">›</span>
        </div>
      </nav>

      {/* Actions — search, user, cart */}
      <div className="header__actions">
        <button className="iconBtn" aria-label="Search">
          <svg viewBox="0 0 24 24" className="icon">
            <path d="M10 4a6 6 0 104.24 10.24l4.26 4.26 1.42-1.42-4.26-4.26A6 6 0 0010 4zm0 2a4 4 0 110 8 4 4 0 010-8z" />
          </svg>
        </button>

        {user ? (
          <div className="header__user-menu" ref={dropdownRef}>
            <div
              className="header__user-info"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="header__user-avatar">
                <UserOutlined />
              </div>
              <span className="header__user-name">
                {user.fullName || user.name || user.email || "User"}
              </span>
              <span className={`header__user-caret ${dropdownOpen ? "header__user-caret--open" : ""}`}>
                ▾
              </span>
            </div>

            {dropdownOpen && (
              <div className="header__dropdown">
                <button className="header__dropdown-item" onClick={handleEditProfile}>
                  <EditOutlined className="header__dropdown-icon" />
                  <span>Thay đổi thông tin</span>
                </button>
                <div className="header__dropdown-divider" />
                <button className="header__dropdown-item header__dropdown-item--danger" onClick={handleLogout}>
                  <LogoutOutlined className="header__dropdown-icon" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link className="login" to="/login">
            <svg viewBox="0 0 24 24" className="icon icon--user">
              <path d="M12 12a4 4 0 10-4-4 4 4 0 004 4zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z" />
            </svg>
            Login
          </Link>
        )}

        <button className="iconBtn iconBtn--cart" aria-label="Cart">
          <span className="badge">0</span>
          <svg viewBox="0 0 24 24" className="icon">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM6.2 6l.6 3h12.7l-1.2 6H7.4l-.3-1.5H5.1L4 3H2V1h3.6l.6 3h13.9v2H6.2z" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;

