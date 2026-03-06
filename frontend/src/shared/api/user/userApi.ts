import { axiosClassic, axiosWithAuth } from '@/shared/api/interceptors'
import { IProfileResponse, TypeUserForm, UserListResponse } from './userTypes'

export class UserService {
	BASE_URL = '/users/'
	GET_USERS_LIST_URL = '/users/all'

	async getUsersList() {
		const response = await axiosClassic.get<UserListResponse>(this.GET_USERS_LIST_URL)
		return response.data
	}

	async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL)
		return response.data
	}

	async update(data: TypeUserForm) {
		const response = await axiosWithAuth.put(this.BASE_URL, data)
		return response.data
	}
}

export const userService = new UserService()
