const FetchUtil = require('../utils/fetch');

class Retention {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async getRetentionMetadata() {
    return this.fetch('/retentions/metadatas');
  }

  async createRetentionPolicy(policy) {
    return this.fetch('/retentions', {
      method: 'POST',
      body: JSON.stringify(policy)
    });
  }

  async getRetentionPolicy(id) {
    return this.fetch(`/retentions/${id}`);
  }

  async updateRetentionPolicy(id, policy) {
    return this.fetch(`/retentions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(policy)
    });
  }

  async deleteRetentionPolicy(id) {
    return this.fetch(`/retentions/${id}`, {
      method: 'DELETE'
    });
  }

  async triggerRetentionExecution(id, { dryRun = false } = {}) {
    return this.fetch(`/retentions/${id}/executions`, {
      method: 'POST',
      body: JSON.stringify({ dry_run: dryRun })
    });
  }

  async listRetentionExecutions(id, { page, pageSize } = {}) {
    return this.fetch(`/retentions/${id}/executions`, {
      params: { page, page_size: pageSize }
    });
  }

  async stopRetentionExecution(id, executionId) {
    return this.fetch(`/retentions/${id}/executions/${executionId}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'stop' })
    });
  }

  async listRetentionTasks(id, executionId, { page, pageSize } = {}) {
    return this.fetch(`/retentions/${id}/executions/${executionId}/tasks`, {
      params: { page, page_size: pageSize }
    });
  }

  async getRetentionTaskLog(id, executionId, taskId) {
    return this.fetch(`/retentions/${id}/executions/${executionId}/tasks/${taskId}`);
  }
}

module.exports = Retention; 