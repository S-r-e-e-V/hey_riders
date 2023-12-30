import React from "react";
import {
  SlSocialFacebook,
  SlSocialTwitter,
  SlSocialInstagram,
  SlSocialLinkedin,
} from "react-icons/sl";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/"> Home</a> | <a href="/about"> About</a> |{" "}
        <a href="/services"> Our Services</a> | <a href="/contact"> Contact</a>
      </div>
      <div className="social-icons">
        <a href="https://www.facebook.com">
          <SlSocialFacebook size={15} />
        </a>
        <a href="https://www.twitter.com">
          <SlSocialTwitter size={15} />
        </a>
        <a href="https://www.linkedin.com">
          <SlSocialLinkedin size={15} />
        </a>
        <a href="https://www.instagram.com/heyrides">
          <SlSocialInstagram size={15} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
