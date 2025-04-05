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
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {Object} options - Query options
   * @param {string} [options.query] - Query string
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of webhook policies
   */
  async listWebhookPolicies(projectNameOrId, { query, sort, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/webhook/policies?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * This endpoint create a webhook policy if the project does not have one.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {Object} policy - Webhook policy configuration
   * @returns {Promise<Object>} Created webhook policy
   */
  async createWebhookPolicy(projectNameOrId, policy) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/webhook/policies`, {
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
   * This endpoint returns specified webhook policy of a project.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {number} policyId - ID of the webhook policy
   * @returns {Promise<Object>} Webhook policy details
   */
  async getWebhookPolicy(projectNameOrId, policyId) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/webhook/policies/${policyId}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * This endpoint is aimed to update the webhook policy of a project.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {number} policyId - ID of the webhook policy
   * @param {Object} policy - Updated webhook policy configuration
   * @returns {Promise<Object>} Updated webhook policy
   */ 
  async updateWebhookPolicy(projectNameOrId, policyId, policy) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/webhook/policies/${policyId}`, {
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
   * This endpoint is aimed to delete webhookpolicy of a project.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {number} policyId - ID of the webhook policy
   * @returns {Promise<void>}
   */ 
  async deleteWebhookPolicy(projectNameOrId, policyId) {
    await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/webhook/policies/${policyId}`, {
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }

  /**
   * This endpoint returns webhook jobs of a project.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {number} policyId - ID of the webhook policy
   * @param {Object} options - Query options
   * @param {string} [options.query] - Query string
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of webhook jobs
   */
  async listWebhookJobs(projectNameOrId, policyId, { query, sort, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('policy_id', policyId);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/webhook/jobs?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * This endpoint returns the tasks of a specific webhook execution.
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {number} policyId - ID of the webhook policy
   * @param {number} executionId - ID of the webhook execution
   * @param {Object} options - Query options
   * @param {string} [options.query] - Query string
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of webhook executions
   */   
  async listWebhookTasks(projectNameOrId, policyId, executionId, { query, sort, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/webhook/policies/${policyId}/executions/${executionId}/tasks?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
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
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/webhook/policies/${policyId}/executions/${executionId}/tasks/${taskId}/log`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * This endpoint returns last trigger information of project webhook policy.
   * @param {string} projectNameOrId - Name or ID of the project
   * @returns {Promise<Object>} Last trigger of a webhook
   */ 
  async getWebhookLastTrigger(projectNameOrId) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/webhook/lasttrigger`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get supported event types and notify types.
   * @param {string} projectNameOrId - Name or ID of the project
   * @returns {Promise<Object>} Supported event types
   */ 
  async getSupportedEventTypes(projectNameOrId) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/webhook/events`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }
}

export default Webhooks; 