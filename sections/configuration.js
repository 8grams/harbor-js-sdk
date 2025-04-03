import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor configuration
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
   * This endpoint is for retrieving system configurations that only provides for admin user.
   * @returns {Promise<Object>} Configuration details
   */
  async getConfiguration() {
    const response = await this.fetchUtil._fetch('/configurations', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * This endpoint is for modifying system configurations that only provides for admin user.
   * @param {Object} config - Updated configuration
   * @returns {Promise<Object>} Updated configuration
   */
  async updateConfiguration(config) {
    const response = await this.fetchUtil._fetch('/configurations', {
      method: 'PUT',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(config)
    });
    return response;
  }

  /**
   * This API is for retrieving general system info, this can be called by anonymous request. Some attributes will be omitted in the response when this API is called by anonymous request.
   * @returns {Promise<Object>} System configuration details
   */
  async getSystemConfiguration() {
    const response = await this.fetchUtil._fetch('/systeminfo', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * This endpoint is for retrieving system volume info that only provides for admin user. Note that the response only reflects the storage status of local disk.
   * @returns {Promise<Object>} System volume details
   */
  async getSystemVolume() {
    const response = await this.fetchUtil._fetch('/systeminfo/volumes', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }
}

export default Configuration; 