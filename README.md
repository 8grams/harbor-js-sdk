# Harbor JavaScript SDK

A JavaScript SDK for interacting with the Harbor API.

## Installation

```bash
npm install harbor-js-sdk
```

## Usage

```javascript
import Harbor from 'harbor-js-sdk';

// Create a new Harbor instance
const harbor = new Harbor({
  baseUrl: 'https://your-harbor-instance.com',
  username: 'your-username',
  password: 'your-password'
});

// List projects
const projects = await harbor.projects.listProjects();

// Create a new project
const newProject = await harbor.projects.createProject({
  project_name: 'my-project',
  public: false
});

// List repositories
const repositories = await harbor.repositories.listRepositories('my-project');

// List artifacts
const artifacts = await harbor.artifacts.listArtifacts('my-project', 'my-repository');
```

## API Documentation

The SDK provides methods for interacting with various Harbor API endpoints:

- Projects
- Repositories
- Artifacts
- Tags
- Labels
- Users
- User Groups
- Webhooks
- Scanners
- System
- Security
- And more...

For detailed API documentation, please refer to the [Harbor API documentation](https://goharbor.io/docs/latest/api/).

## License

MIT 