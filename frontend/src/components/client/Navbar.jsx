import React from "react";
import "../../style/client/navbar.css";
import logo from "../../img/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const Ref = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    props.setQuery(e.target.search.value);
    navigate("/search");
  };
  const showSearch = () => {
    if (Ref.current.style.transform === "translateY(50px)") {
      Ref.current.style.transform = "translateY(-60px)";
    } else {
      Ref.current.style.transform = "translateY(50px)";
    }
  };
  const [nav, setNav] = useState(-100);
  const [backdrop, setBackdrop] = useState("d-none");
  const [z, setZ] = useState(0);
  const handleNav = () => {
    if (nav === -100) {
      // not hidden
      setNav(0);
      setBackdrop("d-block");
      setZ(8);
      document.body.style.overflowY = "hidden";
    } else {
      // hidden
      setBackdrop("d-none");
      setNav(-100);
      setZ(0);
      document.body.style.overflowY = "unset";
    }
  };
  const handleBackdrop = (link) => {
    navigate(link);
    handleNav();
  };
  return (
    <div style={{ marginBottom: "-25px" }}>
      {/* backdrop filter */}
      <div
        id="backdrop"
        className={backdrop}
        onClick={() => handleBackdrop(location.pathname)}
      ></div>
      {/* button for mobile nav */}
      <button
        id="nav-mobile"
        onClick={handleNav}
        title="Menu"
        style={{
          color: `${nav === 0 ? "white" : "black"}`,
          zIndex: `${z ? z + 1 : "5"}`,
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      {/* main nav */}
      <nav id="navbar">
        <img
          src={logo}
          loading="eager"
          alt="Gadget Store"
          title="Home"
          id="logo"
          onClick={() => navigate("/")}
        />
        <span id="nav-list">
          <Link
            to="/mobiles"
            className={`nav-item ${
              location.pathname === "/mobiles" ? "active" : ""
            }`}
          >
            Mobiles
          </Link>
          <Link
            to="/pc"
            className={`nav-item ${
              location.pathname === "/pc" ? "active" : ""
            }`}
          >
            PCs
          </Link>
          <Link
            to="/electronics"
            className={`nav-item ${
              location.pathname === "/electronics" ? "active" : ""
            }`}
          >
            Electronics
          </Link>
          <Link
            to="/accessories"
            className={`nav-item ${
              location.pathname === "/accessories" ? "active" : ""
            }`}
          >
            Accessories
          </Link>
        </span>
        <span id="nav-user">
          <button
            id="search-toggle"
            title="Search"
            className="user-item"
            onClick={showSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
          </button>
          <Link to="/account" title="Account" className="user-item">
            <FontAwesomeIcon icon={faUser} size="2xl" />
          </Link>
          <Link to="/cart" title="Cart" className="user-item">
            <FontAwesomeIcon icon={faCartShopping} size="2xl" />
          </Link>
        </span>
      </nav>
      {/* search nav */}
      <nav id="sec-nav" ref={Ref}>
        <form id="search-bar" onSubmit={handleSearch}>
          <button id="search-btn" type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="gray" />
          </button>
          <input
            type="text"
            placeholder="Search"
            autoCapitalize="on"
            autoComplete="off"
            name="search"
            id="search-input"
          />
        </form>
      </nav>
      {/* navbar for mobiles */}
      <nav
        id="third-nav"
        style={{
          transition: "transform 0.3s ease",
          transform: `translateX(${nav}%)`,
          zIndex: z,
        }}
      >
        <span className="third-nav-list">
          <span className="coloured"></span>
          <button onClick={() => handleBackdrop("/")} className="nav-dep home">
            Home
          </button>
          <span className="nav-dep">Top Departments</span>
          <button
            className="nav-item"
            onClick={() => handleBackdrop("/mobiles")}
          >
            Mobiles
          </button>
          <button
            className="nav-item"
            to="/pc"
            onClick={() => handleBackdrop("/pc")}
          >
            PCs
          </button>
          <button
            to="/electronics"
            className="nav-item"
            onClick={() => handleBackdrop("/electronics")}
          >
            Electronics
          </button>
          <button
            to="/accessories"
            className="nav-item"
            onClick={() => handleBackdrop("/accessories")}
          >
            Accessories
          </button>
        </span>
      </nav>
    </div>
  );
};

export default Navbar;
