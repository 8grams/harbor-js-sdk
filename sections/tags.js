const FetchUtil = require('../utils/fetch');

class Tags {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async listTags(projectName, repositoryName, reference, { 
    query, 
    sort, 
    page, 
    pageSize,
    withImmutableStatus
  } = {}) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/tags`, {
      params: { 
        query, 
        sort, 
        page, 
        page_size: pageSize,
        with_immutable_status: withImmutableStatus
      }
    });
  }

  async createTag(projectName, repositoryName, reference, tag) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/tags`, {
      method: 'POST',
      body: JSON.stringify(tag)
    });
  }

  async deleteTag(projectName, repositoryName, reference, tagName) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/tags/${tagName}`, {
      method: 'DELETE'
    });
  }

  async scanArtifact(projectName, repositoryName, reference, scanType) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/scan`, {
      method: 'POST',
      body: JSON.stringify(scanType)
    });
  }

  async stopScanArtifact(projectName, repositoryName, reference, scanType) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/scan/stop`, {
      method: 'POST',
      body: JSON.stringify(scanType)
    });
  }

  async getReportLog(projectName, repositoryName, reference, reportId) {
    return this.fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/scan/${reportId}/log`);
  }
}

module.exports = Tags; 