import FetchUtil from '../utils/fetch';

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
   * Returns a list of currently configured scanner registrations.
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of scanners
   */
  async listScanners({ query, sort, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/scanners?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Creats a new scanner registration with the given data.
   * @param {Object} registration - Scanner registration configuration
   * @returns {Promise<Object>} The created scanner
   */
  async createScanner(registration) {
    const response = await this.fetchUtil._fetch('/scanners', {
      method: 'POST',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(registration)
    });
    return response;
  }

  /**
   * Pings scanner adapter to test endpoint URL and authorization settings.
   * @param {Object} settings - Scanner settings to test
   * @returns {Promise<Object>} Ping result
   */
  async pingScanner(settings) {
    const response = await this.fetchUtil._fetch('/scanners/ping', {
      method: 'POST',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(settings)
    });
    return response;
  }

  /**
   * Retruns the details of the specified scanner registration.
   * @param {number} registrationId - The ID of the scanner
   * @returns {Promise<Object>} Scanner details
   */
  async getScanner(registrationId) {
    const response = await this.fetchUtil._fetch(`/scanners/${registrationId}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Updates the specified scanner registration.
   * @param {number} registrationId - The ID of the scanner
   * @param {Object} registration - Updated scanner configuration
   * @returns {Promise<Object>} Updated scanner details
   */
  async updateScanner(registrationId, registration) {
    const response = await this.fetchUtil._fetch(`/scanners/${registrationId}`, {
      method: 'PUT',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(registration)
    });
    return response;
  }

  /**
   * Deletes the specified scanner registration.
   * @param {number} registrationId - The ID of the scanner
   * @returns {Promise<void>}
   */
  async deleteScanner(registrationId) {
    await this.fetchUtil._fetch(`/scanners/${registrationId}`, {
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }

  /**
   * Set the specified scanner registration as the system default one.
   * @param {number} registrationId - The ID of the scanner
   * @returns {Promise<Object>} Updated scanner details
   */
  async setScannerAsDefault(registrationId) {
    const response = await this.fetchUtil._fetch(`/scanners/${registrationId}`, {
      method: 'PATCH',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify({ is_default: true })
    });
    return response;
  }

  /**
   * Get the metadata of the specified scanner registration, including the capabilities and customized properties.
   * @param {number} registrationId - The ID of the scanner
   * @returns {Promise<Object>} Scanner metadata
   */
  async getScannerMetadata(registrationId) {
    const response = await this.fetchUtil._fetch(`/scanners/${registrationId}/metadata`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get the scanner registration of the specified project. If no scanner registration is configured for the specified project, the system default scanner registration will be returned.
   * @param {string} projectNameOrId - The name or ID of the project
   * @returns {Promise<Object>} Project scanner
   */
  async getProjectScanner(projectNameOrId) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/scanner`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Set one of the system configured scanner registration as the indepndent scanner of the specified project.
   * @param {string} projectNameOrId - The name or ID of the project
   * @param {Object} payload - The payload to set the project scanner
   * @returns {Promise<Object>} The updated project scanner
   */
  async setProjectScanner(projectNameOrId, payload) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/scanner`, {
      method: 'PUT',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(payload)
    });
    return response;
  }

  /**
   * Retrieve the system configured scanner registrations as candidates of setting project level scanner.
   * @param {string} projectNameOrId - The name or ID of the project
   * @param {Object} options - The options for listing scanner candidates
   * @param {string} [options.query] - The query to search for
   * @param {string} [options.sort] - The sort field 
   * @param {number} [options.page=1] - The page number
   * @param {number} [options.pageSize=10] - The number of items per page
   * @returns {Promise<Object>} The list of scanner candidates
   */
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

    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectNameOrId)}/scanner/candidates?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }
}

export default Scanners; 