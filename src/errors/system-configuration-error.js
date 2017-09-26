'use strict';

/**
 * Module dependencies.
 */

const HttpError = require('standard-http-error');

/**
 * Constructor.
 */

module.exports = class SystemConfigurationError extends HttpError {
  constructor() {
    super(500, { message: 'System Configuration Error' });
  }
};
