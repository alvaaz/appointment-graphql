import { Hour } from '../../hour/hour.interface'
import { HourModel } from '../../hour/hour.model'
import { OfferModel } from '../../offer/offer.model'
import { ObjectId } from 'mongodb'

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
        specialty: getHourInput.specialty,
        $or: [
          {
            begin: { $gte: new Date(getHourInput.dateBegin), $lte: new Date(getHourInput.dateEnd) }
          },
          { end: { $gte: new Date(getHourInput.dateBegin), $lte: new Date(getHourInput.dateEnd) } }
        ]
      }

      const fetchedOffers = await OfferModel.find(
        !getHourInput.professional
          ? query
          : Object.assign(query, { professional: getHourInput.professional })
      )

      const hours = fetchedOffers.reduce((prev, acc, i) => {
        // acc.begin.getTime() start with first day in offer
        let currentDate = new Date().getTime()
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
          const conditionalsDate = [d.getDay() < 6, d.getDay() > 0]
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
