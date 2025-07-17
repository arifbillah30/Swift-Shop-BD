import React from "react";
import "./TermsandConditions.css";

const TermsandConditions = () => {
  return (
    <>
      <div className="termsContainer">
        <h2>LEGAL INFORMATION</h2>
        <div className="termsContent">
          {/* Terms & Conditions Section */}
          <h3>Terms & Conditions</h3>

          <h6>Your use of this website is governed by these terms of use</h6>
          <p>
            By accessing or using Swift Shop LTD, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
          </p>

          <h6>Use of the content on this website</h6>
          <p>
            All content provided on this site, including text, images, and products, is the property of Swift Shop LTD and may not be reused or redistributed without permission.
          </p>

          <h6>Shipping & Delivery</h6>
          <p>
            Orders are typically dispatched within 1–3 business days. Delivery times may vary based on location.
          </p>

          <h6>Returns & Refunds</h6>
          <p>
            We offer a 30-day money-back guarantee. Products must be returned in original condition. Shipping costs are non-refundable unless the return is due to our error.
          </p>

          <h6>Limitation of liability</h6>
          <p>
            Swift Shop LTD is not liable for indirect or consequential damages that may result from the use or inability to use the website or purchased products.
          </p>

          <h6>Governing Law & Jurisdiction</h6>
          <p>
            These terms are governed by UK law. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>

          {/* Privacy Policy Section */}
          <h3>Privacy Policy</h3>

          <h6>What information we collect</h6>
          <p>
            We collect personal information including your name, email address, shipping address, and payment details when you place an order or sign up for an account.
          </p>

          <h6>How we use your information</h6>
          <p>
            Your data is used to fulfill orders, provide customer service, and send updates (if you opt in). We do not sell or rent your data.
          </p>

          <h6>Cookies and tracking</h6>
          <p>
            We use cookies to improve your browsing experience and analyze website traffic. You can control cookies through your browser settings.
          </p>

          <h6>Third-party sharing</h6>
          <p>
            We share data only with trusted partners (payment gateways, delivery services) to complete your orders. These partners are contractually obligated to protect your data.
          </p>

          <h6>Security of your data</h6>
          <p>
            We use industry-standard encryption and security practices to protect your information against unauthorized access or disclosure.
          </p>

          <h6>Your rights (GDPR)</h6>
          <p>
            You have the right to access, correct, or delete your personal data. You may also object to data processing or request data portability under applicable laws.
          </p>

          <h6>Contact us</h6>
          <p>
            For any privacy-related concerns, contact us at <a href="mailto:contact@swiftshopltd.co.uk">contact@swiftshopltd.co.uk</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsandConditions;
