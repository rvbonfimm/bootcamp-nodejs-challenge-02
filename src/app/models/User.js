const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            avatar: DataTypes.STRING,
            password: DataTypes.VIRTUAL, // Só existe em nossa aplicacao - nao vai para o banco
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

    return User
}
