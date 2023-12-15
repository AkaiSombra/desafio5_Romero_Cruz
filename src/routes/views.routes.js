
import { Router, query } from "express"

const router = Router()

router.get('/products', async (req, res) => {
    if(req.session.user){
        res.render('productsViews', {})
    } else {
        res.redirect('login')
    }
})

router.get('/login', async (req, res) => {
    if (req.session.user){
        res.redirect('/profile')
    } else {
        res.render('login', {})
    }
})

router.get('/register', async (req, res) => {
    res.render('register', {})
})

router.get('/profile', async (req, res) => {
    if (req.session.user){
        res.render('profile', { user: req.session.user})
    } else {
        res.redirect('/login')
    }
    
})

export default router