const FetchUtil = require('../utils/fetch');

class JobService {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async getWorkerPools() {
    return this.fetch('/jobservice/pools');
  }

  async getWorkersInPool(poolId) {
    return this.fetch(`/jobservice/pools/${poolId}/workers`);
  }

  async stopJob(jobId) {
    return this.fetch(`/jobservice/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'stop' })
    });
  }
}

module.exports = JobService; 