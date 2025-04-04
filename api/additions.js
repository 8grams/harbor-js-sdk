import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor additions
 */
class Additions {
  /**
   * Create an Additions instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List additions
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact (digest or tag)
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of additions
   */
  async listAdditions(projectName, repositoryName, reference, { query, sort, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/additions?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get the addition of the artifact specified by the reference under the project and repository
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact (digest or tag)
   * @param {string} addition - Type of addition (e.g., 'vulnerabilities', 'build_history')
   * @returns {Promise<Object>} Addition information
   */
  async getAddition(projectName, repositoryName, reference, addition) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/additions/${addition}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get the vulnerabilities addition of the artifact specified by the reference under the project and repository
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact (digest or tag)
   * @returns {Promise<Object>} Vulnerability information
   */
  async getVulnerabilities(projectName, repositoryName, reference) {
    return this.getAddition(projectName, repositoryName, reference, 'vulnerabilities');
  }
}

export default Additions; 