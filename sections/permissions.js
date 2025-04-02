const FetchUtil = require('../utils/fetch');

class Permissions {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async getPermissions() {
    return this.fetch('/permissions');
  }

  async listUsers({ query, sort, page, pageSize } = {}) {
    return this.fetch('/users', {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  async createUser(userReq) {
    return this.fetch('/users', {
      method: 'POST',
      body: JSON.stringify(userReq)
    });
  }

  async getCurrentUserInfo() {
    return this.fetch('/users/current');
  }

  async searchUsers(username, { page, pageSize } = {}) {
    return this.fetch('/users/search', {
      params: { username, page, page_size: pageSize }
    });
  }

  async getUser(userId) {
    return this.fetch(`/users/${userId}`);
  }

  async updateUserProfile(userId, profile) {
    return this.fetch(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profile)
    });
  }

  async deleteUser(userId) {
    return this.fetch(`/users/${userId}`, {
      method: 'DELETE'
    });
  }

  async setUserSysAdmin(userId, sysadminFlag) {
    return this.fetch(`/users/${userId}/sysadmin`, {
      method: 'PUT',
      body: JSON.stringify(sysadminFlag)
    });
  }

  async updateUserPassword(userId, passwordReq) {
    return this.fetch(`/users/${userId}/password`, {
      method: 'PUT',
      body: JSON.stringify(passwordReq)
    });
  }

  async getCurrentUserPermissions({ scope, relative } = {}) {
    return this.fetch('/users/current/permissions', {
      params: { scope, relative }
    });
  }

  async setCliSecret(userId, secret) {
    return this.fetch(`/users/${userId}/cli_secret`, {
      method: 'PUT',
      body: JSON.stringify(secret)
    });
  }
}

module.exports = Permissions; 