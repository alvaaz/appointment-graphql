import { Hour } from '../../hour/hour.interface'
import { HourModel } from '../../hour/hour.model'
import { Offer } from '../../offer/offer.interface'
import { OfferModel } from '../../offer/offer.model'
import { ObjectId } from 'mongodb'

export default {
  async Hours({
    getHourInput
  }: {
    getHourInput: {
      professional: ObjectId
      specialty: ObjectId
    }
  }): Promise<{}[] | undefined> {
    try {
      const inputTransformed = Object.entries(getHourInput).reduce(
        (a, [k, v]) => (v ? { ...a, [k]: v } : a),
        {}
      )
      const fetchedOffers = await OfferModel.find(inputTransformed)

      const hours = fetchedOffers.reduce((prev, acc) => {
        let currentDate = acc.begin.getTime()
        const endDate = acc.end.getTime()

        while (currentDate < endDate) {
          const d = new Date(currentDate)
          if (d.getHours() > 7 && d.getHours() < 20 && d.getDay() < 6 && d.getDay() > 0) {
            const dateKey = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`
            prev[dateKey] = prev[dateKey] || []
            prev[dateKey].push(
              d.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
              })
            )
          }
          currentDate = currentDate + acc.interval
        }
        return prev
      }, {})

      const final = Object.entries(hours).map(([key, value]) => ({
        date: key,
        hours: value
      }))

      return final
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
