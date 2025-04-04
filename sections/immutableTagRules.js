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
  async listImmutableTagRules(projectName, { page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/immutabletagrules?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
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
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/immutabletagrules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
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
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/immutabletagrules/${ruleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
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
    await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/immutabletagrules/${ruleId}`, {
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }
}

export default ImmutableTagRules; 