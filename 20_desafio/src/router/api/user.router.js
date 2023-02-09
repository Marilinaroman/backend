import express from 'express'
import passport from 'passport'
import * as UserController from '../../controllers/user.controllers.js'
import { signupStrategy, loginStrategy } from '../middlewares/auth.middlewares.js'

const router = express.Router()

passport.use('signupStrategy', signupStrategy)
passport.use('loginStrategy', loginStrategy)



router.get('/inicio-sesion', (req,res)=>{
    res.render('login')
})

router.post('/signup',passport.authenticate('signupStrategy',{
    failureRedirect:'/api/user/registro',
    passReqToCallback: true,
    failureMessage:true
}),(req,res)=>{
    res.send('ok')
})

router.post('/login',passport.authenticate('loginStrategy',{
    failureRedirect: '/api/user/inicio-sesion',
    passReqToCallback: true,
    failureMessage:true
}),
(req,res)=>{
    res.redirect('./perfil')
})


router.get('/perfil',async(req,res)=>{
    if(req.isAuthenticated()){
        let {name} = req.user
        res.render('form',{user:name})
    }else{
        res.send("<div>Debes <a href='/api/user/inicio-sesion'>inciar sesion</a> o <a href='/api/user/registro'>registrarte</a></div>")
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy()
    setTimeout(()=>{
            res.redirect('./inicio-sesion')
    },3000)
})

export {router as UserRouter}