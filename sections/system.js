import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor system settings and configurations
 */
class System {
  /**
   * Create a System instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * This endpoint is for downloading a default root certificate.
   * @returns {Promise<Object>} System certificate
   */
  async getSystemCert() {
    const response = await this.fetchUtil._fetch('/systeminfo/getcert');
    return response;
  }

  /**
   * Test the OIDC endpoint, the setting of the endpoint is provided in the request. This API can only be called by system admin.
   * @returns {Promise<Object>} OIDC provider status
   */
  async pingOIDC() {
    const response = await this.fetchUtil._fetch('/system/oidc/ping');
    return response;
  }
}

export default System; 