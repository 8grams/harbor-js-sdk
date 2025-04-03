import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor repositories
 */
class Repositories {
  /**
   * Create a Repositories instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List all authorized repositories
   * @param {string} projectName - Name of the project
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @param {string} [options.q] - Search query
   * @param {string} [options.sort] - Sort field
   * @returns {Promise<Object>} List of repositories
   */
  async listRepositories(projectName, { page, pageSize, q, sort } = {}) {
    const response = await this.fetchUtil._fetch(`/repositories`, {
      params: { 
        project_name: projectName,
        page,
        page_size: pageSize,
        q,
        sort
      }
    });
    return response;
  }
}

export default Repositories; 