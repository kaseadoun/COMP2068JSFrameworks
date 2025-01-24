// Once the document is loaded, run the functions
document.addEventListener('DOMContentLoaded', () => {
    fetchIncomeData();
    fetchExpenseData();
    fetchExpenseDataByCategory() 
});

function randomColourGenerator() {
    const characters = "0123456789ABCDEF";
    let colour = "#";
    for (let i = 0; i < 6; i++) {
        colour += characters[Math.floor(Math.random() * 16)];
    }
    return colour;
}

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

async function fetchExpenseDataByCategory() {
    try {
        const response = await fetch('/overview/expense_category_data');
        const data = await response.json();

        let ctx = document.getElementById('expenseCategoryChart').getContext('2d');

        console.log(data);

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.datasets[0].data,
                    backgroundColor: data.labels.map(() => randomColourGenerator()),
                }],
                hoverOffset: 4
            }
        })
    } catch (err) {
        console.error(err);
    }
}