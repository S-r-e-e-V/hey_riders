import React from "react";
import "./Contact.css";

import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="boxes">
        <div className="phone">
          <FaPhoneAlt size={30} />
          <span className="title">Phone Number</span>
          <a href="tel:+12269617380">Phone : +1 (226)961 - 7380</a>
        </div>

        <div className="email">
          <MdEmail size={30} />
          <span className="title">Email</span>
          <a href="mailto:contact@myrideshare.ca">
            Email : contact@myrideshare.ca
          </a>
        </div>
      </div>
    </div>
  );
}
