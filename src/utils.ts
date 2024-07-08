const BASE_URL = 'https://api.rocketsms.by'

const getUrl = (path: string) => [BASE_URL, path].join('')

const fetchRocket = <T = unknown>(
	path: string,
	{ body, method, headers, ...opts }: RequestInit = {},
) =>
	fetch(getUrl(path), {
		...opts,
		body,
		method,
		headers: {
			...headers,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then((res) => res.json())
		.then((json) => {
			if (json?.error) {
				throw new Error(json.error)
			}

			return json as T
		})
		.catch((_err) => {
			throw new Error(['[RocketSms API] ERROR:', JSON.stringify(_err)].join(' '), {
				cause: _err,
			})
		})

export { fetchRocket }
