'use strict';

/**
 * Module dependencies.
 */

const errors = require('./errors');
const isSafeInteger = require('is-safe-integer');
const uuid = require('uuid');
const fs = require('fs');
const Redis = require("ioredis");

/**
 * Instances.
 */

const { InvalidSessionError, BadChunkError } = errors;
const uploadesQueue = []; // [ { uuid: '123e4567-e89b-12d3-a456-426655440000', expires: 6000, offset: 0, size: 5368709120, name: "fooBar.zip"} ]

/**
 * remove old 
 */

const systemCheck = function (tmp){
  /**
   * Check if is 
   */ 
  try {
    fs.statSync(tmp).isDirectory();
  } catch (e) {
    throw new InvalidConfigurationError(err); // TODO: check error
  }

  fs.accessSync(tmp, fs.constants.R_OK | fs.constants.W_OK, (err) => {
    throw new InvalidConfigurationError(err ? 'no access!' : 'can read/write');// TODO: check error
  });

  // TODO: Remove olde chunks 

};


/**
 * chunks middleware.
 */

function middleware({ file_max = 1024, chunk_max = 50, expires = 3600, tmp = '/tmp' } = {}) {

  /**
   * Valid Configuration
   */
  if (!isFinite(file_max) || !isSafeInteger(file_max) || file_max <= 0 ||
      !isFinite(expires) || !isSafeInteger(expires) || expires <= 0) {
    throw new InvalidConfigurationError();
  
  }else if ( !isFinite(chunk_max) || !isSafeInteger(chunk_max) || chunk_max <= 0) {
    if (chunk_max !== -1){
      throw new InvalidConfigurationError();
    }
    chunk_max = file_max;
  }

  await systemCheck(tmp);

  return async function chunks(ctx, next) {

   let errorMessage;
    
    // parms have offset uuid create session 

    // chuck exist append

    if (limit.remaining) return await next();

    ctx.status = 409;
    ctx.body = errorMessage || `Chunk error.`;
  
  };
}

/**
 * Exports.
 */

module.exports = { errors, middleware };