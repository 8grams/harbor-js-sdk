import FetchUtil from '../utils/fetch';
import Projects from '../api/projects';
import Repositories from '../api/repositories';
import Artifacts from '../api/artifacts';
import Tags from '../api/tags';
import Labels from '../api/labels';
import Users from '../api/users';
import UserGroups from '../api/userGroups';
import Webhooks from '../api/webhooks';
import Scanners from '../api/scanners';
import System from '../api/system';
import Security from '../api/security';
import ImmutableTagRules from '../api/immutableTagRules';
import Configuration from '../api/configuration';
import AuditLogs from '../api/auditLogs';
import GarbageCollection from '../api/garbageCollection';
import Ldap from '../api/ldap';
import JobService from '../api/jobService';
import P2pPreheat from '../api/p2pPreheat';
import PurgeAudit from '../api/purgeAudit';
import Quotas from '../api/quotas';
import Registries from '../api/registries';
import Retention from '../api/retention';
import Scans from '../api/scans';
import Robots from '../api/robots';

class Harbor {
  constructor(config) {
    this.fetchUtil = new FetchUtil(config);
    this.projects = new Projects(this.fetchUtil);
    this.repositories = new Repositories(this.fetchUtil);
    this.artifacts = new Artifacts(this.fetchUtil);
    this.tags = new Tags(this.fetchUtil);
    this.labels = new Labels(this.fetchUtil);
    this.users = new Users(this.fetchUtil);
    this.userGroups = new UserGroups(this.fetchUtil);
    this.webhooks = new Webhooks(this.fetchUtil);
    this.scanners = new Scanners(this.fetchUtil);
    this.system = new System(this.fetchUtil);
    this.security = new Security(this.fetchUtil);
    this.immutableTagRules = new ImmutableTagRules(this.fetchUtil);
    this.configuration = new Configuration(this.fetchUtil);
    this.auditLogs = new AuditLogs(this.fetchUtil);
    this.garbageCollection = new GarbageCollection(this.fetchUtil);
    this.ldap = new Ldap(this.fetchUtil);
    this.jobService = new JobService(this.fetchUtil);
    this.p2pPreheat = new P2pPreheat(this.fetchUtil);
    this.purgeAudit = new PurgeAudit(this.fetchUtil);
    this.quotas = new Quotas(this.fetchUtil);
    this.registries = new Registries(this.fetchUtil);
    this.retention = new Retention(this.fetchUtil);
    this.scans = new Scans(this.fetchUtil);
    this.robots = new Robots(this.fetchUtil);
  }
}

export default Harbor; 