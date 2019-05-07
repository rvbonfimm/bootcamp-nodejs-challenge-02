module.exports = (sequelize, DataTypes) => {
    const Scheduling = sequelize.define('Scheduling', {
        date: DataTypes.DATE
    })

    Scheduling.associate = models => {
        Scheduling.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        })
        Scheduling.belongsTo(models.User, {
            as: 'provider',
            foreignKey: 'provider_id'
        })
    }

    return Scheduling
}
