const FetchUtil = require('../utils/fetch');

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
   * Get system CVE allowlist
   * @returns {Promise<Object>} System CVE allowlist
   */
  async getSystemCVEAllowlist() {
    const response = await this.fetchUtil._fetch('/system/CVEAllowlist');
    return response;
  }

  /**
   * Update system CVE allowlist
   * @param {Object} allowlist - Updated allowlist configuration
   * @returns {Promise<Object>} Updated allowlist
   */
  async updateSystemCVEAllowlist(allowlist) {
    const response = await this.fetchUtil._fetch('/system/CVEAllowlist', {
      method: 'PUT',
      body: JSON.stringify(allowlist)
    });
    return response;
  }

  /**
   * Get scan all schedule
   * @returns {Promise<Object>} Scan all schedule
   */
  async getScanAllSchedule() {
    const response = await this.fetchUtil._fetch('/system/scanAll/schedule');
    return response;
  }

  /**
   * Update scan all schedule
   * @param {Object} schedule - Updated schedule configuration
   * @returns {Promise<Object>} Updated schedule
   */
  async updateScanAllSchedule(schedule) {
    const response = await this.fetchUtil._fetch('/system/scanAll/schedule', {
      method: 'PUT',
      body: JSON.stringify(schedule)
    });
    return response;
  }

  /**
   * Create scan all schedule
   * @param {Object} schedule - Schedule configuration
   * @returns {Promise<Object>} Created schedule
   */
  async createScanAllSchedule(schedule) {
    const response = await this.fetchUtil._fetch('/system/scanAll/schedule', {
      method: 'POST',
      body: JSON.stringify(schedule)
    });
    return response;
  }
}

module.exports = Security; 