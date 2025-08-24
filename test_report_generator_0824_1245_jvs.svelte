// 代码生成时间: 2025-08-24 12:45:12
        .btn { padding: 10px 20px; background-color: #007bff; color: white; border: none; cursor: pointer; }
        .btn:hover { background-color: #0056b3; }
    </style>
</head>
<body>
    <script>
        // Define the Svelte component here
        const TestReportGenerator = class extends svelte.component {
            oncreate() {
                this.testData = {
                    tests: [],
                    summary: {}
                };
            }

            addTest() {
                const testName = this.get("testName").value;
                const testResult = this.get("testResult").checked;

                if (testName === "") {
                    alert("Test name is required.");
                    return;
                }

                this.testData.tests.push({ name: testName, result: testResult });
                this.testData.summary[testName] = this.testData.summary[testName] || { passed: 0, failed: 0 };
                this.testData.summary[testName][testResult ? "passed" : "failed"] += 1;

                this.set({ testData: this.testData });
                this.get("testName").value = "";
                this.get("testResult").checked = false;
            }

            generateReport() {
                const report = `Test Report:

`;
                this.testData.tests.forEach(test => {
                    report += `Test Name: ${test.name}, Result: ${test.result ? "Passed" : "Failed"}
`;
                });

                report += `
Summary:
`;
                Object.keys(this.testData.summary).forEach(testName => {
                    const summary = this.testData.summary[testName];
                    report += `Test Name: ${testName}, Passed: ${summary.passed}, Failed: ${summary.failed}
`;
                });

                alert(report);
            }
        };
    </script>

    <div class="container">
        <h1>Test Report Generator</h1>
        <form on:submit|preventDefault={addTest}>
            <div class="form-group">
                <label for="testName">Test Name:</label>
                <input id="testName" bind:value={testData.tests[testData.tests.length - 1].name} type="text" placeholder="Enter test name" required>
            </div>
            <div class="form-group">
                <label for="testResult">Test Result:</label>
                <input id="testResult" bind:checked={testData.tests[testData.tests.length - 1].result} type="checkbox" checked>
            </div>
            <button type="submit" class="btn">Add Test</button>
        </form>
        <button on:click={generateReport} class="btn">Generate Report</button>
    </div>

    <script>
        // Mount the Svelte component
        new TestReportGenerator({ target: document.body });
    </script>
</body>
</html>
