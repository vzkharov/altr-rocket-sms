import { createHash } from 'crypto'

import { fetchRocket } from './utils'
import type { Sender, Balance, Template, Credentials } from './types'

type SendOptions = Partial<{
	sender: string
	priority: string
	timestamp: string
}>

type SendResponse = {
	id: number
	status: string
	cost: {
		money: number
		credits: number
	}
}

type Options = {
	auth: Credentials
}

class RocketClient {
	private credentials: Credentials

	constructor(opts: Options) {
		const { auth } = opts

		this.credentials = {
			username: auth.username,
			password: createHash('md5').update(auth.password).digest('hex'),
		}
	}

	public async send(phone: string, text: string, opts: SendOptions = {}) {
		const uri = '/simple/send'

		const body = new URLSearchParams({
			text,
			phone,
			...opts,
			...this.credentials,
		})

		return fetchRocket<SendResponse>(uri, {
			body,
			method: 'POST',
		})
	}

	public async status(id: string | number) {
		const uri = '/simple/status'

		const body = new URLSearchParams({
			id: String(id),
			...this.credentials,
		})

		return fetchRocket<{ id: number; status: string }>(uri, {
			body,
			method: 'GET',
		})
	}

	public async balance() {
		const uri = '/simple/balance'

		const body = new URLSearchParams(this.credentials)

		return fetchRocket<Balance>(uri, {
			body,
			method: 'GET',
		})
	}

	public async senders() {
		const uri = '/simple/senders'

		const body = new URLSearchParams(this.credentials)

		return fetchRocket<Sender[]>(uri, {
			body,
			method: 'GET',
		})
	}

	public async templates() {
		const uri = '/simple/templates'

		const body = new URLSearchParams(this.credentials)

		return fetchRocket<Template[]>(uri, {
			body,
			method: 'GET',
		})
	}

	/**
	 * @param sender alphanumeric name
	 */
	public async addSender(sender: string) {
		const uri = '/simple/senders/add'

		const body = new URLSearchParams({
			sender,
			...this.credentials,
		})

		return fetchRocket<{ status: string }>(uri, {
			body,
			method: 'POST',
		})
	}
}

export { RocketClient }
export type { Options, Credentials }
