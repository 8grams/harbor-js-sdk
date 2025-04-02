class FetchUtil {
  constructor(config) {
    this.baseUrl = config.baseUrl || 'http://localhost/api/v2.0';
    this.username = config.username;
    this.password = config.password;
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  /**
   * Perform a fetch request
   * @param {string} endpoint - The endpoint to fetch
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} Fetch response
   */
  async _fetch(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const auth = btoa(`${this.username}:${this.password}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
        'Authorization': `Basic ${auth}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }
}

module.exports = FetchUtil; 