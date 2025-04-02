const FetchUtil = require('../utils/fetch');

/**
 * Class for managing Harbor permissions
 */
class Permissions {
  /**
   * Create a Permissions instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List permissions
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of permissions
   */
  async listPermissions({ page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/permissions', {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Get permission details
   * @param {number} permissionId - ID of the permission
   * @returns {Promise<Object>} Permission details
   */
  async getPermission(permissionId) {
    const response = await this.fetchUtil._fetch(`/permissions/${permissionId}`);
    return response;
  }

  /**
   * List permission templates
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of permission templates
   */
  async listPermissionTemplates({ page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/permissions/templates', {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Get permission template details
   * @param {number} templateId - ID of the template
   * @returns {Promise<Object>} Template details
   */
  async getPermissionTemplate(templateId) {
    const response = await this.fetchUtil._fetch(`/permissions/templates/${templateId}`);
    return response;
  }

  /**
   * List permission policies
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of permission policies
   */
  async listPermissionPolicies({ page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/permissions/policies', {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Get permission policy details
   * @param {number} policyId - ID of the policy
   * @returns {Promise<Object>} Policy details
   */
  async getPermissionPolicy(policyId) {
    const response = await this.fetchUtil._fetch(`/permissions/policies/${policyId}`);
    return response;
  }

  /**
   * Get permissions
   * @returns {Promise<Object>} Permissions
   */
  async getPermissions() {
    return this.fetchUtil._fetch('/permissions');
  }

  /**
   * List users
   * @param {Object} options - Query options
   * @param {string} [options.query] - Query string
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of users
   */
  async listUsers({ query, sort, page, pageSize } = {}) {
    return this.fetchUtil._fetch('/users', {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  /**
   * Create a user
   * @param {Object} userReq - User request
   * @returns {Promise<Object>} Created user
   */
  async createUser(userReq) {
    return this.fetchUtil._fetch('/users', {
      method: 'POST',
      body: JSON.stringify(userReq)
    });
  }

  /**
   * Get current user info
   * @returns {Promise<Object>} Current user info
   */
  async getCurrentUserInfo() {
    return this.fetchUtil._fetch('/users/current');
  }

  /**
   * Search users
   * @param {string} username - Username
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of users
   */
  async searchUsers(username, { page, pageSize } = {}) {
    return this.fetchUtil._fetch('/users/search', {
      params: { username, page, page_size: pageSize }
    });
  }

  /**
   * Get user info
   * @param {number} userId - User ID
   * @returns {Promise<Object>} User info
   */
  async getUser(userId) {
    return this.fetchUtil._fetch(`/users/${userId}`);
  }

  /**
   * Update user profile
   * @param {number} userId - User ID
   * @param {Object} profile - Profile
   * @returns {Promise<Object>} Updated profile
   */
  async updateUserProfile(userId, profile) {
    return this.fetchUtil._fetch(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profile)
    });
  }

  /**
   * Delete user
   * @param {number} userId - User ID
   * @returns {Promise<Object>} Deleted user
   */
  async deleteUser(userId) {
    return this.fetchUtil._fetch(`/users/${userId}`, {
      method: 'DELETE'
    });
  }

  /**
   * Set user sysadmin
   * @param {number} userId - User ID
   * @param {boolean} sysadminFlag - Sysadmin flag
   * @returns {Promise<Object>} Updated sysadmin flag
   */
  async setUserSysAdmin(userId, sysadminFlag) {
    return this.fetchUtil._fetch(`/users/${userId}/sysadmin`, {
      method: 'PUT',
      body: JSON.stringify(sysadminFlag)
    });
  }

  /**
   * Update user password
   * @param {number} userId - User ID
   * @param {Object} passwordReq - Password request
   * @returns {Promise<Object>} Updated password
   */
  async updateUserPassword(userId, passwordReq) {
    return this.fetchUtil._fetch(`/users/${userId}/password`, {
      method: 'PUT',
      body: JSON.stringify(passwordReq)
    });
  }

  /**
   * Get current user permissions
   * @param {Object} options - Query options
   * @param {string} [options.scope] - Scope
   * @param {boolean} [options.relative] - Relative
   * @returns {Promise<Object>} Current user permissions
   */ 
  async getCurrentUserPermissions({ scope, relative } = {}) {
    return this.fetchUtil._fetch('/users/current/permissions', {
      params: { scope, relative }
    });
  }

  /**
   * Set CLI secret
   * @param {number} userId - User ID
   * @param {Object} secret - Secret
   * @returns {Promise<Object>} Updated secret
   */ 
  async setCliSecret(userId, secret) {
    return this.fetchUtil._fetch(`/users/${userId}/cli_secret`, {
      method: 'PUT',
      body: JSON.stringify(secret)
    });
  }
}

module.exports = Permissions; 