import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor purge audit operations
 */
class PurgeAudit {
  /**
   * Create a PurgeAudit instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * Get purge audit history
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} Purge audit history
   */
  async getPurgeHistory({ query, sort, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/system/purgeaudit?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get purge job details
   * @param {number} purgeId - ID of the purge job
   * @returns {Promise<Object>} Purge job details
   */
  async getPurgeJob(purgeId) {
    const response = await this.fetchUtil._fetch(`/system/purgeaudit/${purgeId}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Stop a purge job
   * @param {number} purgeId - ID of the purge job
   * @returns {Promise<void>}
   */
  async stopPurge(purgeId) {
    await this.fetchUtil._fetch(`/system/purgeaudit/${purgeId}`, {
      method: 'PUT',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify({ action: 'stop' })
    });
  }

  /**
   * Get purge job logs
   * @param {number} purgeId - ID of the purge job
   * @returns {Promise<Object>} Purge job logs
   */
  async getPurgeJobLog(purgeId) {
    const response = await this.fetchUtil._fetch(`/system/purgeaudit/${purgeId}/log`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get purge schedule
   * @returns {Promise<Object>} Purge schedule
   */
  async getPurgeSchedule() {
    const response = await this.fetchUtil._fetch('/system/purgeaudit/schedule', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Create purge schedule
   * @param {Object} schedule - Schedule configuration
   * @returns {Promise<Object>} Created schedule
   */
  async createPurgeSchedule(schedule) {
    const response = await this.fetchUtil._fetch('/system/purgeaudit/schedule', {
      method: 'POST',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(schedule)
    });
    return response;
  }

  /**
   * Update purge schedule
   * @param {Object} schedule - Updated schedule configuration
   * @returns {Promise<Object>} Updated schedule
   */
  async updatePurgeSchedule(schedule) {
    const response = await this.fetchUtil._fetch('/system/purgeaudit/schedule', {
      method: 'PUT',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(schedule)
    });
    return response;
  }
}

export default PurgeAudit; 