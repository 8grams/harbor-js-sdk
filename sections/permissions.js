import FetchUtil from '../utils/fetch';

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
  async listPermissions({ page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/permissions?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get permission details
   * @param {number} permissionId - ID of the permission
   * @returns {Promise<Object>} Permission details
   */
  async getPermission(permissionId) {
    const response = await this.fetchUtil._fetch(`/permissions/${permissionId}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * List permission templates
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of permission templates
   */
  async listPermissionTemplates({ page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/permissions/templates?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get permission template details
   * @param {number} templateId - ID of the template
   * @returns {Promise<Object>} Template details
   */
  async getPermissionTemplate(templateId) {
    const response = await this.fetchUtil._fetch(`/permissions/templates/${templateId}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * List permission policies
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of permission policies
   */
  async listPermissionPolicies({ page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/permissions/policies?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get permission policy details
   * @param {number} policyId - ID of the policy
   * @returns {Promise<Object>} Policy details
   */
  async getPermissionPolicy(policyId) {
    const response = await this.fetchUtil._fetch(`/permissions/policies/${policyId}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get permissions
   * @returns {Promise<Object>} Permissions
   */
  async getPermissions() {
    const response = await this.fetchUtil._fetch('/permissions', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
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
  async listUsers({ query, sort, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/users?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Create a user
   * @param {Object} userReq - User request
   * @returns {Promise<Object>} Created user
   */
  async createUser(userReq) {
    const response = await this.fetchUtil._fetch('/users', {
      method: 'POST',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(userReq)
    });
    return response;
  }

  /**
   * Get current user info
   * @returns {Promise<Object>} Current user info
   */
  async getCurrentUserInfo() {
    const response = await this.fetchUtil._fetch('/users/current', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Search users
   * @param {string} username - Username
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of users
   */
  async searchUsers(username, { page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/users/search?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get user info
   * @param {number} userId - User ID
   * @returns {Promise<Object>} User info
   */
  async getUser(userId) {
    const response = await this.fetchUtil._fetch(`/users/${userId}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Update user profile
   * @param {number} userId - User ID
   * @param {Object} profile - Profile
   * @returns {Promise<Object>} Updated profile
   */
  async updateUserProfile(userId, profile) {
    const response = await this.fetchUtil._fetch(`/users/${userId}`, {
      method: 'PUT',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(profile)
    });
    return response;
  }

  /**
   * Delete user
   * @param {number} userId - User ID
   * @returns {Promise<Object>} Deleted user
   */
  async deleteUser(userId) {
    const response = await this.fetchUtil._fetch(`/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Set user sysadmin
   * @param {number} userId - User ID
   * @param {boolean} sysadminFlag - Sysadmin flag
   * @returns {Promise<Object>} Updated sysadmin flag
   */
  async setUserSysAdmin(userId, sysadminFlag) {
    const response = await this.fetchUtil._fetch(`/users/${userId}/sysadmin`, {
      method: 'PUT',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(sysadminFlag)
    });
    return response;
  }

  /**
   * Update user password
   * @param {number} userId - User ID
   * @param {Object} passwordReq - Password request
   * @returns {Promise<Object>} Updated password
   */
  async updateUserPassword(userId, passwordReq) {
    const response = await this.fetchUtil._fetch(`/users/${userId}/password`, {
      method: 'PUT',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(passwordReq)
    });
    return response;
  }

  /**
   * Get current user permissions
   * @param {Object} options - Query options
   * @param {string} [options.scope] - Scope
   * @param {boolean} [options.relative] - Relative
   * @returns {Promise<Object>} Current user permissions
   */ 
  async getCurrentUserPermissions({ scope, relative } = {}) {
    const params = new URLSearchParams();
    if (scope) params.append('scope', scope);
    if (relative !== undefined) params.append('relative', relative);

    const response = await this.fetchUtil._fetch(`/users/current/permissions?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Set CLI secret
   * @param {number} userId - User ID
   * @param {Object} secret - Secret
   * @returns {Promise<Object>} Updated secret
   */ 
  async setCliSecret(userId, secret) {
    const response = await this.fetchUtil._fetch(`/users/${userId}/cli_secret`, {
      method: 'PUT',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(secret)
    });
    return response;
  }
}

export default Permissions; 