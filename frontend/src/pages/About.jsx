import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function About() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.to('.hero-title', {
        scrollTrigger: {
          trigger: '.hero-title',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.to('.hero-divider', {
        scrollTrigger: {
          trigger: '.hero-divider',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.to('.hero-subtitle', {
        scrollTrigger: {
          trigger: '.hero-subtitle',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      });

      // Story section animations
      gsap.to('.story-left-content', {
        scrollTrigger: {
          trigger: '.story-left-content',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.to('.story-right-image', {
        scrollTrigger: {
          trigger: '.story-right-image',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Story boxes
      gsap.to('.story-box', {
        scrollTrigger: {
          trigger: '.story-boxes-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out'
      });

      // Trust quote cards
      gsap.to('.trust-quote-card', {
        scrollTrigger: {
          trigger: '.trust-quotes-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out'
      });

      // Mission and Vision
      gsap.to('.mission-vision-section h2', {
        scrollTrigger: {
          trigger: '.mission-vision-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.to('.mission-vision-card', {
        scrollTrigger: {
          trigger: '.mission-vision-cards-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out'
      });

      // Core Values
      gsap.to('.core-value-card', {
        scrollTrigger: {
          trigger: '.core-values-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'back.out'
      });

      // Stats Section
      gsap.to('.stat-box', {
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out'
      });

      // Why Choose Cards
      gsap.to('.why-choose-card', {
        scrollTrigger: {
          trigger: '.why-choose-cards-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      });

      // CTA Section
      gsap.to('.cta-content', {
        scrollTrigger: {
          trigger: '.cta-content',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-hidden">
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

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes countUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .btn-hover {
          position: relative;
          overflow: hidden;
        }

        .btn-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.5s ease;
          z-index: 1;
        }

        .btn-hover:hover::before {
          left: 100%;
        }

        .line-divider {
          position: relative;
          height: 4px;
          width: 80px;
          background: linear-gradient(90deg, #22c55e, #86efac);
          margin: 0 auto;
          border-radius: 2px;
        }

        .stat-box {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%);
          border: 2px solid rgba(34, 197, 94, 0.2);
          transition: all 0.3s ease;
        }

        .stat-box:hover {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%);
          border-color: #22c55e;
          transform: translateY(-10px);
        }

        .value-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: linear-gradient(135deg, #86efac 0%, #22c55e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin: 0 auto 12px;
          box-shadow: 0 10px 25px rgba(34, 197, 94, 0.2);
        }

        /* Trust Quote Cards Styling */
        .trust-quote-card {
          position: relative;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-left: 5px solid #22c55e;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.15);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
        }

        .trust-quote-card::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 15px;
          font-size: 80px;
          color: rgba(34, 197, 94, 0.15);
          font-family: Georgia, serif;
          line-height: 1;
        }

        .trust-quote-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(34, 197, 94, 0.25);
          border-left-width: 8px;
        }

        .trust-quote-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
          margin-bottom: 12px;
        }

        /* GSAP Scroll Animation Initial States */
        .hero-title,
        .hero-subtitle,
        .story-left-content,
        .story-right-image,
        .story-box,
        .trust-quote-card,
        .mission-vision-card,
        .core-value-card,
        .stat-box,
        .why-choose-card,
        .cta-content {
          opacity: 0;
        }

        .hero-title,
        .hero-subtitle,
        .story-box,
        .trust-quote-card,
        .mission-vision-card,
        .why-choose-card,
        .cta-content {
          transform: translateY(30px);
        }

        .story-left-content {
          transform: translateX(-50px);
        }

        .story-right-image {
          transform: translateX(50px);
        }

        .core-value-card,
        .stat-box {
          transform: scale(0.8);
        }

        .hero-divider {
          transform: scaleX(0);
          opacity: 0;
          transform-origin: center;
        }
      `}</style>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-400 via-green-400 to-green-400 text-white py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="hero-title text-6xl md:text-7xl font-bold mb-6">About Bharani Industries</h1>
          <div className="hero-divider line-divider mb-8"></div>
          <p className="hero-subtitle text-2xl md:text-3xl opacity-95 max-w-3xl mx-auto">
            Leading Weighing Solutions Provider in South India
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="story-left-content">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="line-divider mb-8"></div>

              <div className="story-boxes-container space-y-6">
                <div className="story-box bg-gradient-to-r from-green-50 to-transparent p-6 rounded-lg border-l-4 border-green-600 hover:border-green-700 transition-all">
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Since 1997</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Founded with a vision to revolutionize the weighing scale industry in Tamil Nadu and beyond with precision, reliability, and customer-centric solutions. Nearly three decades of excellence.
                  </p>
                </div>

                <div className="story-box bg-gradient-to-r from-green-50 to-transparent p-6 rounded-lg border-l-4 border-green-600 hover:border-green-700 transition-all">
                  <h3 className="text-2xl font-bold text-green-700 mb-2">50+ Professionals</h3>
                  <p className="text-gray-600 leading-relaxed">
                    A dedicated team of experienced professionals committed to delivering excellence in every project and interaction with our valued customers.
                  </p>
                </div>

                <div className="story-box bg-gradient-to-r from-green-50 to-transparent p-6 rounded-lg border-l-4 border-green-600 hover:border-green-700 transition-all">
                  <h3 className="text-2xl font-bold text-green-700 mb-2">100+ Products</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Comprehensive range of weighing solutions covering laboratory, industrial, retail, and specialized applications for diverse business needs.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Link 
                  to="/products"
                  className="btn-hover bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300"
                >
                  Explore Products
                </Link>
                <Link 
                  to="/contact"
                  className="btn-hover border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-bold transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>

              {/* Trust Quote Cards - NEW SECTION */}
              <div className="trust-quotes-container mt-10 space-y-4">
                {/* Quote 1 */}
                <div className="trust-quote-card">
                  <div className="flex items-start gap-4">
                    <div className="trust-quote-icon flex-shrink-0">
                      🤝
                    </div>
                    <div className="relative z-10">
                      <p className="text-gray-800 text-lg font-semibold italic leading-relaxed">
                        Customers don't buy products; they buy trust.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quote 2 */}
                <div className="trust-quote-card">
                  <div className="flex items-start gap-4">
                    <div className="trust-quote-icon flex-shrink-0">
                      📈
                    </div>
                    <div className="relative z-10">
                      <p className="text-gray-800 text-lg font-semibold italic leading-relaxed">
                        A business grows faster when trust grows first.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="story-right-image relative">
              {/* <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Team</h3> */}
              <div className="absolute -inset-8 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl opacity-20 blur-2xl"></div>
              <img 
                src="/img/bharani scales front view.jpeg"
                alt="Bharani Scales Team"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl relative z-10 border-8 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section py-24 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-6 animate-fade-in-up">Our Mission & Vision</h2>
          <div className="line-divider mb-16 animate-fade-in-up" style={{animationDelay: '0.1s'}}></div>

          <div className="mission-vision-cards-container grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="mission-vision-card card-hover bg-white rounded-2xl p-8 shadow-lg border-2 border-green-100 hover:border-green-600">
              <div className="flex items-start gap-6 mb-6">
                <div className="value-icon">🎯</div>
                <div>
                  <h3 className="text-3xl font-bold text-green-700">Our Mission</h3>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be the <span className="font-bold text-green-600">most trusted provider of weighing scales</span>, delivering precision, reliability, and exceptional value to every customer we serve across India. We're committed to continuous innovation and excellence in all our operations.
              </p>
            </div>

            {/* Vision Card */}
            <div className="mission-vision-card card-hover bg-white rounded-2xl p-8 shadow-lg border-2 border-green-100 hover:border-green-600">
              <div className="flex items-start gap-6 mb-6">
                <div className="value-icon">🚀</div>
                <div>
                  <h3 className="text-3xl font-bold text-green-700">Our Vision</h3>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the <span className="font-bold text-green-600">leading name in the weighing scale industry</span>, known for innovation, quality, and customer satisfaction. We aspire to transform how businesses measure and manage their operations with precision and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-6 animate-fade-in-up">Our Core Values</h2>
          <div className="line-divider mb-16 animate-fade-in-up" style={{animationDelay: '0.1s'}}></div>

          <div className="core-values-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Quality */}
            <div className="core-value-card card-hover bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 text-center border-2 border-green-200 hover:border-green-600 shadow-lg">
              <div className="value-icon mb-4">⭐</div>
              <h4 className="text-2xl font-bold text-green-700 mb-3">Quality</h4>
              <p className="text-gray-600 leading-relaxed">Premium products meeting the highest standards and customer expectations</p>
            </div>

            {/* Integrity */}
            <div className="core-value-card card-hover bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 text-center border-2 border-green-200 hover:border-green-600 shadow-lg">
              <div className="value-icon mb-4">🤝</div>
              <h4 className="text-2xl font-bold text-green-700 mb-3">Integrity</h4>
              <p className="text-gray-600 leading-relaxed">Honest dealings and transparent practices in all our business operations</p>
            </div>

            {/* Innovation */}
            <div className="core-value-card card-hover bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 text-center border-2 border-green-200 hover:border-green-600 shadow-lg">
              <div className="value-icon mb-4">💡</div>
              <h4 className="text-2xl font-bold text-green-700 mb-3">Innovation</h4>
              <p className="text-gray-600 leading-relaxed">Continuous improvement and development of cutting-edge solutions</p>
            </div>

            {/* Customer Focus */}
            <div className="core-value-card card-hover bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 text-center border-2 border-green-200 hover:border-green-600 shadow-lg">
              <div className="value-icon mb-4">😊</div>
              <h4 className="text-2xl font-bold text-green-700 mb-3">Customer Focus</h4>
              <p className="text-gray-600 leading-relaxed">Putting customer needs first and exceeding expectations always</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-24 px-4 bg-gradient-to-r from-green-400 to-green-500 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-6 animate-fade-in-down">By The Numbers</h2>
          <div className="line-divider mb-16 animate-fade-in-down" style={{animationDelay: '0.1s', background: 'white'}}></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stat-box rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold mb-3">50+</div>
              <p className="text-lg font-semibold opacity-90">Team Members</p>
              <p className="text-sm opacity-75 mt-2">Dedicated professionals</p>
            </div>

            <div className="stat-box rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold mb-3">1997</div>
              <p className="text-lg font-semibold opacity-90">Established Year</p>
              <p className="text-sm opacity-75 mt-2">30 Years Strong</p>
            </div>

            <div className="stat-box rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold mb-3">100+</div>
              <p className="text-lg font-semibold opacity-90">Products</p>
              <p className="text-sm opacity-75 mt-2">Wide range of solutions</p>
            </div>

            <div className="stat-box rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold mb-3">✅</div>
              <p className="text-lg font-semibold opacity-90">GST Certified</p>
              <p className="text-sm opacity-75 mt-2">33DCAPM7191D1ZR</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-6 animate-fade-in-up">Why Choose Bharani Industries</h2>
          <div className="line-divider mb-16 animate-fade-in-up" style={{animationDelay: '0.1s'}}></div>

          <div className="why-choose-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="why-choose-card card-hover bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 text-center border-2 border-green-200 hover:border-green-600 shadow-lg">
              <div className="text-6xl mb-4">🏆</div>
              <h4 className="text-2xl font-bold text-green-700 mb-3">Quality</h4>
              <p className="text-gray-700 leading-relaxed">Premium products meeting highest industry standards</p>
            </div>

            <div className="why-choose-card card-hover bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 text-center border-2 border-green-200 hover:border-green-600 shadow-lg">
              <div className="text-6xl mb-4">🎯</div>
              <h4 className="text-2xl font-bold text-green-700 mb-3">Precision</h4>
              <p className="text-gray-700 leading-relaxed">Accurate measurements you can always rely on</p>
            </div>

            <div className="why-choose-card card-hover bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 text-center border-2 border-green-200 hover:border-green-600 shadow-lg">
              <div className="text-6xl mb-4">💬</div>
              <h4 className="text-2xl font-bold text-green-700 mb-3">Support</h4>
              <p className="text-gray-700 leading-relaxed">24/7 expert customer assistance available</p>
            </div>

            <div className="why-choose-card card-hover bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 text-center border-2 border-green-200 hover:border-green-600 shadow-lg">
              <div className="text-6xl mb-4">🚀</div>
              <h4 className="text-2xl font-bold text-green-700 mb-3">Fast Delivery</h4>
              <p className="text-gray-700 leading-relaxed">Quick and reliable delivery across India</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-green-400 to-green-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="cta-content max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">Ready to Partner With Us?</h2>
          <p className="text-2xl opacity-95 mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Let's discuss how Bharani Industries can meet your weighing solution requirements
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <Link 
              to="/contact"
              className="btn-hover bg-white text-green-600 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              Get in Touch
            </Link>
            <Link 
              to="/products"
              className="btn-hover border-2 border-white text-white hover:bg-white hover:text-green-600 px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
