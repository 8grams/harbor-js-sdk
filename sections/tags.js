import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor tags
 */
class Tags {
  /**
   * Create a Tags instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List tags for a repository
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @param {string} [options.labelId] - Filter by label ID
   * @param {string} [options.sort] - Sort field
   * @returns {Promise<Object>} List of tags
   */
  async listTags(projectName, repositoryName, { page, pageSize, labelId, sort } = {}) {
    const response = await this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/tags`, {
      params: { page, page_size: pageSize, label_id: labelId, sort }
    });
    return response;
  }

  /**
   * Get tag details
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} tag - Tag name
   * @returns {Promise<Object>} Tag details
   */
  async getTag(projectName, repositoryName, tag) {
    const response = await this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/tags/${tag}`);
    return response;
  }

  /**
   * Delete a tag
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} tag - Tag name
   * @returns {Promise<void>}
   */
  async deleteTag(projectName, repositoryName, tag) {
    await this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/tags/${tag}`, {
      method: 'DELETE'
    });
  }

  /**
   * Get tag vulnerabilities
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} tag - Tag name
   * @returns {Promise<Object>} Tag vulnerabilities
   */
  async getTagVulnerabilities(projectName, repositoryName, tag) {
    const response = await this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/tags/${tag}/vulnerability/details`);
    return response;
  }

  /**
   * Get tag manifest
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} tag - Tag name
   * @returns {Promise<Object>} Tag manifest
   */
  async getTagManifest(projectName, repositoryName, tag) {
    const response = await this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/tags/${tag}/manifest`);
    return response;
  }
}

export default Tags; 