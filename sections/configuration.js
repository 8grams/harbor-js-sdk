const FetchUtil = require('../utils/fetch');

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
   * Get system configuration
   * @returns {Promise<Object>} System configuration
   */
  async getConfiguration() {
    const response = await this.fetchUtil._fetch('/configurations');
    return response;
  }

  /**
   * Update system configuration
   * @param {Object} configuration - Updated configuration
   * @returns {Promise<Object>} Updated configuration
   */
  async updateConfiguration(configuration) {
    const response = await this.fetchUtil._fetch('/configurations', {
      method: 'PUT',
      body: JSON.stringify(configuration)
    });
    return response;
  }
}

module.exports = Configuration; 