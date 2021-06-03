import { session } from '../../core/index.js'
import services from '../../services/index.js'

export const get = async (req) => {
  const code = req.query.get('code')
  const user = await session
    .create(code)
    .runWith(services)
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