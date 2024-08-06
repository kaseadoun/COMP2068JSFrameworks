document.addEventListener('DOMContentLoaded', () => {
    fetchIncomeData();
    fetchExpenseData();
});

async function fetchIncomeData() {
    try {
        const response = await fetch('/overview/income_data');
        const data = await response.json();
        let ctx = document.getElementById('incomeChart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Income',
                    data: data.datasets[0].data,
                    backgroundColor: 'rgba(192, 192, 192, 1)',
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

async function fetchExpenseData() {
    try {
        const response = await fetch('/overview/expense_data');
        const data = await response.json();
        let ctx = document.getElementById('expenseChart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Expense',
                    data: data.datasets[0].data,
                    backgroundColor: 'rgba(192, 192, 192, 1)',
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