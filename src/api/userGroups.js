import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor user groups
 */
class UserGroups {
  /**
   * Create a UserGroup instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * Get all user groups information, it is open for system admin
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
   * Create user group information
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
   * Get user group information
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
   * Update user group information
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
   * Delete user group
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
}

export default UserGroups; 