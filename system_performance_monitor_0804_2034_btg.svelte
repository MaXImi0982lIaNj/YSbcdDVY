// 代码生成时间: 2025-08-04 20:34:40
        // SystemPerformanceMonitor.svelte component
        svelte.compile("#svelte", {

            // Component structure

            "onrender": () => {

                // Initialize performance monitoring

                startMonitoring();

            },

            "ondestroy": () => {

                // Clean up and stop monitoring if needed

                stopMonitoring();

            },

            "template": `<div>

                <h1>System Performance Monitor</h1>

                <div id="cpuUsage">CPU Usage: {cpuUsage}%</div>

                <div id="memoryUsage">Memory Usage: {memoryUsage}%</div>

                <div id="diskUsage">Disk Usage: {diskUsage}%</div>

            </div>`,

            "script": `

                // Component logic

                export let cpuUsage = 0;

                export let memoryUsage = 0;

                export let diskUsage = 0;

                
                // Function to start monitoring system performance

                async function startMonitoring() {

                    try {

                        // Fetch system performance data

                        const performanceData = await fetchSystemPerformanceData();

                        // Update component data

                        updatePerformanceData(performanceData);


                        // Set interval to continuously monitor performance

                        setInterval(() => {

                            const updatedData = await fetchSystemPerformanceData();

                            updatePerformanceData(updatedData);

                        }, 1000); // Poll every second

                    } catch (error) {

                        console.error("Error fetching system performance data: ", error);
                    }
                }


                // Function to stop monitoring system performance

                function stopMonitoring() {

                    // Clear interval if it exists

                    clearInterval(this.intervalId);
                }


                // Function to fetch system performance data

                async function fetchSystemPerformanceData() {

                    // Placeholder for actual data fetching implementation

                    // For demonstration, returning mock data

                    return {

                        cpuUsage: Math.random() * 100,

                        memoryUsage: Math.random() * 100,

                        diskUsage: Math.random() * 100
                    };
                }


                // Function to update component data

                function updatePerformanceData(data) {

                    this.cpuUsage = data.cpuUsage;

                    this.memoryUsage = data.memoryUsage;

                    this.diskUsage = data.diskUsage;
                }

            `

        });
    </script>

    <div id="svelte">Component will be mounted here</div>
</body>
</html>