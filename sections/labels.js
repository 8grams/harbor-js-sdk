const FetchUtil = require('../utils/fetch');

class Labels {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async listLabels({ query, sort, page, pageSize, name, scope, projectId } = {}) {
    return this.fetch('/labels', {
      params: { query, sort, page, page_size: pageSize, name, scope, project_id: projectId }
    });
  }

  async createLabel(label) {
    return this.fetch('/labels', {
      method: 'POST',
      body: JSON.stringify(label)
    });
  }

  async getLabel(labelId) {
    return this.fetch(`/labels/${labelId}`);
  }

  async updateLabel(labelId, label) {
    return this.fetch(`/labels/${labelId}`, {
      method: 'PUT',
      body: JSON.stringify(label)
    });
  }

  async deleteLabel(labelId) {
    return this.fetch(`/labels/${labelId}`, {
      method: 'DELETE'
    });
  }

  async addLabelToArtifact(projectName, repositoryName, reference, label) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/labels`, {
      method: 'POST',
      body: JSON.stringify(label)
    });
  }

  async removeLabelFromArtifact(projectName, repositoryName, reference, labelId) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/labels/${labelId}`, {
      method: 'DELETE'
    });
  }
}

module.exports = Labels; 