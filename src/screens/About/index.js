import React from 'react';
import './About.css';
import CarImage from '../../assets/taxi.png';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <h2>Welcome to HeyRides!</h2>
        <p className="about-description">
          HeyRides is more than just a rideshare platform. We are a community
          of passionate travelers dedicated to providing the best experience for
          our users. Our mission is to make every journey a memorable one.
        </p>
        
      </div>
      <div className="about-image">
        <img src={CarImage} alt="Car" />
      </div>
    </div>
  );
};

export default AboutPage;
