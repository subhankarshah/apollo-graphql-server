import { gql } from 'apollo-server'

export const userSchema = gql`
	type User {
		id: ID!
		firstName: String
		lastName: String
		email: String
		mobile: String!
	}
	extend type Query {
		getAllUsers: [User!]!
	}
`