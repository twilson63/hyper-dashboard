import crocks from 'crocks'

const { Async } = crocks

export default function (fetch) {
  const asyncFetch = Async.fromPromise(fetch)
  const toJSON = res => Async.fromPromise(res.json.bind(res))()

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


  return Object.freeze({
    asyncFetch,
    toJSON,
    put,
    post
  })
}
