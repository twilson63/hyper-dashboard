import { session, run } from '$lib/core.js'

export const get = async (req) => {
  const code = req.query.get('code')
  const user = await run(session.create(code))
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