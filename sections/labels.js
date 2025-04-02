import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor labels
 */
class Labels {
  /**
   * Create a Labels instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List labels
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @param {string} [options.name] - Filter by label name
   * @param {string} [options.scope] - Filter by scope (g for global, p for project)
   * @param {string} [options.projectId] - Filter by project ID
   * @returns {Promise<Object>} List of labels
   */
  async listLabels({ page, pageSize, name, scope, projectId } = {}) {
    const response = await this.fetchUtil._fetch('/labels', {
      params: {
        page,
        page_size: pageSize,
        name,
        scope,
        project_id: projectId
      }
    });
    return response;
  }

  /**
   * Create a label
   * @param {Object} label - Label configuration
   * @returns {Promise<Object>} Created label
   */
  async createLabel(label) {
    const response = await this.fetchUtil._fetch('/labels', {
      method: 'POST',
      body: JSON.stringify(label)
    });
    return response;
  }

  /**
   * Get label details
   * @param {number} labelId - ID of the label
   * @returns {Promise<Object>} Label details
   */
  async getLabel(labelId) {
    const response = await this.fetchUtil._fetch(`/labels/${labelId}`);
    return response;
  }

  /**
   * Update a label
   * @param {number} labelId - ID of the label
   * @param {Object} label - Updated label configuration
   * @returns {Promise<Object>} Updated label
   */
  async updateLabel(labelId, label) {
    const response = await this.fetchUtil._fetch(`/labels/${labelId}`, {
      method: 'PUT',
      body: JSON.stringify(label)
    });
    return response;
  }

  /**
   * Delete a label
   * @param {number} labelId - ID of the label
   * @returns {Promise<void>}
   */
  async deleteLabel(labelId) {
    await this.fetchUtil._fetch(`/labels/${labelId}`, {
      method: 'DELETE'
    });
  }

  /**
   * List resources with a label
   * @param {number} labelId - ID of the label
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of resources
   */
  async listLabelResources(labelId, { page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch(`/labels/${labelId}/resources`, {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  async addLabelToArtifact(projectName, repositoryName, reference, label) {
    return this.fetchUtil._fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/labels`, {
      method: 'POST',
      body: JSON.stringify(label)
    });
  }

  async removeLabelFromArtifact(projectName, repositoryName, reference, labelId) {
    return this.fetchUtil._fetch(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/labels/${labelId}`, {
      method: 'DELETE'
    });
  }
}

export default Labels; 