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
   * Get vulnerabilities for an artifact
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact
   * @returns {Promise<Object>} Vulnerability information
   */
  async getVulnerabilities(projectName, repositoryName, reference) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/additions/vulnerabilities`);
    return response;
  }

  /**
   * Get specific addition for an artifact
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact
   * @param {string} addition - Type of addition to retrieve
   * @returns {Promise<Object>} Addition information
   */
  async getAddition(projectName, repositoryName, reference, addition) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/additions/${encodeURIComponent(addition)}`);
    return response;
  }
}

module.exports = Additions; 