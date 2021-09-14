import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController.js'
import { logger } from '../utils/Logger.js'
import { housesService } from '../services/HousesService.js'
export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .get('/:hId', this.getHouse)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHouse)
      .delete('/:hId', this.removeHouse)
      .put('/:hId', this.editHouse)
  }

  async getHouses(req, res, next) {
    try {
      const houses = await housesService.getHouses(req.query)
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouse(req, res, next) {
    try {
      const house = await housesService.getHouseById(req.params.hId)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async createHouse(req, res, next) {
    try {
      logger.log('who is the user?', req.userInfo)
      req.body.creatorId = req.userInfo.id
      const house = await housesService.createHouse(req.body)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async removeHouse(req, res, next) {
    try {
      const house = await housesService.removeHouse(req.params.hId, req.userInfo.id)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async editHouse(req, res, next) {
    try {
      const house = await housesService.editHouse(req.params.hId, req.userInfo.id, req.body)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }
}
