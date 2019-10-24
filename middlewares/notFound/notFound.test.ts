import request from 'supertest';
import app from '../../app';

describe('notFound middleware', () => {
  it('returns 404 is route is not available', async () => {
    const result = await request(app)
      .get('/dummy')
      .set('Accept', 'application/json');

    expect(result.status).toEqual(404);
  });
});
