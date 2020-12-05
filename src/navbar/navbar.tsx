//
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../hoc/container/container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartBar,
  faThList,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import style from "./navbar.module.scss";

const NavLinks: React.FunctionComponent = () => {
  const [toggle, setToggle] = useState("");
  return (
    <Container>
      <span>
        {" "}
        <FontAwesomeIcon
          icon={faBars}
          size="3x"
          onClick={() => setToggle("open")}
          className={`${style.menu} ${style[`${toggle}`]}`}
        />{" "}
      </span>
      <div className={`${style.navLinks} ${style[`${toggle}`]}`}>
        <div className={style.closeMenu}>
          <span>
            <FontAwesomeIcon
              icon={faTimes}
              size="3x"
              className={`${style.closeMenu} ${style[`${toggle}`]}`}
              onClick={() => setToggle("close")}
            />
          </span>
        </div>
        <span onClick={() => setToggle("close")}>
          {" "}
          <Link to="/">
            {" "}
            <FontAwesomeIcon icon={faHome} size="2x" /> Main
          </Link>
        </span>
        <span onClick={() => setToggle("close")}>
          <Link to="/compare-countries">
            {" "}
            <FontAwesomeIcon icon={faChartBar} size="2x" /> Compare countries{" "}
          </Link>
        </span>
        <span onClick={() => setToggle("close")}>
          <Link to="/countries-list">
            {" "}
            <FontAwesomeIcon icon={faThList} size="2x" /> Detailed countries
            list
          </Link>
        </span>
      </div>
    </Container>
  );
};
export default NavLinks;
