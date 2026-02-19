// src/pages/Products.jsx
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || 'https://bharani-scales-backend-roan.vercel.app/api';
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://bharani-scales-backend-roan.vercel.app';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'laboratory', label: 'Laboratory' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'portable', label: 'Portable' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'retail', label: 'Retail' }
  ];

  // Helper function to get correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x400?text=No+Image';

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    if (imagePath.startsWith('/uploads/')) {
      return `${BASE_URL}${imagePath}`;
    }

    return `${BASE_URL}${imagePath}`;
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products`);
        if (response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Initial GSAP Scroll Animations (Hero, CTA, Why Choose sections)
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Hero Section
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

      gsap.to('.hero-subtitle', {
        scrollTrigger: {
          trigger: '.hero-subtitle',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

      // Filter Section
      gsap.to('.filter-button', {
        scrollTrigger: {
          trigger: '.filter-section',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out'
      });

      // CTA Section
      gsap.to('.cta-section h2', {
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.to('.cta-section p', {
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

      gsap.to('.cta-button', {
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.4,
        ease: 'back.out'
      });

      // Why Choose Us Cards
      gsap.to('.why-card', {
        scrollTrigger: {
          trigger: '.why-choose-section',
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  // Product Cards Animation - Runs on category change
  useEffect(() => {
    if (loading || products.length === 0) return;

    // Kill existing ScrollTriggers for products
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === '.products-grid') {
        trigger.kill();
      }
    });

    // Reset product cards to initial state
    gsap.set('.product-card', { opacity: 0, y: 40 });

    // Animate product cards
    const timer = setTimeout(() => {
      gsap.to('.product-card', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.4)'
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [selectedCategory, filteredProducts.length, loading]);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1 justify-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'}>
            ★
          </span>
        ))}
        <span className="text-gray-600 font-bold ml-2">({rating})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
          <p className="mt-4 text-xl text-green-700 font-semibold">Loading Products...</p>
        </div>
      </div>
    );
  }

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

        .hero-title,
        .hero-subtitle,
        .cta-section h2,
        .cta-section p,
        .cta-button {
          opacity: 0;
          transform: translateY(30px);
        }

        .filter-button {
          opacity: 0;
          transform: translateX(-20px);
        }

        .why-card {
          opacity: 0;
          transform: translateY(30px);
        }

        .product-card {
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-12px) !important;
          box-shadow: 0 30px 60px rgba(34, 197, 94, 0.2);
        }

        .product-image-container {
          transition: all 0.3s ease;
        }

        .product-image-container img {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .product-card:hover .product-image-container img {
          transform: scale(1.12) rotate(2deg);
        }

        .filter-button {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .filter-button:hover {
          transform: scale(1.05);
        }

        .why-card {
          transition: all 0.3s ease;
        }

        .why-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(34, 197, 94, 0.15);
        }

        .why-card:hover {
          border-color: #16a34a;
        }

        .product-button {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .product-button::before {
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

        .product-button:hover::before {
          left: 100%;
        }

        .view-details-button {
          animation: slideInDown 0.5s ease-out forwards;
          opacity: 0;
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

        .product-card:hover .view-details-button {
          animation: slideInDown 0.5s ease-out forwards;
        }
      `}</style>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-green-500 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="hero-title text-5xl md:text-6xl font-bold mb-4">Our Products</h1>
          <p className="hero-subtitle text-xl md:text-2xl opacity-90">Premium Weighing Solutions for Every Need</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section bg-green-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-green-700 mb-6">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, index) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`filter-button px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === cat.value
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-white text-green-700 border-2 border-green-300 hover:border-green-600'
                  }`}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600">No products found in this category.</p>
            </div>
          ) : (
            <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="product-card bg-white border-2 border-green-200 rounded-2xl shadow-lg overflow-hidden flex flex-col"
                >
                  {/* Product Image */}
                  <div className="product-image-container relative overflow-hidden h-80 bg-green-50 group">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain p-4 bg-white"
                      onError={(e) => {
                        console.error('❌ Image load failed:', product.image);
                        e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Available';
                      }}
                    />
                    {/* <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
                      <button className="view-details-button bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-110">
                        View Details
                      </button>
                    </div> */}
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-green-700 mb-2 min-h-14">{product.name}</h3>

                    {/* Rating */}
                    <div className="mb-3">
                      {renderStars(product.rating)}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">{product.description}</p>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-green-200 mt-auto">
                      <a
                        href={product.indiamart_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="product-button flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm"
                      >
                        🛒 Buy Now
                      </a>
                      <a
                        href={`https://wa.me/919043050627?text=${encodeURIComponent(product.whatsapp_message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="product-button flex-1 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm"
                      >
                        💬 Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-green-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-6">Need Help Choosing?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our experts are here to guide you in selecting the perfect weighing solution for your business
          </p>
          <a
            href="/contact"
            className="cta-button inline-block bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Contact Our Team
          </a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">Why Choose Bharani Scales?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="why-card bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4 transform transition-transform duration-300 hover:scale-125">⚖️</div>
              <h3 className="text-xl font-bold text-green-700 mb-3">Quality Products</h3>
              <p className="text-gray-600">Premium weighing scales from trusted manufacturers</p>
            </div>

            <div className="why-card bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4 transform transition-transform duration-300 hover:scale-125">💰</div>
              <h3 className="text-xl font-bold text-green-700 mb-3">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing with excellent value</p>
            </div>

            <div className="why-card bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4 transform transition-transform duration-300 hover:scale-125">🚚</div>
              <h3 className="text-xl font-bold text-green-700 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Quick shipping across India</p>
            </div>

            <div className="why-card bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4 transform transition-transform duration-300 hover:scale-125">🎯</div>
              <h3 className="text-xl font-bold text-green-700 mb-3">Expert Support</h3>
              <p className="text-gray-600">24/7 customer assistance available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;
