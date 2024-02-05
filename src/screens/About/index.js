import React from "react";
import "./About.css";
import CarImage from "../../assets/taxi.png";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <h2>Welcome to HeyRides!</h2>
        <p className="about-description">
          <div>
            <span>Vision Statement</span>: "At HEYRIDES, we envision a future
            where each ride embodies safety, reliability, and a cleaner
            planet—where our commitment to reducing accidents, emissions, and
            global warming reflects our genuine care for your journey and our
            world."
          </div>
          <div>
            <span>Mission Statement</span>: "HEYRIDES mission is simple and
            genuine, to make every ride a delightful journey. We prioritize
            safety, ensure reliability, and champion environmental
            responsibility. Join us on this genuine mission towards a safer,
            more reliable, and eco-friendly tomorrow."
          </div>
        </p>
      </div>
      <div className="about-image">
        <img src={CarImage} alt="Car" />
      </div>
    </div>
  );
};

export default AboutPage;
