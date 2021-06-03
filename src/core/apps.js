import { customAlphabet, nanoid } from 'nanoid'
import { ReaderAsync } from './utils.js'

const genKey = () => 'x' + customAlphabet('1234567890abcdefghijklmnopqrstuvxyz', 31)()
const genSecret = () => nanoid(64)
const { ask, lift } = ReaderAsync

export const post = (app, account) => {
  const key = genKey()
  const secret = genSecret()
  const app = {
    id: key,
    type: 'app',
    app,
    key,
    secret,
    accountId: account,
    status: 'pending'
  }
  return ask(({ start: { data } }) =>
    data.post(app).map(() => app)
  ).chain(lift)
}

export const put = doc => ask(
  ({ start: { data } }) => data.put(doc).map(() => doc)
).chain(lift)
