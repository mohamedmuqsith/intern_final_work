import React, { useState, useEffect } from 'react';
import { 
  FiSearch, FiFilter, FiMoreVertical, 
  FiMail, FiPhone, FiCalendar, FiUserPlus, FiEdit, FiTrash2, FiLoader
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { adminGetAllCustomers, adminDeleteCustomer } from '../../../services/api.js';
import './Customers.css';

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await adminGetAllCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.error('Failed to load customers:', err);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      await adminDeleteCustomer(id);
      toast.success(`User "${name}" deleted.`);
      fetchCustomers();
    } catch (err) {
      console.error('Failed to delete customer:', err);
      toast.error('Failed to delete customer');
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || customer.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeClass = (role) => {
    return role === 'admin' ? 'status-vip' : 'status-active';
  };

  const getAvatarClass = (role) => {
    return role === 'admin' ? 'status-vip-bg' : 'status-active-bg';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="admin-customers-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <FiLoader className="spin" style={{ fontSize: 32, color: '#2563eb', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div className="admin-customers-container">
      <div className="customers-header">
        <div className="header-titles">
          <h2>Customers Directory</h2>
          <p>View and manage registered users from MongoDB. ({customers.length} total)</p>
        </div>
      </div>

      <div className="customers-content-card">
        {/* Toolbar */}
        <div className="customers-toolbar">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-actions">
            <div className="filter-dropdown">
              <FiFilter className="filter-icon" />
              <select 
                value={roleFilter} 
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive">
          <table className="customers-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Registered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map(customer => (
                  <tr key={customer._id}>
                    <td>
                      <div className="customer-name-cell">
                        <div className={`avatar ${getAvatarClass(customer.role)}`}>
                          {customer.name?.substring(0, 2).toUpperCase() || '??'}
                        </div>
                        <div className="name-details">
                          <span className="name">{customer.name}</span>
                          <span className="id">ID: {customer._id?.substring(0, 8)}...</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <span className="contact-item"><FiMail /> {customer.email}</span>
                        {customer.phone && <span className="contact-item"><FiPhone /> {customer.phone}</span>}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getRoleBadgeClass(customer.role)}`}>
                        {customer.role === 'admin' ? 'Admin' : 'Customer'}
                      </span>
                    </td>
                    <td>
                      <div className="date-cell">
                        <FiCalendar /> {formatDate(customer.createdAt)}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon btn-icon-danger" title="Delete User" onClick={() => handleDelete(customer._id, customer.name)}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
                    {customers.length === 0 ? 'No users found in the database.' : `No users matching "${searchTerm}".`}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="customers-pagination">
          <span className="pagination-info">Showing {filteredCustomers.length} of {customers.length} entries</span>
        </div>
      </div>
    </div>
  );
}

export default AdminCustomers;
