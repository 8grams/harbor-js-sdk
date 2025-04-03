import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor immutable tag rules
 */
class ImmutableTagRules {
  /**
   * Create an ImmutableTagRules instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * This endpoint returns the immutable tag rules of a project
   * @param {string} projectName - Name of the project
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of immutable tag rules
   */
  async listImmutableTagRules(projectName, { page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/immutabletagrules`, {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * This endpoint add an immutable tag rule to the project
   * @param {string} projectName - Name of the project
   * @param {Object} rule - Rule configuration
   * @returns {Promise<Object>} Created rule
   */
  async createImmutableTagRule(projectName, rule) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/immutabletagrules`, {
      method: 'POST',
      body: JSON.stringify(rule)
    });
    return response;
  }

  /**
   * Update the immutable tag rule or enable or disable the rule
   * @param {string} projectName - Name of the project
   * @param {number} ruleId - ID of the rule to update
   * @param {Object} rule - Updated rule configuration
   * @returns {Promise<Object>} Updated rule
   */
  async updateImmutableTagRule(projectName, ruleId, rule) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/immutabletagrules/${ruleId}`, {
      method: 'PUT',
      body: JSON.stringify(rule)
    });
    return response;
  }

  /**
   * Delete the immutable tag rule.
   * @param {string} projectName - Name of the project
   * @param {number} ruleId - ID of the rule to delete
   * @returns {Promise<void>}
   */
  async deleteImmutableTagRule(projectName, ruleId) {
    await this.fetchUtil._fetch(`/projects/${projectName}/immutabletagrules/${ruleId}`, {
      method: 'DELETE'
    });
  }
}

export default ImmutableTagRules; 