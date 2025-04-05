import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor system configuration
 */
class Configuration {
  /**
   * Create a Configuration instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * Get system configurations
   * @returns {Promise<Object>} System configurations
   */
  async getConfigurations() {
    const response = await this.fetchUtil._fetch('/configurations', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Update system configurations
   * @param {Object} configurations - Configuration values to update
   * @returns {Promise<Object>} Updated configurations
   */
  async updateConfigurations(configurations) {
    const response = await this.fetchUtil._fetch('/configurations', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(configurations)
    });
    return response;
  }

  /**
   * Get system info
   * @returns {Promise<Object>} System information
   */
  async getSystemInfo() {
    const response = await this.fetchUtil._fetch('/systeminfo', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get system volume info
   * @returns {Promise<Object>} System volume information
   */
  async getSystemVolumeInfo() {
    const response = await this.fetchUtil._fetch('/systeminfo/volumes', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }
}

export default Configuration; 