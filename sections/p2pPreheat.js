import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor P2P preheat functionality
 */
class P2pPreheat {
  /**
   * Create a P2pPreheat instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List P2P provider instances
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of P2P preheat instances
   */
  async listInstances({ page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/p2p/preheat/instances', {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Create p2p provider instances
   * @param {Object} instance - Instance configuration
   * @returns {Promise<Object>} Created instance
   */
  async createInstance(instance) {
    const response = await this.fetchUtil._fetch('/p2p/preheat/instances', {
      method: 'POST',
      body: JSON.stringify(instance)
    });
    return response;
  }

  /**
   * Get a P2P provider instance
   * @param {string} instanceName - Name of the instance
   * @returns {Promise<Object>} Instance details
   */
  async getInstance(instanceName) {
    const response = await this.fetchUtil._fetch(`/p2p/preheat/instances/${instanceName}`);
    return response;
  }

  /**
   * Update the specified P2P provider instance
   * @param {string} instanceName - Name of the instance
   * @param {Object} instance - Updated instance configuration
   * @returns {Promise<Object>} Updated instance
   */
  async updateInstance(instanceName, instance) {
    const response = await this.fetchUtil._fetch(`/p2p/preheat/instances/${instanceName}`, {
      method: 'PUT',
      body: JSON.stringify(instance)
    });
    return response;
  }

  /**
   * Delete the specified P2P provider instance
   * @param {string} instanceName - Name of the instance
   * @returns {Promise<void>}
   */
  async deleteInstance(instanceName) {
    await this.fetchUtil._fetch(`/p2p/preheat/instances/${instanceName}`, {
      method: 'DELETE'
    });
  }
}

export default P2pPreheat; 