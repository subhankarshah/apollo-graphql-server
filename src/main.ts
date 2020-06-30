import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import { userSchema } from './schema/userSchema'
import { userResolver } from './resolvers/userResolver'
import { RemoteSchemaUtil } from './utils/remoteSchemaUtil'
import container from './ioc'
import { mergeSchemas } from 'graphql-tools'
import { TYPES } from './ioc/TYPES'
import { merge } from 'lodash'
import { gqlApis } from './schema/baseSchema'
import { CronUtil } from './utils/cronUtil'

const remoteSchemaUtil: RemoteSchemaUtil = container.get<RemoteSchemaUtil>(TYPES.RemoteSchemaUtil)
const cronUtil: CronUtil = container.get<CronUtil>(TYPES.CronUtil)

const startApp = async () => {
	// On adding new resolver add resolver to merge function as a comma spearated argument
	const schema = makeExecutableSchema({
		resolvers: merge(userResolver),
		typeDefs: [gqlApis, userSchema]
	})
	// It is not advisable to expose sticthed Hasura schema through Apollo
	// without proper authencaiton configured in Hasura
	const remoteSchema = await remoteSchemaUtil.getRemoteSchema()
	const mergedSchema = mergeSchemas({
		schemas: [schema, remoteSchema]
	})
	const server = new ApolloServer({ schema: mergedSchema })
	cronUtil.startCrons()
	server.listen().then(({ url }) => console.log(`Server ready at ${url}. `)).catch(error => console.error(error))
}

startApp().catch(error => console.error(error))