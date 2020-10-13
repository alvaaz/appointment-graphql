import { Hour } from '../../hour/hour.interface'
import { Professional } from '../../professional/professional.interface'
import { Specialty } from '../../specialty/specialty.interface'
import { singleProfessional, singleSpecialty } from './merge'

import { HourModel } from '../../hour/hour.model'
import { OfferModel } from '../../offer/offer.model'
import { ObjectId } from 'mongodb'
import { professionals } from './merge'
import { ProfessionalModel } from '../../professional/professional.model'

type GetHourInput = {
  professional: ObjectId
  specialty: ObjectId
  dateBegin: string
  dateEnd: string
}

export default {
  async Hours({ getHourInput }: { getHourInput: GetHourInput }): Promise<{}[] | undefined> {
    try {
      const query = {
        professional: getHourInput.professional,
        specialty: getHourInput.specialty,
        $or: [
          {
            begin: { $gte: new Date(getHourInput.dateBegin), $lte: new Date(getHourInput.dateEnd) }
          },
          { end: { $gte: new Date(getHourInput.dateBegin), $lte: new Date(getHourInput.dateEnd) } }
        ]
      }

      // Clean keys with value null
      Object.keys(query).forEach((key) => query[key] == null && delete query[key])

      const fetchedOffers = await OfferModel.find(query)

      const hours = fetchedOffers.reduce((prev, acc) => {
        // Fecha a la que se le suma los intervalos y también
        // define si la fecha a consultar es anterior al día
        // de hoy, no debería tomarse como dateBegin
        let dateIterate =
          new Date(getHourInput.dateBegin).getTime() < new Date().getTime()
            ? new Date().getTime()
            : new Date(getHourInput.dateBegin).getTime()
        const endDate = acc.end.getTime()
        while (dateIterate < endDate) {
          const d = new Date(dateIterate)
          const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
          const indexDate = prev.map((e) => e.date).indexOf(date)
          const conditionalsDate = [d.getDay() < 6, d.getDay() > 0]
          const conditionalsHours = [d.getHours() >= 7, d.getHours() <= 19]
          if (indexDate === -1) {
            if (!conditionalsDate.includes(false)) {
              prev.push({
                date: date,
                professionals: []
              })
            }
          } else {
            const professionalIndex = prev[indexDate].professionals
              .map(
                (item: { professional: Professional; specialty: Specialty; hours: string[] }) =>
                  item.professional._id
              )
              .indexOf(acc.professional)
            if (professionalIndex === -1) {
              prev[indexDate].professionals.push({
                professional: acc.professional,
                specialty: acc.specialty,
                hours: []
              })
            } else {
              if (!conditionalsHours.includes(false)) {
                prev[indexDate].professionals[professionalIndex].hours.push(
                  d.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false
                  })
                )
              }
            }
          }
          dateIterate += acc.interval
        }
        return prev
      }, [])
      return hours.map((date, i) => {
        return {
          date: date.date,
          professionals: () =>
            hours[i].professionals.map(
              (professional: {
                professional: Professional
                specialty: Specialty
                hours: string[]
              }) => {
                return {
                  professional: singleProfessional.bind(this, professional.professional._id),
                  specialty: singleSpecialty.bind(this, professional.specialty._id),
                  hours: professional.hours
                }
              }
            )
        }
      })
      // return hours
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
