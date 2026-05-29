import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import BookService from './pages/BookService/BookService.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Pricing from './pages/Pricing/Pricing.jsx';
import Locations from './pages/Locations/Locations.jsx';
import Support from './pages/Support/Support.jsx';

import AdminLayout from './pages/Admin/AdminLayout.jsx';
import AdminDashboard from './pages/Admin/Dashboard/Dashboard.jsx';
import AdminManageBookings from './pages/Admin/ManageBookings/ManageBookings.jsx';
import AdminServices from './pages/Admin/Services/Services.jsx';
import AdminCustomers from './pages/Admin/Customers/Customers.jsx';
import AdminAnalytics from './pages/Admin/Analytics/Analytics.jsx';
import AdminSettings from './pages/Admin/Settings/Settings.jsx';

import './App.css';

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<MainLayout><Navigate to="/book/all" replace /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
        <Route path="/book/:serviceId" element={<MainLayout><BookService /></MainLayout>} />
        <Route path="/pricing" element={<MainLayout><Pricing /></MainLayout>} />
        <Route path="/locations" element={<MainLayout><Locations /></MainLayout>} />
        <Route path="/support" element={<MainLayout><Support /></MainLayout>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminManageBookings />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/book/all" replace />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
