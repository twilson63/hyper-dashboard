import * as apps from './apps.js'
import * as hyper from './hyper.js'

export default function (services) {

  return {
    session: {
      create: createSession(services)
    },
    apps: {
      create: user => apps.post(user)
        .chain(hyper.create)
        .map(assoc('status', 'active'))
        .chain(apps.update)
    }
  }
}

// create auth session
function createSession({ github }) {
  return function (code, state) {
    return github.fetchToken(code, state)
      .chain(github.getUser)
  }
}
