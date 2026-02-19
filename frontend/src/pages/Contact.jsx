// src/pages/Contact.jsx
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || 'https://bharani-scales-backend-roan.vercel.app/api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const mapSectionRef = useRef(null);

  // Branch locations data - 5 BRANCHES
  const branches = [
    {
      name: 'Factory',
      address: 'BHARANI INDUSTRIES, 758/1, Muthapalayam Housing Unit, Chennimalai Main Road, Erode - 638009, Tamil Nadu, India',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.309482843634!2d77.71720352346893!3d11.341343654544747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96a3f3f3f3f3f%3A0x3f3f3f3f3f3f3f3f!2sChennimalai%20Main%20Road!5e0!3m2!1sen!2sin!4v1730860347123',
      phone: '9943120627',
      email: 'bharanindustries@gmail.com',
      icon: '🏭'
    },
    {
      name: 'Showroom 1',
      address: '8 Sathy Road, Park Rd, opposite Ellaimariamman kovil, near Indian overseas bank, Erode, Tamil Nadu 638001',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.2!2d77.73!3d11.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96754a46e1b85%3A0x1234567890!2sSathy%20Road%2C%20Erode!5e0!3m2!1sen!2sin!4v1733200000000',
      phone: '9042020627',
      phone2: '04244270627',
      email: 'bharaniscales@gmail.com',
      icon: '🏢'
    },
    {
      name: 'Showroom 2',
      address: '8, VCTV Main Rd, Erode Fort, Erode, Tamil Nadu 638003 (Majeet Street)',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.1!2d77.72!3d11.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96756789!2sVCTV%20Main%20Road%2C%20Erode%20Fort!5e0!3m2!1sen!2sin!4v1733200000000',
      phone: '8098480627',
      email: 'bharaniscales@gmail.com',
      icon: '🏪'
    },
    {
      name: 'Showroom 3',
      address: 'Kamarajar Salai, puthu pettai bus stop, bus stop attur.',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5!2d78.6!3d11.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1b!2sPudupet%2C%20Attur!5e0!3m2!1sen!2sin!4v1733200000000',
      phone: '9677640627',
      email: 'bharaniscales@gmail.com',
      icon: '🏬'
    },
    {
      name: 'Showroom 4',
      address: 'Kangayam Branch, Kangayam, Tiruppur District, Tamil Nadu - 638701, India',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.5!2d77.56!3d11.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857!2sKangayam!5e0!3m2!1sen!2sin!4v1733200000000',
      phone: '9043000627',
      email: 'bharaniscales@gmail.com',
      icon: '🏭'
    }
  ];

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to scroll to map section
  const scrollToMap = (index) => {
    setActiveTab(index);
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // GSAP Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section
      gsap.to('.contact-hero-title', {
        scrollTrigger: {
          trigger: '.contact-hero-title',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.to('.contact-hero-subtitle', {
        scrollTrigger: {
          trigger: '.contact-hero-subtitle',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

      // Contact Form
      gsap.to('.contact-form-container', {
        scrollTrigger: {
          trigger: '.contact-form-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Contact Info Cards
      gsap.to('.contact-info-card', {
        scrollTrigger: {
          trigger: '.contact-info-section',
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out'
      });

      // Form Input Fields
      gsap.to('.form-input-field', {
        scrollTrigger: {
          trigger: '.contact-form-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out'
      });

      // Branch Cards
      gsap.to('.branch-card', {
        scrollTrigger: {
          trigger: '.branches-cards-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out'
      });

      // Maps Section
      gsap.to('.maps-section-title', {
        scrollTrigger: {
          trigger: '.maps-section-title',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.to('.maps-container', {
        scrollTrigger: {
          trigger: '.maps-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out'
      });

      // Business Hours
      gsap.to('.business-hours-title', {
        scrollTrigger: {
          trigger: '.business-hours-title',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.to('.hours-card', {
        scrollTrigger: {
          trigger: '.hours-section',
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out'
      });

      // CTA Section
      gsap.to('.cta-section-contact h2', {
        scrollTrigger: {
          trigger: '.cta-section-contact',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.to('.cta-section-contact p', {
        scrollTrigger: {
          trigger: '.cta-section-contact',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Message sent successfully! We will contact you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        setErrorMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-hero-title,
        .contact-hero-subtitle,
        .maps-section-title,
        .business-hours-title,
        .cta-section-contact h2,
        .cta-section-contact p {
          opacity: 0;
          transform: translateY(30px);
        }

        .contact-form-container {
          opacity: 0;
          transform: translateX(-50px);
        }

        .contact-info-card,
        .hours-card,
        .branch-card {
          opacity: 0;
          transform: translateY(30px);
        }

        .form-input-field {
          opacity: 0;
          transform: translateY(15px);
        }

        .maps-container {
          opacity: 0;
          transform: scale(0.9);
        }

        .contact-info-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .contact-info-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 30px 60px rgba(34, 197, 94, 0.25);
          border-color: #16a34a;
        }

        .contact-info-card .icon-circle {
          transition: all 0.3s ease;
        }

        .contact-info-card:hover .icon-circle {
          transform: scale(1.15) rotate(5deg);
        }

        .form-input-field input,
        .form-input-field textarea {
          transition: all 0.3s ease;
        }

        .form-input-field input:focus,
        .form-input-field textarea:focus {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.15);
        }

        .form-input-field input::placeholder,
        .form-input-field textarea::placeholder {
          transition: color 0.3s ease;
        }

        .form-input-field input:focus::placeholder,
        .form-input-field textarea:focus::placeholder {
          color: transparent;
        }

        .contact-form-submit {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .contact-form-submit::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.4s ease;
          z-index: 1;
        }

        .contact-form-submit:hover::before {
          left: 100%;
        }

        .contact-form-submit:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(34, 197, 94, 0.25);
        }

        .maps-container {
          transition: all 0.3s ease;
        }

        .quick-contact-btn {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .quick-contact-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(34, 197, 94, 0.3);
        }

        .hours-card {
          transition: all 0.3s ease;
        }

        .hours-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 55px rgba(34, 197, 94, 0.2);
          border-color: #16a34a;
        }

        .success-message {
          animation: slideInDown 0.5s ease-out forwards;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .branch-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          overflow: hidden;
        }

        .branch-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 25px 60px rgba(34, 197, 94, 0.3);
          border-color: #16a34a;
        }

        .branch-card.active {
          border-color: #16a34a;
          box-shadow: 0 20px 50px rgba(34, 197, 94, 0.25);
        }

        .branch-card .branch-icon {
          transition: all 0.3s ease;
        }

        .branch-card:hover .branch-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .branch-card.active .branch-icon {
          transform: scale(1.1);
        }

        .branch-map-preview {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .branch-map-preview::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%);
          pointer-events: none;
        }

        .branch-card:hover .branch-map-preview {
          transform: scale(1.05);
        }

        .branch-card .map-overlay {
          position: absolute;
          inset: 0;
          background: rgba(34, 197, 94, 0.1);
          opacity: 0;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .branch-card:hover .map-overlay {
          opacity: 1;
        }
      `}</style>

      {/* Page Header */}
      <section className="bg-gradient-to-r from-green-400 to-green-500 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="contact-hero-title text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="contact-hero-subtitle text-xl md:text-2xl opacity-90">Get in Touch with Our Team</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="contact-form-container bg-white p-8 rounded-2xl shadow-lg border-2 border-green-200">
              <h2 className="text-3xl font-bold text-green-700 mb-6">Send us a Message</h2>

              {successMessage && (
                <div className="success-message mb-6 p-4 bg-green-100 text-green-700 rounded-lg border-2 border-green-300 font-semibold">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border-2 border-red-300 font-semibold animate-bounce">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="form-input-field">
                  <label className="block text-gray-800 font-bold mb-2 text-lg">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition"
                  />
                </div>

                <div className="form-input-field">
                  <label className="block text-gray-800 font-bold mb-2 text-lg">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition"
                  />
                </div>

                <div className="form-input-field">
                  <label className="block text-gray-800 font-bold mb-2 text-lg">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXXXXXXX"
                    required
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition"
                  />
                </div>

                <div className="form-input-field">
                  <label className="block text-gray-800 font-bold mb-2 text-lg">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    required
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition"
                  />
                </div>

                <div className="form-input-field">
                  <label className="block text-gray-800 font-bold mb-2 text-lg">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    required
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="contact-form-submit w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>📧</span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info Cards */}
            <div className="contact-info-section space-y-6">
              <h2 className="text-3xl font-bold text-green-700 mb-6">Get in Touch</h2>

              {/* Phone Card */}
              <div className="contact-info-card bg-white p-6 rounded-2xl shadow-lg border-2 border-green-200">
                <div className="flex items-start gap-4">
                  <div className="icon-circle w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                    📞
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-700 mb-2">Phone</h3>
                    <div className="space-y-1">
                      <p className="text-gray-700 text-lg">
                        <a href="tel:+919042020627" className="hover:text-green-600 transition-colors font-semibold">
                          +91 9043050627
                        </a>
                      </p>
                      <p className="text-gray-700 text-lg">
                        <a href="tel:04244270627" className="hover:text-green-600 transition-colors font-semibold">
                          +91 9364100627
                        </a>
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Mon-Sat: 10:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Email Card - UPDATED WITH TWO EMAILS */}
              <div className="contact-info-card bg-white p-6 rounded-2xl shadow-lg border-2 border-green-200">
                <div className="flex items-start gap-4">
                  <div className="icon-circle w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                    📧
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-700 mb-2">Email</h3>
                    <div className="space-y-1">
                      <p className="text-gray-700 text-lg">
                        <a href="mailto:bharaniscales@gmail.com" className="hover:text-green-600 transition-colors font-semibold break-all">
                          bharaniscales@gmail.com
                        </a>
                      </p>
                      <p className="text-gray-700 text-lg">
                        <a href="mailto:bharanindustries@gmail.com" className="hover:text-green-600 transition-colors font-semibold break-all">
                          bharanindustries@gmail.com
                        </a>
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* REMOVED - Main Showroom Address Card */}

              {/* WhatsApp Card */}
              <div className="contact-info-card bg-white p-6 rounded-2xl shadow-lg border-2 border-green-200">
                <div className="flex items-start gap-4">
                  <div className="icon-circle w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                    💬
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-700 mb-2">WhatsApp</h3>
                    <a
                      href="https://wa.me/919043050627?text=Hello%2C%20I%20am%20interested%20in%20your%20weighing%20scales"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="quick-contact-btn inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
                    >
                      Chat with Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Branches Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-4">Our Branches</h2>
          <p className="text-center text-gray-600 text-lg mb-12">Visit us at any of our convenient locations</p>

          <div className="branches-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {branches.map((branch, index) => (
              <div
                key={index}
                onClick={() => scrollToMap(index)}
                className={`branch-card bg-white border-2 rounded-2xl overflow-hidden shadow-lg ${activeTab === index ? 'active border-green-600' : 'border-green-200'}`}
              >
                <div className="branch-map-preview relative h-40 bg-gray-100">
                  <iframe
                    src={branch.mapUrl}
                    className="w-full h-full pointer-events-none"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="map-overlay">
                    <span className="text-white font-bold text-lg bg-green-600 px-4 py-2 rounded-full">View Map</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="branch-icon text-3xl">{branch.icon}</div>
                    <h3 className="text-xl font-bold text-green-700">{branch.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{branch.address}</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <span className="font-semibold">📞</span> <a href={`tel:+91${branch.phone}`} className="hover:text-green-600">{branch.phone}</a>
                    </p>
                    {branch.phone2 && (
                      <p className="text-gray-700 ml-5">
                        <a href={`tel:${branch.phone2}`} className="hover:text-green-600">{branch.phone2}</a>
                      </p>
                    )}
                    <p className="text-gray-700">
                      <span className="font-semibold">📧</span> <a href={`mailto:${branch.email}`} className="hover:text-green-600 break-all">{branch.email}</a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Maps Section */}
      <section ref={mapSectionRef} className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="maps-section-title text-4xl font-bold text-center text-green-700 mb-12">Find Us on Map</h2>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {branches.map((branch, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${activeTab === index
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-white text-green-700 border-2 border-green-200 hover:border-green-600'
                  }`}
              >
                {branch.icon} {branch.name}
              </button>
            ))}
          </div>

          {/* Active Map Display */}
          <div className="maps-container">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-green-200 p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-green-700 mb-2">{branches[activeTab].name}</h3>
                <p className="text-gray-700 mb-2">{branches[activeTab].address}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href={`tel:+91${branches[activeTab].phone}`} className="text-green-600 hover:text-green-700 font-semibold">
                    📞 {branches[activeTab].phone}
                  </a>
                  {branches[activeTab].phone2 && (
                    <a href={`tel:${branches[activeTab].phone2}`} className="text-green-600 hover:text-green-700 font-semibold">
                      📞 {branches[activeTab].phone2}
                    </a>
                  )}
                  <a href={`mailto:${branches[activeTab].email}`} className="text-green-600 hover:text-green-700 font-semibold">
                    📧 {branches[activeTab].email}
                  </a>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border-2 border-green-300" style={{ height: '450px' }}>
                <iframe
                  src={branches[activeTab].mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branches[activeTab].address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-contact-btn flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-all duration-300"
                >
                  🗺️ Get Directions
                </a>
                <a
                  href={`https://wa.me/91${branches[activeTab].phone}?text=Hello%2C%20I%20want%20to%20visit%20${encodeURIComponent(branches[activeTab].name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-contact-btn flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-all duration-300"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours Section */}
      <section className="hours-section py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="business-hours-title text-4xl font-bold text-center text-green-700 mb-12">Business Hours</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Weekdays Card */}
            <div className="hours-card bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">🕐</div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">Weekdays</h3>
              <p className="text-gray-700 text-lg font-semibold mb-2">Monday - Friday</p>
              <p className="text-3xl font-bold text-green-600">10:00 AM - 8:00 PM</p>
            </div>

            {/* Saturday Card */}
            <div className="hours-card bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">Saturday</h3>
              <p className="text-gray-700 text-lg font-semibold mb-2">Open</p>
              <p className="text-3xl font-bold text-green-600">10:00 AM - 8:00 PM</p>
            </div>

            {/* Sunday Card */}
            <div className="hours-card bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-red-700 mb-4">Sunday</h3>
              <p className="text-gray-700 text-lg font-semibold mb-2">Closed</p>
              <p className="text-3xl font-bold text-red-600">Closed</p>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
            <p className="text-blue-800 text-lg">
              <span className="font-bold">📢 Note:</span> For urgent queries outside business hours, please WhatsApp us and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-contact bg-gradient-to-r from-green-400 to-green-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl mb-8 opacity-95">
            Our team is ready to assist you with any inquiries about our weighing scales and services.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="tel:+919042020627"
              className="quick-contact-btn bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg"
            >
              📞 Call Now
            </a>
            <a
              href="https://wa.me/919042020627?text=Hello%2C%20I%20have%20a%20question"
              target="_blank"
              rel="noopener noreferrer"
              className="quick-contact-btn border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
