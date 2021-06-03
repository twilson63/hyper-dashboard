import { customAlphabet, nanoid } from 'nanoid'
import { of, ask, lift } from './utils.js'
import { assoc, lensProp, over } from 'ramda'

const genKey = () => 'x' + customAlphabet('1234567890abcdefghijklmnopqrstuvxyz', 31)()
const genSecret = () => nanoid(64)

export const post = (app, accountId = app) =>
  of({ app, accountId })
    .map(over(lensProp('key'), genKey))
    .map(over(lensProp('secret'), genSecret))
    .map(doc => assoc('id', doc.key, doc))
    .map(assoc('type', 'app'))
    .map(assoc('status', 'pending'))
    .chain(doc =>
      ask(({ start: { data } }) =>
        data.post(doc).map(() => doc)

      )

    )

    .chain(lift)

export const put = (id, doc) => of(doc)
  .chain(doc => ask(
    ({ start: { data } }) => data.put(id, doc).map(() => doc)
  ))
  .chain(lift)
