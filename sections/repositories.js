const FetchUtil = require('../utils/fetch');

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
   * List repositories in a project
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

  /**
   * Get repository details
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @returns {Promise<Object>} Repository details
   */
  async getRepository(projectName, repositoryName) {
    const response = await this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}`);
    return response;
  }

  /**
   * Delete a repository
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @returns {Promise<void>}
   */
  async deleteRepository(projectName, repositoryName) {
    await this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}`, {
      method: 'DELETE'
    });
  }

  /**
   * Get repository summary
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @returns {Promise<Object>} Repository summary
   */
  async getRepositorySummary(projectName, repositoryName) {
    const response = await this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/summary`);
    return response;
  }

  /**
   * Get repository signatures
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @returns {Promise<Object>} Repository signatures
   */
  async getRepositorySignatures(projectName, repositoryName) {
    const response = await this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/signatures`);
    return response;
  }

  async updateRepository(projectName, repositoryName, repository) {
    return this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}`, {
      method: 'PUT',
      body: JSON.stringify(repository)
    });
  }

  async listArtifacts(projectName, repositoryName, { 
    query, 
    sort, 
    page, 
    pageSize,
    withTag,
    withLabel,
    withScanOverview,
    withAccessory,
    withSignature,
    withImmutableStatus
  } = {}) {
    return this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/artifacts`, {
      params: { 
        query, 
        sort, 
        page, 
        page_size: pageSize,
        with_tag: withTag,
        with_label: withLabel,
        with_scan_overview: withScanOverview,
        with_accessory: withAccessory,
        with_signature: withSignature,
        with_immutable_status: withImmutableStatus
      }
    });
  }

  async getArtifact(projectName, repositoryName, reference, {
    withTag,
    withLabel,
    withScanOverview,
    withAccessory,
    withSignature,
    withImmutableStatus
  } = {}) {
    return this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/artifacts/${reference}`, {
      params: {
        with_tag: withTag,
        with_label: withLabel,
        with_scan_overview: withScanOverview,
        with_accessory: withAccessory,
        with_signature: withSignature,
        with_immutable_status: withImmutableStatus
      }
    });
  }

  async deleteArtifact(projectName, repositoryName, reference) {
    return this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/artifacts/${reference}`, {
      method: 'DELETE'
    });
  }

  async addLabel(projectName, repositoryName, reference, label) {
    return this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/artifacts/${reference}/labels`, {
      method: 'POST',
      body: JSON.stringify(label)
    });
  }

  async removeLabel(projectName, repositoryName, reference, labelId) {
    return this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/artifacts/${reference}/labels/${labelId}`, {
      method: 'DELETE'
    });
  }
}

module.exports = Repositories; 