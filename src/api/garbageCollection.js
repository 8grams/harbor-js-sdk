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
   * Get garbage collection status
   * @returns {Promise<Object>} Garbage collection status
   */
  async getGarbageCollectionStatus() {
    const response = await this.fetchUtil._fetch('/system/gc', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Start garbage collection
   * @param {Object} options - Garbage collection options
   * @param {boolean} [options.dryRun=false] - Whether to perform a dry run
   * @param {boolean} [options.deleteUntagged=false] - Whether to delete untagged artifacts
   * @returns {Promise<Object>} Garbage collection job status
   */
  async startGarbageCollection({ dryRun = false, deleteUntagged = false } = {}) {
    const response = await this.fetchUtil._fetch('/system/gc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify({
        dry_run: dryRun,
        delete_untagged: deleteUntagged
      })
    });
    return response;
  }

  /**
   * Get garbage collection schedule
   * @returns {Promise<Object>} Garbage collection schedule
   */
  async getGarbageCollectionSchedule() {
    const response = await this.fetchUtil._fetch('/system/gc/schedule', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Update garbage collection schedule
   * @param {Object} schedule - Schedule configuration
   * @param {string} schedule.type - Schedule type (e.g., 'Daily', 'Weekly', 'Custom')
   * @param {string} schedule.cron - Cron expression for custom schedule
   * @returns {Promise<Object>} Updated schedule
   */
  async updateGarbageCollectionSchedule(schedule) {
    const response = await this.fetchUtil._fetch('/system/gc/schedule', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(schedule)
    });
    return response;
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