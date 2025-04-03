import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor audit logs
 */
class AuditLogs {
  /**
   * Create an AuditLogs instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * This endpoint let user see the recent operation logs of the projects which he is member of
   * @param {string} [query] - Search query
   * @param {string} [sort] - Sort field
   * @param {number} [page=1] - Page number
   * @param {number} [pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of audit logs
   */
  async listAuditLogs(
    query,
    sort,
    page = 1,
    pageSize = 10
  ) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/audit-logs?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }
}

export default AuditLogs; 