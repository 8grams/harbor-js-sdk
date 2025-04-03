import FetchUtil from '../utils/fetch';

/**
 * Class for managing Harbor artifacts
 */
class Artifacts {
  /**
   * Create an Artifacts instance
   * @param {FetchUtil} fetchUtil - The fetch utility instance
   */
  constructor(fetchUtil) {
    this.fetchUtil = fetchUtil;
  }

  /**
   * List artifacts under the specific project and repository. Except the basic properties, the other supported queries in "q" includes "tags=*" to list only tagged artifacts, "tags=nil" to list only untagged artifacts, "tags=~v" to list artifacts whose tag fuzzy matches "v", "tags=v" to list artifact whose tag exactly matches "v", "labels=(id1, id2)" to list artifacts that both labels with id1 and id2 are added to
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {Object} options - Query options
   * @param {string} [options.query] - Search query. Supported queries: "tags=*" for tagged artifacts, "tags=nil" for untagged artifacts, "tags=~v" for fuzzy tag match, "tags=v" for exact tag match, "labels=(id1, id2)" for artifacts with specific labels
   * @param {string} [options.sort] - Sort field
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @param {boolean} [options.withTag=false] - Whether to include tag
   * @param {boolean} [options.withLabel=false] - Whether to include labels
   * @param {boolean} [options.withScanOverview=false] - Whether to include scan overview
   * @param {boolean} [options.withSbomOverview=false] - Whether to include SBOM overview
   * @param {boolean} [options.withImmutableStatus=false] - Whether to include immutable status
   * @param {boolean} [options.withAccessory=false] - Whether to include accessories
   * @returns {Promise<Object>}
   */
  async listArtifacts(projectName, repositoryName, { 
    query, 
    sort, 
    page = 1, 
    pageSize = 10,
    withTag = false,
    withLabel = false,
    withScanOverview = false,
    withSbomOverview = false,
    withImmutableStatus = false,
    withAccessory = false
  } = {}) {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('page_size', pageSize);
    if (withTag) params.append('with_tag', withTag);
    if (withLabel) params.append('with_label', withLabel);
    if (withScanOverview) params.append('with_scan_overview', withScanOverview);
    if (withSbomOverview) params.append('with_sbom_overview', withSbomOverview);
    if (withImmutableStatus) params.append('with_immutable_status', withImmutableStatus);
    if (withAccessory) params.append('with_accessory', withAccessory);

    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get the artifact specified by the reference under the project and repository. The reference can be digest or tag.
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact (digest or tag)
   * @param {Object} options - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.pageSize=10] - Number of items per page
   * @param {boolean} [options.withTag=false] - Whether to include tag
   * @param {boolean} [options.withLabel=false] - Whether to include labels
   * @param {boolean} [options.withScanOverview=false] - Whether to include scan overview
   * @param {boolean} [options.withAccessory=false] - Whether to include accessories
   * @param {boolean} [options.withSignature=false] - Whether to include signature
   * @param {boolean} [options.withImmutableStatus=false] - Whether to include immutable status
   * @returns {Promise<Object>} Artifact details
   */
  async getArtifact(projectName, repositoryName, reference, { 
    page = 1,
    pageSize = 10,
    withTag = false, 
    withLabel = false, 
    withScanOverview = false,
    withAccessory = false,
    withSignature = false,
    withImmutableStatus = false
  } = {}) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('page_size', pageSize);
    if (withTag) params.append('with_tag', withTag);
    if (withLabel) params.append('with_label', withLabel);
    if (withScanOverview) params.append('with_scan_overview', withScanOverview);
    if (withAccessory) params.append('with_accessory', withAccessory);
    if (withSignature) params.append('with_signature', withSignature);
    if (withImmutableStatus) params.append('with_immutable_status', withImmutableStatus);

    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}?${params.toString()}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Delete the artifact specified by the reference under the project and repository. The reference can be digest or tag
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact (digest or tag)
   * @returns {Promise<void>}
   */
  async deleteArtifact(projectName, repositoryName, reference) {
    await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}`, {
      method: 'DELETE',
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
  }

  /**
   * Get the vulnerabilities addition of the artifact specified by the reference under the project and repository.
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact (digest or tag)
   * @returns {Promise<Object>} Artifact vulnerability details
   */
  async getArtifactVulnerability(projectName, repositoryName, reference) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/additions/vulnerabilities`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }

  /**
   * Get the addition of the artifact specified by the reference under the project and repository.
   * @param {string} projectName - Name of the project
   * @param {string} repositoryName - Name of the repository
   * @param {string} reference - Reference of the artifact (digest or tag)
   * @param {string} addition - Type of addition (build_history, values.yaml, etc.)
   * @returns {Promise<Object>} Artifact addition details
   */
  async getArtifactAddition(projectName, repositoryName, reference, addition) {
    const response = await this.fetchUtil._fetch(`/projects/${encodeURIComponent(projectName)}/repositories/${encodeURIComponent(repositoryName)}/artifacts/${encodeURIComponent(reference)}/additions/${addition}`, {
      headers: {
        'X-Request-Id': this.fetchUtil.generateRequestId()
      }
    });
    return response;
  }
}

export default Artifacts; 