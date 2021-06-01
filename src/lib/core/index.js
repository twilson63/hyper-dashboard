export default function (services) {
  return {
    session: {
      create: createSession(services)
    }
  }
}

// create auth session
function createSession({ github }) {
  return function (code, state) {
    return github.fetchToken(code, state)
      .chain(github.fetchUser)
  }
}