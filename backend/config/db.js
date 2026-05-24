import mongoose from 'mongoose';
import Service from '../models/Service.js';

const defaultServices = [
  { name: 'Oil Change', description: 'Full synthetic oil change with premium filter replacement and fluid top-off.', price: 3500, duration: '45 min', category: 'Maintenance' },
  { name: 'Engine Tune-Up', description: 'Complete engine diagnostics, spark plug replacement, and performance optimization.', price: 8000, duration: '2 hours', category: 'Repair' },
  { name: 'Brake Service', description: 'Brake pad replacement, rotor inspection, fluid flush and safety check.', price: 5500, duration: '1.5 hours', category: 'Repair' },
  { name: 'Full Inspection', description: 'Comprehensive 50-point vehicle health inspection with detailed report.', price: 4000, duration: '1 hour', category: 'Inspection' },
  { name: 'Battery Replacement', description: 'Battery testing, terminal cleaning, and new battery installation.', price: 6000, duration: '30 min', category: 'Maintenance' },
  { name: 'AC Service', description: 'AC system diagnosis, refrigerant recharge, and performance check.', price: 4500, duration: '1 hour', category: 'Maintenance' },
];

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vehicle_service_booking');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed default services if database is empty
    const count = await Service.countDocuments({});
    if (count === 0) {
      await Service.insertMany(defaultServices);
      console.log('Default services seeded successfully');
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

