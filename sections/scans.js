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
   * Get the latest scan all metrics
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
   * Get the latest scheduled scan all metrics
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
   * Scan an artifact
   * @param {string} projectName - The name of the project
   * @param {string} repositoryName - The name of the repository
   * @param {string} reference - The reference of the artifact
   * @param {Object} scanType - The type of scan to perform
   * @returns {Promise<Object>} The result of the scan
   */ 
  async scanArtifact(projectName, repositoryName, reference, scanType) {
    return this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/scan`, {
      method: 'POST',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(scanType)
    });
  }

  /**
   * Stop a scan
   * @param {string} projectName - The name of the project
   * @param {string} repositoryName - The name of the repository
   * @param {string} reference - The reference of the artifact
   * @param {Object} scanType - The type of scan to perform
   * @returns {Promise<Object>} The result of the scan
   */  
  async stopScanArtifact(projectName, repositoryName, reference, scanType) {
    return this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/scan/stop`, {
      method: 'POST',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(scanType)
    });
  }

  /**
   * Get the report log
   * @param {string} projectName - The name of the project
   * @param {string} repositoryName - The name of the repository
   * @param {string} reference - The reference of the artifact
   * @param {string} reportId - The ID of the report
   * @returns {Promise<Object>} The result of the scan
   */   
  async getReportLog(projectName, repositoryName, reference, reportId) {
    return this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/scan/${encodeURIComponent(reportId)}/log`, {
      headers: {
        'Accept': 'text/plain',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }
}

export default Scans; 