import type { EchoResponse } from '@experimental-api-clients-automation/client-common';
import { echoRequester } from '@experimental-api-clients-automation/requester-node-http';

import { algoliasearch, apiClientVersion } from '../builds/node';
import { liteClient } from '../lite/builds/node';

const client = algoliasearch('APP_ID', 'API_KEY', {
  requester: echoRequester(),
});

describe('api', () => {
  it('sets the user agent', async () => {
    const req = (await client.post({
      path: '/test',
    })) as unknown as EchoResponse;

    expect(req.algoliaAgent).toMatchInlineSnapshot(
      `"Algolia%20for%20JavaScript%20(${apiClientVersion});%20Search%20(${apiClientVersion});%20Node.js%20(${process.versions.node})"`
    );
  });

  it('throws with undefined API key', () => {
    try {
      algoliasearch('APP_ID', '');
    } catch (e) {
      expect((e as Error).message).toMatch('`apiKey` is missing.');
    }
  });

  it('throws with undefined app ID', () => {
    try {
      algoliasearch('', 'API_KEY');
    } catch (e) {
      expect((e as Error).message).toMatch('`appId` is missing.');
    }
  });

  it('provides the search client at the root of the API', () => {
    expect(client.search).not.toBeUndefined();
  });

  describe('init clients', () => {
    it('provides an init method for the analytics client', () => {
      expect(client.initAnalytics).not.toBeUndefined();
    });

    it('provides an init method for the abtesting client', () => {
      expect(client.initAbtesting).not.toBeUndefined();
    });

    it('provides an init method for the personalization client', () => {
      expect(client.initPersonalization).not.toBeUndefined();
    });

    it('default `init` clients to the root `algoliasearch` credentials', async () => {
      const abtestingClient = client.initAbtesting();
      const analyticsClient = client.initAnalytics();
      const personalizationClient = client.initPersonalization({
        region: 'eu',
      });

      const res1 = (await abtestingClient.get({
        path: 'abtestingClient',
      })) as unknown as EchoResponse;
      const res2 = (await analyticsClient.get({
        path: 'analyticsClient',
      })) as unknown as EchoResponse;
      const res3 = (await personalizationClient.get({
        path: 'personalizationClient',
      })) as unknown as EchoResponse;

      expect(res1.headers).toEqual(
        expect.objectContaining({
          'x-algolia-application-id': 'APP_ID',
          'x-algolia-api-key': 'API_KEY',
        })
      );
      expect(res2.headers).toEqual(
        expect.objectContaining({
          'x-algolia-application-id': 'APP_ID',
          'x-algolia-api-key': 'API_KEY',
        })
      );
      expect(res3.headers).toEqual(
        expect.objectContaining({
          'x-algolia-application-id': 'APP_ID',
          'x-algolia-api-key': 'API_KEY',
        })
      );
    });

    it('`init` clients accept different credentials', async () => {
      const abtestingClient = client.initAbtesting({
        appId: 'appId1',
        apiKey: 'apiKey1',
      });
      const analyticsClient = client.initAnalytics({
        appId: 'appId2',
        apiKey: 'apiKey2',
      });
      const personalizationClient = client.initPersonalization({
        appId: 'appId3',
        apiKey: 'apiKey3',
        region: 'eu',
      });

      const res1 = (await abtestingClient.get({
        path: 'abtestingClient',
      })) as unknown as EchoResponse;
      const res2 = (await analyticsClient.get({
        path: 'analyticsClient',
      })) as unknown as EchoResponse;
      const res3 = (await personalizationClient.get({
        path: 'personalizationClient',
      })) as unknown as EchoResponse;

      expect(res1.headers).toEqual(
        expect.objectContaining({
          'x-algolia-application-id': 'appId1',
          'x-algolia-api-key': 'apiKey1',
        })
      );
      expect(res2.headers).toEqual(
        expect.objectContaining({
          'x-algolia-application-id': 'appId2',
          'x-algolia-api-key': 'apiKey2',
        })
      );
      expect(res3.headers).toEqual(
        expect.objectContaining({
          'x-algolia-application-id': 'appId3',
          'x-algolia-api-key': 'apiKey3',
        })
      );
    });
  });
});

describe('bundle', () => {
  it('expose both a full bundled package and a lite one', () => {
    expect(liteClient).not.toBeUndefined();
    expect(algoliasearch).not.toBeUndefined();
  });
});

/**
 * We only test the legacy signature, as `algoliasearch` inherits methods from the `client-search`.
 * The new signatures are already tested in the CTS.
 */
describe('search with legacy signature', () => {
  it('allows searching for query', async () => {
    const req = (await client.search([
      {
        indexName: 'theIndexName',
      },
    ])) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/queries');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({ requests: [{ indexName: 'theIndexName' }] });
    expect(req.searchParams).toStrictEqual(undefined);
  });

  it('allows searching for facet', async () => {
    const req = (await client.search([
      {
        indexName: 'theIndexName',
        type: 'facet',
        facet: 'theFacet',
      },
    ])) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/queries');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      requests: [
        { indexName: 'theIndexName', type: 'facet', facet: 'theFacet' },
      ],
    });
    expect(req.searchParams).toStrictEqual(undefined);
  });

  it('accepts a `params` parameter for `searchParams`', async () => {
    const req = (await client.search([
      {
        indexName: 'theIndexName',
        params: {
          hitsPerPage: 42,
        },
      },
    ])) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/queries');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      requests: [{ indexName: 'theIndexName', hitsPerPage: 42 }],
    });
    expect(req.searchParams).toStrictEqual(undefined);
  });
});
