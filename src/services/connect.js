import jwt from 'jsonwebtoken'

const createPath = path => ({ svc, paths }) => ({ svc, pathname: [path, ...paths].join('/') })
const createUrl = host => ({ svc, pathname }) => `https://${host}/${svc}/${pathname}`

const url = cs => (svc, ...paths) => {
  return [{ svc, paths }]
    .map(createPath(cs.pathname))
    .map(createUrl(cs.host))
    .pop()
}

const token = cs => (payload) =>
  jwt.sign({ sub: cs.username, ...payload }, cs.password)

export default function (HYPER) {
  const cs = new URL(HYPER)
  return {
    url: url(cs),
    token: token(cs)
  }
}