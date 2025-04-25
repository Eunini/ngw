require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.model');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

(async () => {
  try {
    const newHash = await bcrypt.hash("Admin@1234", 12);
    
    const result = await User.updateOne(
      { email: "admin@ngw.com" },
      { $set: { password: newHash } }
    );

    console.log('Password reset result:', result);
    process.exit(0);
  } catch (err) {
    console.error('Reset failed:', err);
    process.exit(1);
  }
})();