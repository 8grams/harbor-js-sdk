import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor users
 */
class Users {
  /**
   * Create a Users instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List users
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query
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
   * This API can be used only when the authentication mode is for local DB. When self registration is disabled.
   * @param {Object} userReq - User creation request
   * @returns {Promise<Object>} The created user
   */
  async createUser(userReq) {
    const response = await this.fetchUtil._fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(userReq)
    });
    return response;
  }

  /**
   * Get current user info.
   * @returns {Promise<Object>} Current user details
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
   * This endpoint is to search the users by username. It's open for all authenticated requests.
   * @param {string} username - Username to search for
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} Search results
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
   * Get a user's profile.
   * @param {number} userId - The ID of the user
   * @returns {Promise<Object>} User details
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
   * Update user's profile.
   * @param {number} userId - The ID of the user
   * @param {Object} profile - Updated profile information
   * @returns {Promise<Object>} Updated user details
   */
  async updateUserProfile(userId, profile) {
    const response = await this.fetchUtil._fetch(`/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(profile)
    });
    return response;
  }

  /**
   * This endpoint let administrator of Harbor mark a registered user as removed.It actually won't be deleted from DB.
   * @param {number} userId - The ID of the user
   * @returns {Promise<void>}
   */
  async deleteUser(userId) {
    await this.fetchUtil._fetch(`/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }

  /**
   * Update a registered user to change to be an administrator of Harbor.
   * @param {number} userId - The ID of the user
   * @param {boolean} sysadminFlag - Whether the user should be a system admin
   * @returns {Promise<Object>} Updated user details
   */
  async setUserSysAdmin(userId, sysadminFlag) {
    const response = await this.fetchUtil._fetch(`/users/${userId}/sysadmin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(sysadminFlag)
    });
    return response;
  }

  /**
   * This endpoint is for user to update password. Users with the admin role can change any user's password. Regular users can change only their own password.
   * @param {number} userId - The ID of the user
   * @param {Object} passwordReq - Password update request
   * @returns {Promise<Object>} Updated user details
   */
  async updateUserPassword(userId, passwordReq) {
    const response = await this.fetchUtil._fetch(`/users/${userId}/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(passwordReq)
    });
    return response;
  }

  /**
   * Get current user permissions.
   * @param {Object} options - Query options
   * @param {string} [options.scope] - Permission scope
   * @param {boolean} [options.relative] - Whether to return relative permissions
   * @returns {Promise<Object>} User permissions
   */
  async getCurrentUserPermissions({ scope, relative } = {}) {
    const params = new URLSearchParams();
    if (scope) params.append('scope', scope);
    if (relative) params.append('relative', relative);

    const response = await this.fetchUtil._fetch(`/users/current/permissions?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * This endpoint let user generate a new CLI secret for himself. This API only works when auth mode is set to 'OIDC'. Once this API returns with successful status, the old secret will be invalid, as there will be only one CLI secret for a user.
   * @param {number} userId - The ID of the user
   * @param {Object} secret - CLI secret configuration
   * @returns {Promise<Object>} Updated user details
   */
  async setCliSecret(userId, secret) {
    const response = await this.fetchUtil._fetch(`/users/${userId}/cli_secret`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(secret)
    });
    return response;
  }
}

export default Users; 