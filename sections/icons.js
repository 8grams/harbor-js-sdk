/**
 * Class for managing Harbor icons
 */
class Icons {
  /**
   * Create an Icons instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * Get an icon by its digest
   * @param {string} digest - The digest of the icon to retrieve
   * @returns {Promise<Object>} The icon data
   */
  async getIcon(digest) {
    const response = await this.fetchUtil._fetch(`/icons/${encodeURIComponent(digest)}`);
    return response;
  }
}

export default Icons; 