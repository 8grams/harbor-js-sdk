const FetchUtil = require('../utils/fetch');

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
   * List webhooks for a project
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
   * Create a webhook
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
   * Get a webhook
   * @param {string} projectName - Name of the project
   * @param {number} webhookId - ID of the webhook
   * @returns {Promise<Object>} Webhook details
   */
  async getWebhook(projectName, webhookId) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/webhook/policies/${webhookId}`);
    return response;
  }

  /**
   * Update a webhook
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
   * Delete a webhook
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
   * List webhook jobs
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

  async listWebhookPolicies(projectNameOrId, { query, sort, page, pageSize } = {}) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies`, {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  async createWebhookPolicy(projectNameOrId, policy) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies`, {
      method: 'POST',
      body: JSON.stringify(policy)
    });
  }

  async getWebhookPolicy(projectNameOrId, policyId) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}`);
  }

  async updateWebhookPolicy(projectNameOrId, policyId, policy) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}`, {
      method: 'PUT',
      body: JSON.stringify(policy)
    });
  }

  async deleteWebhookPolicy(projectNameOrId, policyId) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}`, {
      method: 'DELETE'
    });
  }

  async listWebhookExecutions(projectNameOrId, policyId, { query, sort, page, pageSize } = {}) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}/executions`, {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  async listWebhookTasks(projectNameOrId, policyId, executionId, { query, sort, page, pageSize } = {}) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}/executions/${executionId}/tasks`, {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  async getWebhookTaskLog(projectNameOrId, policyId, executionId, taskId) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}/executions/${executionId}/tasks/${taskId}/log`);
  }

  async getWebhookLastTrigger(projectNameOrId) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/lasttrigger`);
  }

  async getSupportedEventTypes(projectNameOrId) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/webhook/events`);
  }
}

module.exports = Webhooks; 