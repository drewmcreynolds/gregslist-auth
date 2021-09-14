import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { CarSchema } from '../models/Cars.js'
import { HouseSchema } from '../models/House.js'

class DbContext {
  Houses = mongoose.model('House', HouseSchema);
  Cars = mongoose.model('Car', CarSchema);
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
