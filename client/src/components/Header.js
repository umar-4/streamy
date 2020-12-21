import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Streamy
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="me-auto"></ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                All Streams
              </Link>
            </li>
            <li className="nav-item">
              <GoogleAuth />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
