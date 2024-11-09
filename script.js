// Get elements
const budgetInput = document.getElementById('monthly-budget');
const setBudgetButton = document.getElementById('set-budget');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const addExpenseButton = document.getElementById('add-expense');
const expenseList = document.getElementById('expense-list');
const budgetLeftDisplay = document.getElementById('budget-left');
const spentDisplay = document.getElementById('spent');
const errorMessage = document.getElementById('error-message');

// Load initial data from localStorage
let budget = localStorage.getItem('budget') || 0;
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

document.addEventListener('DOMContentLoaded', function() {
    // Update the display
    updateDisplay();
});

// Set budget
setBudgetButton.addEventListener('click', function() {
    const budgetValue = parseFloat(budgetInput.value);
    if (isNaN(budgetValue) || budgetValue <= 0) {
        showError("Please enter a valid budget.");
        return;
    }
    budget = budgetValue;
    localStorage.setItem('budget', budget);
    updateDisplay();
});

// Add expense
addExpenseButton.addEventListener('click', function() {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategoryInput.value;

    if (!name || isNaN(amount) || amount <= 0) {
        showError("Please provide a valid expense name and amount.");
        return;
    }

    const expense = { name, amount, category, date: new Date().toLocaleString() };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Clear inputs
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    
    updateDisplay();
});

// Update the display
function updateDisplay() {
    // Show budget left and spent
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const budgetLeft = budget - totalSpent;
    
    budgetLeftDisplay.textContent = budgetLeft.toFixed(2);
    spentDisplay.textContent = totalSpent.toFixed(2);

    // Display expense list
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <strong>${expense.name}</strong> (${expense.category})
            <br>
            $${expense.amount.toFixed(2)} 
            <br>
            ${expense.date}
        `;
        expenseList.appendChild(expenseItem);
    });

    // Check if budget is exceeded
    if (budgetLeft < 0) {
        budgetLeftDisplay.style.color = 'red';
    } else {
        budgetLeftDisplay.style.color = 'green';
    }
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
}

// Add expense to localStorage (already done above)
// Set and get budget from localStorage (already done above)
