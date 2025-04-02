const FetchUtil = require('../utils/fetch');

class Security {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async getSystemCVEAllowlist() {
    return this.fetch('/system/CVEAllowlist');
  }

  async updateSystemCVEAllowlist(allowlist) {
    return this.fetch('/system/CVEAllowlist', {
      method: 'PUT',
      body: JSON.stringify(allowlist)
    });
  }

  async getScanAllSchedule() {
    return this.fetch('/system/scanAll/schedule');
  }

  async updateScanAllSchedule(schedule) {
    return this.fetch('/system/scanAll/schedule', {
      method: 'PUT',
      body: JSON.stringify(schedule)
    });
  }

  async createScanAllSchedule(schedule) {
    return this.fetch('/system/scanAll/schedule', {
      method: 'POST',
      body: JSON.stringify(schedule)
    });
  }
}

module.exports = Security; 