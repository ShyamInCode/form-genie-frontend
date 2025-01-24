import React from "react";
import { Link } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList } from "@fortawesome/free-solid-svg-icons";

// Define styles for the Navbar
const navbarStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginTop: "104px",
  position: "fixed",
};

function Navbar() {
  return (
    <SideNav style={navbarStyle}>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon>
            <FontAwesomeIcon icon={faHome} />
          </NavIcon>
          <NavText>
            <Link to="/">Home</Link>
          </NavText>
        </NavItem>
        <NavItem eventKey="forms">
          <NavIcon>
            <FontAwesomeIcon icon={faList} />
          </NavIcon>
          <NavText>
            <Link to="/get-auth-code-for-forms">Forms</Link>
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

export default Navbar;
