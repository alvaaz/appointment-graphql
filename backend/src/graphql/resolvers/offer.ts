import { Offer } from '../../offer/offer.interface'
import { OfferModel } from '../../offer/offer.model'
import { singleProfessional, singleSpecialty } from './merge'
import { ProfessionalModel } from '../../professional/professional.model'

const dateRangeOverlaps = (aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) => {
  if (aStart < bStart && bStart < aEnd) return true // b starts in a
  if (aStart < bEnd && bEnd < aEnd) return true // b ends in a
  if (bStart <= aStart && aEnd <= bEnd) return true // a in b
  return false
}

export default {
  async createOffer(offerInput: { offerInput: Offer }): Promise<Offer> {
    try {
      const inputEnd = new Date(offerInput.offerInput.end)
      const inputBegin = new Date(offerInput.offerInput.begin)
      const inputInterval = offerInput.offerInput.interval
      const inputProfessional = offerInput.offerInput.professional
      const inputSpecialty = offerInput.offerInput.specialty

      const professional = await ProfessionalModel.findById(inputProfessional)

      const fetchedOffers = await OfferModel.find({
        professional: inputProfessional
      })

      const offers = fetchedOffers.map((offer) => {
        return dateRangeOverlaps(
          new Date(offer.begin),
          new Date(offer.end),
          new Date(inputBegin),
          new Date(inputEnd)
        )
      })

      if (!professional) throw new Error('no hay professional')
      if (!professional.specialties.some((el) => el == inputSpecialty))
        throw new Error('Professional no cuenta con especialidad')

      if ((inputEnd.getTime() - inputBegin.getTime()) % inputInterval)
        throw new Error('No calza en el intervalo')
      if (!offers.every((val, i, arr) => val === arr[0]))
        throw new Error('Existen ofertas en el rango')

      const offer = new OfferModel({
        ...offerInput.offerInput
      })
      const result = await offer.save()
      return {
        _id: result._id,
        name: result.name,
        interval: result.interval,
        begin: new Date(result.begin),
        end: new Date(result.end),
        createdAt: new Date(result.createdAt).toLocaleString('es-CL'),
        updatedAt: new Date(result.updatedAt).toLocaleString('es-CL'),
        professional: singleProfessional.bind(this, result.professional),
        specialty: singleSpecialty.bind(this, result.specialty)
      }
    } catch (err) {
      throw err
    }
  }
}
