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

  /**
   * Get worker pools
   * @returns {Promise<Object>} List of worker pools
   */
  async getWorkerPools() {
    const response = await this.fetchUtil._fetch('/jobservice/pools');
    return response;
  }

  /**
   * Get workers in pool
   * @param {string} poolId - ID of the pool
   * @returns {Promise<Object>} List of workers in pool
   */
  async getWorkersInPool(poolId) {
    const response = await this.fetchUtil._fetch(`/jobservice/pools/${poolId}/workers`);
    return response;
  }

  /**
   * Stop job
   * @param {string} jobId - ID of the job
   * @returns {Promise<void>}
   */
  async stopJob(jobId) {
    await this.fetchUtil._fetch(`/jobservice/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'stop' })
    });
  }
}

export default JobService; 