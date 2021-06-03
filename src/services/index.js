import fetch from 'node-fetch'
import { Async } from 'crocks'
import { prop } from 'ramda'
import hyper from '@hyper.io/connect'

const asyncFetch = Async.fromPromise(fetch)
const toJSON = res => Async.fromPromise(res.json.bind(res))()

const clientId = import.meta.env.VITE_CLIENT_ID
const secret = import.meta.env.VITE_CLIENT_SECRET
const tokenURL = 'https://github.com/login/oauth/access_token'
const userURL = 'https://api.github.com/user'

const startConnectString = import.meta.env.VITE_START_SERVICE

const createStartUrl = () => hyper(startConnectString).url('data')
const createStartToken = () => hyper(startConnectString).token()

const createHyperUrl = (app, svc) => `https://dev.hyper63.com/${svc}/${app.app}`
const createHyperToken = (secret) => jwt.sign({ sub: 'dashboard' }, secret)

export const start = {
  data: {
    post: doc => post(createStartUrl(), createStartToken(), doc),
    put: doc => put(createStartUrl(), createStartToken(), doc)
  }
}

export const dev = {
  data: {
    create: app => put(createHyperUrl(app, 'data'), createHyperToken(app.secret))
  },
  cache: {
    create: app => put(createHyperUrl(app, 'cache'), createHyperToken(app.secret))
  },
  search: {
    create: app => put(createHyperUrl(app, 'search'), createHyperToken(app.secret))
  }
}

export const github = {
  fetchToken,
  getUser
}

function put(url, token, body = {}) {
  return asyncFetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }).chain(toJSON)
}

function post(url, token, body = {}) {
  return asyncFetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }).chain(toJSON)
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
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).chain(toJSON)
}