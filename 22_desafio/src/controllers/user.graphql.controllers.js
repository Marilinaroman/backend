import {buildSchema} from 'graphql'
import {graphqlHTTP} from 'express-graphql'
import {root} from '../service/user.graphql.service.js'

// configuracion graphql
const graphqlSchema = buildSchema(`
        type user{
            _id:String,
            name:String,
            username:String,
            password:String
        }
        input UserInput{
            username:String,
            password:String
        }
        type Query{
            getUsers: [user],
            getUserById(id:Int): user
        }
        type Mutation{
            addUser(user:UserInput): user,
            deleteUserById(_id:String): String
        }
`);


export const userGraphqlController = () =>{
    return graphqlHTTP({
        schema:graphqlSchema,
        rootValue:root,
        graphiql:true
    })
}
