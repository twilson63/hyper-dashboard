export async function get(req) {
  // clear session
  req.locals.logout = true
  // redirect
  return {
    status: 302,
    headers: {
      location: '/'
    },
    body: 'logging out!'
  }

}