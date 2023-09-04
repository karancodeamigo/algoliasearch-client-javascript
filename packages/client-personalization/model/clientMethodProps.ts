// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

/**
 * Properties for the `del` method.
 */
export type DelProps = {
  /**
   * Path of the endpoint, anything after \"/1\" must be specified.
   */
  path: string;
  /**
   * Query parameters to apply to the current query.
   */
  parameters?: Record<string, any>;
};

/**
 * Properties for the `deleteUserProfile` method.
 */
export type DeleteUserProfileProps = {
  /**
   * UserToken representing the user for which to fetch the Personalization profile.
   */
  userToken: string;
};

/**
 * Properties for the `get` method.
 */
export type GetProps = {
  /**
   * Path of the endpoint, anything after \"/1\" must be specified.
   */
  path: string;
  /**
   * Query parameters to apply to the current query.
   */
  parameters?: Record<string, any>;
};

/**
 * Properties for the `getUserTokenProfile` method.
 */
export type GetUserTokenProfileProps = {
  /**
   * UserToken representing the user for which to fetch the Personalization profile.
   */
  userToken: string;
};

/**
 * Properties for the `post` method.
 */
export type PostProps = {
  /**
   * Path of the endpoint, anything after \"/1\" must be specified.
   */
  path: string;
  /**
   * Query parameters to apply to the current query.
   */
  parameters?: Record<string, any>;
  /**
   * Parameters to send with the custom request.
   */
  body?: Record<string, any>;
};

/**
 * Properties for the `put` method.
 */
export type PutProps = {
  /**
   * Path of the endpoint, anything after \"/1\" must be specified.
   */
  path: string;
  /**
   * Query parameters to apply to the current query.
   */
  parameters?: Record<string, any>;
  /**
   * Parameters to send with the custom request.
   */
  body?: Record<string, any>;
};