import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class HousesService {
  async getHouseById(hId) {
    const house = await dbContext.Houses.findById(hId).populate('creator', 'name picture')
    if (!house) {
      throw new BadRequest('Invalid House Id')
    }
    return house
  }

  async editHouse(hId, userId, hData) {
    const house = await this.getHouseById(hId)
    if (userId !== house.creatorId.toString()) {
      throw new Forbidden('You shall not pass!')
    }
    house.price = hData.price || house.price
    house.bedrooms = hData.bedrooms || house.bedrooms
    house.bathrooms = hData.bathrooms || house.bathrooms
    house.year = hData.year || house.year
    house.description = hData.description || house.description
    house.img = hData.img || house.img
    house.squareFt = hData.squareFt || house.squareFt
    await house.save()
    return house
  }

  async removeHouse(hId, userId) {
    const house = await this.getHouseById(hId)
    if (userId !== house.creatorId.toString()) {
      throw new Forbidden('you shall now pass')
    }
    await house.remove()
    return house
  }

  async createHouse(hData) {
    const house = await dbContext.Houses.create(hData)
    return house
  }

  async getHouses(query) {
    const houses = await dbContext.Houses.find(query).populate('creator', 'name piture')
    return houses
  }
}

export const housesService = new HousesService()
