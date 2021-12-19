import React from "react";
import Header from "../Components/UI/Header";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Contact = () => {
  return (
    <div className="main-ctr">
      <Header>Contact</Header>

      <div className="card-card">
        <div className="contact-div">
          <p>
            <span className="contact-div-first">Phone: </span>
            <span className="contact-div-second">+90 542 514 40 98</span>
          </p>
        </div>
        <div className="contact-div">
          <p>
            <span className="contact-div-first">Email: </span>
            <span className="contact-div-second">metehankasapp@gmail.com</span>
          </p>
        </div>
        <div className="contact-div">
          <p>
            <span className="contact-div-first">Website: </span>
            <a className="contact-div-second" href="https://metehannkasap.web.app">
              https://metehannkasap.web.app
            </a>
          </p>
        </div>

        <div className="social">
          <a href="https://github.com/metehankasapp">
            <GitHubIcon className="social-icon" />
          </a>
          <a href="https://github.com/metehankasapp">
            <LinkedInIcon  className="social-icon"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
