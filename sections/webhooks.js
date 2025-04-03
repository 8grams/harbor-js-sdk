import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor webhooks
 */
class Webhooks {
  /**
   * Create a Webhooks instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * This endpoint returns webhook policies of a project.
   * @param {string} projectName - Name of the project
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of webhooks
   */
  async listWebhooks(projectName, { page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/webhook/policies`, {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * This endpoint create a webhook policy if the project does not have one.
   * @param {string} projectName - Name of the project
   * @param {Object} webhook - Webhook configuration
   * @returns {Promise<Object>} Created webhook
   */
  async createWebhook(projectName, webhook) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/webhook/policies`, {
      method: 'POST',
      body: JSON.stringify(webhook)
    });
    return response;
  }

  /**
   * This endpoint returns specified webhook policy of a project.
   * @param {string} projectName - Name of the project
   * @param {number} webhookId - ID of the webhook
   * @returns {Promise<Object>} Webhook details
   */
  async getWebhook(projectName, webhookId) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/webhook/policies/${webhookId}`);
    return response;
  }

  /**
   * This endpoint is aimed to update the webhook policy of a project.
   * @param {string} projectName - Name of the project
   * @param {number} webhookId - ID of the webhook
   * @param {Object} webhook - Updated webhook configuration
   * @returns {Promise<Object>} Updated webhook
   */
  async updateWebhook(projectName, webhookId, webhook) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/webhook/policies/${webhookId}`, {
      method: 'PUT',
      body: JSON.stringify(webhook)
    });
    return response;
  }

  /**
   * This endpoint is aimed to delete webhookpolicy of a project.
   * @param {string} projectName - Name of the project
   * @param {number} webhookId - ID of the webhook
   * @returns {Promise<void>}
   */
  async deleteWebhook(projectName, webhookId) {
    await this.fetchUtil._fetch(`/projects/${projectName}/webhook/policies/${webhookId}`, {
      method: 'DELETE'
    });
  }

  /**
   * This endpoint returns webhook jobs of a project.
   * @param {string} projectName - Name of the project
   * @param {number} webhookId - ID of the webhook
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of webhook jobs
   */
  async listWebhookJobs(projectName, webhookId, { page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/webhook/jobs`, {
      params: { policy_id: webhookId, page, page_size: pageSize }
    });
    return response;
  }

  /**
   * This endpoint returns webhook policies of a project.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {Object} options - Query options
   * @param {string} [options.query] - Query string
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of webhook policies
   */
  async listWebhookPolicies(projectNameOrId, { query, sort, page, pageSize } = {}) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies`, {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  /**
   * This endpoint create a webhook policy if the project does not have one.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {Object} policy - Webhook policy configuration
   * @returns {Promise<Object>} Created webhook policy
   */
  async createWebhookPolicy(projectNameOrId, policy) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies`, {
      method: 'POST',
      body: JSON.stringify(policy)
    });
  }

  /**
   * This endpoint returns specified webhook policy of a project.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {number} policyId - ID of the webhook policy
   * @returns {Promise<Object>} Webhook policy details
   */
  async getWebhookPolicy(projectNameOrId, policyId) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}`);
  }

  /**
   * This endpoint is aimed to update the webhook policy of a project.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {number} policyId - ID of the webhook policy
   * @param {Object} policy - Updated webhook policy configuration
   * @returns {Promise<Object>} Updated webhook policy
   */ 
  async updateWebhookPolicy(projectNameOrId, policyId, policy) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}`, {
      method: 'PUT',
      body: JSON.stringify(policy)
    });
  }

  /**
   * This endpoint is aimed to delete webhookpolicy of a project.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {number} policyId - ID of the webhook policy
   * @returns {Promise<void>}
   */ 
  async deleteWebhookPolicy(projectNameOrId, policyId) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}`, {
      method: 'DELETE'
    });
  }

  /**
   * This endpoint returns the tasks of a specific webhook execution.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {number} policyId - ID of the webhook policy
   * @param {Object} options - Query options
   * @param {string} [options.query] - Query string
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of webhook executions
   */   
  async listWebhookTasks(projectNameOrId, policyId, executionId, { query, sort, page, pageSize } = {}) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}/executions/${executionId}/tasks`, {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  /**
   * This endpoint returns the logs of a specific webhook task.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {number} policyId - ID of the webhook policy
   * @param {number} executionId - ID of the webhook execution
   * @param {number} taskId - ID of the webhook task
   * @returns {Promise<Object>} Webhook task log
   */ 
  async getWebhookTaskLog(projectNameOrId, policyId, executionId, taskId) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}/executions/${executionId}/tasks/${taskId}/log`);
  }

  /**
   * This endpoint returns last trigger information of project webhook policy.
   * @param {string} projectNameOrId - Name or ID of the project
   * @returns {Promise<Object>} Last trigger of a webhook
   */ 
  async getWebhookLastTrigger(projectNameOrId) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/lasttrigger`);
  }

  /**
   * Get supported event types and notify types.
   * @param {string} projectNameOrId - Name or ID of the project
   * @returns {Promise<Object>} Supported event types
   */ 
  async getSupportedEventTypes(projectNameOrId) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/events`);
  }
}

export default Webhooks; 