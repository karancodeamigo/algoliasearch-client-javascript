// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

export type Cursor = {
  /**
   * Cursor indicating the location to resume browsing from. Must match the value returned by the previous call. Pass this value to the subsequent browse call to get the next page of results. When the end of the index has been reached, `cursor` is absent from the response.
   */
  cursor?: string;
};