import createCore from '$lib/core.js'

export const get = async (req) => {
  const { session } = createCore()

  const code = req.query.get('code')
  const state = req.query.get('state')
  const user = await session
    .create(code, state)
    .toPromise()

  req.locals.username = user.login
  // need to handle error...
  return {
    status: 302,
    headers: {
      location: '/apps'
    },
    body: 'redirect'
  }
}