import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor garbage collection
 */
class GarbageCollection {
  /**
   * Create a GarbageCollection instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * This endpoint let user get gc execution history.
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
   * This endpoint is for get schedule of gc job.
   * @returns {Promise<Object>} Garbage collection status
   */
  async getGCStatus() {
    const response = await this.fetchUtil._fetch('/system/gc/schedule');
    return response;
  }

  /**
   * Stop the GC execution specified by ID
   * @returns {Promise<void>}
   */
  async stopGC() {
    await this.fetchUtil._fetch('/system/gc', {
      method: 'PUT',
      body: JSON.stringify({ action: 'stop' })
    });
  }

  /**
   * This endpoint let user get gc job logs filtered by specific ID.
   * @param {number} gcId - ID of the garbage collection job
   * @returns {Promise<Object>} Garbage collection logs
   */
  async getGCLog(gcId) {
    const response = await this.fetchUtil._fetch(`/system/gc/${gcId}/log`);
    return response;
  }

  /**
   * This endpoint is for get schedule of gc job.
   * @returns {Promise<Object>} Garbage collection schedule
   */
  async getGCSchedule() {
    const response = await this.fetchUtil._fetch('/system/gc/schedule');
    return response;
  }

  /**
   * This endpoint is for update gc schedule.
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
   * This endpoint is for create gc schedule.
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
}

export default GarbageCollection; 