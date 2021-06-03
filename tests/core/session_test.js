import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { session } from '../../src/core/index.js'
import crocks from 'crocks'
const { Async } = crocks

const services = {
  github: {
    fetchToken: () => Async.Resolved({ access_token: '1234' }),
    getUser: () => Async.Resolved({ login: 'user' })
  }
}

test('create user session', async () => {
  const result = await session
    .create('code')
    .runWith(services)
    .toPromise()

  assert.is(result.login, 'user')
  return result
})

test.run()