import { of, ask, lift } from './utils.js'

export function create(app) {
  return ask(
    ({ dev: { data, cache, search } }) => of(app)
      .chain(data.create)
      .chain(cache.create)
      .chain(search.create)
      .chain(lift)
      .map(() => app)
  )
}