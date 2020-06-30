import { inject, injectable } from "inversify"
import { TYPES } from "../ioc/TYPES"
import { UserDao } from "../daos/userDao"

@injectable()
export class UserService {

	constructor(
		@inject(TYPES.UserDao) private userDao: UserDao,
	) {
	}

	async getAllUsers() {
		return this.userDao.getAllUsers()
	}

}