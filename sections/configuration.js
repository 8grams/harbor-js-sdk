const FetchUtil = require('../utils/fetch');

class Configuration {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async getInternalConfig() {
    return this.fetch('/internalconfig');
  }

  async getConfigurations() {
    return this.fetch('/configurations');
  }

  async updateConfigurations(config) {
    return this.fetch('/configurations', {
      method: 'PUT',
      body: JSON.stringify(config)
    });
  }
}

module.exports = Configuration; 