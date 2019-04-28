const { User } = require('../models')

class SessionController {
    async create (req, res) {
        return res.render('auth/signin')
    }

    async store (req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user) {
            console.log('Usuario nao encontrado')
            return res.redirect('/signin')
        }

        if (!(await user.checkPassword(password))) {
            console.log('Senha incorreta')
            return res.redirect('/signin')
        }

        // Save the current user to the session
        req.session.user = user

        return res.redirect('/app/dashboard')
    }
}

module.exports = new SessionController()
