require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.model');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

(async () => {
  try {
    // Explicitly select password field
    const admin = await User.findOne({ email: "admin@ngw.com" })
                          .select('+password')
                          .lean();

    if (!admin) {
      console.error('❌ Admin user not found');
      return process.exit(1);
    }

    console.log('Admin document:', {
      _id: admin._id,
      hasPasswordField: 'password' in admin,
      passwordLength: admin.password?.length
    });

    if (!admin.password) {
      console.error('❌ No password set for admin');
      return process.exit(1);
    }

    const isMatch = await bcrypt.compare("Admin@1234", admin.password);
    console.log('✅ Password match:', isMatch);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  }
})();