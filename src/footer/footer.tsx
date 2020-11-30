import React from "react";
import style from "./footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faSkype } from "@fortawesome/free-brands-svg-icons";
import { faAt, faGlobeEurope } from "@fortawesome/free-solid-svg-icons";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className={`${style.footer} page-footer font-small cyan darken-3`}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5">
            <div className={style.links}>
              {/* Facebook */}
              <a
                className="mr-md-5 mr-3"
                href="https://www.linkedin.com/in/abdellah-fihri-767326152/"
                target="blank"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              {/* Twitter */}
              <a
                className="mr-md-5 mr-3"
                href="https://github.com/abdellahFihri"
                target="blank"
              >
                <FontAwesomeIcon icon={faGithubSquare} size="2x" />{" "}
              </a>
              {/* Google +*/}
              <a
                className="mr-md-5 mr-3"
                href="skype:abdellahfihri@gmail.com?chat"
              >
                <FontAwesomeIcon icon={faSkype} size="2x" />{" "}
              </a>
              {/*Linkedin */}
              <a className="mr-md-5 mr-3" href="mailto:abdellahfihri@gmail.com">
                <FontAwesomeIcon icon={faAt} size="2x" />
              </a>
              <a
                className="mr-md-5 mr-3"
                href="https://abdellahfihri.github.io/portfolio/"
                target="blank"
              >
                <FontAwesomeIcon icon={faGlobeEurope} size="2x" />
              </a>
              {/*Instagram*/}
            </div>
          </div>
        </div>
      </div>

      <div className={style.copyRight}>Developed by Abdellah Fihri</div>
    </footer>
  );
};
export default Footer;
