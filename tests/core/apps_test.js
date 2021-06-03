import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { apps } from '../../src/core/index.js'
import crocks from 'crocks'
const { Async } = crocks

const services = {
  start: {
    data: {
      post: (doc) => Async.Resolved({ ok: true }),
      put: (id, doc) => Async.Resolved({ ok: true })
    }
  },
  dev: {
    data: {
      create: () => Async.Resolved({ ok: true })
    },
    cache: {
      create: () => Async.Resolved({ ok: true })
    },
    search: {
      create: () => Async.Resolved({ ok: true })
    }
  }
}

test('create hyper app', async () => {
  const result = await apps
    .create('user')
    .runWith(services)
    .toPromise()

  assert.ok(result.ok)
  return result
})

test.run()