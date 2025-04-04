import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor robot accounts
 */
class Robots {
  /**
   * Create a Robots instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * Get all robot accounts of specified project
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @returns {Promise<Object>} List of robot accounts
   */
  async listRobots({ query, sort, page = 1, pageSize = 10 } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);

    const response = await this.fetchUtil._fetch(`/robots?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Create a robot account
   * @param {Object} robot - Robot account configuration
   * @returns {Promise<Object>} The created robot account
   */
  async createRobot(robot) {
    const response = await this.fetchUtil._fetch('/robots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(robot)
    });
    return response;
  }

  /**
   * This endpoint returns specific robot account information by robot ID.
   * @param {number} robotId - The ID of the robot account
   * @returns {Promise<Object>} The robot account details
   */
  async getRobot(robotId) {
    const response = await this.fetchUtil._fetch(`/robots/${robotId}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Used to disable/enable a specified robot account.
   * @param {number} robotId - The ID of the robot account
   * @param {Object} robot - Updated robot account configuration
   * @returns {Promise<Object>} The updated robot account
   */
  async updateRobot(robotId, robot) {
    const response = await this.fetchUtil._fetch(`/robots/${robotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(robot)
    });
    return response;
  }

  /**
   * Refresh the robot secret
   * @param {number} robotId - The ID of the robot account
   * @param {Object} robotSec - New secret configuration
   * @returns {Promise<Object>} The updated robot account
   */
  async refreshRobotSecret(robotId, robotSec) {
    const response = await this.fetchUtil._fetch(`/robots/${robotId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': this.fetchUtil.generateRequestId()
      },
      body: JSON.stringify(robotSec)
    });
    return response;
  }

  /**
   * This endpoint deletes specific robot account information by robot ID.
   * @param {number} robotId - The ID of the robot account
   * @returns {Promise<void>}
   */
  async deleteRobot(robotId) {
    await this.fetchUtil._fetch(`/robots/${robotId}`, {
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }
}

export default Robots; 