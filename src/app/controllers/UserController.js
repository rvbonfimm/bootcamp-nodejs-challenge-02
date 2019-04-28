const { User } = require('../models')

class UserController {
    create (req, res) {
        return res.render('auth/signup')
    }

    async store (req, res) {
        var filename = req.file

        if (!filename) {
            filename = ''
        }

        await User.create({ ...req.body, avatar: filename.originalname })

        return res.redirect('/signin')
    }
}

module.exports = new UserController()
