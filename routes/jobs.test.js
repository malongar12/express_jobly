const request = require('supertest');
const app = require('../app');
const db = require('../db');
const Job = require('../models/job');


/// Model test


beforeEach(async () => {
  await db.query('DELETE FROM jobs');
});

describe('Job Model', () => {
  test('can create a job', async () => {
    const jobData = {
      title: 'Software Engineer',
      salary: 100000,
      equity: 0.1,
      companyHandle: 'apple',
    };

    const job = await Job.create(jobData);
    expect(job).toHaveProperty('id');
    expect(job.title).toBe('Software Engineer');
  });

  test('can get all jobs with filters', async () => {
    await Job.create({
      title: 'Software Engineer',
      salary: 100000,
      equity: 0.1,
      companyHandle: 'apple',
    });

    const jobs = await Job.getAll({ title: 'Software' });
    expect(jobs).toHaveLength(1);
    expect(jobs[0].title).toBe('Software Engineer');
  });
});





/// route test

describe('GET /jobs', () => {
  test('can retrieve jobs with filters', async () => {
    const response = await request(app)
      .get('/jobs?title=Engineer&minSalary=50000');
    expect(response.status).toBe(200);
    expect(response.body.jobs).toHaveLength(1);
  });
});

describe('POST /jobs', () => {
  test('requires admin to create a job', async () => {
    const response = await request(app)
      .post('/jobs')
      .send({
        title: 'Software Engineer',
        salary: 100000,
        equity: 0.1,
        companyHandle: 'apple',
      });
    expect(response.status).toBe(403);
  });
});

describe('PUT /jobs/:id', () => {
  test('requires admin to update a job', async () => {
    const response = await request(app)
      .put('/jobs/1')
      .send({ salary: 120000 });
    expect(response.status).toBe(403);
  });
});
