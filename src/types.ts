type Credentials = {
	username: string
	password: string
}

type Balance = {
	credits: number
	balance: number
}

type Sender = {
	sender: string
	checked: boolean
	verified: boolean
	registered: boolean
}

type Template = {
	tpl_id: string
	text: string
}

export type { Sender, Balance, Template, Credentials }
