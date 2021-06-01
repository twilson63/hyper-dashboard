import * as services from '$lib/services/index.js'
import core from '$lib/core/index.js'

export const get = async (req) => {
  const { session } = core(services)

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