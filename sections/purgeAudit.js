const FetchUtil = require('../utils/fetch');

class PurgeAudit {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async getPurgeHistory({ query, sort, page, pageSize } = {}) {
    return this.fetch('/system/purgeaudit', {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  async getPurgeJob(purgeId) {
    return this.fetch(`/system/purgeaudit/${purgeId}`);
  }

  async stopPurge(purgeId) {
    return this.fetch(`/system/purgeaudit/${purgeId}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'stop' })
    });
  }

  async getPurgeJobLog(purgeId) {
    return this.fetch(`/system/purgeaudit/${purgeId}/log`);
  }

  async getPurgeSchedule() {
    return this.fetch('/system/purgeaudit/schedule');
  }

  async createPurgeSchedule(schedule) {
    return this.fetch('/system/purgeaudit/schedule', {
      method: 'POST',
      body: JSON.stringify(schedule)
    });
  }
}

module.exports = PurgeAudit; 