const FetchUtil = require('../utils/fetch');

class Replication {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async listReplicationPolicies({ query, sort, name, page, pageSize } = {}) {
    return this.fetch('/replication/policies', {
      params: { query, sort, name, page, page_size: pageSize }
    });
  }

  async createReplicationPolicy(policy) {
    return this.fetch('/replication/policies', {
      method: 'POST',
      body: JSON.stringify(policy)
    });
  }

  async getReplicationPolicy(id) {
    return this.fetch(`/replication/policies/${id}`);
  }

  async updateReplicationPolicy(id, policy) {
    return this.fetch(`/replication/policies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(policy)
    });
  }

  async deleteReplicationPolicy(id) {
    return this.fetch(`/replication/policies/${id}`, {
      method: 'DELETE'
    });
  }

  async listReplicationExecutions({ policyId, status, trigger, sort, page, pageSize } = {}) {
    return this.fetch('/replication/executions', {
      params: { 
        policy_id: policyId,
        status,
        trigger,
        sort,
        page,
        page_size: pageSize
      }
    });
  }

  async startReplication(execution) {
    return this.fetch('/replication/executions', {
      method: 'POST',
      body: JSON.stringify(execution)
    });
  }

  async getReplicationExecution(id) {
    return this.fetch(`/replication/executions/${id}`);
  }

  async stopReplication(id) {
    return this.fetch(`/replication/executions/${id}`, {
      method: 'PUT'
    });
  }

  async listReplicationTasks(id, { status, resourceType, sort, page, pageSize } = {}) {
    return this.fetch(`/replication/executions/${id}/tasks`, {
      params: { 
        status,
        resource_type: resourceType,
        sort,
        page,
        page_size: pageSize
      }
    });
  }

  async getReplicationTaskLog(id, taskId) {
    return this.fetch(`/replication/executions/${id}/tasks/${taskId}/log`);
  }

  async listRegistryAdapters() {
    return this.fetch('/replication/adapters');
  }

  async listRegistryProviderInfos() {
    return this.fetch('/replication/adapterinfos');
  }

  async createRegistry(registry) {
    return this.fetch('/registries', {
      method: 'POST',
      body: JSON.stringify(registry)
    });
  }

  async listRegistries({ query, sort, name, page, pageSize } = {}) {
    return this.fetch('/registries', {
      params: { query, sort, name, page, page_size: pageSize }
    });
  }

  async pingRegistry(registry) {
    return this.fetch('/registries/ping', {
      method: 'POST',
      body: JSON.stringify(registry)
    });
  }

  async getRegistry(id) {
    return this.fetch(`/registries/${id}`);
  }

  async updateRegistry(id, registry) {
    return this.fetch(`/registries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(registry)
    });
  }

  async deleteRegistry(id) {
    return this.fetch(`/registries/${id}`, {
      method: 'DELETE'
    });
  }

  async getRegistryInfo(id) {
    return this.fetch(`/registries/${id}/info`);
  }
}

module.exports = Replication; 