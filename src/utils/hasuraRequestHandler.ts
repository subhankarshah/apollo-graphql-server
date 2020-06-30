import { injectable, inject } from "inversify"
import { GraphQLClient } from "graphql-request"
import { TYPES } from "../ioc/TYPES"
import { Query, EnvConfigInterface } from "../constants/types"
import { QueryType } from "../constants/enums"


@injectable()
export class HasruraRequestHandler {
	private hasuraClient: GraphQLClient
	constructor(
		@inject(TYPES.EnvConfig) private envConfig: EnvConfigInterface,
		@inject(TYPES.HasruaClient) private getHasuraClient: (hasuraEndPoint: string, hasuraAdminSecret: string) => GraphQLClient
	) {
		this.hasuraClient = this.getHasuraClient(this.envConfig.HASURA_END_POINT, this.envConfig.HASURA_ADMIN_SECRET)
	}
	async request(query: Query, variables?: object, headers?: object): Promise<any> {
		const response = await this.hasuraClient.request(query.gqlQuery, variables)
		if (query.type === QueryType.transaction || query.type === QueryType.raw) {
			return response
		}
		if (query.name === null) {
			throw new Error("Unnamed Query")
		}
		const result = query.isMutation ? response[query.name].returning : response[query.name]
		if (query.type === QueryType.object) {
			return result.length === 0 ? null : result[0]
		}
		return result
	}
}