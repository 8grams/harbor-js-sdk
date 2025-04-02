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
   * Test LDAP connection
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
   * Import LDAP users
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

  async searchLdapUsers(username) {
    const query = username ? `?username=${encodeURIComponent(username)}` : '';
    return this.fetchUtil._fetch(`/ldap/users/search${query}`);
  }

  async searchLdapGroups({ groupname, groupdn } = {}) {
    const params = new URLSearchParams();
    if (groupname) params.append('groupname', groupname);
    if (groupdn) params.append('groupdn', groupdn);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetchUtil._fetch(`/ldap/groups/search${query}`);
  }
}

export default LDAP; 