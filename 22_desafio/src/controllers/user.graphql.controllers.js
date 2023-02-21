import {buildSchema} from 'graphql'
import {graphqlHTTP} from 'express-graphql'
import {root} from '../service/user.graphql.service.js'

// configuracion graphql
const graphqlSchema = buildSchema(`
        type User{
            _id:String,
            username:String,
            password:String
        }
        input UserInput{
            username:String,
            password:String
        }
        type Query{
            getUsers: [User],
            getUserById(id:String): User
        }
        type Mutation{
            addUser(user:UserInput): User,
            deleteUserById(id:String): String
        }
`);


export const userGraphqlController = () =>{
    return graphqlHTTP({
        schema:graphqlSchema,
        rootValue:root,
        graphiql:true
    })
}
