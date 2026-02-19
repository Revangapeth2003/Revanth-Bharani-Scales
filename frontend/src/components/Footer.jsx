// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaArrowUp } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Section 1: Company Info */}
          <div className="footer-section">
            <h3 className="text-lg font-bold text-green-400 mb-4">Bharani Industries</h3>
            <p className="text-gray-300 text-sm mb-2">
              No.227/4, Anaikattu Road,<br />
              Surampattivalasu, Erode-638009<br />
              Tamil Nadu, India
            </p>
            <p className="text-gray-400 text-sm border-t border-gray-600 pt-3 mt-3">
              <strong>GST:</strong> 33DCAPM7191D1ZR
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="footer-section">
            <h3 className="text-lg font-bold text-green-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Contact Info */}
          <div className="footer-section">
            <h3 className="text-lg font-bold text-green-400 mb-4">Contact</h3>
            
            {/* Phone */}
            <p className="text-gray-300 text-sm mb-3 flex items-center gap-2">
              <FaPhone className="text-green-400" />
              <a href="tel:9043050627" className="hover:text-green-400 transition-colors">
                9043050627
              </a>
            </p>

            {/* Email */}
            <p className="text-gray-300 text-sm mb-4 flex items-center gap-2">
              <FaEnvelope className="text-green-400" />
              <a href="mailto:bharaniscales@gmail.com" className="hover:text-green-400 transition-colors break-all">
                bharaniscales@gmail.com
              </a>
            </p>

            {/* Social Links */}
            <div className="social-links flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-600 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 text-gray-200 hover:text-white"
                title="Facebook"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-600 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 text-gray-200 hover:text-white"
                title="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-600 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 text-gray-200 hover:text-white"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom - NO DIVIDER LINE */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {currentYear} <span className="text-green-400 font-bold">Bharani Industries</span>. All rights reserved.
          </p>

          {/* Powered by Settlo */}
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <span>Powered by</span>
            <a 
              href="https://settlo.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 font-semibold transition-colors duration-300 flex items-center gap-1"
            >
              Settlo
              <svg 
                className="w-3 h-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button - Fixed Position */}
      {/* <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-40"
        title="Scroll to Top"
      >
        <FaArrowUp />
      </button> */}
    </footer>
  );
}

export default Footer;
