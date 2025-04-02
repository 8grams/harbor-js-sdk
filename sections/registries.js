/**
 * Class for managing Harbor registries
 */
class Registries {
  /**
   * Create a Registries instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  // Registry adapter methods
  async listRegistryAdapters() {
    return this.fetchUtil._fetch('/replication/adapters');
  }

  async listRegistryProviderInfos() {
    return this.fetchUtil._fetch('/replication/adapterinfos');
  }

  /**
   * Create a new registry
   * @param {Object} registry - Registry configuration
   * @returns {Promise<Object>} The created registry
   */
  async createRegistry(registry) {
    const response = await this.fetchUtil._fetch('/registries', {
      method: 'POST',
      body: JSON.stringify(registry)
    });
    return response;
  }

  /**
   * List registries with optional filtering and pagination
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query
   * @param {string} [options.sort] - Sort field
   * @param {string} [options.name] - Registry name
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of registries
   */
  async listRegistries({ query, sort, name, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    if (name) params.append('name', name);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/registries?${params.toString()}`);
    return response;
  }

  /**
   * Ping a registry to verify connectivity
   * @param {Object} registry - Registry configuration to test
   * @returns {Promise<Object>} Ping result
   */
  async pingRegistry(registry) {
    const response = await this.fetchUtil._fetch('/registries/ping', {
      method: 'POST',
      body: JSON.stringify(registry)
    });
    return response;
  }

  /**
   * Get a registry by ID
   * @param {number} id - The ID of the registry
   * @returns {Promise<Object>} Registry details
   */
  async getRegistry(id) {
    const response = await this.fetchUtil._fetch(`/registries/${id}`);
    return response;
  }

  /**
   * Update a registry
   * @param {number} id - The ID of the registry
   * @param {Object} registry - Updated registry configuration
   * @returns {Promise<Object>} Updated registry details
   */
  async updateRegistry(id, registry) {
    const response = await this.fetchUtil._fetch(`/registries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(registry)
    });
    return response;
  }

  /**
   * Delete a registry
   * @param {number} id - The ID of the registry
   * @returns {Promise<void>}
   */
  async deleteRegistry(id) {
    await this.fetchUtil._fetch(`/registries/${id}`, {
      method: 'DELETE'
    });
  }

  /**
   * Get registry information
   * @param {number} id - The ID of the registry
   * @returns {Promise<Object>} Registry information
   */
  async getRegistryInfo(id) {
    const response = await this.fetchUtil._fetch(`/registries/${id}/info`);
    return response;
  }
}

module.exports = Registries; 