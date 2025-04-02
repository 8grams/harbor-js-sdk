class Quotas {
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  async listQuotas({ reference, referenceId, sort, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (reference) params.append('reference', reference);
    if (referenceId) params.append('reference_id', referenceId);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    return this.fetchUtil._fetch(`/quotas?${params.toString()}`);
  }

  async getQuota(id) {
    return this.fetchUtil._fetch(`/quotas/${id}`);
  }

  async updateQuota(id, hard) {
    return this.fetchUtil._fetch(`/quotas/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ hard })
    });
  }
}

module.exports = Quotas; 