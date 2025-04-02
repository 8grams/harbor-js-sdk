class Robots {
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  async listRobots({ query, sort, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    return this.fetchUtil._fetch(`/robots?${params.toString()}`);
  }

  async createRobot(robot) {
    return this.fetchUtil._fetch('/robots', {
      method: 'POST',
      body: JSON.stringify(robot)
    });
  }

  async getRobot(robotId) {
    return this.fetchUtil._fetch(`/robots/${robotId}`);
  }

  async updateRobot(robotId, robot) {
    return this.fetchUtil._fetch(`/robots/${robotId}`, {
      method: 'PUT',
      body: JSON.stringify(robot)
    });
  }

  async refreshRobotSecret(robotId, robotSec) {
    return this.fetchUtil._fetch(`/robots/${robotId}`, {
      method: 'PATCH',
      body: JSON.stringify(robotSec)
    });
  }

  async deleteRobot(robotId) {
    return this.fetchUtil._fetch(`/robots/${robotId}`, {
      method: 'DELETE'
    });
  }
}

module.exports = Robots; 