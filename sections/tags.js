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
   * List tags of the specific artifact
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
   * Delete the tag of the specified artifact
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
}

export default Tags; 