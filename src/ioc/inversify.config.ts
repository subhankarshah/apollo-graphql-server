import { interfaces } from "inversify"
import { GraphQLClient } from "graphql-request"
import { TYPES } from "./TYPES"
import { envConfig } from "../utils/envConfig"
import { EnvConfigInterface } from "../constants/types"
import { HasruraRequestHandler } from "../utils/hasuraRequestHandler"
import { UserDao } from "../daos/userDao"
import { UserService } from "../services/userService"
import { DemoCron } from "../crons/demoCron"
import { RemoteSchemaUtil } from "../utils/remoteSchemaUtil"
import { CronUtil } from "../utils/cronUtil"

function getHasuraClient(hasuraEndPoint: string, hasuraAdminSecret: string) {
	const hasruaClient = new GraphQLClient(hasuraEndPoint, { headers: { "x-hasura-admin-secret": hasuraAdminSecret } })
	return hasruaClient
}

export function registerBindings(container: interfaces.Container) {
	container.bind<(hasuraEndPoint: string, hasuraAdminSecret: string) => GraphQLClient>(TYPES.HasruaClient).toFunction(getHasuraClient)
	container.bind<EnvConfigInterface>(TYPES.EnvConfig).toConstantValue(envConfig)
	container.bind<HasruraRequestHandler>(TYPES.HasruraRequestHandler).to(HasruraRequestHandler)
	container.bind<UserDao>(TYPES.UserDao).to(UserDao)
	container.bind<UserService>(TYPES.UserService).to(UserService)
	container.bind<DemoCron>(TYPES.DemoCron).to(DemoCron)
	container.bind<RemoteSchemaUtil>(TYPES.RemoteSchemaUtil).to(RemoteSchemaUtil)
	container.bind<CronUtil>(TYPES.CronUtil).to(CronUtil)
}