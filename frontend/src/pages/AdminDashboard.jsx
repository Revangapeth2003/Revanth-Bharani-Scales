// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://bharani-scales-backend-roan.vercel.app/api';
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://bharani-scales-backend-roan.vercel.app';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showLeadsModal, setShowLeadsModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [useUrl, setUseUrl] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'laboratory',
    description: '',
    image: '',
    indiamart_url: '',
    whatsapp_message: '',
    rating: 4.5,
    is_active: true
  });
  const [adminUser, setAdminUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const categories = ['laboratory', 'industrial', 'portable', 'accessories', 'retail'];

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = JSON.parse(localStorage.getItem('adminUser'));

    if (!token) {
      navigate('/admin/login1234567890');
      return;
    }

    setAdminUser(user);
    fetchProducts();
    fetchUnreadCount();
  }, [navigate]);

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/contact/admin/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        const unread = response.data.data.filter(lead => !lead.is_read).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/products/admin/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/contact/admin/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setLeads(response.data.data);
        const unread = response.data.data.filter(lead => !lead.is_read).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleViewLeads = async () => {
    await fetchLeads();
    setShowLeadsModal(true);
    setMobileMenuOpen(false);
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/contact/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Lead deleted successfully!');
      fetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert(error.response?.data?.message || 'Failed to delete lead');
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`${API_URL}/contact/${id}/read`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchLeads();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login1234567890');
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPEG, PNG, GIF, and WebP images are allowed');
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setUseUrl(false);
    }
  };

  const clearImageSelection = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData({ ...formData, image: '' });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      image: product.image,
      indiamart_url: product.indiamart_url,
      whatsapp_message: product.whatsapp_message,
      rating: product.rating,
      is_active: product.is_active
    });

    if (product.image.startsWith('http')) {
      setImagePreview(product.image);
      setUseUrl(true);
    } else {
      setImagePreview(`${BASE_URL}${product.image}`);
      setUseUrl(false);
    }
    setImageFile(null);
    setShowModal(true);
    setMobileMenuOpen(false);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'laboratory',
      description: '',
      image: '',
      indiamart_url: '',
      whatsapp_message: '',
      rating: 4.5,
      is_active: true
    });
    setImagePreview(null);
    setImageFile(null);
    setUseUrl(false);
    setShowModal(true);
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('adminToken');
      const submitData = new FormData();

      submitData.append('name', formData.name);
      submitData.append('category', formData.category);
      submitData.append('description', formData.description);
      submitData.append('indiamart_url', formData.indiamart_url);
      submitData.append('whatsapp_message', formData.whatsapp_message);
      submitData.append('rating', formData.rating);
      submitData.append('is_active', formData.is_active);

      if (imageFile) {
        submitData.append('image', imageFile);
      } else if (formData.image) {
        submitData.append('image', formData.image);
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      if (editingProduct) {
        await axios.put(`${API_URL}/products/${editingProduct.id}`, submitData, config);
        alert('Product updated successfully!');
      } else {
        await axios.post(`${API_URL}/products`, submitData, config);
        alert('Product created successfully!');
      }

      setShowModal(false);
      fetchProducts();
      clearImageSelection();
    } catch (error) {
      console.error('Error saving product:', error);
      alert(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const getImageUrl = (image) => {
    if (image.startsWith('http')) return image;
    return `${BASE_URL}${image}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
          <p className="mt-4 text-xl text-green-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-green-700">Bharani Scales Admin</h1>
              <p className="text-sm md:text-base text-gray-600">Welcome, {adminUser?.username}</p>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-4">
              <button
                onClick={handleViewLeads}
                className="relative px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                View Leads
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse shadow-lg">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
              >
                View Website
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-green-700 hover:bg-green-50 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 space-y-2">
              <button
                onClick={handleViewLeads}
                className="relative w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-left flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                View Leads
                {unreadCount > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors text-left"
              >
                View Website
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h3 className="text-gray-600 text-xs md:text-sm font-semibold mb-2">Total Products</h3>
            <p className="text-3xl md:text-4xl font-bold text-green-700">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h3 className="text-gray-600 text-xs md:text-sm font-semibold mb-2">Active Products</h3>
            <p className="text-3xl md:text-4xl font-bold text-green-700">{products.filter(p => p.is_active).length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h3 className="text-gray-600 text-xs md:text-sm font-semibold mb-2">Inactive Products</h3>
            <p className="text-3xl md:text-4xl font-bold text-orange-600">{products.filter(p => !p.is_active).length}</p>
          </div>
        </div>

        {/* Add Product Button */}
        <div className="mb-4 md:mb-6">
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto px-6 md:px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-base md:text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Add New Product
          </button>
        </div>

        {/* Products Grid - Mobile */}
        <div className="grid grid-cols-1 md:hidden gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex items-center p-4 border-b">
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="w-20 h-20 object-contain rounded-lg border border-gray-200 flex-shrink-0"
                />
                <div className="ml-4 flex-grow min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                    <span className="text-yellow-500 font-bold text-sm">★ {product.rating}</span>
                  </div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-2 ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="p-4 flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Products Table - Desktop */}
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Image</th>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Rating</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4">
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{product.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-yellow-500 font-bold">★ {product.rating}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="bg-green-600 text-white px-4 md:px-6 py-4 rounded-t-2xl sticky top-0 z-10">
              <h2 className="text-xl md:text-2xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-base"
                  placeholder="Enter product name"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-base"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-base"
                  placeholder="Enter product description"
                />
              </div>

              {/* Image Upload/URL Toggle */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-gray-700 font-semibold text-sm md:text-base">Product Image</label>
                  <button
                    type="button"
                    onClick={() => {
                      setUseUrl(!useUrl);
                      clearImageSelection();
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    {useUrl ? 'Upload File Instead' : 'Use URL Instead'}
                  </button>
                </div>

                {useUrl ? (
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={(e) => {
                      handleChange(e);
                      setImagePreview(e.target.value);
                    }}
                    required={!imageFile}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-base"
                    placeholder="https://example.com/image.jpg"
                  />
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-base file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Formats: JPEG, PNG, GIF, WebP</p>
                  </div>
                )}

                {imagePreview && (
                  <div className="mt-4 relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-contain border-2 border-gray-300 rounded-lg bg-gray-50"
                    />
                    <button
                      type="button"
                      onClick={clearImageSelection}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* IndiaMART URL */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">IndiaMART Product URL</label>
                <input
                  type="url"
                  name="indiamart_url"
                  value={formData.indiamart_url}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-base"
                  placeholder="https://www.indiamart.com/proddetail/..."
                />
              </div>

              {/* WhatsApp Message */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">WhatsApp Message</label>
                <textarea
                  name="whatsapp_message"
                  value={formData.whatsapp_message}
                  onChange={handleChange}
                  required
                  rows="2"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-base"
                  placeholder="Hi, I'm interested in the..."
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Rating (0-5)</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-base"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label className="ml-3 text-gray-700 font-semibold text-sm md:text-base">Product is Active</label>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors text-base"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    clearImageSelection();
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leads Modal */}
      {showLeadsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full my-8 max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 md:px-8 py-6 flex justify-between items-center sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">Contact Leads</h2>
                  <p className="text-blue-100 text-sm">Total: {leads.length} leads • Unread: {leads.filter(l => !l.is_read).length}</p>
                </div>
              </div>
              <button
                onClick={() => setShowLeadsModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              {leads.length === 0 ? (
                <div className="text-center py-20">
                  <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">No Leads Yet</h3>
                  <p className="text-gray-500 text-lg">When customers contact you, their messages will appear here.</p>
                </div>
              ) : (
                <>
                  {/* Mobile Card View */}
                  <div className="lg:hidden space-y-4">
                    {leads.map((lead) => (
                      <div
                        key={lead.id}
                        className={`border-2 rounded-2xl overflow-hidden transition-all duration-200 ${lead.is_read
                          ? 'border-gray-200 bg-white hover:shadow-lg'
                          : 'border-blue-400 bg-blue-50 hover:shadow-xl shadow-md'
                          }`}
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 text-lg mb-2">{lead.name}</h3>
                              <p className="text-sm text-gray-500 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formatDate(lead.created_at)}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3 text-sm mb-4">
                            <div className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <div>
                                <p className="font-semibold text-gray-600">Email</p>
                                <p className="text-gray-900">{lead.email}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <div>
                                <p className="font-semibold text-gray-600">Phone</p>
                                <p className="text-gray-900">{lead.phone || 'N/A'}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-600">Subject</p>
                                <p className="text-gray-900">{lead.subject}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-600">Message</p>
                                <p className="text-gray-900 leading-relaxed">{lead.message}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4 border-t">
                            {!lead.is_read && (
                              <button
                                onClick={() => handleMarkAsRead(lead.id)}
                                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Mark as Read
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden lg:block overflow-x-auto rounded-2xl border-2 border-gray-200">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Subject</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Message</th>
                          <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {leads.map((lead, index) => (
                          <tr
                            key={lead.id}
                            className={`transition-all duration-200 hover:bg-blue-50 ${!lead.is_read ? 'bg-blue-50 border-l-4 border-l-blue-600' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                              }`}
                          >
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 font-medium whitespace-nowrap">{formatDate(lead.created_at)}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-bold text-gray-900">{lead.name}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm">
                                <div className="flex items-center gap-1 text-gray-900 mb-1">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  {lead.email}
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  {lead.phone || 'N/A'}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 font-medium">{lead.subject}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-700 max-w-xs truncate" title={lead.message}>
                                {lead.message}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                {!lead.is_read && (
                                  <button
                                    onClick={() => handleMarkAsRead(lead.id)}
                                    className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors duration-200"
                                    title="Mark as Read"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200"
                                  title="Delete Lead"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
