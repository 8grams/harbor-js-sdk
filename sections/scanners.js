const FetchUtil = require('../utils/fetch');

class Scanners {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async getProjectScanner(projectNameOrId) {
    return this.fetch(`/projects/${encodeURIComponent(projectNameOrId)}/scanner`);
  }

  async setProjectScanner(projectNameOrId, payload) {
    return this.fetch(`/projects/${encodeURIComponent(projectNameOrId)}/scanner`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  async listScannerCandidates(projectNameOrId, {
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

    return this.fetch(`/projects/${encodeURIComponent(projectNameOrId)}/scanner/candidates?${params.toString()}`);
  }
}

module.exports = Scanners; 