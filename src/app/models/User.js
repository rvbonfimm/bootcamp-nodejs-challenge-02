const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            avatar: DataTypes.STRING,
            password: DataTypes.VIRTUAL, // Only exists in our application
            password_hash: DataTypes.STRING,
            provider: DataTypes.BOOLEAN
        },
        {
            // Hooks is used  to throw an event before/after/etc the object handle
            hooks: {
                beforeSave: async user => {
                    if (user.password) {
                        user.password_hash = await bcrypt.hash(user.password, 8)
                    }
                }
            }
        }
    )

    // Creating a method to the current class
    User.prototype.checkPassword = function (password) {
        return bcrypt.compare(password, this.password_hash)
    }

    return User
}
