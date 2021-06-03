import { post, put } from './apps.js'
import * as hyper from './hyper.js'
import { createSession } from './session.js'

export const apps = {
  create: user => post(user)
    .chain(hyper.create)
    .chain(doc => put(doc.id, doc))
    .map(() => ({ ok: true }))
}

export const session = {
  create: createSession
}
