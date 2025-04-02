const FetchUtil = require('../utils/fetch');

class Projects {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async listProjects({ query, sort, page, pageSize, name, public: isPublic, owner, withDetail } = {}) {
    return this.fetch('/projects', {
      params: { 
        query, 
        sort, 
        page, 
        page_size: pageSize,
        name,
        public: isPublic,
        owner,
        with_detail: withDetail
      }
    });
  }

  async createProject(project) {
    return this.fetch('/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    });
  }

  async getProject(projectNameOrId) {
    return this.fetch(`/projects/${projectNameOrId}`);
  }

  async updateProject(projectNameOrId, project) {
    return this.fetch(`/projects/${projectNameOrId}`, {
      method: 'PUT',
      body: JSON.stringify(project)
    });
  }

  async deleteProject(projectNameOrId) {
    return this.fetch(`/projects/${projectNameOrId}`, {
      method: 'DELETE'
    });
  }

  async getProjectDeletable(projectNameOrId) {
    return this.fetch(`/projects/${projectNameOrId}/_deletable`);
  }

  async getProjectSummary(projectNameOrId) {
    return this.fetch(`/projects/${projectNameOrId}/summary`);
  }

  async getProjectScanner(projectNameOrId) {
    return this.fetch(`/projects/${projectNameOrId}/scanner`);
  }

  async setProjectScanner(projectNameOrId, payload) {
    return this.fetch(`/projects/${projectNameOrId}/scanner`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  async listScannerCandidates(projectNameOrId, { query, sort, page, pageSize } = {}) {
    return this.fetch(`/projects/${projectNameOrId}/scanner/candidates`, {
      params: { query, sort, page, page_size: pageSize }
    });
  }
}

module.exports = Projects; 