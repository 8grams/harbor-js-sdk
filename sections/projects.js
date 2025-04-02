import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor projects
 */
class Projects {
  /**
   * Create a Projects instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List projects
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @param {string} [options.name] - Filter by project name
   * @param {boolean} [options.public] - Filter by public status
   * @param {string} [options.owner] - Filter by owner
   * @param {boolean} [options.withDetail] - Include detailed information
   * @returns {Promise<Object>} List of projects
   */
  async listProjects({ page, pageSize, name, public: isPublic, owner, withDetail } = {}) {
    const response = await this.fetchUtil._fetch('/projects', {
      params: {
        page,
        page_size: pageSize,
        name,
        public: isPublic,
        owner,
        with_detail: withDetail
      }
    });
    return response;
  }

  /**
   * Create a project
   * @param {Object} project - Project configuration
   * @returns {Promise<Object>} Created project
   */
  async createProject(project) {
    const response = await this.fetchUtil._fetch('/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    });
    return response;
  }

  /**
   * Get project details
   * @param {string} projectName - Name of the project
   * @returns {Promise<Object>} Project details
   */
  async getProject(projectName) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}`);
    return response;
  }

  /**
   * Update a project
   * @param {string} projectName - Name of the project
   * @param {Object} project - Updated project configuration
   * @returns {Promise<Object>} Updated project
   */
  async updateProject(projectName, project) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}`, {
      method: 'PUT',
      body: JSON.stringify(project)
    });
    return response;
  }

  /**
   * Delete a project
   * @param {string} projectName - Name of the project
   * @returns {Promise<void>}
   */
  async deleteProject(projectName) {
    await this.fetchUtil._fetch(`/projects/${projectName}`, {
      method: 'DELETE'
    });
  }

  /**
   * Get project summary
   * @param {string} projectName - Name of the project
   * @returns {Promise<Object>} Project summary
   */
  async getProjectSummary(projectName) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/summary`);
    return response;
  }

  /**
   * Get project logs
   * @param {string} projectName - Name of the project
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} Project logs
   */
  async getProjectLogs(projectName, { page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/logs`, {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Get project members
   * @param {string} projectName - Name of the project
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @param {string} [options.entityname] - Filter by entity name
   * @returns {Promise<Object>} Project members
   */
  async getProjectMembers(projectName, { page, pageSize, entityname } = {}) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/members`, {
      params: { page, page_size: pageSize, entityname }
    });
    return response;
  }

  /**
   * Add project member
   * @param {string} projectName - Name of the project
   * @param {Object} member - Member configuration
   * @returns {Promise<Object>} Added member
   */
  async addProjectMember(projectName, member) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/members`, {
      method: 'POST',
      body: JSON.stringify(member)
    });
    return response;
  }

  /**
   * Update project member
   * @param {string} projectName - Name of the project
   * @param {number} userId - User ID
   * @param {Object} role - Role configuration
   * @returns {Promise<Object>} Updated member
   */
  async updateProjectMember(projectName, userId, role) {
    const response = await this.fetchUtil._fetch(`/projects/${projectName}/members/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(role)
    });
    return response;
  }

  /**
   * Delete project member
   * @param {string} projectName - Name of the project
   * @param {number} userId - User ID
   * @returns {Promise<void>}
   */
  async deleteProjectMember(projectName, userId) {
    await this.fetchUtil._fetch(`/projects/${projectName}/members/${userId}`, {
      method: 'DELETE'
    });
  }

  /**
   * Get project deletable status
   * @param {string} projectNameOrId - Name or ID of the project
   * @returns {Promise<Object>} Project deletable status
   */
  async getProjectDeletable(projectNameOrId) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/_deletable`);
  }

  /**
   * Get project scanner
   * @param {string} projectNameOrId - Name or ID of the project
   * @returns {Promise<Object>} Project scanner
   */
  async getProjectScanner(projectNameOrId) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/scanner`);
  }

  /**
   * Set project scanner
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {Object} payload - Scanner configuration
   * @returns {Promise<Object>} Updated project scanner
   */
  async setProjectScanner(projectNameOrId, payload) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/scanner`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  /**
   * List scanner candidates
   * @param {string} projectNameOrId - Name or ID of the project
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of scanner candidates
   */
  async listScannerCandidates(projectNameOrId, { query, sort, page, pageSize } = {}) {
    return this.fetchUtil._fetch(`/projects/${projectNameOrId}/scanner/candidates`, {
      params: { query, sort, page, page_size: pageSize }
    });
  }
}

export default Projects; 