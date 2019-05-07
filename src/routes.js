const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const SchedulingController = require('./app/controllers/SchedulingController')
const AvailabilityController = require('./app/controllers/AvailabilityController')
const ServiceProviderController = require('./app/controllers/ServiceProviderController')

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

routes.use((req, res, next) => {
    res.locals.flashSuccess = req.flash('success')
    res.locals.flashError = req.flash('error')
    res.locals.flashInfo = req.flash('info')

    return next()
})

routes.use('/app', authMiddleware)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/signin', guestMiddleware, SessionController.index)
routes.post('/signin', SessionController.store)

routes.get('/app/logout', SessionController.destroy)
routes.get('/app/dashboard', DashboardController.index)

routes.get('/files/:file', FileController.show)

routes.get('/app/schedulings/new/:provider', SchedulingController.create)
routes.post('/app/schedulings/new/:provider', SchedulingController.store)
routes.get('/app/schedulings', ServiceProviderController.index)

routes.get('/app/availability/:provider', AvailabilityController.index)

module.exports = routes
