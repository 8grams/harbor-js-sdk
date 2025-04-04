import FetchUtil from '../utils/fetch';

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

  /**
   * List registry adapters
   * @returns {Promise<Object>} List of registry adapters
   */
  async listRegistryAdapters() {
    const response = await this.fetchUtil._fetch('/replication/adapters', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * List all registered registry provider information
   * @returns {Promise<Object>} List of registry provider infos
   */
  async listRegistryProviderInfos() {
    const response = await this.fetchUtil._fetch('/replication/adapterinfos', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Create a registry
   * @param {Object} registry - Registry configuration
   * @returns {Promise<Object>} The created registry
   */
  async createRegistry(registry) {
    const response = await this.fetchUtil._fetch('/registries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(registry)
    });
    return response;
  }

  /**
   * List the registries
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

    const response = await this.fetchUtil._fetch(`/registries?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Check status of a registry
   * @param {Object} registry - Registry configuration to test
   * @returns {Promise<Object>} Ping result
   */
  async pingRegistry(registry) {
    const response = await this.fetchUtil._fetch('/registries/ping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(registry)
    });
    return response;
  }

  /**
   * Get the specific registry
   * @param {number} id - The ID of the registry
   * @returns {Promise<Object>} Registry details
   */
  async getRegistry(id) {
    const response = await this.fetchUtil._fetch(`/registries/${id}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Update the registry
   * @param {number} id - The ID of the registry
   * @param {Object} registry - Updated registry configuration
   * @returns {Promise<Object>} Updated registry details
   */
  async updateRegistry(id, registry) {
    const response = await this.fetchUtil._fetch(`/registries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(registry)
    });
    return response;
  }

  /**
   * Delete the specific registry
   * @param {number} id - The ID of the registry
   * @returns {Promise<void>}
   */
  async deleteRegistry(id) {
    await this.fetchUtil._fetch(`/registries/${id}`, {
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }

  /**
   * Get the registry info
   * @param {number} id - The ID of the registry
   * @returns {Promise<Object>} Registry information
   */
  async getRegistryInfo(id) {
    const response = await this.fetchUtil._fetch(`/registries/${id}/info`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }
}

export default Registries; 