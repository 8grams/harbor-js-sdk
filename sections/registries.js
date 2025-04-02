class Registries {
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

  // Registry methods
  async createRegistry(registry) {
    return this.fetchUtil._fetch('/registries', {
      method: 'POST',
      body: JSON.stringify(registry)
    });
  }

  async listRegistries({ query, sort, name, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    if (name) params.append('name', name);
    params.append('page', page);
    params.append('page_size', pageSize);

    return this.fetchUtil._fetch(`/registries?${params.toString()}`);
  }

  async pingRegistry(registry) {
    return this.fetchUtil._fetch('/registries/ping', {
      method: 'POST',
      body: JSON.stringify(registry)
    });
  }

  async getRegistry(id) {
    return this.fetchUtil._fetch(`/registries/${id}`);
  }

  async updateRegistry(id, registry) {
    return this.fetchUtil._fetch(`/registries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(registry)
    });
  }

  async deleteRegistry(id) {
    return this.fetchUtil._fetch(`/registries/${id}`, {
      method: 'DELETE'
    });
  }

  async getRegistryInfo(id) {
    return this.fetchUtil._fetch(`/registries/${id}/info`);
  }
}

module.exports = Registries; 