const FetchUtil = require('../utils/fetch');

class LDAP {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async pingLdap(ldapConfig) {
    return this.fetch('/ldap/ping', {
      method: 'POST',
      body: JSON.stringify(ldapConfig)
    });
  }

  async searchLdapUsers(username) {
    const query = username ? `?username=${encodeURIComponent(username)}` : '';
    return this.fetch(`/ldap/users/search${query}`);
  }

  async importLdapUsers(uidList) {
    return this.fetch('/ldap/users/import', {
      method: 'POST',
      body: JSON.stringify({ uid_list: uidList })
    });
  }

  async searchLdapGroups({ groupname, groupdn } = {}) {
    const params = new URLSearchParams();
    if (groupname) params.append('groupname', groupname);
    if (groupdn) params.append('groupdn', groupdn);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetch(`/ldap/groups/search${query}`);
  }
}

module.exports = LDAP; 