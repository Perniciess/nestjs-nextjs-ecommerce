import { axiosWithAuth } from '@/shared/api/interceptors'
import { IProfileResponse, TypeUserForm } from './userTypes'

export class UserService {
	BASE_URL = '/users/'
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
