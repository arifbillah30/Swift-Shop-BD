import React, { useState } from "react";
import "./ContactPage.css";

const ContactPage = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Thank You ${name} for Contacting Us. We will Get Back to You Soon.\n\nYour Mail Id - ${email}.\nYour Message is - ${message}`
    );
    setname("");
    setEmail("");
    setmessage("");
  };

  return (
    <>
      <div className="contactSection">
        <h2>Contact Us</h2>
        <div className="contactMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.825630959787!2d90.38879567479424!3d23.824798785917043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7f1a9f5579b%3A0x401fe31e800ea14a!2sSwiftShop%20BD!5e0!3m2!1sen!2sbd!4v1726515232830!5m2!1sen!2sbd"
            width="800"
            height="600"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="SWIFT SHOP LTD"
          ></iframe>
        </div>
        <div className="contactInfo">
          <div className="contactAddress">
            <div className="address">
              <h3>Store in Bangladesh</h3>
              <p>
              ECB Chattar, Dhaka Cantonment, Dhaka - 1206
                <br /> Bangladesh
              </p>
              <p>
              contact@swiftshopltd.co.uk
                <br />
                +447915605557
              </p>
            </div>
            <div className="address">
              <h3>Store in United Kingdom</h3>
              <p>
                Swift Shop Ltd 82a James Carter Road, Mildenhall, Bury St. Edmunds, Suffolk, England, IP28 7DE <br/>
                United Kingdom
              </p>
              <p>
              contact@swiftshopltd.co.uk
                <br />
                +44 7915605557
              </p>
            </div>
          </div>
          <div className="contactForm">
            <h3>Get In Touch</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                placeholder="Name *"
                onChange={(e) => setname(e.target.value)}
                required
              />
              <input
                type="email"
                value={email}
                placeholder="Email address *"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                rows={10}
                cols={40}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
