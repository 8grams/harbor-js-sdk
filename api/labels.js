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
   * This endpoint let user list labels by name, scope and project_id
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @param {string} [options.name] - Filter by label name
   * @param {string} [options.scope] - Filter by scope (g for global, p for project)
   * @param {string} [options.projectId] - Filter by project ID
   * @returns {Promise<Object>} List of labels
   */
  async listLabels({ page = 1, pageSize = 10, query, sort, name, scope, projectId } = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', pageSize);
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    if (name) params.append('name', name);
    if (scope) params.append('scope', scope);
    if (projectId) params.append('project_id', projectId);

    const response = await this.fetchUtil._fetch(`/labels?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * This endpoint let user creates a label.
   * @param {Object} label - Label configuration
   * @returns {Promise<Object>} Created label
   */
  async createLabel(label) {
    const response = await this.fetchUtil._fetch('/labels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(label)
    });
    return response;
  }

  /**
   * This endpoint let user get the label by specific ID.
   * @param {number} labelId - ID of the label
   * @returns {Promise<Object>} Label details
   */
  async getLabel(labelId) {
    const response = await this.fetchUtil._fetch(`/labels/${labelId}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * This endpoint let user update label properties.
   * @param {number} labelId - ID of the label
   * @param {Object} label - Updated label configuration
   * @returns {Promise<Object>} Updated label
   */
  async updateLabel(labelId, label) {
    const response = await this.fetchUtil._fetch(`/labels/${labelId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(label)
    });
    return response;
  }

  /**
   * Delete the label specified by ID.
   * @param {number} labelId - ID of the label
   * @returns {Promise<void>}
   */
  async deleteLabel(labelId) {
    await this.fetchUtil._fetch(`/labels/${labelId}`, {
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
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
  async listLabelResources(labelId, { page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/labels/${labelId}/resources?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Add label to artifact
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact
   * @param {Object} label - Label to add
   * @returns {Promise<Object>} Added label
   */
  async addLabelToArtifact(projectName, repositoryName, reference, label) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/labels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(label)
    });
    return response;
  }

  /**
   * Remove label from artifact
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact
   * @param {number} labelId - ID of the label to remove
   * @returns {Promise<void>}
   */
  async removeLabelFromArtifact(projectName, repositoryName, reference, labelId) {
    await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/labels/${labelId}`, {
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }
}

export default Labels; 