// Once the document is loaded, run the functions
document.addEventListener('DOMContentLoaded', () => {
    fetchIncomeData();
    fetchExpenseData();
});

// Async function to fetch data from the income collection to create a bar chart for income
async function fetchIncomeData() {
    try {
        const response = await fetch('/overview/income_data');
        const data = await response.json();
        // Gets element by id and gets 2d rendering context
        let ctx = document.getElementById('incomeChart').getContext('2d');
        // New chart object
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Income',
                    data: data.datasets[0].data,
                    backgroundColor: 'rgba(0, 192, 0, 1)',
                    borderColor: 'rgba(192, 192, 192, 1)',
                    borderWidth: 1
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
    } catch (err) {
        console.error(err);
    }
}

// Async function to fetch data from the expense collection to create a bar chart for expense
async function fetchExpenseData() {
    try {
        const response = await fetch('/overview/expense_data');
        const data = await response.json();
        // Gets element by id and gets 2d rendering context
        let ctx = document.getElementById('expenseChart').getContext('2d');
        // New chart object
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Expense',
                    data: data.datasets[0].data,
                    backgroundColor: 'rgba(192, 0, 0, 1)',
                    borderColor: 'rgba(192, 192, 192, 1)',
                    borderWidth: 1
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
    } catch (err) {
        console.error(err);
    }
}