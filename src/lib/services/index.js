import fetch from 'node-fetch'
import { Async } from 'crocks'
import { prop } from 'ramda'

const asyncFetch = Async.fromPromise(fetch)
const toJSON = res => Async.fromPromise(res.json.bind(res))()

const clientId = import.meta.env.VITE_CLIENT_ID
const secret = import.meta.env.VITE_CLIENT_SECRET
const tokenURL = 'https://github.com/login/oauth/access_token'
const userURL = 'https://api.github.com/user'

export const github = {
  fetchToken,
  getUser
}


function fetchToken(code, state) {
  return asyncFetch(tokenURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: secret,
      code, state
    })
  })
    .chain(toJSON)
    .map(prop('access_token'))
}

function getUser(token) {
  return asyncFetch(userURL, {
    headers: {
      Accept: 'application/vnd.githu.v3+json',
      Authorization: `Bearer ${token}`
    }
  }).chain(toJSON)
}