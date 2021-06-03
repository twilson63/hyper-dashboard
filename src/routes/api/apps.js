import { apps } from '../../core/index.js'
import services from '../../services/index.js'

export async function post(request) {
  const user = request.locals.username
  const result = await apps
    .create(user)
    .runWith(services)
    .toPromise()

  return {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    },
    body: result
  }
}