const moment = require('moment')
const { Scheduling } = require('../models')
const { Op } = require('sequelize')

class AvailabilityController {
    async index (req, res) {
        const date = moment(parseInt(req.query.date))

        const schedulings = await Scheduling.findAll({
            where: {
                provider_id: req.params.provider,
                date: {
                    [Op.between]: [
                        date.startOf('day').format(),
                        date.endOf('day').format()
                    ]
                }
            }
        })

        const schedule = [
            '07:00',
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00'
        ]

        const available = schedule.map(time => {
            const [hour, minute] = time.split(':')
            const value = date
                .hour(hour)
                .minute(minute)
                .second(0)

            return {
                time,
                value: value.format(),
                available:
                    value.isAfter(moment()) && // check if the value is after the current date/time
                    !schedulings.find(a => moment(a.date).format('HH:mm') === time) // check if the value was not reserved
            }
        })

        return res.render('availability/index', { available })
    }
}

module.exports = new AvailabilityController()
