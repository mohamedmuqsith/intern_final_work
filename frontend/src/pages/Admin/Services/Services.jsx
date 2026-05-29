import React, { useState, useEffect } from 'react';
import { 
  FiPlus, FiChevronRight, FiTrash2, FiEdit, 
  FiLoader, FiAlertCircle
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { adminGetAllServices, adminCreateService, adminDeleteService } from '../../../services/api.js';
import './Services.css';

const iconMap = {
  'Maintenance': '🔧',
  'Repair': '⚙️',
  'Inspection': '🔍',
  'Detailing': '✨',
  'Electrical': '⚡',
  'default': '🛠️'
};

function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'Maintenance'
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await adminGetAllServices();
      setServices(res.data);
    } catch (err) {
      console.error('Failed to load services:', err);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!newService.name.trim()) {
      toast.error('Service name is required');
      return;
    }

    try {
      const payload = {
        ...newService,
        price: newService.price ? Number(newService.price) : 0
      };
      await adminCreateService(payload);
      toast.success(`"${newService.name}" created successfully!`);
      handleClear();
      fetchServices();
    } catch (err) {
      console.error('Failed to create service:', err);
      toast.error('Failed to create service. Make sure you are logged in as admin.');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await adminDeleteService(id);
      toast.success(`"${name}" deleted.`);
      fetchServices();
    } catch (err) {
      console.error('Failed to delete service:', err);
      toast.error('Failed to delete service');
    }
  };

  const handleClear = () => {
    setNewService({ name: '', description: '', price: '', duration: '', category: 'Maintenance' });
  };

  const getIcon = (category) => iconMap[category] || iconMap['default'];

  // Group services by category
  const grouped = services.reduce((acc, svc) => {
    const cat = svc.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(svc);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="admin-services-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <FiLoader className="spin" style={{ fontSize: 32, color: '#2563eb' }} />
      </div>
    );
  }

  return (
    <div className="admin-services-container">
      <div className="services-header">
        <div className="header-titles">
          <h2>Service Categories</h2>
          <p>Manage your workshop's service offerings and departments.</p>
        </div>
        <button className="btn-add-category" onClick={() => setShowForm(!showForm)}>
          <FiPlus /> {showForm ? 'Hide Form' : 'Add Service'}
        </button>
      </div>

      <div className="services-main-layout">
        {/* Left Side: Services Grid */}
        <div className="categories-grid">
          {services.length === 0 ? (
            <div className="empty-services-state">
              <FiAlertCircle style={{ fontSize: 40, color: '#94a3b8', marginBottom: 12 }} />
              <p>No services found in the database.</p>
              <p style={{ fontSize: 13, color: '#94a3b8' }}>Click "Add Service" to create your first service.</p>
            </div>
          ) : (
            services.map(service => (
              <div key={service._id} className="category-card">
                <div className="category-icon-wrapper">
                  <span style={{ fontSize: 24 }}>{getIcon(service.category)}</span>
                </div>
                <h3 className="category-title">{service.name}</h3>
                <p className="category-description">{service.description || 'No description provided.'}</p>
                
                <div className="service-meta">
                  {service.price > 0 && <span className="meta-tag price-tag">Rs. {service.price.toLocaleString()}</span>}
                  {service.duration && <span className="meta-tag duration-tag">{service.duration}</span>}
                  <span className="meta-tag category-tag">{service.category || 'General'}</span>
                </div>

                <div className="category-footer">
                  <button className="btn-view-details">
                    View Details <FiChevronRight />
                  </button>
                  <div className="card-actions">
                    <button className="btn-card-delete" onClick={() => handleDelete(service._id, service.name)} title="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Sidebar panel */}
        {showForm && (
          <div className="services-sidebar-panels">
            <div className="new-category-panel">
              <div className="panel-header">
                <h3>New Service</h3>
                <p>Create a new service in the database</p>
              </div>

              <form className="new-category-form" onSubmit={handleSave}>
                <div className="form-group">
                  <label>Service Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="e.g. Brake System Check" 
                    value={newService.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={newService.category} onChange={handleInputChange}>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Repair">Repair</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Detailing">Detailing</option>
                    <option value="Electrical">Electrical</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price (Rs.)</label>
                  <input 
                    type="number" 
                    name="price"
                    placeholder="e.g. 5000" 
                    value={newService.price}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Duration</label>
                  <input 
                    type="text" 
                    name="duration"
                    placeholder="e.g. 1 hour" 
                    value={newService.duration}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    name="description"
                    placeholder="Briefly describe this service..."
                    rows="3"
                    value={newService.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-save">Save Service</button>
                  <button type="button" className="btn-clear" onClick={handleClear}>Clear</button>
                </div>
              </form>
            </div>

            <div className="efficiency-insight-card">
              <h4 className="insight-title">Database Summary</h4>
              <p className="insight-text">
                You have <strong>{services.length}</strong> services across <strong>{Object.keys(grouped).length}</strong> categories stored in MongoDB.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminServices;
