import request from 'supertest';
import app from '../../app';

describe('healthz', () => {
  describe('GET', () => {
    it('returns 200 is app is health', async () => {
      app.set('isShuttingDown', false);

      const result = await request(app)
        .get('/healthz')
        .set('Accept', 'application/json');

      expect(result.status).toEqual(200);
    });

    it('returns 503 is app is health', async () => {
      app.set('isShuttingDown', true);

      const result = await request(app)
        .get('/healthz')
        .set('Accept', 'application/json');

      expect(result.status).toEqual(503);
    });
  });
});
