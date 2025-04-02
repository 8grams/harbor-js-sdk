const FetchUtil = require('../utils/fetch');

class AuditLogs {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async listAuditLogs({
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

    return this.fetch(`/audit-logs?${params.toString()}`);
  }
}

module.exports = AuditLogs; 