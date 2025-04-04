const FetchUtil = require('./utils/fetch');
const ScanDataExport = require('./api/scanDataExport');
const Security = require('./api/security');
const JobService = require('./api/jobService');
const PurgeAudit = require('./api/purgeAudit');
const GarbageCollection = require('./api/garbageCollection');
const Permissions = require('./api/permissions');
const Labels = require('./api/labels');
const Projects = require('./api/projects');
const Repositories = require('./api/repositories');
const Tags = require('./api/tags');
const Webhooks = require('./api/webhooks');
const ImmutableTagRules = require('./api/immutableTagRules');
const Retention = require('./api/retention');
const Replication = require('./api/replication');
const System = require('./api/system');
const LDAP = require('./api/ldap');
const Configuration = require('./api/configuration');
const Artifacts = require('./api/artifacts');
const Scans = require('./api/scans');
const Accessories = require('./api/accessories');
const Additions = require('./api/additions');
const Scanners = require('./api/scanners');
const P2PPreheat = require('./api/p2pPreheat');
const AuditLogs = require('./api/auditLogs');
const UserGroups = require('./api/userGroups');
const Icons = require('./api/icons').default;
const Robots = require('./api/robots');
const Quotas = require('./api/quotas');
const Registries = require('./api/registries');
const Users = require('./api/users');

class Harbor {
  constructor(config) {
    this.fetchUtil = new FetchUtil(config);
    this.scanDataExport = new ScanDataExport(this.fetchUtil);
    this.security = new Security(this.fetchUtil);
    this.jobService = new JobService(this.fetchUtil);
    this.purgeAudit = new PurgeAudit(this.fetchUtil);
    this.garbageCollection = new GarbageCollection(this.fetchUtil);
    this.permissions = new Permissions(this.fetchUtil);
    this.labels = new Labels(this.fetchUtil);
    this.projects = new Projects(this.fetchUtil);
    this.repositories = new Repositories(this.fetchUtil);
    this.tags = new Tags(this.fetchUtil);
    this.webhooks = new Webhooks(this.fetchUtil);
    this.immutableTagRules = new ImmutableTagRules(this.fetchUtil);
    this.retention = new Retention(this.fetchUtil);
    this.replication = new Replication(this.fetchUtil);
    this.system = new System(this.fetchUtil);
    this.ldap = new LDAP(this.fetchUtil);
    this.configuration = new Configuration(this.fetchUtil);
    this.artifacts = new Artifacts(this.fetchUtil);
    this.scans = new Scans(this.fetchUtil);
    this.accessories = new Accessories(this.fetchUtil);
    this.additions = new Additions(this.fetchUtil);
    this.scanners = new Scanners(this.fetchUtil);
    this.p2pPreheat = new P2PPreheat(this.fetchUtil);
    this.auditLogs = new AuditLogs(this.fetchUtil);
    this.userGroups = new UserGroups(this.fetchUtil);
    this.icons = new Icons(this.fetchUtil);
    this.robots = new Robots(this.fetchUtil);
    this.quotas = new Quotas(this.fetchUtil);
    this.registries = new Registries(this.fetchUtil);
    this.users = new Users(this.fetchUtil);
    this.baseUrl = config.baseUrl || 'http://localhost/api/v2.0';
    this.username = config.username;
    this.password = config.password;
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  /**
   * Get system health status
   * @returns {Promise<Object>} Health status
   */
  async getHealth() {
    return this.fetchUtil._fetch('/health', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }

  /**
   * Search for resources
   * @param {string} query - Search query
   * @returns {Promise<Object>} Search results
   */
  async search(query) {
    const params = new URLSearchParams();
    params.append('q', query);
    return this.fetchUtil._fetch(`/search?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }

  /**
   * Get system statistics
   * @returns {Promise<Object>} System statistics
   */
  async getStatistics() {
    return this.fetchUtil._fetch('/statistics', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }

  /**
   * Get system info
   * @returns {Promise<Object>} System information
   */
  async getSystemInfo() {
    return this.fetchUtil._fetch('/systeminfo', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }

  /**
   * Get system volume info
   * @returns {Promise<Object>} System volume information
   */
  async getSystemVolumeInfo() {
    return this.fetchUtil._fetch('/systeminfo/volumes', {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }
}

module.exports = Harbor; 