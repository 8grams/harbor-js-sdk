const FetchUtil = require('../utils/fetch');

class Webhooks {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async listWebhookPolicies(projectNameOrId, { query, sort, page, pageSize } = {}) {
    return this.fetch(`/projects/${projectNameOrId}/webhook/policies`, {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  async createWebhookPolicy(projectNameOrId, policy) {
    return this.fetch(`/projects/${projectNameOrId}/webhook/policies`, {
      method: 'POST',
      body: JSON.stringify(policy)
    });
  }

  async getWebhookPolicy(projectNameOrId, policyId) {
    return this.fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}`);
  }

  async updateWebhookPolicy(projectNameOrId, policyId, policy) {
    return this.fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}`, {
      method: 'PUT',
      body: JSON.stringify(policy)
    });
  }

  async deleteWebhookPolicy(projectNameOrId, policyId) {
    return this.fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}`, {
      method: 'DELETE'
    });
  }

  async listWebhookExecutions(projectNameOrId, policyId, { query, sort, page, pageSize } = {}) {
    return this.fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}/executions`, {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  async listWebhookTasks(projectNameOrId, policyId, executionId, { query, sort, page, pageSize } = {}) {
    return this.fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}/executions/${executionId}/tasks`, {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  async getWebhookTaskLog(projectNameOrId, policyId, executionId, taskId) {
    return this.fetch(`/projects/${projectNameOrId}/webhook/policies/${policyId}/executions/${executionId}/tasks/${taskId}/log`);
  }

  async getWebhookLastTrigger(projectNameOrId) {
    return this.fetch(`/projects/${projectNameOrId}/webhook/lasttrigger`);
  }

  async listWebhookJobs(projectNameOrId, { policyId, status, query, sort, page, pageSize } = {}) {
    return this.fetch(`/projects/${projectNameOrId}/webhook/jobs`, {
      params: { 
        policy_id: policyId,
        status,
        query,
        sort,
        page,
        page_size: pageSize
      }
    });
  }

  async getSupportedEventTypes(projectNameOrId) {
    return this.fetch(`/projects/${projectNameOrId}/webhook/events`);
  }
}

module.exports = Webhooks; 