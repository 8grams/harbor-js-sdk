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
   * Get the artifact icon with the specified digest. As the original icon image is resized and encoded before returning, the parameter "digest" in the path doesn't match the hash of the returned content
   * @param {string} digest - The digest of the icon to retrieve
   * @returns {Promise<Object>} The icon data
   */
  async getIcon(digest) {
    const response = await this.fetchUtil._fetch(`/icons/${encodeURIComponent(digest)}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }
}

export default Icons; 