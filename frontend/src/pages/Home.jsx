import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    initialSlide: 0,
    dotsClass: 'slick-dots custom-dots',
    fade: false,
    adaptiveHeight: false,
    centerMode: false,
    swipeToSlide: true,
    touchThreshold: 10,
    lazyLoad: 'progressive',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          arrows: false,
          dots: true
        }
      }
    ]
  };

  const sliderImages = [
    {
      image: '/img/img-1 bs .webp',
      alt: 'Digital Platform Weighing Scale'
    },
    {
      image: '/img/img-2 bs.webp',
      alt: 'Laboratory Precision Scale'
    },
    {
      image: '/img/img-3 bs.webp',
      alt: 'Portable Digital Scale'
    }
  ];

  // GSAP Scroll Animations useEffect
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate "About Bharani Scales" section
      gsap.to('.about-section-title', {
        scrollTrigger: {
          trigger: '.about-section-title',
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animate left content in about section
      gsap.to('.about-left-content', {
        scrollTrigger: {
          trigger: '.about-left-content',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Animate right image in about section
      gsap.to('.about-right-image', {
        scrollTrigger: {
          trigger: '.about-right-image',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Animate mission and vision cards with stagger
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

      // Animate core values cards
      gsap.to('.core-value-card', {
        scrollTrigger: {
          trigger: '.core-values-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out'
      });

      // Animate "What We Offer" section cards
      gsap.to('.offer-card', {
        scrollTrigger: {
          trigger: '.offer-cards-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Animate products cards
      gsap.to('.product-card', {
        scrollTrigger: {
          trigger: '.products-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out'
      });

      // Animate "Why Choose Us" cards
      gsap.to('.why-choose-card', {
        scrollTrigger: {
          trigger: '.why-choose-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Animate final CTA section
      gsap.to('.cta-final', {
        scrollTrigger: {
          trigger: '.cta-final',
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

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-15px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .image-overlay {
          position: relative;
          overflow: hidden;
        }

        .image-overlay::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.3) 100%);
          transition: all 0.3s ease;
        }

        .image-overlay:hover::after {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.5) 100%);
        }

        /* CAROUSEL STYLING - MOBILE OPTIMIZED */
        .slider-container {
          position: relative;
          width: 100%;
          max-width: 100vw;
          background: #fff;
          overflow: hidden;
        }

        .slick-slider {
          position: relative;
          display: block;
          box-sizing: border-box;
          user-select: none;
          touch-action: pan-y;
        }

        .slick-list {
          position: relative;
          display: block;
          overflow: hidden;
          margin: 0;
          padding: 0;
          width: 100%;
        }

        .slick-track {
          position: relative;
          top: 0;
          left: 0;
          display: flex;
          margin-left: auto;
          margin-right: auto;
        }

        .slick-slide {
          float: left;
          height: 100%;
          min-height: 1px;
        }

        .slick-slide > div {
          width: 100%;
          height: 100%;
        }

        .carousel-slide {
          position: relative;
          width: 100%;
          height: 250px;
          display: flex !important;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          overflow: hidden;
          background: #fff;
        }

        /* Small mobile devices */
        @media (min-width: 375px) {
          .carousel-slide {
            height: 260px;
          }
        }

        @media (min-width: 480px) {
          .carousel-slide {
            height: 280px;
          }
        }

        /* Tablets */
        @media (min-width: 768px) {
          .carousel-slide {
            height: 500px;
          }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .carousel-slide {
            height: 550px;
          }
        }

        /* Large Desktop */
        @media (min-width: 1280px) {
          .carousel-slide {
            height: 600px;
          }
        }

        .carousel-slide img {
          width: 100%;
          height: 100%;
          display: block;
          user-select: none;
        }

        /* Mobile: Use contain to show full image without cropping */
        @media (max-width: 767px) {
          .carousel-slide img {
            object-fit: contain;
            object-position: center;
          }
        }

        /* Tablet and Desktop: Use cover to fill container without white space */
        @media (min-width: 768px) {
          .carousel-slide img {
            object-fit: cover;
            object-position: center;
          }
        }

        /* Custom dots positioning */
        .custom-dots {
          bottom: 10px !important;
          z-index: 10;
          position: absolute;
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;
          text-align: center;
        }

        @media (min-width: 768px) {
          .custom-dots {
            bottom: 25px !important;
          }
        }

        .custom-dots li {
          position: relative;
          display: inline-block;
          margin: 0 5px;
          padding: 0;
          cursor: pointer;
        }

        .custom-dots li button {
          font-size: 0;
          line-height: 0;
          display: block;
          padding: 5px;
          cursor: pointer;
          color: transparent;
          border: 0;
          outline: none;
          background: transparent;
        }

        .custom-dots li button:before {
          font-size: 10px !important;
          line-height: 20px;
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          content: '•';
          text-align: center;
          opacity: 0.6;
          color: #22c55e !important;
        }

        @media (min-width: 768px) {
          .custom-dots li button:before {
            font-size: 14px !important;
          }
        }

        .custom-dots li.slick-active button:before {
          opacity: 1;
          color: #22c55e !important;
        }

        /* Arrow styling */
        .slick-prev,
        .slick-next {
          font-size: 0;
          line-height: 0;
          position: absolute;
          top: 50%;
          display: block;
          width: 30px;
          height: 30px;
          padding: 0;
          transform: translate(0, -50%);
          cursor: pointer;
          color: transparent;
          border: none;
          outline: none;
          background: transparent;
          z-index: 10;
        }

        @media (min-width: 768px) {
          .slick-prev,
          .slick-next {
            width: 40px;
            height: 40px;
          }
        }

        .slick-prev:before,
        .slick-next:before {
          font-family: 'slick';
          font-size: 24px !important;
          line-height: 1;
          opacity: 0.75;
          color: #22c55e !important;
          -webkit-font-smoothing: antialiased;
        }

        @media (min-width: 768px) {
          .slick-prev:before,
          .slick-next:before {
            font-size: 35px !important;
          }
        }

        .slick-prev {
          left: 10px !important;
        }

        .slick-next {
          right: 10px !important;
        }

        @media (min-width: 768px) {
          .slick-prev {
            left: 25px !important;
          }
          
          .slick-next {
            right: 25px !important;
          }
        }

        .slick-prev:hover:before,
        .slick-next:hover:before {
          opacity: 1;
          color: #16a34a !important;
        }

        /* Hide arrows on mobile */
        @media (max-width: 767px) {
          .slick-prev,
          .slick-next {
            display: none !important;
          }
        }

        .text-shimmer {
          background: linear-gradient(90deg, #22c55e, #86efac, #22c55e);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .btn-hover {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.3s ease;
          z-index: 1;
        }

        .btn-hover:hover::before {
          left: 100%;
        }

        /* GSAP Scroll Animation Initial States */
        .about-section-title,
        .about-left-content,
        .about-right-image,
        .mission-vision-card,
        .core-value-card,
        .offer-card,
        .product-card,
        .why-choose-card,
        .cta-final {
          opacity: 0;
        }

        .about-left-content,
        .about-right-image {
          opacity: 0;
          transform: translateX(0);
        }

        .about-left-content {
          transform: translateX(-50px);
        }

        .about-right-image {
          transform: translateX(50px);
        }

        .mission-vision-card,
        .why-choose-card,
        .cta-final {
          opacity: 0;
          transform: translateY(30px);
        }

        .core-value-card,
        .product-card {
          opacity: 0;
          transform: scale(0.8);
        }

        .offer-card {
          opacity: 0;
          transform: translateY(30px);
        }
      `}</style>

      {/* Image Slider Section */}
      <section className="w-full slider-container">
        <Slider ref={sliderRef} {...sliderSettings}>
          {sliderImages.map((slide, index) => (
            <div key={index}>
              <Link to="/products" className="carousel-slide">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable="false"
                />
              </Link>
            </div>
          ))}
        </Slider>
      </section>

      {/* Rest of your sections remain the same... */}
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-300 to-green-400 text-white py-20 px-4 animate-fade-in-up">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Bharani Industries</h1>
          <p className="text-xl md:text-2xl mb-4 opacity-95">Premium Weighing Solutions Since 1997</p>
          <p className="text-lg md:text-xl mb-8 opacity-90">Quality • Service • Reliability • Excellence</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/products"
              className="btn-hover bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300"
            >
              Explore Products
            </Link>
            <Link
              to="/contact"
              className="btn-hover border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 bg-gray-50 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(https://www.thebusinessdesk.com/_files/images/Labour-team.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 about-section-title">
            <h2 className="text-5xl md:text-6xl font-bold text-green-700 mb-4">About Bharani Industries</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering Excellence in Weighing Solutions Since 1997
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div className="about-left-content">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-600 mb-8">
                <h3 className="text-3xl font-bold text-green-700 mb-4">Who We Are</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Bharani Industries is a <span className="font-semibold text-green-600">leading supplier and trader</span> of premium weighing scales and equipment based in <span className="font-semibold">Erode, Tamil Nadu</span>. Established in 1997, we have quickly become a trusted partner for businesses across various industries.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Our commitment is simple: provide <span className="font-semibold text-green-600">accurate, reliable, and high-quality weighing solutions</span> that help businesses operate efficiently and professionally.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  With a dedicated team of <span className="font-semibold">26-50 professionals</span>, we combine technical expertise, quality products, and exceptional customer service to meet all your weighing needs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-green-600 mb-2">1997</div>
                  <p className="text-gray-600 font-semibold">Established</p>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                  <p className="text-gray-600 font-semibold">Team Members</p>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                  <p className="text-gray-600 font-semibold">Products</p>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                  <p className="text-gray-600 font-semibold">Support</p>
                </div>
              </div>
            </div>

            <div className="about-right-image">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl opacity-20 blur-lg"></div>
                <img
                  src="/img/bharani scales front view.jpeg"
                  alt="Bharani Scales Team"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl relative z-10 hover:shadow-3xl transition-shadow duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-2xl">
                  <p className="text-white font-bold text-lg">Our Dedicated Team</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mission-vision-cards-container grid md:grid-cols-2 gap-8 mb-16">
            <div className="mission-vision-card card-hover bg-white border-2 border-green-200 rounded-2xl p-8 shadow-lg hover:border-green-600 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                  🎯
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-green-700 mb-3">Our Mission</h4>
                  <p className="text-gray-700 leading-relaxed">
                    To be the most trusted provider of weighing scales and solutions, delivering precision, reliability, and exceptional value to every customer we serve across India and beyond.
                  </p>
                </div>
              </div>
            </div>

            <div className="mission-vision-card card-hover bg-white border-2 border-green-200 rounded-2xl p-8 shadow-lg hover:border-green-600 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                  🚀
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-green-700 mb-3">Our Vision</h4>
                  <p className="text-gray-700 leading-relaxed">
                    To become the leading name in weighing scale industry in India, known for innovation, quality, and customer satisfaction that transforms how businesses measure and manage their operations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-center text-green-700 mb-12 animate-fade-in-up">Our Core Values</h3>
            <div className="core-values-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="core-value-card card-hover bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl">
                <div className="text-5xl mb-4">⭐</div>
                <h4 className="text-xl font-bold text-green-700 mb-2">Quality</h4>
                <p className="text-gray-600 text-sm">Premium products meeting highest standards</p>
              </div>

              <div className="core-value-card card-hover bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl">
                <div className="text-5xl mb-4">🤝</div>
                <h4 className="text-xl font-bold text-green-700 mb-2">Integrity</h4>
                <p className="text-gray-600 text-sm">Honest dealings and transparent practices</p>
              </div>

              <div className="core-value-card card-hover bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl">
                <div className="text-5xl mb-4">💡</div>
                <h4 className="text-xl font-bold text-green-700 mb-2">Innovation</h4>
                <p className="text-gray-600 text-sm">Continuous improvement and new solutions</p>
              </div>

              <div className="core-value-card card-hover bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl">
                <div className="text-5xl mb-4">😊</div>
                <h4 className="text-xl font-bold text-green-700 mb-2">Customer Focus</h4>
                <p className="text-gray-600 text-sm">Putting customer needs first always</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              to="/about"
              className="btn-hover inline-block bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              Learn More About Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 px-4 bg-white animate-slide-up">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-green-700 mb-16 animate-fade-in-up">What We Offer</h2>
          <div className="offer-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="offer-card card-hover bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="image-overlay h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
                  alt="Sales"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-green-700 mb-3">Sales</h3>
                <p className="text-gray-700 leading-relaxed">
                  We offer a curated range of high-quality weighing scales to meet diverse needs. Trust in our commitment to excellence.
                </p>
              </div>
            </div>

            <div className="offer-card card-hover bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="image-overlay h-48 overflow-hidden">
                <img
                  src="/img/scales services.jpg"
                  alt="Service"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-green-700 mb-3">Services</h3>
                <p className="text-gray-700 leading-relaxed">
                  We keep adjusting our services to fit exactly what our customers need. Always working for satisfaction.
                </p>
              </div>
            </div>

            <div className="offer-card card-hover bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="image-overlay h-48 overflow-hidden">
                <img
                  src="/img/scales spares.jpg"
                  alt="Spares"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-green-700 mb-3">Spares</h3>
                <p className="text-gray-700 leading-relaxed">
                  Comprehensive range of high-quality components designed to keep your scales functioning optimally.
                </p>
              </div>
            </div>

            <div className="offer-card card-hover bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="image-overlay h-48 overflow-hidden">
                <img
                  src="/img/TN stamping.jpg"
                  alt="Stamping"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-green-700 mb-3">Stamping</h3>
                <p className="text-gray-700 leading-relaxed">
                  Legal metrology verification and certification services ensuring compliance with regulatory standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-20 px-4 bg-gray-50 animate-slide-up">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-green-700 mb-16 animate-fade-in-up">Our Products</h2>
          <div className="products-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <Link to="/products" className="product-card card-hover bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="image-overlay h-48 overflow-hidden">
                <img
                  src="https://5.imimg.com/data5/SELLER/Default/2023/11/363059824/JR/HO/FG/200280552/a9514a27-672e-427f-9cb5-a06a31e1ba2d-500x500.jpeg"
                  alt="Weighing Scales"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3">Weighing Scales</h3>
                <p className="text-gray-600">High-precision electronic and mechanical weighing scales</p>
              </div>
            </Link>

            <Link to="/products" className="product-card card-hover bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="image-overlay h-48 overflow-hidden">
                <img
                  src="https://5.imimg.com/data5/SELLER/Default/2023/11/363032788/XO/SC/UB/200280552/eesaa-laboratry-machine-jewelry-machine-500x500.jpeg"
                  alt="Laboratory Scales"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3">Laboratory Scales</h3>
                <p className="text-gray-600">Precision scales for jewelry, pharmaceuticals and research</p>
              </div>
            </Link>

            <Link to="/products" className="product-card card-hover bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="image-overlay h-48 overflow-hidden">
                <img
                  src="/img/industrial scales.jpg"
                  alt="Industrial Scales"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3">Industrial Scales</h3>
                <p className="text-gray-600">Heavy-duty platform and floor scales for industries</p>
              </div>
            </Link>

            <Link to="/products" className="product-card card-hover bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="image-overlay h-48 overflow-hidden">
                <img
                  src="https://5.imimg.com/data5/SELLER/Default/2023/11/363026885/OH/NJ/OG/200280552/pen-500x500.jpeg"
                  alt="Portable Scales"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3">Portable Scales</h3>
                <p className="text-gray-600">Compact and portable weighing for retail businesses</p>
              </div>
            </Link>

            <Link to="/products" className="product-card card-hover bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="image-overlay h-48 overflow-hidden">
                <img
                  src="/img/Retail scales.jpeg"
                  alt="Retail Scales"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3">Retail Scales</h3>
                <p className="text-gray-600">Price computing scales for shops and supermarkets</p>
              </div>
            </Link>

            <Link to="/products" className="product-card card-hover bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="image-overlay h-48 overflow-hidden">
                <img
                  src="/img/accessories .jpeg"
                  alt="Accessories"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3">Accessories</h3>
                <p className="text-gray-600">Spares and parts for scales maintenance</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white animate-slide-up">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-green-700 mb-16 animate-fade-in-up">Where We Stand Out</h2>
          <div className="why-choose-container grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="why-choose-card card-hover bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">⏱️</div>
              <h3 className="text-2xl font-bold text-green-700 mb-3">On Time</h3>
              <p className="text-gray-700 leading-relaxed">
                We provide timely, cost-effective deliveries to our valued customers all over India.
              </p>
            </div>

            <div className="why-choose-card card-hover bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-green-700 mb-3">On Quality</h3>
              <p className="text-gray-700 leading-relaxed">
                Our products are meticulously crafted to meet the most stringent standards.
              </p>
            </div>

            <div className="why-choose-card card-hover bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-green-700 mb-3">On Relations</h3>
              <p className="text-gray-700 leading-relaxed">
                We're committed to building lasting relationships with exceptional support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-400 to-green-400 text-white py-20 px-4 cta-final animate-fade-in-up">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Weighing Solution?</h2>
          <p className="text-xl mb-8 opacity-95">
            Contact us today and let our experts guide you to the right product for your business needs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/products"
              className="btn-hover bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300"
            >
              View All Products
            </Link>
            <Link
              to="/contact"
              className="btn-hover border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
