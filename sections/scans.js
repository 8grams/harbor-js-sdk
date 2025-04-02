const FetchUtil = require('../utils/fetch');

class Scans {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async scanArtifact(projectName, repositoryName, reference, scanType) {
    return this.fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/scan`, {
      method: 'POST',
      body: JSON.stringify(scanType)
    });
  }

  async stopScanArtifact(projectName, repositoryName, reference, scanType) {
    return this.fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/scan/stop`, {
      method: 'POST',
      body: JSON.stringify(scanType)
    });
  }

  async getReportLog(projectName, repositoryName, reference, reportId) {
    return this.fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/scan/${encodeURIComponent(reportId)}/log`, {
      headers: {
        'Accept': 'text/plain'
      }
    });
  }
}

module.exports = Scans; 