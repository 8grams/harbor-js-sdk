const FetchUtil = require('../utils/fetch');

/**
 * Class for managing Harbor user groups
 */
class UserGroup {
  /**
   * Create a UserGroup instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List user groups
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @param {string} [options.groupName] - Filter by group name
   * @param {string} [options.ldapGroupDn] - Filter by LDAP group DN
   * @returns {Promise<Object>} List of user groups
   */
  async listUserGroups({ page, pageSize, groupName, ldapGroupDn } = {}) {
    const response = await this.fetchUtil._fetch('/usergroups', {
      params: {
        page,
        page_size: pageSize,
        group_name: groupName,
        ldap_group_dn: ldapGroupDn
      }
    });
    return response;
  }

  /**
   * Create a user group
   * @param {Object} group - Group configuration
   * @returns {Promise<Object>} Created group
   */
  async createUserGroup(group) {
    const response = await this.fetchUtil._fetch('/usergroups', {
      method: 'POST',
      body: JSON.stringify(group)
    });
    return response;
  }

  /**
   * Get user group details
   * @param {number} groupId - ID of the group
   * @returns {Promise<Object>} Group details
   */
  async getUserGroup(groupId) {
    const response = await this.fetchUtil._fetch(`/usergroups/${groupId}`);
    return response;
  }

  /**
   * Update a user group
   * @param {number} groupId - ID of the group
   * @param {Object} group - Updated group configuration
   * @returns {Promise<Object>} Updated group
   */
  async updateUserGroup(groupId, group) {
    const response = await this.fetchUtil._fetch(`/usergroups/${groupId}`, {
      method: 'PUT',
      body: JSON.stringify(group)
    });
    return response;
  }

  /**
   * Delete a user group
   * @param {number} groupId - ID of the group
   * @returns {Promise<void>}
   */
  async deleteUserGroup(groupId) {
    await this.fetchUtil._fetch(`/usergroups/${groupId}`, {
      method: 'DELETE'
    });
  }

  /**
   * List users in a group
   * @param {number} groupId - ID of the group
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of users
   */
  async listGroupUsers(groupId, { page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch(`/usergroups/${groupId}/users`, {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Add user to group
   * @param {number} groupId - ID of the group
   * @param {Object} user - User configuration
   * @returns {Promise<Object>} Added user
   */
  async addUserToGroup(groupId, user) {
    const response = await this.fetchUtil._fetch(`/usergroups/${groupId}/users`, {
      method: 'POST',
      body: JSON.stringify(user)
    });
    return response;
  }

  /**
   * Remove user from group
   * @param {number} groupId - ID of the group
   * @param {number} userId - ID of the user
   * @returns {Promise<void>}
   */
  async removeUserFromGroup(groupId, userId) {
    await this.fetchUtil._fetch(`/usergroups/${groupId}/users/${userId}`, {
      method: 'DELETE'
    });
  }
}

module.exports = UserGroup; 