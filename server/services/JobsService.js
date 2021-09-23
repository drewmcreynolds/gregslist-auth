import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class JobsService {
  async getJobById(jId) {
    const job = await dbContext.Jobs.findById(jId).populate('creator', 'name picture')
    if (!job) {
      throw new BadRequest('invalid job id')
    }
    return job
  }

  async editJob(jId, userId, jData) {
    const job = await this.getJobById(jId)
    if (userId !== job.creatorId.toString()) {
      throw new Forbidden('You shall not pass')
    }
    job.pay = jData.pay || job.pay
    job.company = jData.company || job.company
    job.position = jData.position || job.position
    job.description = jData.description || job.description
    await job.save()
    return job
  }

  async removeJob(jId, userId) {
    const job = await this.getJobById(jId)
    if (userId !== job.creatorId.toString()) {
      throw new Forbidden('you shall now pass')
    }
    await job.remove()
    return job
  }

  async createJob(jData) {
    const job = await dbContext.Jobs.create(jData)
    return job
  }

  async getJobs(query) {
    const jobs = await dbContext.Jobs.find(query).populate('creator', 'name piture')
    return jobs
  }
}

export const jobsService = new JobsService()
