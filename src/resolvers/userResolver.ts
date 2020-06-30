import container from "../ioc"
import { TYPES } from "../ioc/TYPES"
import { UserService } from "../services/userService"

const userService: UserService = container.get<UserService>(TYPES.UserService)

export const userResolver = {
	Query: {
		getAllUsers: async (_, args, context, info) => {
			return userService.getAllUsers()
		}
	}
}