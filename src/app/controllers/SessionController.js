const { User } = require('../models')

class SessionController {
    async index (req, res) {
        return res.render('auth/signin')
    }

    async store (req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user) {
            req.flash('error', 'User not found.')
            return res.redirect('/signin')
        }

        if (!(await user.checkPassword(password))) {
            req.flash('error', 'Password incorrect.')
            return res.redirect('/signin')
        }

        // Save the current user to the session
        req.session.user = user

        return res.redirect('/app/dashboard')
    }

    destroy (req, res) {
        req.session.destroy(() => {
            res.clearCookie('root') // this root name was defined at server.js file - the server name
            return res.redirect('/signin')
        })
    }
}

module.exports = new SessionController()
