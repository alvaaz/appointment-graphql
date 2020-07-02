import { Hour } from '../../hour/hour.interface'
import { HourModel } from '../../hour/hour.model'
import { OfferModel } from '../../offer/offer.model'
import { ObjectId } from 'mongodb'

type T = {
  professional: ObjectId
  specialty: ObjectId
  dateBegin: string
  dateEnd: string
}

export default {
  async Hours({ getHourInput }: { getHourInput: T }): Promise<{}[] | undefined> {
    try {
      const inputTransformed = Object.entries(getHourInput).reduce(
        (a, [k, v]) => (v ? { ...a, [k]: v } : a),
        {} as T
      )

      delete inputTransformed.dateBegin
      delete inputTransformed.dateEnd

      const fetchedOffers = await OfferModel.find({
        professional: inputTransformed.professional,
        specialty: inputTransformed.specialty,
        begin: { $gte: new Date(getHourInput.dateBegin) },
        end: { $lte: new Date(getHourInput.dateEnd) }
      })
      console.log(fetchedOffers)
      const hours = fetchedOffers.reduce((prev, acc, i) => {
        let currentDate = acc.begin.getTime()
        const endDate = acc.end.getTime()
        const indexY = prev.findIndex(
          (hour) =>
            hour.professional.toString() === acc.professional.toString() &&
            hour.specialty.toString() === acc.specialty.toString()
        )
        if (indexY === -1) {
          prev.push({
            professional: acc.professional,
            specialty: acc.specialty,
            dates: []
          })
        } else {
          i = indexY
        }

        while (currentDate < endDate) {
          const d = new Date(currentDate)
          const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
          const dateIndex = prev[i].dates.map((el: { date: string }) => el.date).indexOf(date)
          const conditionalsDate = [
            d.getDay() < 6,
            d.getDay() > 0,
            d > new Date(getHourInput.dateBegin),
            d < new Date(getHourInput.dateEnd)
          ]
          const conditionalsHours = [d.getHours() >= 7, d.getHours() <= 19]
          if (dateIndex === -1) {
            // Date restrictions
            if (!conditionalsDate.includes(false)) {
              prev[i].dates.push({
                date: date,
                hours: []
              })
            }
          } else {
            // Hours restrictions
            if (!conditionalsHours.includes(false)) {
              prev[i].dates[dateIndex].hours.push(
                d.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false
                })
              )
            }
          }
          currentDate = currentDate + acc.interval
        }
        return prev
      }, [])
      return hours
    } catch (error) {
      throw new Error(error)
    }
  },
  async createHour(hourInput: { hourInput: Hour }) {
    try {
      const inputDate = new Date(hourInput.hourInput.date)
      const inputProfessional = hourInput.hourInput.professional
      const inputSpecialty = hourInput.hourInput.specialty

      const fetchedOffer = await OfferModel.findOne({
        professional: inputProfessional,
        specialty: inputSpecialty
      })

      if (!fetchedOffer) throw new Error('Profesional no tiene ofertas')
      if (inputDate.getTime() < new Date(fetchedOffer.begin).getTime())
        throw new Error('Antes de la fecha de inicio')
      if (inputDate.getTime() > new Date(fetchedOffer.end).getTime())
        throw new Error('Después de la fecha de término')
      if ((inputDate.getTime() - new Date(fetchedOffer.begin).getTime()) % fetchedOffer.interval)
        throw new Error('No calza en el intervalo')

      const hour = new HourModel({
        date: inputDate,
        professional: inputProfessional,
        specialty: inputSpecialty,
        status: 1,
        offer: fetchedOffer._id
      }).save()

      return {
        ...hour
      }
    } catch (err) {
      throw err
    }
  }
}
