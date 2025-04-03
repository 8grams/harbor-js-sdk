import FetchUtil from '../utils/fetch';

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
  async listUserGroups({ page = 1, pageSize = 10, groupName, ldapGroupDn } = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', pageSize);
    if (groupName) params.append('group_name', groupName);
    if (ldapGroupDn) params.append('ldap_group_dn', ldapGroupDn);

    const response = await this.fetchUtil._fetch(`/usergroups?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
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
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
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
    const response = await this.fetchUtil._fetch(`/usergroups/${groupId}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
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
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
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
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
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
  async listGroupUsers(groupId, { page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/usergroups/${groupId}/users?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
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
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
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
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }
}

export default UserGroup; 