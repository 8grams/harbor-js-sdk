import Harbor from '../index';

describe('Harbor SDK', () => {
  let harbor;

  beforeEach(() => {
    harbor = new Harbor({
      baseUrl: 'https://your-harbor-instance.com',
      username: 'test-user',
      password: 'test-password'
    });
  });

  test('should initialize with all API modules', () => {
    expect(harbor.projects).toBeDefined();
    expect(harbor.repositories).toBeDefined();
    expect(harbor.artifacts).toBeDefined();
    expect(harbor.tags).toBeDefined();
    expect(harbor.labels).toBeDefined();
    expect(harbor.users).toBeDefined();
    expect(harbor.userGroups).toBeDefined();
    expect(harbor.webhooks).toBeDefined();
    expect(harbor.scanners).toBeDefined();
    expect(harbor.system).toBeDefined();
    expect(harbor.security).toBeDefined();
    expect(harbor.immutableTagRules).toBeDefined();
    expect(harbor.configurations).toBeDefined();
    expect(harbor.auditLogs).toBeDefined();
    expect(harbor.garbageCollection).toBeDefined();
    expect(harbor.ldap).toBeDefined();
    expect(harbor.jobService).toBeDefined();
    expect(harbor.p2pPreheat).toBeDefined();
    expect(harbor.purgeAudit).toBeDefined();
    expect(harbor.quotas).toBeDefined();
    expect(harbor.registries).toBeDefined();
    expect(harbor.retention).toBeDefined();
    expect(harbor.scans).toBeDefined();
    expect(harbor.robots).toBeDefined();
  });

  test('should have fetchUtil instance', () => {
    expect(harbor.fetchUtil).toBeDefined();
  });
}); 