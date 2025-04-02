const FetchUtil = require('../utils/fetch');

class System {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async getSystemInfo() {
    return this.fetch('/systeminfo');
  }

  async getSystemVolumes() {
    return this.fetch('/systeminfo/volumes');
  }

  async getSystemCert() {
    return this.fetch('/systeminfo/getcert');
  }

  async pingOIDC(endpoint) {
    return this.fetch('/system/oidc/ping', {
      method: 'POST',
      body: JSON.stringify(endpoint)
    });
  }

  async getGCHistory({ query, sort, page, pageSize } = {}) {
    return this.fetch('/system/gc', {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  async getGCStatus(gcId) {
    return this.fetch(`/system/gc/${gcId}`);
  }

  async stopGC(gcId) {
    return this.fetch(`/system/gc/${gcId}`, {
      method: 'PUT'
    });
  }

  async getGCLog(gcId) {
    return this.fetch(`/system/gc/${gcId}/log`);
  }

  async getGCSchedule() {
    return this.fetch('/system/gc/schedule');
  }

  async createGCSchedule(schedule) {
    return this.fetch('/system/gc/schedule', {
      method: 'POST',
      body: JSON.stringify(schedule)
    });
  }

  async updateGCSchedule(schedule) {
    return this.fetch('/system/gc/schedule', {
      method: 'PUT',
      body: JSON.stringify(schedule)
    });
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
      method: 'PUT'
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

  async updatePurgeSchedule(schedule) {
    return this.fetch('/system/purgeaudit/schedule', {
      method: 'PUT',
      body: JSON.stringify(schedule)
    });
  }
}

module.exports = System; 