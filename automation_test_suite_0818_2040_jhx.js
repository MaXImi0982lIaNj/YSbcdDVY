// 代码生成时间: 2025-08-18 20:40:46
 * Features:
 * - Code structure is clear and easy to understand.
 * - It includes proper error handling.
 * - Necessary comments and documentation are added.
 * - Follows best practices in JavaScript.
 * - Ensures code maintainability and extensibility.
 */

// Import necessary modules
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Define a function to run tests
function runTests() {
  console.log('Starting the automation test suite...');

  // Define the path to the test files
  const testFilesPath = path.join(__dirname, 'tests');

  // Read all test files in the directory
  fs.readdir(testFilesPath, (err, files) => {
    if (err) {
      console.error('Error reading test files:', err);
      return;
    }

    // Filter out non-JavaScript files
    const testScripts = files.filter(file => file.endsWith('.js'));

    // Run each test script
    testScripts.forEach(testScript => {
      const testScriptPath = path.join(testFilesPath, testScript);
      console.log(`Running test script: ${testScript}...`);

      // Execute the test script using node
      exec(`node ${testScriptPath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running test script ${testScript}:`, error);
        } else if (stderr) {
          console.error(`Errors in test script ${testScript}:`, stderr);
        } else {
          console.log(`Test script ${testScript} executed successfully:`, stdout);
        }
      });
    });
  });
}

// Call the runTests function to start the automation test suite
runTests();