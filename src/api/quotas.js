import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor quotas
 */
class Quotas {
  /**
   * Create a Quotas instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List quotas
   * @param {Object} options - Query options
   * @param {string} [options.reference] - Reference type
   * @param {string} [options.referenceId] - Reference ID
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of quotas
   */
  async listQuotas({ reference, referenceId, sort, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (reference) params.append('reference', reference);
    if (referenceId) params.append('reference_id', referenceId);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/quotas?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get the specified quota
   * @param {number} id - The ID of the quota
   * @returns {Promise<Object>} The quota details
   */
  async getQuota(id) {
    const response = await this.fetchUtil._fetch(`/quotas/${id}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Update hard limits of the specified quota
   * @param {number} id - The ID of the quota
   * @param {Object} hard - The new hard limits
   * @returns {Promise<Object>} The updated quota
   */
  async updateQuota(id, hard) {
    const response = await this.fetchUtil._fetch(`/quotas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify({ hard })
    });
    return response;
  }
}

export default Quotas; 