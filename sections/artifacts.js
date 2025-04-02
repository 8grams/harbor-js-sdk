/**
 * Class for managing Harbor artifacts
 */
class Artifacts {
  /**
   * Create an Artifacts instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List artifacts in a repository
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of artifacts
   */
  async listArtifacts(projectName, repositoryName, { query, sort, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts?${params.toString()}`);
    return response;
  }

  /**
   * Get an artifact by reference
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact
   * @returns {Promise<Object>} Artifact details
   */
  async getArtifact(projectName, repositoryName, reference) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}`);
    return response;
  }

  /**
   * Delete an artifact
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact
   * @returns {Promise<void>}
   */
  async deleteArtifact(projectName, repositoryName, reference) {
    await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}`, {
      method: 'DELETE'
    });
  }
}

module.exports = Artifacts; 