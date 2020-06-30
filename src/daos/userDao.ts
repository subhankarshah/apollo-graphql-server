import { inject, injectable } from "inversify"
import { TYPES } from "../ioc/TYPES"
import { HasruraRequestHandler } from "../utils/hasuraRequestHandler"
import { QueryType } from "../constants/enums"
import { Query } from "../constants/types"

@injectable()
export class UserDao {

	constructor(
		@inject(TYPES.HasruraRequestHandler) private hasruraRequestHandler: HasruraRequestHandler,
	) {
	}

	async getAllUsers() {
		const query : Query = {
			name: "users",
			gqlQuery: `query getAllUsers {
				users: user_user{
					id
					firstName
					lastName
					mobile
					email
				}
			}`,
			type: QueryType.array
		}
		return this.hasruraRequestHandler.request(query)
	}

}