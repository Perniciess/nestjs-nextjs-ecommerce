export interface IUser {
	id: string
	login: string
	email: string
}

export interface IProfileResponse {
	user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
