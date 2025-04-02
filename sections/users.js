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
   * List users with optional filtering and pagination
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of users
   */
  async listUsers({ query, sort, page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/users', {
      params: { query, sort, page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Create a new user
   * @param {Object} userReq - User creation request
   * @returns {Promise<Object>} The created user
   */
  async createUser(userReq) {
    const response = await this.fetchUtil._fetch('/users', {
      method: 'POST',
      body: JSON.stringify(userReq)
    });
    return response;
  }

  /**
   * Get current user information
   * @returns {Promise<Object>} Current user details
   */
  async getCurrentUserInfo() {
    const response = await this.fetchUtil._fetch('/users/current');
    return response;
  }

  /**
   * Search for users by username
   * @param {string} username - Username to search for
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} Search results
   */
  async searchUsers(username, { page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/users/search', {
      params: { username, page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Get a user by ID
   * @param {number} userId - The ID of the user
   * @returns {Promise<Object>} User details
   */
  async getUser(userId) {
    const response = await this.fetchUtil._fetch(`/users/${userId}`);
    return response;
  }

  /**
   * Update a user's profile
   * @param {number} userId - The ID of the user
   * @param {Object} profile - Updated profile information
   * @returns {Promise<Object>} Updated user details
   */
  async updateUserProfile(userId, profile) {
    const response = await this.fetchUtil._fetch(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profile)
    });
    return response;
  }

  /**
   * Delete a user
   * @param {number} userId - The ID of the user
   * @returns {Promise<void>}
   */
  async deleteUser(userId) {
    await this.fetchUtil._fetch(`/users/${userId}`, {
      method: 'DELETE'
    });
  }

  /**
   * Set a user's system admin status
   * @param {number} userId - The ID of the user
   * @param {boolean} sysadminFlag - Whether the user should be a system admin
   * @returns {Promise<Object>} Updated user details
   */
  async setUserSysAdmin(userId, sysadminFlag) {
    const response = await this.fetchUtil._fetch(`/users/${userId}/sysadmin`, {
      method: 'PUT',
      body: JSON.stringify(sysadminFlag)
    });
    return response;
  }

  /**
   * Update a user's password
   * @param {number} userId - The ID of the user
   * @param {Object} passwordReq - Password update request
   * @returns {Promise<Object>} Updated user details
   */
  async updateUserPassword(userId, passwordReq) {
    const response = await this.fetchUtil._fetch(`/users/${userId}/password`, {
      method: 'PUT',
      body: JSON.stringify(passwordReq)
    });
    return response;
  }

  /**
   * Get current user permissions
   * @param {Object} options - Query options
   * @param {string} [options.scope] - Permission scope
   * @param {boolean} [options.relative] - Whether to return relative permissions
   * @returns {Promise<Object>} User permissions
   */
  async getCurrentUserPermissions({ scope, relative } = {}) {
    const response = await this.fetchUtil._fetch('/users/current/permissions', {
      params: { scope, relative }
    });
    return response;
  }

  /**
   * Set CLI secret for a user
   * @param {number} userId - The ID of the user
   * @param {Object} secret - CLI secret configuration
   * @returns {Promise<Object>} Updated user details
   */
  async setCliSecret(userId, secret) {
    const response = await this.fetchUtil._fetch(`/users/${userId}/cli_secret`, {
      method: 'PUT',
      body: JSON.stringify(secret)
    });
    return response;
  }
}

module.exports = Users; 