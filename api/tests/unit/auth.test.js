const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User.model');
const { connectDB, disconnectDB } = require('../../config/db');
const redisClient = require('../../config/redis');
const logger = require('../../utils/logger');

describe('Auth Controller', () => {
  let testUser;
  let authToken;

  beforeAll(async () => {
    await connectDB();
    await redisClient.flushdb(); // Clear Redis before tests
  });

  afterAll(async () => {
    await User.deleteMany({});
    await redisClient.quit();
    await disconnectDB();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new hydrogeologist user with license', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Hydrogeologist User',
          email: 'hydro@example.com',
          password: 'password123',
          role: 'hydrogeologist',
          specialization: 'Groundwater',
          licenseType: 'Professional',
          licenseNumber: 'LIC12345',
          state: 'Lagos'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.data.user.role).toBe('hydrogeologist');
    });

    it('should register a contractor user without license', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Contractor User',
          email: 'contractor@example.com',
          password: 'password123',
          role: 'contractor',
          state: 'Abuja'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data.user.role).toBe('contractor');
      expect(res.body.data.user.specialization).toBeUndefined();
    });

    it('should fail with missing required fields', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Incomplete User',
          email: 'incomplete@example.com'
        });

      expect(res.statusCode).toEqual(422);
      expect(res.body.status).toBe('fail');
    });

    it('should fail with invalid license for professional role', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Invalid License User',
          email: 'invalid@example.com',
          password: 'password123',
          role: 'engineer',
          state: 'Ogun'
          // Missing license fields
        });

      expect(res.statusCode).toEqual(422);
      expect(res.body.message).toContain('licenseType');
    });

    it('should fail with duplicate email', async () => {
      await User.create({
        name: 'Existing User',
        email: 'duplicate@example.com',
        password: 'password123',
        role: 'contractor',
        state: 'Kano'
      });

      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Duplicate User',
          email: 'duplicate@example.com',
          password: 'password123',
          role: 'contractor',
          state: 'Kano'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toContain('duplicate');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      testUser = await User.create({
        name: 'Login Test User',
        email: 'logintest@example.com',
        password: 'password123',
        role: 'hydrogeologist',
        specialization: 'Groundwater',
        licenseType: 'Professional',
        licenseNumber: 'LIC12346',
        state: 'Lagos',
        isVerified: true
      });
    });

    afterEach(async () => {
      await User.deleteOne({ email: 'logintest@example.com' });
    });

    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'logintest@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      authToken = res.body.token;
    });

    it('should fail with incorrect password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'logintest@example.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toContain('Incorrect email or password');
    });

    it('should fail with unverified email', async () => {
      await User.updateOne(
        { email: 'logintest@example.com' },
        { isVerified: false }
      );

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'logintest@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toContain('verify your email');
    });

    it('should fail with non-existent email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toContain('Incorrect email or password');
    });
  });

  describe('Protected Routes', () => {
    beforeEach(async () => {
      testUser = await User.create({
        name: 'Protected Test User',
        email: 'protected@example.com',
        password: 'password123',
        role: 'contractor',
        state: 'Rivers',
        isVerified: true
      });

      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'protected@example.com',
          password: 'password123'
        });

      authToken = loginRes.body.token;
    });

    afterEach(async () => {
      await User.deleteOne({ email: 'protected@example.com' });
    });

    it('should access protected route with valid token', async () => {
      const res = await request(app)
        .get('/api/v1/projects')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
    });

    it('should fail with invalid token', async () => {
      const res = await request(app)
        .get('/api/v1/projects')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toContain('Invalid token');
    });

    it('should fail with expired token', async () => {
      const expiredToken = jwt.sign(
        { id: testUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1ms' }
      );

      await new Promise(resolve => setTimeout(resolve, 10));

      const res = await request(app)
        .get('/api/v1/projects')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toContain('expired');
    });

    it('should fail without token', async () => {
      const res = await request(app)
        .get('/api/v1/projects');

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toContain('not logged in');
    });
  });

  describe('Password Reset', () => {
    beforeEach(async () => {
      testUser = await User.create({
        name: 'Password Reset User',
        email: 'reset@example.com',
        password: 'password123',
        role: 'contractor',
        state: 'Delta',
        isVerified: true
      });
    });

    afterEach(async () => {
      await User.deleteOne({ email: 'reset@example.com' });
    });

    it('should generate reset token for valid email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/forgotPassword')
        .send({ email: 'reset@example.com' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toContain('Token sent to email');

      const updatedUser = await User.findOne({ email: 'reset@example.com' });
      expect(updatedUser.passwordResetToken).toBeDefined();
      expect(updatedUser.passwordResetExpires).toBeDefined();
    });

    it('should fail for non-existent email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/forgotPassword')
        .send({ email: 'nonexistent@example.com' });

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toContain('no user with that email');
    });

    it('should reset password with valid token', async () => {
      // First get reset token
      await request(app)
        .post('/api/v1/auth/forgotPassword')
        .send({ email: 'reset@example.com' });

      const user = await User.findOne({ email: 'reset@example.com' });
      const resetToken = user.createPasswordResetToken();

      const res = await request(app)
        .patch(`/api/v1/auth/resetPassword/${resetToken}`)
        .send({ password: 'newpassword123' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');

      // Verify new password works
      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'reset@example.com',
          password: 'newpassword123'
        });

      expect(loginRes.statusCode).toEqual(200);
    });

    it('should fail with expired token', async () => {
      const user = await User.findOne({ email: 'reset@example.com' });
      const resetToken = user.createPasswordResetToken();
      
      // Force token to expire
      user.passwordResetExpires = Date.now() - 10 * 60 * 1000; // 10 minutes ago
      await user.save({ validateBeforeSave: false });

      const res = await request(app)
        .patch(`/api/v1/auth/resetPassword/${resetToken}`)
        .send({ password: 'newpassword123' });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toContain('expired');
    });
  });

  describe('Role-based Access', () => {
    let adminToken;
    let userToken;

    beforeAll(async () => {
      // Create admin user
      const adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        state: 'Lagos',
        isVerified: true
      });

      // Create regular user
      const regularUser = await User.create({
        name: 'Regular User',
        email: 'regular@example.com',
        password: 'password123',
        role: 'contractor',
        state: 'Oyo',
        isVerified: true
      });

      // Get tokens
      const adminLogin = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'password123'
        });

      const userLogin = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'regular@example.com',
          password: 'password123'
        });

      adminToken = adminLogin.body.token;
      userToken = userLogin.body.token;
    });

    afterAll(async () => {
      await User.deleteMany({ email: { $in: ['admin@example.com', 'regular@example.com'] } });
    });

    it('should allow admin to access admin route', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
    });

    it('should prevent non-admin from accessing admin route', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(403);
      expect(res.body.message).toContain('permission');
    });
  });
});