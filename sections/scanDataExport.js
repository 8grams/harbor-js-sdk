const FetchUtil = require('../utils/fetch');

class ScanDataExport {
  constructor(fetchUtil) {
    this.fetch = fetchUtil.fetch.bind(fetchUtil);
  }

  async exportScanData(criteria) {
    return this.fetch('/export/cve', {
      method: 'POST',
      body: JSON.stringify(criteria)
    });
  }

  async getScanDataExportExecution(executionId) {
    return this.fetch(`/export/cve/execution/${executionId}`);
  }

  async getScanDataExportExecutions() {
    return this.fetch('/export/cve/executions');
  }

  async downloadScanData(executionId, format = 'CSV') {
    return this.fetch(`/export/cve/download/${executionId}`, {
      params: { format }
    });
  }
}

module.exports = ScanDataExport; 