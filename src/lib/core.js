import core from '../core/index.js'
import * as services from '../services/index.js'

export const apps = core.apps
export const session = core.session
export const run = x => x.runWith(services).toPromise()


