class Icons {
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  async getIcon(digest) {
    return this.fetchUtil._fetch(`/icons/${encodeURIComponent(digest)}`);
  }
}

module.exports = Icons; 