import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor LDAP configuration
 */
class LDAP {
  /**
   * Create an LDAP instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * This endpoint ping the available ldap service for test related configuration parameters.
   * @param {Object} ldapConfig - LDAP configuration to test
   * @returns {Promise<Object>} Test result
   */
  async testConnection(ldapConfig) {
    const response = await this.fetchUtil._fetch('/ldap/ping', {
      method: 'POST',
      body: JSON.stringify(ldapConfig)
    });
    return response;
  }

  /**
   * This endpoint adds the selected available ldap users to harbor based on related configuration parameters from the system. System will try to guess the user email address and realname, add to harbor user information. If have errors when import user, will return the list of importing failed uid and the failed reason.
   * @param {Object} importConfig - LDAP import configuration
   * @returns {Promise<Object>} Import result
   */
  async importUsers(importConfig) {
    const response = await this.fetchUtil._fetch('/ldap/users/import', {
      method: 'POST',
      body: JSON.stringify(importConfig)
    });
    return response;
  }

  /**
   * This endpoint searches the available ldap users based on related configuration parameters. Support searched by input ldap configuration, load configuration from the system and specific filter.
   * @param {string} username - Username to search for
   * @returns {Promise<Object>} Search result
   */
  async searchLdapUsers(username) {
    const query = username ? `?username=${encodeURIComponent(username)}` : '';
    return this.fetchUtil._fetch(`/ldap/users/search${query}`);
  }

  /**
   * This endpoint searches the available ldap groups based on related configuration parameters. support to search by groupname or groupdn.
   * @param {Object} options - Search options
   * @param {string} [options.groupname] - Group name to search for
   * @param {string} [options.groupdn] - Group DN to search for
   * @returns {Promise<Object>} Search result
   */
  async searchLdapGroups({ groupname, groupdn } = {}) {
    const params = new URLSearchParams();
    if (groupname) params.append('groupname', groupname);
    if (groupdn) params.append('groupdn', groupdn);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetchUtil._fetch(`/ldap/groups/search${query}`);
  }
}

export default LDAP; 