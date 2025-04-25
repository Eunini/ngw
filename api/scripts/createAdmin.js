require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));

(async () => {
  try {
    const adminExists = await User.findOne({ 
      email: process.env.ADMIN_EMAIL,
      role: 'admin'
    });

    if (adminExists) {
      console.log('✅ Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

    await User.create({
      name: 'System Admin',
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
      phoneNumber: '09161704517', // Required field
      state: 'Lagos', // Required field
      userLGA: 'Ikeja', // Required field
      address: 'NGW Headquarters', // Required field
      specialization: 'N/A',
      licenseType: 'N/A',
      licenseBody: 'N/A',
      licenseNumber: 'ADMIN-SYS'
    });

    console.log('✅ Admin created successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Admin creation failed:', err);
    process.exit(1);
  }
})();