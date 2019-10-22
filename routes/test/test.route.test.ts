import request from 'supertest';
import app from '../../app';

describe('test', () => {
  describe('GET', () => {
    it('returns test response', async () => {
      const result = await request(app)
        .get('/test')
        .set('Accept', 'application/json');

      expect(result.status).toEqual(200);
    });
  });
});
