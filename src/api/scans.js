import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor scans
 */
class Scans {
  /**
   * Create a Scans instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * Get the metrics of the latest scan all process
   * @returns {Promise<Object>} Latest scan metrics
   */
  async getLatestScanAllMetrics() {
    const response = await this.fetchUtil._fetch('/scans/all/metrics', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get the metrics of the latest scheduled scan all process
   * @returns {Promise<Object>} Latest scheduled scan metrics
   */
  async getLatestScheduledScanAllMetrics() {
    const response = await this.fetchUtil._fetch('/scans/schedule/metrics', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Scan the specified artifact
   * @param {string} projectName - The name of the project
   * @param {string} repositoryName - The name of the repository
   * @param {string} reference - The reference of the artifact
   * @param {Object} scanType - The type of scan to perform
   * @returns {Promise<Object>} The result of the scan
   */ 
  async scanArtifact(projectName, repositoryName, reference, scanType) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(scanType)
    });
    return response;
  }

  /**
   * Cancelling a scan job for a particular artifact
   * @param {string} projectName - The name of the project
   * @param {string} repositoryName - The name of the repository
   * @param {string} reference - The reference of the artifact
   * @param {Object} scanType - The type of scan to perform
   * @returns {Promise<Object>} The result of the scan
   */  
  async stopScanArtifact(projectName, repositoryName, reference, scanType) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/scan/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(scanType)
    });
    return response;
  }

  /**
   * Get the log of the scan report
   * @param {string} projectName - The name of the project
   * @param {string} repositoryName - The name of the repository
   * @param {string} reference - The reference of the artifact
   * @param {string} reportId - The ID of the report
   * @returns {Promise<Object>} The result of the scan
   */   
  async getReportLog(projectName, repositoryName, reference, reportId) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/scan/${encodeURIComponent(reportId)}/log`, {
      headers: {
        'Accept': 'text/plain',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }
}

export default Scans; 