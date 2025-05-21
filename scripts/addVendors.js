import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vendor from '../models/Vendor.js';
import connectDB from '../config/db.js';

dotenv.config();
await connectDB();

const vendors = [
  {
    vendorId: 'doctor1',
    name: 'Doctor 1',
    slots: ['10:00 AM', '11:00 AM', '2:00 PM']
  },
  {
    vendorId: 'salon1',
    name: 'Salon 1',
    slots: ['1:00 PM', '3:00 PM', '4:30 PM']
  }
];

try {
  await Vendor.deleteMany({});
  await Vendor.insertMany(vendors);
  console.log('✅ Sample vendors inserted!');
  process.exit();
} catch (err) {
  console.error('❌ Error inserting vendors:', err.message);
  process.exit(1);
}
