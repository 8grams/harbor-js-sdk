const FetchUtil = require('../utils/fetch');

/**
 * Class for managing Harbor accessories
 */
class Accessories {
  /**
   * Create an Accessories instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List accessories for an artifact
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact
   * @returns {Promise<Object>} List of accessories
   */
  async listAccessories(projectName, repositoryName, reference) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/accessories`);
    return response;
  }
}

module.exports = Accessories; 