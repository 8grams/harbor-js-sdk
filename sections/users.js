class Users {
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  async listUsers({ query, sort, page, pageSize } = {}) {
    return this.fetchUtil._fetch('/users', {
      params: { query, sort, page, page_size: pageSize }
    });
  }

  async createUser(userReq) {
    return this.fetchUtil._fetch('/users', {
      method: 'POST',
      body: JSON.stringify(userReq)
    });
  }

  async getCurrentUserInfo() {
    return this.fetchUtil._fetch('/users/current');
  }

  async searchUsers(username, { page, pageSize } = {}) {
    return this.fetchUtil._fetch('/users/search', {
      params: { username, page, page_size: pageSize }
    });
  }

  async getUser(userId) {
    return this.fetchUtil._fetch(`/users/${userId}`);
  }

  async updateUserProfile(userId, profile) {
    return this.fetchUtil._fetch(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profile)
    });
  }

  async deleteUser(userId) {
    return this.fetchUtil._fetch(`/users/${userId}`, {
      method: 'DELETE'
    });
  }

  async setUserSysAdmin(userId, sysadminFlag) {
    return this.fetchUtil._fetch(`/users/${userId}/sysadmin`, {
      method: 'PUT',
      body: JSON.stringify(sysadminFlag)
    });
  }

  async updateUserPassword(userId, passwordReq) {
    return this.fetchUtil._fetch(`/users/${userId}/password`, {
      method: 'PUT',
      body: JSON.stringify(passwordReq)
    });
  }

  async getCurrentUserPermissions({ scope, relative } = {}) {
    return this.fetchUtil._fetch('/users/current/permissions', {
      params: { scope, relative }
    });
  }

  async setCliSecret(userId, secret) {
    return this.fetchUtil._fetch(`/users/${userId}/cli_secret`, {
      method: 'PUT',
      body: JSON.stringify(secret)
    });
  }
}

module.exports = Users; 