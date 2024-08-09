// Once document is loaded, it asynchronously fetches the data
document.addEventListener('DOMContentLoaded', () => {
    fetchIncomeAndExpenseData()
});

async function fetchIncomeAndExpenseData() {
  try {
    const response = await fetch("/index/sample_data");
    const data = await response.json();

    let incomeData = [];
    let expenseData = []
    // Collects the specific data and pushes it to its respective array for use
    for (let i = 0; i < 12; i++) {
        incomeData.push(data.datasets[0].data[i][0]);
        expenseData.push(data.datasets[0].data[i][1]);
    }
    
    renderChart("sampleIncomeChart", "Income", data.labels, incomeData);
    renderChart("sampleExpenseChart", "Expenses", data.labels, expenseData);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

// Render chart function
function renderChart(chartId, label, xAxisLabels, data) {
    // Gets element by id and gets 2d rendering context
    let ctx = document.getElementById(chartId).getContext("2d");
    // New chart object
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: xAxisLabels,
            datasets: [{
                label: label,
                data: data,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}