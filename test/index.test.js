'use strict';

/**
 * Module dependencies.
 */

const { middleware } = require('..');
const Koa = require('koa');
const request = require('supertest');

/**
 * Test `paginate`.
 */

describe('middleware', () => {
  let app;
  let server;

  beforeEach(() => {
    app = new Koa();

    app.silent = true;

    server = app.listen();
  });

  afterEach(() => server.close());

  it('should return 202 session created', () => {
    app.use(middleware());

    app.use(ctx => { });

    return request(server)
      .put('/chunk')
      .send({
        "bytes": 5368709120,
        "name": "foobar.zip",
        "mime_type": "application/zip"
       })
      .expect(202);
  });
});