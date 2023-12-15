
import { Router } from "express"

const router = Router()

router.post('/login', async (req, res) => {
    try{
        const { username, password} = req.body

        if (username === 'Sombra' && password === '123'){
            req.session.user = { username: username, admin: true}
            // res.status(200).send({ status: 'OK', data: 'Session iniciada'})
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