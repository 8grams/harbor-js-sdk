import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor scan data exports
 */
class ScanDataExport {
  /**
   * Create a ScanDataExport instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List scan data exports
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of scan data exports
   */
  async listScanDataExports({ page, pageSize } = {}) {
    const response = await this.fetchUtil._fetch('/scan/export', {
      params: { page, page_size: pageSize }
    });
    return response;
  }

  /**
   * Create scan data export
   * @param {Object} exportConfig - Export configuration
   * @returns {Promise<Object>} Created export
   */
  async createScanDataExport(exportConfig) {
    const response = await this.fetchUtil._fetch('/scan/export', {
      method: 'POST',
      body: JSON.stringify(exportConfig)
    });
    return response;
  }

  /**
   * Get scan data export details
   * @param {number} exportId - ID of the export
   * @returns {Promise<Object>} Export details
   */
  async getScanDataExport(exportId) {
    const response = await this.fetchUtil._fetch(`/scan/export/${exportId}`);
    return response;
  }

  /**
   * Delete scan data export
   * @param {number} exportId - ID of the export
   * @returns {Promise<void>}
   */
  async deleteScanDataExport(exportId) {
    await this.fetchUtil._fetch(`/scan/export/${exportId}`, {
      method: 'DELETE'
    });
  }

  /**
   * Get scan data export logs
   * @param {number} exportId - ID of the export
   * @returns {Promise<Object>} Export logs
   */
  async getScanDataExportLog(exportId) {
    const response = await this.fetchUtil._fetch(`/scan/export/${exportId}/log`);
    return response;
  }

  /**
   * Download scan data export
   * @param {number} exportId - ID of the export
   * @returns {Promise<Object>} Export data
   */
  async downloadScanDataExport(exportId) {
    const response = await this.fetchUtil._fetch(`/scan/export/${exportId}/download`);
    return response;
  }
}

export default ScanDataExport; 