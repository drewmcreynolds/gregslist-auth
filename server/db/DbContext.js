import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CarSchema } from '../models/Cars.js'
import { HouseSchema } from '../models/House.js'
import { JobSchema } from '../models/Job.js'
import { Value as ValueSchema } from '../models/Value'

class DbContext {
  Houses = mongoose.model('House', HouseSchema);
  Cars = mongoose.model('Car', CarSchema);
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Jobs = mongoose.model('Job', JobSchema);
}

export const dbContext = new DbContext()
