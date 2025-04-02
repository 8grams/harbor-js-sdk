const FetchUtil = require('../utils/fetch');

/**
 * Class for managing Harbor replication operations
 */
class Replication {
  /**
   * Create a Replication instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List replication policies
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query
   * @param {string} [options.sort] - Sort field
   * @param {string} [options.name] - Filter by name
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of replication policies
   */
  async listReplicationPolicies({ query, sort, name, page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/replication/policies', {
      params: { query, sort, name, page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Create replication policy
   * @param {Object} policy - Policy configuration
   * @returns {Promise<Object>} Created policy
   */
  async createReplicationPolicy(policy) {
    const response = await this.fetchUtil._fetch('/replication/policies', {
      method: 'POST',
      body: JSON.stringify(policy)
    });
    return response;
  }

  /**
   * Get replication policy details
   * @param {number} id - ID of the policy
   * @returns {Promise<Object>} Policy details
   */
  async getReplicationPolicy(id) {
    const response = await this.fetchUtil._fetch(`/replication/policies/${id}`);
    return response;
  }

  /**
   * Update replication policy
   * @param {number} id - ID of the policy
   * @param {Object} policy - Updated policy configuration
   * @returns {Promise<Object>} Updated policy
   */
  async updateReplicationPolicy(id, policy) {
    const response = await this.fetchUtil._fetch(`/replication/policies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(policy)
    });
    return response;
  }

  /**
   * Delete replication policy
   * @param {number} id - ID of the policy
   * @returns {Promise<void>}
   */
  async deleteReplicationPolicy(id) {
    await this.fetchUtil._fetch(`/replication/policies/${id}`, {
      method: 'DELETE'
    });
  }

  /**
   * List replication executions
   * @param {Object} options - Query options
   * @param {number} [options.policyId] - Filter by policy ID
   * @param {string} [options.status] - Filter by status
   * @param {string} [options.trigger] - Filter by trigger
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of replication executions
   */
  async listReplicationExecutions({ policyId, status, trigger, sort, page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/replication/executions', {
      params: { 
        policy_id: policyId,
        status,
        trigger,
        sort,
        page,
        page_size: pageSize
      }
    });
    return response;
  }

  /**
   * Start replication
   * @param {Object} execution - Execution configuration
   * @returns {Promise<Object>} Started execution
   */
  async startReplication(execution) {
    const response = await this.fetchUtil._fetch('/replication/executions', {
      method: 'POST',
      body: JSON.stringify(execution)
    });
    return response;
  }

  /**
   * Get replication execution details
   * @param {number} id - ID of the execution
   * @returns {Promise<Object>} Execution details
   */
  async getReplicationExecution(id) {
    const response = await this.fetchUtil._fetch(`/replication/executions/${id}`);
    return response;
  }

  /**
   * Stop replication execution
   * @param {number} id - ID of the execution
   * @returns {Promise<void>}
   */
  async stopReplication(id) {
    await this.fetchUtil._fetch(`/replication/executions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'stop' })
    });
  }

  /**
   * List replication tasks
   * @param {number} id - ID of the execution
   * @param {Object} options - Query options
   * @param {string} [options.status] - Filter by status
   * @param {string} [options.resourceType] - Filter by resource type
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of replication tasks
   */
  async listReplicationTasks(id, { status, resourceType, sort, page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch(`/replication/executions/${id}/tasks`, {
      params: { 
        status,
        resource_type: resourceType,
        sort,
        page,
        page_size: pageSize
      }
    });
    return response;
  }

  /**
   * Get replication task log
   * @param {number} id - ID of the execution
   * @param {number} taskId - ID of the task
   * @returns {Promise<Object>} Task log
   */
  async getReplicationTaskLog(id, taskId) {
    const response = await this.fetchUtil._fetch(`/replication/executions/${id}/tasks/${taskId}/log`);
    return response;
  }

  /**
   * List registry adapters
   * @returns {Promise<Object>} List of registry adapters
   */
  async listRegistryAdapters() {
    const response = await this.fetchUtil._fetch('/replication/adapters');
    return response;
  }

  /**
   * List registry provider information
   * @returns {Promise<Object>} List of registry provider information
   */
  async listRegistryProviderInfos() {
    const response = await this.fetchUtil._fetch('/replication/adapterinfos');
    return response;
  }

  /**
   * Create registry
   * @param {Object} registry - Registry configuration
   * @returns {Promise<Object>} Created registry
   */
  async createRegistry(registry) {
    const response = await this.fetchUtil._fetch('/registries', {
      method: 'POST',
      body: JSON.stringify(registry)
    });
    return response;
  }

  /**
   * List registries
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query
   * @param {string} [options.sort] - Sort field
   * @param {string} [options.name] - Filter by name
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of registries
   */
  async listRegistries({ query, sort, name, page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/registries', {
      params: { query, sort, name, page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Ping registry
   * @param {Object} registry - Registry configuration
   * @returns {Promise<Object>} Registry ping result
   */
  async pingRegistry(registry) {
    const response = await this.fetchUtil._fetch('/registries/ping', {
      method: 'POST',
      body: JSON.stringify(registry)
    });
    return response;
  }

  /**
   * Get registry details
   * @param {number} id - ID of the registry
   * @returns {Promise<Object>} Registry details
   */
  async getRegistry(id) {
    const response = await this.fetchUtil._fetch(`/registries/${id}`);
    return response;
  }

  /**
   * Update registry
   * @param {number} id - ID of the registry
   * @param {Object} registry - Updated registry configuration
   * @returns {Promise<Object>} Updated registry
   */
  async updateRegistry(id, registry) {
    const response = await this.fetchUtil._fetch(`/registries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(registry)
    });
    return response;
  }

  /**
   * Delete registry
   * @param {number} id - ID of the registry
   * @returns {Promise<void>}
   */
  async deleteRegistry(id) {
    await this.fetchUtil._fetch(`/registries/${id}`, {
      method: 'DELETE'
    });
  }

  /**
   * Get registry information
   * @param {number} id - ID of the registry
   * @returns {Promise<Object>} Registry information
   */
  async getRegistryInfo(id) {
    const response = await this.fetchUtil._fetch(`/registries/${id}/info`);
    return response;
  }
}

module.exports = Replication; 