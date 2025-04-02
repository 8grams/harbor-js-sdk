import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor system settings and configurations
 */
class System {
  /**
   * Create a System instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * Get system information
   * @returns {Promise<Object>} System information
   */
  async getSystemInfo() {
    const response = await this.fetchUtil._fetch('/systeminfo');
    return response;
  }

  /**
   * Get system volumes
   * @returns {Promise<Object>} System volumes
   */
  async getSystemVolumes() {
    const response = await this.fetchUtil._fetch('/systeminfo/volumes');
    return response;
  }

  /**
   * Get system certificate
   * @returns {Promise<Object>} System certificate
   */
  async getSystemCert() {
    const response = await this.fetchUtil._fetch('/systeminfo/getcert');
    return response;
  }

  /**
   * Ping OIDC provider
   * @returns {Promise<Object>} OIDC provider status
   */
  async pingOIDC() {
    const response = await this.fetchUtil._fetch('/system/oidc/ping');
    return response;
  }

  /**
   * Get garbage collection history
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} Garbage collection history
   */
  async getGCHistory({ page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/system/gc', {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Get garbage collection status
   * @returns {Promise<Object>} Garbage collection status
   */
  async getGCStatus() {
    const response = await this.fetchUtil._fetch('/system/gc/schedule');
    return response;
  }

  /**
   * Stop garbage collection
   * @returns {Promise<void>}
   */
  async stopGC() {
    await this.fetchUtil._fetch('/system/gc', {
      method: 'PUT',
      body: JSON.stringify({ action: 'stop' })
    });
  }

  /**
   * Get garbage collection logs
   * @param {number} gcId - ID of the garbage collection job
   * @returns {Promise<Object>} Garbage collection logs
   */
  async getGCLog(gcId) {
    const response = await this.fetchUtil._fetch(`/system/gc/${gcId}/log`);
    return response;
  }

  /**
   * Get garbage collection schedule
   * @returns {Promise<Object>} Garbage collection schedule
   */
  async getGCSchedule() {
    const response = await this.fetchUtil._fetch('/system/gc/schedule');
    return response;
  }

  /**
   * Create garbage collection schedule
   * @param {Object} schedule - Schedule configuration
   * @returns {Promise<Object>} Created schedule
   */
  async createGCSchedule(schedule) {
    const response = await this.fetchUtil._fetch('/system/gc/schedule', {
      method: 'POST',
      body: JSON.stringify(schedule)
    });
    return response;
  }

  /**
   * Update garbage collection schedule
   * @param {Object} schedule - Updated schedule configuration
   * @returns {Promise<Object>} Updated schedule
   */
  async updateGCSchedule(schedule) {
    const response = await this.fetchUtil._fetch('/system/gc/schedule', {
      method: 'PUT',
      body: JSON.stringify(schedule)
    });
    return response;
  }

  /**
   * Get purge history
   * @param {Object} options - Query options
   * @param {string} [options.query] - Query string
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} Purge history
   */
  async getPurgeHistory({ query, sort, page, pageSize } = {}) {
    return this.fetch('/system/purgeaudit', {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  /**
   * Get purge job
   * @param {number} purgeId - ID of the purge job
   * @returns {Promise<Object>} Purge job
   */ 
  async getPurgeJob(purgeId) {
    return this.fetch(`/system/purgeaudit/${purgeId}`);
  }

  /**
   * Stop purge
   * @param {number} purgeId - ID of the purge job
   * @returns {Promise<void>}
   */
  async stopPurge(purgeId) {
    return this.fetch(`/system/purgeaudit/${purgeId}`, {
      method: 'PUT'
    });
  }

  /**
   * Get purge job log
   * @param {number} purgeId - ID of the purge job
   * @returns {Promise<Object>} Purge job log
   */ 
  async getPurgeJobLog(purgeId) {
    return this.fetch(`/system/purgeaudit/${purgeId}/log`);
  }

  /**
   * Get purge schedule
   * @returns {Promise<Object>} Purge schedule
   */ 
  async getPurgeSchedule() {
    return this.fetch('/system/purgeaudit/schedule');
  }

  /**
   * Create purge schedule
   * @param {Object} schedule - Purge schedule configuration
   * @returns {Promise<Object>} Created purge schedule
   */
  async createPurgeSchedule(schedule) {
    return this.fetch('/system/purgeaudit/schedule', {
      method: 'POST',
      body: JSON.stringify(schedule)
    });
  }

  async updatePurgeSchedule(schedule) {
    return this.fetch('/system/purgeaudit/schedule', {
      method: 'PUT',
      body: JSON.stringify(schedule)
    });
  }
}

export default System; 