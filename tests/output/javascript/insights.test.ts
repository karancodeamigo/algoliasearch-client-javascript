// @ts-nocheck
import { InsightsApi, EchoRequester } from '@algolia/client-insights';

const client = new InsightsApi(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_SEARCH_KEY,
  { requester: new EchoRequester() }
);

describe('pushEvents', () => {
  test('pushEvents', async () => {
    const req = await client.pushEvents({
      insightEvents: {
        events: [
          {
            eventType: 'click',
            eventName: 'Product Clicked',
            index: 'products',
            userToken: 'user-123456',
            timestamp: 1641290601962,
            objectIDs: ['9780545139700', '9780439784542'],
            queryID: '43b15df305339e827f0ac0bdc5ebcaa7',
            positions: [7, 6],
          },
          {
            eventType: 'view',
            eventName: 'Product Detail Page Viewed',
            index: 'products',
            userToken: 'user-123456',
            timestamp: 1641290601962,
            objectIDs: ['9780545139700', '9780439784542'],
          },
          {
            eventType: 'conversion',
            eventName: 'Product Purchased',
            index: 'products',
            userToken: 'user-123456',
            timestamp: 1641290601962,
            objectIDs: ['9780545139700', '9780439784542'],
            queryID: '43b15df305339e827f0ac0bdc5ebcaa7',
          },
        ],
      },
    });
    expect(req).toMatchObject({
      path: '/1/events',
      method: 'POST',
      data: {
        events: [
          {
            eventType: 'click',
            eventName: 'Product Clicked',
            index: 'products',
            userToken: 'user-123456',
            timestamp: 1641290601962,
            objectIDs: ['9780545139700', '9780439784542'],
            queryID: '43b15df305339e827f0ac0bdc5ebcaa7',
            positions: [7, 6],
          },
          {
            eventType: 'view',
            eventName: 'Product Detail Page Viewed',
            index: 'products',
            userToken: 'user-123456',
            timestamp: 1641290601962,
            objectIDs: ['9780545139700', '9780439784542'],
          },
          {
            eventType: 'conversion',
            eventName: 'Product Purchased',
            index: 'products',
            userToken: 'user-123456',
            timestamp: 1641290601962,
            objectIDs: ['9780545139700', '9780439784542'],
            queryID: '43b15df305339e827f0ac0bdc5ebcaa7',
          },
        ],
      },
    });
  });
});