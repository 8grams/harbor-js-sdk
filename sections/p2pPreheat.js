const FetchUtil = require('../utils/fetch');

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
   * List P2P preheat instances
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
   * Create a P2P preheat instance
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
   * Get P2P preheat instance details
   * @param {string} instanceName - Name of the instance
   * @returns {Promise<Object>} Instance details
   */
  async getInstance(instanceName) {
    const response = await this.fetchUtil._fetch(`/p2p/preheat/instances/${instanceName}`);
    return response;
  }

  /**
   * Update a P2P preheat instance
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
   * Delete a P2P preheat instance
   * @param {string} instanceName - Name of the instance
   * @returns {Promise<void>}
   */
  async deleteInstance(instanceName) {
    await this.fetchUtil._fetch(`/p2p/preheat/instances/${instanceName}`, {
      method: 'DELETE'
    });
  }

  /**
   * List P2P preheat tasks
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of P2P preheat tasks
   */
  async listTasks({ page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/p2p/preheat/tasks', {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Create a P2P preheat task
   * @param {Object} task - Task configuration
   * @returns {Promise<Object>} Created task
   */
  async createTask(task) {
    const response = await this.fetchUtil._fetch('/p2p/preheat/tasks', {
      method: 'POST',
      body: JSON.stringify(task)
    });
    return response;
  }

  /**
   * Get P2P preheat task details
   * @param {string} taskId - ID of the task
   * @returns {Promise<Object>} Task details
   */
  async getTask(taskId) {
    const response = await this.fetchUtil._fetch(`/p2p/preheat/tasks/${taskId}`);
    return response;
  }

  /**
   * Stop a P2P preheat task
   * @param {string} taskId - ID of the task
   * @returns {Promise<void>}
   */
  async stopTask(taskId) {
    await this.fetchUtil._fetch(`/p2p/preheat/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'stop' })
    });
  }

  /**
   * Get P2P preheat task logs
   * @param {string} taskId - ID of the task
   * @returns {Promise<Object>} Task logs
   */
  async getTaskLog(taskId) {
    const response = await this.fetchUtil._fetch(`/p2p/preheat/tasks/${taskId}/log`);
    return response;
  }
}

module.exports = P2pPreheat; 