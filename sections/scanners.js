const FetchUtil = require('../utils/fetch');

/**
 * Class for managing Harbor scanners
 */
class Scanners {
  /**
   * Create a Scanners instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List scanners with optional filtering and pagination
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of scanners
   */
  async listScanners({ query, sort, page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/scanners', {
      params: { query, sort, page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Create a new scanner
   * @param {Object} registration - Scanner registration configuration
   * @returns {Promise<Object>} The created scanner
   */
  async createScanner(registration) {
    const response = await this.fetchUtil._fetch('/scanners', {
      method: 'POST',
      body: JSON.stringify(registration)
    });
    return response;
  }

  /**
   * Ping a scanner to verify connectivity
   * @param {Object} settings - Scanner settings to test
   * @returns {Promise<Object>} Ping result
   */
  async pingScanner(settings) {
    const response = await this.fetchUtil._fetch('/scanners/ping', {
      method: 'POST',
      body: JSON.stringify(settings)
    });
    return response;
  }

  /**
   * Get a scanner by ID
   * @param {number} registrationId - The ID of the scanner
   * @returns {Promise<Object>} Scanner details
   */
  async getScanner(registrationId) {
    const response = await this.fetchUtil._fetch(`/scanners/${registrationId}`);
    return response;
  }

  /**
   * Update a scanner
   * @param {number} registrationId - The ID of the scanner
   * @param {Object} registration - Updated scanner configuration
   * @returns {Promise<Object>} Updated scanner details
   */
  async updateScanner(registrationId, registration) {
    const response = await this.fetchUtil._fetch(`/scanners/${registrationId}`, {
      method: 'PUT',
      body: JSON.stringify(registration)
    });
    return response;
  }

  /**
   * Delete a scanner
   * @param {number} registrationId - The ID of the scanner
   * @returns {Promise<void>}
   */
  async deleteScanner(registrationId) {
    await this.fetchUtil._fetch(`/scanners/${registrationId}`, {
      method: 'DELETE'
    });
  }

  /**
   * Set a scanner as the default scanner
   * @param {number} registrationId - The ID of the scanner
   * @returns {Promise<Object>} Updated scanner details
   */
  async setScannerAsDefault(registrationId) {
    const response = await this.fetchUtil._fetch(`/scanners/${registrationId}`, {
      method: 'PATCH',
      body: JSON.stringify({ is_default: true })
    });
    return response;
  }

  /**
   * Get scanner metadata
   * @param {number} registrationId - The ID of the scanner
   * @returns {Promise<Object>} Scanner metadata
   */
  async getScannerMetadata(registrationId) {
    const response = await this.fetchUtil._fetch(`/scanners/${registrationId}/metadata`);
    return response;
  }

  async getProjectScanner(projectNameOrId) {
    return this.fetchUtil.fetch(`/projects/${encodeURIComponent(projectNameOrId)}/scanner`);
  }

  async setProjectScanner(projectNameOrId, payload) {
    return this.fetchUtil.fetch(`/projects/${encodeURIComponent(projectNameOrId)}/scanner`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  async listScannerCandidates(projectNameOrId, {
    query,
    sort,
    page = 1,
    pageSize = 10
  } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    return this.fetchUtil.fetch(`/projects/${encodeURIComponent(projectNameOrId)}/scanner/candidates?${params.toString()}`);
  }
}

module.exports = Scanners; 