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
   * Get Retention Metadatas.
   * @returns {Promise<Object>} Retention metadata
   */
  async getRetentionMetadata() {
    const response = await this.fetchUtil._fetch('/retentions/metadatas', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Create Retention Policy, you can reference metadatas API for the policy model. You can check project metadatas to find whether a retention policy is already binded. This method should only be called when no retention policy binded to project yet.
   * @param {Object} policy - Policy configuration
   * @returns {Promise<Object>} Created policy
   */
  async createRetentionPolicy(policy) {
    const response = await this.fetchUtil._fetch('/retentions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(policy)
    });
    return response;
  }

  /**
   * Get Retention Policy.
   * @param {number} id - Policy ID
   * @returns {Promise<Object>} Policy details
   */
  async getRetentionPolicy(id) {
    const response = await this.fetchUtil._fetch(`/retentions/${id}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Update Retention Policy, you can reference metadatas API for the policy model. You can check project metadatas to find whether a retention policy is already binded. This method should only be called when retention policy has already binded to project.
   * @param {number} id - Policy ID
   * @param {Object} policy - Updated policy configuration
   * @returns {Promise<Object>} Updated policy
   */
  async updateRetentionPolicy(id, policy) {
    const response = await this.fetchUtil._fetch(`/retentions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(policy)
    });
    return response;
  }

  /**
   * Delete Retention Policy, you can reference metadatas API for the policy model. You can check project metadatas to find whether a retention policy is already binded. This method should only be called when retention policy has already binded to project.
   * @param {number} id - Policy ID
   * @returns {Promise<void>}
   */
  async deleteRetentionPolicy(id) {
    await this.fetchUtil._fetch(`/retentions/${id}`, {
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }

  /**
   * Trigger a Retention Execution, if dry_run is True, nothing would be deleted actually.
   * @param {number} id - Policy ID
   * @param {Object} options - Execution options
   * @param {boolean} [options.dryRun=false] - Whether to perform a dry run
   * @returns {Promise<Object>} Execution result
   */
  async triggerRetentionExecution(id, { dryRun = false } = {}) {
    const response = await this.fetchUtil._fetch(`/retentions/${id}/executions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify({ dry_run: dryRun })
    });
    return response;
  }

  /**
   * Get Retention executions, execution status may be delayed before job service schedule it up.
   * @param {number} id - Policy ID
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of executions
   */
  async listRetentionExecutions(id, { page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/retentions/${id}/executions?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Stop a Retention execution, only support "stop" action now.
   * @param {number} id - Policy ID
   * @param {number} executionId - Execution ID
   * @returns {Promise<void>}
   */
  async stopRetentionExecution(id, executionId) {
    await this.fetchUtil._fetch(`/retentions/${id}/executions/${executionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify({ action: 'stop' })
    });
  }

  /**
   * Get Retention tasks, each repository as a task.
   * @param {number} id - Policy ID
   * @param {number} executionId - Execution ID
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of tasks
   */
  async listRetentionTasks(id, executionId, { page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/retentions/${id}/executions/${executionId}/tasks?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get Retention job task log, tags ratain or deletion detail will be shown in a table.
   * @param {number} id - Policy ID
   * @param {number} executionId - Execution ID
   * @param {number} taskId - Task ID
   * @returns {Promise<Object>} Task logs
   */
  async getRetentionTaskLog(id, executionId, taskId) {
    const response = await this.fetchUtil._fetch(`/retentions/${id}/executions/${executionId}/tasks/${taskId}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }
}

export default Retention; 