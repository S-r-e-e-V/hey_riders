import React from "react";
import "./OurServices.css"; // You should import your CSS file here

function OurServices() {
  return (
    <div className="background">
      <div className="title">
        <h1>Our Services</h1>
        <div className="content">
          <h2>Services that we offer</h2>
          <div className="services-container">
            <ServiceBox title="Our dedicated support team is available 24/7 to assist you with any inquiries, ensuring a reliable and seamless rideshare experience" />
            <ServiceBox title="Convenient rideshare options from Toronto to Windsor with departure times at 09:00 am, 03:00 pm, 07:30 pm, and 10:00 pm" />
            <ServiceBox title="Convenient rideshare options from Windsor to Toronto with departure times at 05:00 am, 10:00 am, 03:00 pm, and 06:00 pm" />
            <ServiceBox title="New! Parcel delivery services. Pricing: Envelope - $10, Shoe box - $15, Cabin bag - $20, Check-in bag - $35. " />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceBox({ title }) {
  return <div className="service-box">{title}</div>;
}

export default OurServices;
