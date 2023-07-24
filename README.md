
# env-tmp
`env-tmp` is a Node.js package that provides functionality to backup and restore environment variables in a temporary `.env` file. It helps you manage environment variables during configuration changes and allows you to revert back to the original configuration.
## Installation
Install the package using npm:
```bash
npm  install  env-tmp
```
## Usage
```javascript
import { setConfig, revertConfig } from 'env-tmp';
// Backup the existing '.env' file and set new|updated environment variables
setConfig({
  ENV_VAR_1: 'value1',
  ENV_VAR_2: 'value2',
  // Add more environment variables as needed
});
// Later, when you want to revert to the original configuration
revertConfig();
```
### `setConfig(obj)`
This function backs up the current .env file, generates a new one from the provided object, and saves it to the original .env file path.
#### Parameters:
`obj`: An object containing the environment variables and their values to be set. For example:
```javascript
{
  ENV_VAR_1: 'value1',
  ENV_VAR_2: 'value2',
  // Add more environment variables as needed
}
```
### `revertConfig()`
This function restores the original .env file from the temporary backup and deletes the temporary directory.

### `executeWithTempDotenv()`
You can use executeWithTempDotenv function to execute commands with different environment configurations. Here are some examples:
```javascript
import { executeWithTempDotenv } from 'env-tmp';
```
```javascript
// Example 1: Using 'npm run dev'
const devConfig = {
  NODE_ENV: 'development',
  PORT: 3000,
  // Add more environment variables specific to 'npm run dev'
};
const devCommand = { command: 'npm', args: ['run', 'dev'] };
executeWithTempDotenv(devConfig, devCommand);
```
```javascript
// Example 2: Using 'npm test'
const testConfig = {
  NODE_ENV: 'test',
  // Add more environment variables specific to 'npm test'
};
const testCommand = { command: 'npm', args: ['test'] };
executeWithTempDotenv(testConfig, testCommand);
```
```javascript
// Example 3: Using 'node' with a specific file 
executeWithTempDotenv({ LOGGING_QUERIES: false }, {
  command: 'node',
  args: ['./src/app.js']
})
```
## Note:
- The .env file should exist in the root of your project.
- The package uses a temporary directory named ./tmp for backups. Please ensure that your project has write permissions to this directory.
### Warning:
The package will override your existing .env file during the backup and restoration process. Make sure to create a backup of your .env file manually if needed.
## License
This project is licensed under the MIT License - see the LICENSE file for details.