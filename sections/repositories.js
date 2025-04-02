const FetchUtil = require('../utils/fetch');

class Repositories {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async listRepositories(projectName, { query, sort, page, pageSize } = {}) {
    return this.fetch(`/projects/${projectName}/repositories`, {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  async getRepository(projectName, repositoryName) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}`);
  }

  async updateRepository(projectName, repositoryName, repository) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}`, {
      method: 'PUT',
      body: JSON.stringify(repository)
    });
  }

  async deleteRepository(projectName, repositoryName) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}`, {
      method: 'DELETE'
    });
  }

  async listArtifacts(projectName, repositoryName, { 
    query, 
    sort, 
    page, 
    pageSize,
    withTag,
    withLabel,
    withScanOverview,
    withAccessory,
    withSignature,
    withImmutableStatus
  } = {}) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts`, {
      params: { 
        query, 
        sort, 
        page, 
        page_size: pageSize,
        with_tag: withTag,
        with_label: withLabel,
        with_scan_overview: withScanOverview,
        with_accessory: withAccessory,
        with_signature: withSignature,
        with_immutable_status: withImmutableStatus
      }
    });
  }

  async getArtifact(projectName, repositoryName, reference, {
    withTag,
    withLabel,
    withScanOverview,
    withAccessory,
    withSignature,
    withImmutableStatus
  } = {}) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}`, {
      params: {
        with_tag: withTag,
        with_label: withLabel,
        with_scan_overview: withScanOverview,
        with_accessory: withAccessory,
        with_signature: withSignature,
        with_immutable_status: withImmutableStatus
      }
    });
  }

  async deleteArtifact(projectName, repositoryName, reference) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}`, {
      method: 'DELETE'
    });
  }

  async addLabel(projectName, repositoryName, reference, label) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/labels`, {
      method: 'POST',
      body: JSON.stringify(label)
    });
  }

  async removeLabel(projectName, repositoryName, reference, labelId) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/labels/${labelId}`, {
      method: 'DELETE'
    });
  }
}

module.exports = Repositories; 