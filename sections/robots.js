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
   * List robot accounts with optional filtering and pagination
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

    const response = await this.fetchUtil._fetch(`/robots?${params.toString()}`);
    return response;
  }

  /**
   * Create a new robot account
   * @param {Object} robot - Robot account configuration
   * @returns {Promise<Object>} The created robot account
   */
  async createRobot(robot) {
    const response = await this.fetchUtil._fetch('/robots', {
      method: 'POST',
      body: JSON.stringify(robot)
    });
    return response;
  }

  /**
   * Get a robot account by ID
   * @param {number} robotId - The ID of the robot account
   * @returns {Promise<Object>} The robot account details
   */
  async getRobot(robotId) {
    const response = await this.fetchUtil._fetch(`/robots/${robotId}`);
    return response;
  }

  /**
   * Update a robot account
   * @param {number} robotId - The ID of the robot account
   * @param {Object} robot - Updated robot account configuration
   * @returns {Promise<Object>} The updated robot account
   */
  async updateRobot(robotId, robot) {
    const response = await this.fetchUtil._fetch(`/robots/${robotId}`, {
      method: 'PUT',
      body: JSON.stringify(robot)
    });
    return response;
  }

  /**
   * Refresh a robot account's secret
   * @param {number} robotId - The ID of the robot account
   * @param {Object} robotSec - New secret configuration
   * @returns {Promise<Object>} The updated robot account
   */
  async refreshRobotSecret(robotId, robotSec) {
    const response = await this.fetchUtil._fetch(`/robots/${robotId}`, {
      method: 'PATCH',
      body: JSON.stringify(robotSec)
    });
    return response;
  }

  /**
   * Delete a robot account
   * @param {number} robotId - The ID of the robot account
   * @returns {Promise<void>}
   */
  async deleteRobot(robotId) {
    await this.fetchUtil._fetch(`/robots/${robotId}`, {
      method: 'DELETE'
    });
  }
}

export default Robots; 