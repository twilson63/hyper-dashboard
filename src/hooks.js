import cookie from 'cookie';
//import { v4 as uuid } from '@lukeed/uuid';
import { not, propEq } from 'ramda'

export const handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '')
	request.locals.username = not(propEq('data', 'deleted', cookies)) ? cookies.data : ''

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase()
	}

	const response = await resolve(request)

	if (request.locals.username !== '') {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `data=${request.locals.username}; Path=/; HttpOnly`
	}

	if (request.locals.logout) {
		response.headers['set-cookie'] = `data=deleted; Path=/; HttpOnly`;
	}

	return response
}

export async function getSession(request) {
	return {
		username: request.locals.username
	}
}