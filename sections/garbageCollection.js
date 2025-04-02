const FetchUtil = require('../utils/fetch');

class GarbageCollection {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
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
}

module.exports = GarbageCollection; 