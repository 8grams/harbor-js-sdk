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
   * @param {string} [options.query] - Search query
   * @param {string} [options.sort] - Sort field
   * @returns {Promise<Object>} List of repositories
   */
  async listRepositories(projectName, { page = 1, pageSize = 10, query, sort } = {}) {
    const params = new URLSearchParams();
    params.append('project_name', projectName);
    params.append('page', page);
    params.append('page_size', pageSize);
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);

    const response = await this.fetchUtil._fetch(`/repositories?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get repository information
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @returns {Promise<Object>} Repository details
   */
  async getRepository(projectName, repositoryName) {
    const response = await this.fetchUtil._fetch(`/repositories/${encodeURIComponent(projectName)}/${encodeURIComponent(repositoryName)}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Delete repository
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @returns {Promise<void>}
   */
  async deleteRepository(projectName, repositoryName) {
    await this.fetchUtil._fetch(`/repositories/${encodeURIComponent(projectName)}/${encodeURIComponent(repositoryName)}`, {
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }

  /**
   * Update repository description
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {Object} description - Repository description
   * @returns {Promise<Object>} Updated repository details
   */
  async updateRepository(projectName, repositoryName, description) {
    const response = await this.fetchUtil._fetch(`/repositories/${encodeURIComponent(projectName)}/${encodeURIComponent(repositoryName)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(description)
    });
    return response;
  }
}

export default Repositories; 