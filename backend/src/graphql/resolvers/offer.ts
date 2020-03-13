import { Offer } from '../../offer/offer.interface'
import { OfferModel } from '../../offer/offer.model'
import { singleProfessional, singleSpecialty } from './merge'

const dateRangeOverlaps = (aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) => {
  if (aStart <= bStart && bStart <= aEnd) return true // b starts in a
  if (aStart <= bEnd && bEnd <= aEnd) return true // b ends in a
  if (bStart < aStart && aEnd < bEnd) return true // a in b
  return false
}

export default {
  async createOffer(offerInput: { offerInput: Offer }): Promise<Offer> {
    try {
      const fetchedOffers = await OfferModel.find({
        professional: offerInput.offerInput.professional
      })

      const offers = fetchedOffers.map(offer => {
        console.log(
          dateRangeOverlaps(
            new Date(offer.begin),
            new Date(offer.end),
            new Date(offerInput.offerInput.begin),
            new Date(offerInput.offerInput.end)
          )
        )
      })

      if (offers.every((val, i, arr) => val === arr[0])) {
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
      } else {
        throw new Error('Existen ofertas en el rango')
      }
    } catch (err) {
      throw err
    }
  }
}
