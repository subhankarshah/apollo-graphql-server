import { QueryType } from "./enums"

export interface SubQuery {
	name: string
	type: QueryType
}

export interface Query {
	name?: string
	gqlQuery: string
	isMutation?: boolean
	type: QueryType
	subQueries?: SubQuery[]
}

export interface EnvConfigInterface {
	HASURA_END_POINT: string
	HASURA_ADMIN_SECRET: string
	START_CRONS: boolean
}