import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor job service operations
 */
class JobService {
  /**
   * Create a JobService instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * list job queue
   * @returns {Promise<Object>} Job service queue information
   */
  async getJobServiceQueue() {
    const response = await this.fetchUtil._fetch('/jobservice/queues', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Stop job service job
   * @param {string} jobId - ID of the job
   * @returns {Promise<void>}
   */
  async stopJobServiceJob(jobId) {
    await this.fetchUtil._fetch(`/jobservice/jobs/${encodeURIComponent(jobId)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify({ action: 'stop' })
    });
  }

  /**
   * Get job log by job id, it is only used by administrator
   * @param {string} jobId - ID of the job
   * @returns {Promise<Object>} Job logs
   */
  async getJobServiceJobLog(jobId) {
    const response = await this.fetchUtil._fetch(`/jobservice/jobs/${encodeURIComponent(jobId)}/log`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get worker pools
   * @returns {Promise<Object>} List of worker pools
   */
  async getWorkerPools() {
    const response = await this.fetchUtil._fetch('/jobservice/pools', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get workers in current pool
   * @param {string} poolId - ID of the pool
   * @returns {Promise<Object>} List of workers in pool
   */
  async getWorkersInPool(poolId) {
    const response = await this.fetchUtil._fetch(`/jobservice/pools/${encodeURIComponent(poolId)}/workers`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Stop running job
   * @param {string} jobId - ID of the job
   * @returns {Promise<void>}
   */
  async stopJob(jobId) {
    await this.fetchUtil._fetch(`/jobservice/jobs/${encodeURIComponent(jobId)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify({ action: 'stop' })
    });
  }
}

export default JobService; 