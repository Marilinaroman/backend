import { getUsers, createUser, findUser } from "../service/user.service.js";
import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'



export const getUsersController = async(req,res)=>{
    try {
        const response = await getUsers();
        res.json({data:response});
    } catch (error) {
        res.json({message:`Hubo un error ${error}`});
    }
}

export const saveUserController = async(req,res)=>{
    try {
        const response = await createUser(req.body);
        res.json({data:response});
    } catch (error) {
        res.json({message:`Hubo un error ${error}`});
    }
}
export const findOneController = async(req,done)=>{
    const {username} = req.body.email
    try{
        const existe = await findUser(username)
        console.log(existe);
        await findUser({username:username}, (error,userFound)=>{
            if (error) return done(error,null,{message:'hubo un error'})
            if(userFound) return done(null,null,{message:'el usuario existe'}) 
            const newUser = {
                name: req.body.name,
                username:username,
                password:createHash(req.body.password)
            }
            createUser(newUser, (error,userCreated)=>{
                if(error) return done(error,null, {message:'error al registrar'})
                return done(null, userCreated,{message:'usuario creado'})
            })
        })

    }catch(error){
        console.log((error));
    }
}


