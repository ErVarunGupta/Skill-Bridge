import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About</h3>
          <p>
            This platform connects users with top helpers and provides
            personalized support for various tasks.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/helpers">Helpers</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>Email: <span style={{color:'blue'}}>varungupta0994@gmail.com</span></p>
          <p>Phone: <span style={{color:'blue'}}>+91 6205993601</span></p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Skill Bridge. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
