import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor security settings and configurations
 */
class Security {
  /**
   * Create a Security instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * Get the system level allowlist of CVE.  This API can be called by all authenticated users.
   * @returns {Promise<Object>} System CVE allowlist
   */
  async getSystemCVEAllowlist() {
    const response = await this.fetchUtil._fetch('/system/CVEAllowlist', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * This API overwrites the system level allowlist of CVE with the list in request body. Only system Admin has permission to call this API.
   * @param {Object} allowlist - Updated allowlist configuration
   * @returns {Promise<Object>} Updated allowlist
   */
  async updateSystemCVEAllowlist(allowlist) {
    const response = await this.fetchUtil._fetch('/system/CVEAllowlist', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(allowlist)
    });
    return response;
  }

  /**
   * Get scan all schedule
   * @returns {Promise<Object>} Scan all schedule
   */
  async getScanAllSchedule() {
    const response = await this.fetchUtil._fetch('/system/scanAll/schedule', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * This endpoint is for updating the schedule of scan all job, which scans all of images in Harbor.
   * @param {Object} schedule - Updated schedule configuration
   * @returns {Promise<Object>} Updated schedule
   */
  async updateScanAllSchedule(schedule) {
    const response = await this.fetchUtil._fetch('/system/scanAll/schedule', {
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
   * This endpoint is for creating a schedule or a manual trigger for the scan all job, which scans all of images in Harbor.
   * @param {Object} schedule - Schedule configuration
   * @returns {Promise<Object>} Created schedule
   */
  async createScanAllSchedule(schedule) {
    const response = await this.fetchUtil._fetch('/system/scanAll/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(schedule)
    });
    return response;
  }
}

export default Security; 