import { apps, run } from '$lib/core.js'

export async function post(request) {
  const user = request.locals.username
  // const result = await apps
  //   .create(user)
  //   .runWith(services)
  //   .toPromise()
  const result = await run(app.create(user))
  
  return {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    },
    body: result
  }
}