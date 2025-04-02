import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor retention policies
 */
class Retention {
  /**
   * Create a Retention instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * Get retention metadata
   * @returns {Promise<Object>} Retention metadata
   */
  async getRetentionMetadata() {
    const response = await this.fetchUtil._fetch('/retentions/metadatas');
    return response;
  }

  /**
   * Create a retention policy
   * @param {Object} policy - Policy configuration
   * @returns {Promise<Object>} Created policy
   */
  async createRetentionPolicy(policy) {
    const response = await this.fetchUtil._fetch('/retentions', {
      method: 'POST',
      body: JSON.stringify(policy)
    });
    return response;
  }

  /**
   * Get a retention policy
   * @param {number} id - Policy ID
   * @returns {Promise<Object>} Policy details
   */
  async getRetentionPolicy(id) {
    const response = await this.fetchUtil._fetch(`/retentions/${id}`);
    return response;
  }

  /**
   * Update a retention policy
   * @param {number} id - Policy ID
   * @param {Object} policy - Updated policy configuration
   * @returns {Promise<Object>} Updated policy
   */
  async updateRetentionPolicy(id, policy) {
    const response = await this.fetchUtil._fetch(`/retentions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(policy)
    });
    return response;
  }

  /**
   * Delete a retention policy
   * @param {number} id - Policy ID
   * @returns {Promise<void>}
   */
  async deleteRetentionPolicy(id) {
    await this.fetchUtil._fetch(`/retentions/${id}`, {
      method: 'DELETE'
    });
  }

  /**
   * Trigger a retention execution
   * @param {number} id - Policy ID
   * @param {Object} options - Execution options
   * @param {boolean} [options.dryRun=false] - Whether to perform a dry run
   * @returns {Promise<Object>} Execution result
   */
  async triggerRetentionExecution(id, { dryRun = false } = {}) {
    const response = await this.fetchUtil._fetch(`/retentions/${id}/executions`, {
      method: 'POST',
      body: JSON.stringify({ dry_run: dryRun })
    });
    return response;
  }

  /**
   * List retention executions
   * @param {number} id - Policy ID
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of executions
   */
  async listRetentionExecutions(id, { page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch(`/retentions/${id}/executions`, {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Stop a retention execution
   * @param {number} id - Policy ID
   * @param {number} executionId - Execution ID
   * @returns {Promise<void>}
   */
  async stopRetentionExecution(id, executionId) {
    await this.fetchUtil._fetch(`/retentions/${id}/executions/${executionId}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'stop' })
    });
  }

  /**
   * List retention tasks
   * @param {number} id - Policy ID
   * @param {number} executionId - Execution ID
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of tasks
   */
  async listRetentionTasks(id, executionId, { page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch(`/retentions/${id}/executions/${executionId}/tasks`, {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Get retention task logs
   * @param {number} id - Policy ID
   * @param {number} executionId - Execution ID
   * @param {number} taskId - Task ID
   * @returns {Promise<Object>} Task logs
   */
  async getRetentionTaskLog(id, executionId, taskId) {
    const response = await this.fetchUtil._fetch(`/retentions/${id}/executions/${executionId}/tasks/${taskId}`);
    return response;
  }
}

export default Retention; 