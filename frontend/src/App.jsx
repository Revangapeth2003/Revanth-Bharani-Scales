// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import your pages
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import About from './pages/About';

// Import admin pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          {/* Admin Routes (without Navbar/Footer) */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Main Routes (with Navbar/Footer) */}
          <Route path="/*" element={
            <div className="flex flex-col min-h-screen">
              {/* Navbar */}
              <Navbar />

              {/* Main Routes */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />
            </div>
          } />
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
