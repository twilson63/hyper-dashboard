import crocks from 'crocks'
import { prop } from 'ramda'
import utils from './utils.js'
import connect from './connect.js'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const clientId = process.env.CLIENT_ID
const secret = process.env.CLIENT_SECRET
const tokenURL = 'https://github.com/login/oauth/access_token'
const userURL = 'https://api.github.com/user'

const startConnectString = process.env.START_SERVICE

const createStartUrl = () => connect(startConnectString).url('data')
const createStartToken = () => connect(startConnectString).token()

const createHyperUrl = (app, svc) => `https://dev.hyper63.com/${svc}/${app.app}`
const createHyperToken = (secret) => jwt.sign({ sub: 'dashboard' }, secret)

const { asyncFetch, toJSON } = utils

export default function (fetch) {
  const { asyncFetch, toJSON, post, put } = utils(fetch)

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

  return Object.freeze({
    start: {
      data: {
        post: doc => post(createStartUrl(), createStartToken(), doc),
        put: (id, doc) => put(`${createStartUrl()}/${id}`, createStartToken(), doc)
      }
    },
    dev: {
      data: {
        create: app => put(createHyperUrl(app, 'data'), createHyperToken(app.secret))
      },
      cache: {
        create: app => put(createHyperUrl(app, 'cache'), createHyperToken(app.secret))
      },
      search: {
        create: app => put(createHyperUrl(app, 'search'), createHyperToken(app.secret))
      }
    },
    github: {
      fetchToken,
      getUser
    }
  })
}
