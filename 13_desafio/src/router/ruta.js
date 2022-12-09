import express, { application } from 'express'
import { productosTest } from '../test/testFaker.js'
import ContendorMariaDb from '../clases/mariaDb.model.js'
import ContenedorSqlite from '../clases/sqlite.model.js'
import  {contenedorMsj} from '../clases/contenedorMsj.js'
import { options } from '../config/configSql.js'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import session, { Cookie } from 'express-session'
import { UserModel } from '../model/users.js'

const router = express.Router()
const productos = new ContendorMariaDb(options.mariaDb,'productos')
//const mensajes = new ContenedorSqlite(options.sqlite,'mensajes')
const mensajes = new contenedorMsj(options.fileSystem.pathMensajes)

//passport
passport.use('signupStrategy', new LocalStrategy({
    passReqToCallback:true,
    usernameField: 'userName'
},
    (req,username,password,done)=>{
        UserModel.findOne({username}, (error,userFound)=>{
            if (error) return done(error,null,{message:'hubo un error'})
            if(userFound) return done(null,userFound,{message:'el usuario existe'}) 
            const newUser = {
                name:req.body.nombre,
                username,
                password
            }

            UserModel.create(newUser, (error,userCreated)=>{
                if(error) return done(error,null, {message:'error al registrar'})
                return done(null, userCreated,{message:'usuario creado'})
            })
        })
    }
))





router.get('/', async(req,res)=>{
    res.render('form')
})

router.get('/productos', async (req,res)=>{
    const data = await productos.getAll()
    console.log(data);
    res.send(data)
})

router.get('/productos/:id', async (req,res)=>{
    const {id} = req.params
    const producto = await productos.getById(id)

    if(producto){
        res.send(producto)
    }else{
        return res.json({
            message:"el producto no existe"
        })
    }
})

router.post('/productos', async (req,res)=>{
    
    const newProd = (req.body)
    await productos.save(newProd)
    const data = await productos.getAll()
    
    res.send(data)

})

router.put('/productos/:id', async(req,res) =>{
    const {id} = req.params
    const modificacion = req.body
    
    const existe = await productos.getById(id)
        
        if (!existe){
            return res.status(404).send({ message: 'Error el producto no existe' })
        } else{
            const prod = await productos.putById(id,modificacion)
            return res.send(prod)
        }
    
})

router.delete('/productos/:id', async(req,res)=>{
    const {id} = req.params

    
        const existe = await productos.getById(id)
        
        if (!existe){
            return res.status(404).send({ message: 'Error el producto no existe' })
        } else{
            const prod = productos.deleteById(id)
        res.send(prod)
        }
    
    
})

// rutas del chat
router.get('/chat', async(req,res)=>{
    const data = await mensajes.getAll()
    res.render('chat',{data})
})

router.post('/chat', async (req,res)=>{
    const newMsj = (req.body)
    const msj = await mensajes.save(newMsj)
    res.send(msj)

})

//ruta de testeo con faker

router.get('/productos-test', async(req,res)=>{
    res.send(productosTest)
})

router.get('/registro', async(req,res)=>{
    res.render('signup')
})


router.post('/signup',passport.authenticate('signupStrategy',{
    failureRedirect:'/registro',
    failureMessage:true
}),(req,res)=>{
    res.redirect('/perfil')
})

//Rutas cookies
router.get('/login',(req,res)=>{
    
    const {userName, password} = req.query
    if(req.session.userName){
        res.redirect('./perfil')
    }else{
        if(userName){
            req.session.userName = userName
            res.render('form',{userName})
        }else{
            res.render('login')
        }
    }
    
})

const checkUser = (req,res,next)=>{
    if(req.session.userName){
        console.log(req.session.userName);
        next()
    }else{
        res.redirect('./login')
    }
}


router.get('/perfil',checkUser,(req,res)=>{
    res.render('form',{userName:req.session.userName})
})

router.get('/logout',(req,res)=>{
    req.session.destroy()
    setTimeout(()=>{
            res.redirect('./login')
    },3000)
})


export default router