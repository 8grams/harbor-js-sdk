const FetchUtil = require('./utils/fetch');
const ScanDataExport = require('./sections/scanDataExport');
const Security = require('./sections/security');
const JobService = require('./sections/jobService');
const PurgeAudit = require('./sections/purgeAudit');
const GarbageCollection = require('./sections/garbageCollection');
const Permissions = require('./sections/permissions');
const Labels = require('./sections/labels');
const Projects = require('./sections/projects');
const Repositories = require('./sections/repositories');
const Tags = require('./sections/tags');
const Webhooks = require('./sections/webhooks');
const ImmutableTagRules = require('./sections/immutableTagRules');
const Retention = require('./sections/retention');
const Replication = require('./sections/replication');
const System = require('./sections/system');
const LDAP = require('./sections/ldap');
const Configuration = require('./sections/configuration');
const Artifacts = require('./sections/artifacts');
const Scans = require('./sections/scans');
const Accessories = require('./sections/accessories');
const Additions = require('./sections/additions');
const Scanners = require('./sections/scanners');
const P2PPreheat = require('./sections/p2pPreheat');
const AuditLogs = require('./sections/auditLogs');
const UserGroups = require('./sections/userGroups');
const Icons = require('./sections/icons').default;
const Robots = require('./sections/robots');
const Quotas = require('./sections/quotas');
const Registries = require('./sections/registries');
const Users = require('./sections/users');

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

  // Core utility methods
  async _fetch(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const auth = btoa(`${this.username}:${this.password}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
        'Authorization': `Basic ${auth}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Basic health check
  async getHealth() {
    return this._fetch('/health');
  }

  // Basic search
  async search(query) {
    return this._fetch(`/search?q=${encodeURIComponent(query)}`);
  }

  // Basic statistics
  async getStatistics() {
    return this._fetch('/statistics');
  }
}

module.exports = Harbor; 