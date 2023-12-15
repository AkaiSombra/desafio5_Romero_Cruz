
import { Router } from "express"
import userModel from "../models/users.models.js"

const router = Router()

router.put('/register', async (req, res) => {
    try{
        const newUser = req.body

        const userAdded = await userModel.create(newUser)
        res.status(200).send({ status: 'OK', data: `New user registered, Welcome ${userAdded.name}`} )

    } catch(err){
        console.log(err.message)
        res.status(400).send({ status: 'ERROR', data: err.message})
    }
})

router.post('/login', async (req, res) => {
    try{
        const { username, password} = req.body
        const user = { username: username, password: password}

        const searchUserBaseData = await userModel.findOne({ username: user.username}).lean()

        if (username === searchUserBaseData.username && password === searchUserBaseData.password){
            req.session.user = { username: username, role: searchUserBaseData.role}
            res.redirect('/products')
        } else {
            res.status(401).send({ status: 'ERROR', data: 'Datos no validos'})
        }

    } catch(err){
        res.status(500).send({ status: 'ERROR', data: err.message})
    }
})

router.get('/status', (req, res) => {
    try{
        if (req.session.user){
            res.status(200).send({ status: 'OK', data: req.session.user})
        } else {
            res.status(200).send({ status: 'OK', data: 'No hay datos de usuarios'})
        }
    } catch(err){
        res.status(500).send({ status: 'ERROR', data: err.message})
    }
})

router.get('/logout', async (req, res) => {
    try{
        req.session.destroy((err) => {
            if (err){
                res.status(500).send({ status: 'ERROR', data: err.message})
            } else{
                // res.status(200).send({ status: 'OK', data: `Session finalizada`})
                res.redirect('/login')
            }
        })
        
    } catch(err){
        res.status(500).send({ status: 'ERROR', data: err.message})
    }
})

export default router