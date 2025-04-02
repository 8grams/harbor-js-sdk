const FetchUtil = require('../utils/fetch');

class Accessories {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async listAccessories(projectName, repositoryName, reference, {
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

    return this.fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/accessories?${params.toString()}`);
  }
}

module.exports = Accessories; 