import { injectable, inject } from "inversify"
import { TYPES } from "../ioc/TYPES"
import { EnvConfigInterface } from "../constants/types"
import {createHttpLink} from "apollo-link-http"
import {setContext} from "apollo-link-context"
import { introspectSchema, makeRemoteExecutableSchema } from "graphql-tools"

@injectable()
export class RemoteSchemaUtil {

	constructor(
		@inject(TYPES.EnvConfig) private envConfig : EnvConfigInterface
	){
	}

	async getRemoteSchema() {
		const http = createHttpLink({
			uri: this.envConfig.HASURA_END_POINT,
			fetch:fetch
		})
		const link = setContext((request, previousContext) => {
			// Exposing Hasura Schema without authentication is not recommended in Prod
			// return {
			//     headers:{authorization: previousContext.graphqlContext.headers.authorization}
			// }
			return { 
				headers: { "x-hasura-admin-secret": this.envConfig.HASURA_ADMIN_SECRET}
			}
		}).concat(http)
		const introspectionLink = createHttpLink({
			uri: this.envConfig.HASURA_END_POINT,
			headers: { 
				"x-hasura-admin-secret": this.envConfig.HASURA_ADMIN_SECRET
			},
			fetch
		})
		const remoteSchema = await introspectSchema(introspectionLink)
		const remoteExecutableSchema =  makeRemoteExecutableSchema({
			schema: remoteSchema,
			link:link
		})
		return remoteExecutableSchema
	}

}