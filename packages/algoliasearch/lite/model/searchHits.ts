// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { Hit } from './hit';

export type SearchHits<T = Record<string, any>> = Record<string, any> & {
  hits: Array<Hit<T>>;

  /**
   * Text to search for in an index.
   */
  query: string;

  /**
   * URL-encoded string of all search parameters.
   */
  params: string;
};
