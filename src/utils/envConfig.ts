import * as dotenv from "dotenv"
import { EnvConfigInterface } from "../constants/types"

const env = process.env.NODE_ENV
dotenv.config({ path: `./.env.${env}` })

export const envConfig : EnvConfigInterface = {
	HASURA_END_POINT: process.env.HASURA_END_POINT,
	HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
	START_CRONS: Boolean(process.env.START_CRONS)
}