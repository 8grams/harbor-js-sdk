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
  
  /**
   * Update repository
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {Object} repository - Repository configuration
   * @returns {Promise<Object>} Updated repository
   */
  async updateRepository(projectName, repositoryName, repository) {
    return this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}`, {
      method: 'PUT',
      body: JSON.stringify(repository)
    });
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
   * @param {boolean} [options.withTag] - Include tags
   * @param {boolean} [options.withLabel] - Include labels
   * @param {boolean} [options.withScanOverview] - Include scan overview
   * @param {boolean} [options.withAccessory] - Include accessories
   * @param {boolean} [options.withSignature] - Include signatures  
   * @param {boolean} [options.withImmutableStatus] - Include immutable status
   * @returns {Promise<Object>} List of artifacts
   */
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

  /**
   * Get artifact details
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact
   * @param {Object} options - Query options 
   * @param {boolean} [options.withTag] - Include tags  
   * @param {boolean} [options.withLabel] - Include labels
   * @param {boolean} [options.withScanOverview] - Include scan overview
   * @param {boolean} [options.withAccessory] - Include accessories
   * @param {boolean} [options.withSignature] - Include signatures
   * @param {boolean} [options.withImmutableStatus] - Include immutable status
   * @returns {Promise<Object>} Artifact details
   */
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

  /**
   * Delete an artifact
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact
   * @returns {Promise<void>}
   */
  async deleteArtifact(projectName, repositoryName, reference) {
    return this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/artifacts/${reference}`, {
      method: 'DELETE'
    });
  }

  /**
   * Add a label to an artifact
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact
   * @param {Object} label - Label to add
   * @returns {Promise<Object>} Added label
   */
  async addLabel(projectName, repositoryName, reference, label) {
    return this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/artifacts/${reference}/labels`, {
      method: 'POST',
      body: JSON.stringify(label)
    });
  }

  /**
   * Remove a label from an artifact
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact
   * @param {string} labelId - ID of the label to remove
   * @returns {Promise<void>}
   */ 
  async removeLabel(projectName, repositoryName, reference, labelId) {
    return this.fetchUtil._fetch(`/repositories/${projectName}/${repositoryName}/artifacts/${reference}/labels/${labelId}`, {
      method: 'DELETE'
    });
  }
}

module.exports = Repositories; 