import { test } from 'uvu'
import * as assert from 'uvu/assert'
import sinon from 'sinon'
import * as utils from '../../src/services/utils.js'
import { github } from '../../src/services/index.js'
import crocks from 'crocks'

const { Async } = crocks

sinon.stub(utils, 'asyncFetch').returns({ chain: (fn) => Async.Resolved({ ok: true }) })
/*
import fetchMock from 'fetch-mock'

globalThis.fetch = fetchMock.sandbox()
  .post('https://github.com/login/oauth/access_token', { status: 201, body: { access_token: '1234' } })
*/

test('fetchToken', () => {
  console.log('test')
  github.fetchToken('1234')
    .fork(
      () => assert.ok(false),
      () => assert.ok(true)
    )
})

test.run()