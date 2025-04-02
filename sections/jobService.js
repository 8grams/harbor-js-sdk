const FetchUtil = require('../utils/fetch');

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
   * Get job service status
   * @returns {Promise<Object>} Job service status
   */
  async getJobServiceStatus() {
    const response = await this.fetchUtil._fetch('/jobservice/status');
    return response;
  }

  /**
   * Get job service workers
   * @returns {Promise<Object>} List of job service workers
   */
  async getJobServiceWorkers() {
    const response = await this.fetchUtil._fetch('/jobservice/workers');
    return response;
  }

  /**
   * Get job service queue
   * @returns {Promise<Object>} Job service queue information
   */
  async getJobServiceQueue() {
    const response = await this.fetchUtil._fetch('/jobservice/queue');
    return response;
  }

  /**
   * Get job service job details
   * @param {string} jobId - ID of the job
   * @returns {Promise<Object>} Job details
   */
  async getJobServiceJob(jobId) {
    const response = await this.fetchUtil._fetch(`/jobservice/jobs/${jobId}`);
    return response;
  }

  /**
   * Stop job service job
   * @param {string} jobId - ID of the job
   * @returns {Promise<void>}
   */
  async stopJobServiceJob(jobId) {
    await this.fetchUtil._fetch(`/jobservice/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'stop' })
    });
  }

  /**
   * Get job service job logs
   * @param {string} jobId - ID of the job
   * @returns {Promise<Object>} Job logs
   */
  async getJobServiceJobLog(jobId) {
    const response = await this.fetchUtil._fetch(`/jobservice/jobs/${jobId}/log`);
    return response;
  }

  async getWorkerPools() {
    return this.fetchUtil.fetch('/jobservice/pools');
  }

  async getWorkersInPool(poolId) {
    return this.fetchUtil.fetch(`/jobservice/pools/${poolId}/workers`);
  }

  async stopJob(jobId) {
    return this.fetchUtil.fetch(`/jobservice/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'stop' })
    });
  }
}

module.exports = JobService; 