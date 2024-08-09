document.addEventListener('DOMContentLoaded', () => {
    fetchIncomeAndExpenseData()
});

async function fetchIncomeAndExpenseData() {
  try {
    const response = await fetch("/index/sample_data");
    const data = await response.json();

    let incomeData = [];
    let expenseData = []

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

function renderChart(chartId, label, xAxisLabels, data) {
    let ctx = document.getElementById(chartId).getContext("2d");
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