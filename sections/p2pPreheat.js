const FetchUtil = require('../utils/fetch');

class P2PPreheat {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async listP2PProviders() {
    return this.fetch('/p2p/preheat/providers');
  }

  async pingP2PInstance(instance) {
    return this.fetch('/p2p/preheat/instances/ping', {
      method: 'POST',
      body: JSON.stringify(instance)
    });
  }

  async listP2PInstances({
    query,
    sort,
    page = 1,
    pageSize = 10
  } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    return this.fetch(`/p2p/preheat/instances?${params.toString()}`);
  }

  async createP2PInstance(instance) {
    return this.fetch('/p2p/preheat/instances', {
      method: 'POST',
      body: JSON.stringify(instance)
    });
  }

  async getP2PInstance(instanceName) {
    return this.fetch(`/p2p/preheat/instances/${encodeURIComponent(instanceName)}`);
  }

  async updateP2PInstance(instanceName, instance) {
    return this.fetch(`/p2p/preheat/instances/${encodeURIComponent(instanceName)}`, {
      method: 'PUT',
      body: JSON.stringify(instance)
    });
  }

  async deleteP2PInstance(instanceName) {
    return this.fetch(`/p2p/preheat/instances/${encodeURIComponent(instanceName)}`, {
      method: 'DELETE'
    });
  }

  async createPreheatPolicy(projectName, policy) {
    return this.fetch(`/projects/${encodeURIComponent(projectName)}/preheat/policies`, {
      method: 'POST',
      body: JSON.stringify(policy)
    });
  }

  async listPreheatPolicies(projectName, {
    query,
    sort,
    page = 1,
    pageSize = 10
  } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    return this.fetch(`/projects/${encodeURIComponent(projectName)}/preheat/policies?${params.toString()}`);
  }

  async getPreheatPolicy(projectName, policyName) {
    return this.fetch(`/projects/${encodeURIComponent(projectName)}/preheat/policies/${encodeURIComponent(policyName)}`);
  }

  async updatePreheatPolicy(projectName, policyName, policy) {
    return this.fetch(`/projects/${encodeURIComponent(projectName)}/preheat/policies/${encodeURIComponent(policyName)}`, {
      method: 'PUT',
      body: JSON.stringify(policy)
    });
  }

  async manualPreheat(projectName, policyName, policy) {
    return this.fetch(`/projects/${encodeURIComponent(projectName)}/preheat/policies/${encodeURIComponent(policyName)}`, {
      method: 'POST',
      body: JSON.stringify(policy)
    });
  }

  async deletePreheatPolicy(projectName, policyName) {
    return this.fetch(`/projects/${encodeURIComponent(projectName)}/preheat/policies/${encodeURIComponent(policyName)}`, {
      method: 'DELETE'
    });
  }

  async listPreheatExecutions(projectName, policyName, {
    page = 1,
    pageSize = 10
  } = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', pageSize);

    return this.fetch(`/projects/${encodeURIComponent(projectName)}/preheat/policies/${encodeURIComponent(policyName)}/executions?${params.toString()}`);
  }

  async getPreheatExecution(projectName, policyName, executionId) {
    return this.fetch(`/projects/${encodeURIComponent(projectName)}/preheat/policies/${encodeURIComponent(policyName)}/executions/${executionId}`);
  }

  async stopPreheatExecution(projectName, policyName, executionId, execution) {
    return this.fetch(`/projects/${encodeURIComponent(projectName)}/preheat/policies/${encodeURIComponent(policyName)}/executions/${executionId}`, {
      method: 'PATCH',
      body: JSON.stringify(execution)
    });
  }

  async listPreheatTasks(projectName, policyName, executionId, {
    query,
    sort,
    page = 1,
    pageSize = 10
  } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    return this.fetch(`/projects/${encodeURIComponent(projectName)}/preheat/policies/${encodeURIComponent(policyName)}/executions/${executionId}/tasks?${params.toString()}`);
  }

  async getPreheatLog(projectName, policyName, executionId, taskId) {
    return this.fetch(`/projects/${encodeURIComponent(projectName)}/preheat/policies/${encodeURIComponent(policyName)}/executions/${executionId}/tasks/${taskId}/logs`, {
      headers: {
        'Accept': 'text/plain'
      }
    });
  }

  async listProjectProviders(projectName) {
    return this.fetch(`/projects/${encodeURIComponent(projectName)}/preheat/providers`);
  }
}

module.exports = P2PPreheat; 