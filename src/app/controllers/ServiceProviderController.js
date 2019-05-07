const { User, Scheduling } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class ServiceProviderController {
    async index (req, res) {
        const providerSchedules = await Scheduling.findAll({
            include: [{ model: User, as: 'user' }],
            where: {
                provider_id: req.session.user.id,
                date: {
                    [Op.between]: [
                        moment()
                            .startOf('day')
                            .format(),
                        moment()
                            .endOf('day')
                            .format()
                    ]
                }
            }
        })

        var ProviderSchedulesResult = []

        providerSchedules.forEach(ps => {
            var formattedDay = ps.date.substring(8, 10)
            var formattedMonth = ps.date.substring(5, 7)
            var formattedYear = ps.date.substring(0, 4)
            var formattedHour = ps.date.substring(11)

            var _aux = {
                scheduleId: ps.id,
                scheduleDay: formattedDay,
                scheduleMonth: formattedMonth,
                scheduleYear: formattedYear,
                scheduleHour: formattedHour,
                userName: ps.User.name,
                userEmail: ps.User.email,
                userAvatar: ps.User.avatar
            }

            ProviderSchedulesResult.push(_aux)
        })

        return res.render('schedulings/show', { ProviderSchedulesResult })
    }
}

module.exports = new ServiceProviderController()
