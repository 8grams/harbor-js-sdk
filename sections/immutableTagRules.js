const FetchUtil = require('../utils/fetch');

class ImmutableTagRules {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async listImmutableTagRules(projectNameOrId, { query, sort, page, pageSize } = {}) {
    return this.fetch(`/projects/${projectNameOrId}/immutabletagrules`, {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  async createImmutableTagRule(projectNameOrId, rule) {
    return this.fetch(`/projects/${projectNameOrId}/immutabletagrules`, {
      method: 'POST',
      body: JSON.stringify(rule)
    });
  }

  async updateImmutableTagRule(projectNameOrId, ruleId, rule) {
    return this.fetch(`/projects/${projectNameOrId}/immutabletagrules/${ruleId}`, {
      method: 'PUT',
      body: JSON.stringify(rule)
    });
  }

  async deleteImmutableTagRule(projectNameOrId, ruleId) {
    return this.fetch(`/projects/${projectNameOrId}/immutabletagrules/${ruleId}`, {
      method: 'DELETE'
    });
  }
}

module.exports = ImmutableTagRules; 