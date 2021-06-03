import { of, ask, lift } from './utils.js'
import { assoc } from 'ramda'

export function create(app) {
  return ask(
    ({ dev: { data, cache, search } }) =>
      data.create(app)
        .chain(cache.create)
        .chain(search.create)
        .bimap(
          () => assoc('status', 'failed', app),
          () => assoc('status', 'active', app)
        )


  ).chain(lift)
}