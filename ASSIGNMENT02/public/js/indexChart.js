document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch('/');
        const data = await response.json();
        
        const months = Object.keys(data);
        const incomeData = months.map(month => data[month][0]);
        const expenseData = months.map(month => data[month][1]);

        renderChart('sampleIncomeChart', 'Income', months, incomeData);
        renderChart('sampleExpenseChart', 'Expenses', months, expenseData);
    } catch (err) {
        console.error('Error fetching data:', error);
    }
}

function renderChart(chartId, label, xAxisLabel, data) {
    const ctx = document.getElementById(chartId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
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