const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

routes.use((req, res, next) => {
    res.locals.flashSuccess = req.flash('success')
    res.locals.flashError = req.flash('error')
    res.locals.flashInfo = req.flash('info')

    return next()
})

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/signin', guestMiddleware, (req, res) => {
    return res.render('auth/signin')
})

routes.post('/signin', SessionController.store)

// Authentication Middleware 
routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', (req, res) => {
    return res.render('dashboard')
})

module.exports = routes
