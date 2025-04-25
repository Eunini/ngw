const request = require('supertest');
const app = require('../../server');
const Project = require('../../models/Project.model');
const User = require('../../models/User.model');
const { connectDB, disconnectDB } = require('../../config/db');
const jwt = require('jsonwebtoken');
const redisClient = require('../../config/redis');

describe('Project Controller', () => {
  let testUser;
  let authToken;
  let testProject;

  beforeAll(async () => {
    await connectDB();
    await redisClient.flushdb(); // Clear Redis before tests
    
    // Create test user
    testUser = await User.create({
      name: 'Project Test User',
      email: 'projecttest@example.com',
      password: 'password123',
      role: 'hydrogeologist',
      specialization: 'Groundwater',
      licenseType: 'Professional',
      licenseNumber: 'LIC12346',
      state: 'Lagos',
      isVerified: true
    });

    authToken = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  });

  beforeEach(async () => {
    // Create a test project before each test
    testProject = await Project.create({
      projectId: 'WPRJ-00001',
      name: 'Initial Test Project',
      createdBy: testUser._id,
      stageA: {
        projectInfo: {
          description: 'Initial description',
          purpose: 'Initial purpose',
          fundingSource: 'Initial funding',
          budget: 50000,
          startDate: new Date('2023-01-01'),
          endDate: new Date('2023-06-30')
        },
        site: {
          state: 'Ogun',
          lga: 'Abeokuta',
          town: 'Initial Town',
          coordinates: {
            lat: 7.1557,
            lng: 3.3450
          }
        }
      }
    });
  });

  afterEach(async () => {
    await Project.deleteMany({});
    await redisClient.flushdb(); // Clear Redis after each test
  });

  afterAll(async () => {
    await User.deleteMany({ email: /projecttest@example.com/ });
    await redisClient.quit();
    await disconnectDB();
  });

  describe('POST /api/v1/projects', () => {
    it('should create a new project', async () => {
      const res = await request(app)
        .post('/api/v1/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Project',
          stageA: {
            projectInfo: {
              description: 'Test description',
              purpose: 'Test purpose',
              fundingSource: 'Test funding',
              budget: 100000,
              startDate: '2023-01-01',
              endDate: '2023-12-31'
            },
            site: {
              state: 'Lagos',
              lga: 'Ikeja',
              town: 'Test Town',
              coordinates: {
                lat: 6.5244,
                lng: 3.3792
              }
            },
            consultant: {
              name: 'Test Consultant',
              company: 'Test Company',
              contact: 'test@consultant.com'
            },
            geology: {
              rockType: 'Test Rock',
              aquiferType: 'Test Aquifer',
              previousStudies: 'None'
            },
            accessibility: {
              roadCondition: 'Good',
              nearestTownDistance: 10,
              terrainType: 'Flat'
            }
          }
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data.project).toHaveProperty('projectId');
      expect(res.body.data.project.name).toBe('Test Project');
      expect(res.body.data.project.stageA.site.state).toBe('Lagos');
    });

    it('should fail with missing required fields', async () => {
      const res = await request(app)
        .post('/api/v1/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Incomplete Project',
          stageA: {
            // Missing required projectInfo and site fields
          }
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toBe('fail');
    });

    it('should fail without authentication', async () => {
      const res = await request(app)
        .post('/api/v1/projects')
        .send({
          name: 'Unauthorized Project',
          stageA: {
            projectInfo: {
              description: 'Test',
              purpose: 'Test',
              fundingSource: 'Test',
              budget: 10000,
              startDate: '2023-01-01',
              endDate: '2023-12-31'
            },
            site: {
              state: 'Lagos',
              lga: 'Ikeja',
              town: 'Test Town',
              coordinates: {
                lat: 6.5244,
                lng: 3.3792
              }
            }
          }
        });

      expect(res.statusCode).toEqual(401);
    });
  });

  describe('GET /api/v1/projects', () => {
    it('should get all projects for authenticated user', async () => {
      // First request - should hit the database
      const firstRes = await request(app)
        .get('/api/v1/projects')
        .set('Authorization', `Bearer ${authToken}`);

      expect(firstRes.statusCode).toEqual(200);
      expect(firstRes.body.results).toBe(1);
      expect(firstRes.body.data.projects[0].name).toBe('Initial Test Project');

      // Second request - should be served from cache
      const secondRes = await request(app)
        .get('/api/v1/projects')
        .set('Authorization', `Bearer ${authToken}`);

      expect(secondRes.statusCode).toEqual(200);
      expect(secondRes.headers['x-cache']).toBe('hit');
    });

    it('should filter projects by state', async () => {
      await Project.create({
        projectId: 'WPRJ-00002',
        name: 'Lagos Project',
        createdBy: testUser._id,
        stageA: {
          projectInfo: {
            description: 'Lagos project',
            purpose: 'Testing',
            fundingSource: 'Test',
            budget: 50000,
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-06-30')
          },
          site: {
            state: 'Lagos',
            lga: 'Ikeja',
            town: 'Test Town',
            coordinates: {
              lat: 6.5244,
              lng: 3.3792
            }
          }
        }
      });

      const res = await request(app)
        .get('/api/v1/projects?stageA.site.state=Lagos')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.results).toBe(1);
      expect(res.body.data.projects[0].stageA.site.state).toBe('Lagos');
    });
  });

  describe('GET /api/v1/projects/:id', () => {
    it('should get a single project', async () => {
      // First request - should hit the database
      const firstRes = await request(app)
        .get(`/api/v1/projects/${testProject._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(firstRes.statusCode).toEqual(200);
      expect(firstRes.body.data.project.name).toBe('Initial Test Project');

      // Second request - should be served from cache
      const secondRes = await request(app)
        .get(`/api/v1/projects/${testProject._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(secondRes.statusCode).toEqual(200);
      expect(secondRes.headers['x-cache']).toBe('hit');
    });

    it('should return 404 for non-existent project', async () => {
      const nonExistentId = '5f8d04b3ab35b26dc0b8e6a9'; // Valid but non-existent ObjectId
      const res = await request(app)
        .get(`/api/v1/projects/${nonExistentId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(404);
    });

    it('should return 403 for unauthorized access', async () => {
      // Create another user
      const otherUser = await User.create({
        name: 'Other User',
        email: 'other@example.com',
        password: 'password123',
        role: 'hydrogeologist',
        state: 'Oyo',
        isVerified: true
      });
      const otherUserToken = jwt.sign({ id: otherUser._id }, process.env.JWT_SECRET);

      const res = await request(app)
        .get(`/api/v1/projects/${testProject._id}`)
        .set('Authorization', `Bearer ${otherUserToken}`);

      expect(res.statusCode).toEqual(403);
    });
  });

  describe('PATCH /api/v1/projects/:id', () => {
    it('should update a project', async () => {
      const res = await request(app)
        .patch(`/api/v1/projects/${testProject._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Project Name',
          'stageA.projectInfo.description': 'Updated description'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.project.name).toBe('Updated Project Name');
      expect(res.body.data.project.stageA.projectInfo.description).toBe('Updated description');

      // Verify cache was cleared by checking subsequent GET request is a cache miss
      const getRes = await request(app)
        .get(`/api/v1/projects/${testProject._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getRes.headers['x-cache']).toBe('miss');
    });

    it('should fail with invalid updates', async () => {
      const res = await request(app)
        .patch(`/api/v1/projects/${testProject._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          'stageA.site.coordinates.lat': 'invalid' // Not a number
        });

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('DELETE /api/v1/projects/:id', () => {
    it('should delete a project', async () => {
      const res = await request(app)
        .delete(`/api/v1/projects/${testProject._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(204);

      // Verify project is really deleted
      const deletedProject = await Project.findById(testProject._id);
      expect(deletedProject).toBeNull();

      // Verify cache was cleared by checking subsequent GET request returns 404
      const getRes = await request(app)
        .get(`/api/v1/projects/${testProject._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getRes.statusCode).toEqual(404);
    });
  });

  describe('Stage Completion Endpoints', () => {
    it('should complete Stage A', async () => {
      const res = await request(app)
        .patch(`/api/v1/projects/${testProject._id}/stageA`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          geology: {
            rockType: 'Updated Rock',
            aquiferType: 'Updated Aquifer',
            previousStudies: 'Updated studies'
          },
          completed: true
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.project.stageA.completed).toBe(true);
      expect(res.body.data.project.stageA.geology.rockType).toBe('Updated Rock');
    });

    it('should complete Stage B with geologist approval', async () => {
      // First complete Stage A
      await Project.findByIdAndUpdate(testProject._id, {
        'stageA.completed': true,
        'stageA.completedAt': new Date()
      });

      const res = await request(app)
        .patch(`/api/v1/projects/${testProject._id}/stageB`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          drillingInfo: {
            method: 'Rotary',
            depth: 150,
            diameter: 200,
            yield: 5
          },
          approvingGeologist: {
            name: 'Approving Geologist',
            licenseNumber: 'GEO12345'
          },
          completed: true
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.project.stageB.completed).toBe(true);
      expect(res.body.data.project.stageB.drillingInfo.method).toBe('Rotary');
    });

    it('should fail to complete Stage B without completing Stage A', async () => {
      const res = await request(app)
        .patch(`/api/v1/projects/${testProject._id}/stageB`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          drillingInfo: {
            method: 'Rotary',
            depth: 150
          },
          completed: true
        });

      expect(res.statusCode).toEqual(400);
    });

    it('should complete Stage C with water quality data', async () => {
      // First complete Stages A and B
      await Project.findByIdAndUpdate(testProject._id, {
        'stageA.completed': true,
        'stageA.completedAt': new Date(),
        'stageB.completed': true,
        'stageB.completedAt': new Date()
      });

      const res = await request(app)
        .patch(`/api/v1/projects/${testProject._id}/stageC`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          waterQuality: [
            {
              parameter: 'pH',
              value: 7.2,
              unit: '',
              standard: 6.5,
              remark: 'Within acceptable range'
            },
            {
              parameter: 'Turbidity',
              value: 2.1,
              unit: 'NTU',
              standard: 5.0,
              remark: 'Excellent'
            }
          ],
          recommendation: 'Water is safe for drinking',
          completed: true
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.project.stageC.completed).toBe(true);
      expect(res.body.data.project.stageC.waterQuality.length).toBe(2);
      expect(res.body.data.project.status).toBe('completed');
    });
  });

  describe('GET /api/v1/projects/stats', () => {
    it('should get project statistics', async () => {
      // Create additional projects for stats
      await Project.create([
        {
          projectId: 'WPRJ-00002',
          name: 'Completed Project',
          status: 'completed',
          createdBy: testUser._id,
          stageA: { completed: true, completedAt: new Date() },
          stageB: { completed: true, completedAt: new Date() },
          stageC: { completed: true, completedAt: new Date() }
        },
        {
          projectId: 'WPRJ-00003',
          name: 'Ongoing Project',
          status: 'ongoing',
          createdBy: testUser._id,
          stageA: { completed: true, completedAt: new Date() },
          stageB: { completed: false }
        }
      ]);

      const res = await request(app)
        .get('/api/v1/projects/stats')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.stats).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ _id: 'completed', numProjects: expect.any(Number) }),
          expect.objectContaining({ _id: 'ongoing', numProjects: expect.any(Number) })
        ])
      );

      // Verify caching
      const cachedRes = await request(app)
        .get('/api/v1/projects/stats')
        .set('Authorization', `Bearer ${authToken}`);

      expect(cachedRes.headers['x-cache']).toBe('hit');
    });
  });

  describe('GET /api/v1/projects/within/:distance/center/:latlng/unit/:unit', () => {
    it('should get projects within a radius', async () => {
      // Create projects at specific locations
      await Project.create([
        {
          projectId: 'WPRJ-00004',
          name: 'Nearby Project',
          createdBy: testUser._id,
          stageA: {
            site: {
              coordinates: {
                lat: 6.5245, // Very close to test project
                lng: 3.3793
              }
            }
          }
        },
        {
          projectId: 'WPRJ-00005',
          name: 'Distant Project',
          createdBy: testUser._id,
          stageA: {
            site: {
              coordinates: {
                lat: 7.0000, // Far away
                lng: 3.0000
              }
            }
          }
        }
      ]);

      const center = '6.5244,3.3792'; // Test project location
      const distance = 10;
      const unit = 'km';

      const res = await request(app)
        .get(`/api/v1/projects/within/${distance}/center/${center}/unit/${unit}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.results).toBe(2); // Should include test project and nearby project
      expect(res.body.data.projects.some(p => p.name === 'Nearby Project')).toBe(true);
      expect(res.body.data.projects.some(p => p.name === 'Distant Project')).toBe(false);
    });
  });
});