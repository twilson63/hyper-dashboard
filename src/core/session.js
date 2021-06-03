import { of, ask, lift } from './utils.js'

const doCreate = code => ask(
  ({ github: { fetchToken, getUser } }) => fetchToken(code).chain(getUser)
)

export const createSession = code => of(code).chain(doCreate).chain(lift)

