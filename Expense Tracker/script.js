let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const transactionForm = document.getElementById("transactionForm");
const transactionTable = document.getElementById("transactionTable");
const totalIncome = document.getElementById("totalIncome");
const totalExpenses = document.getElementById("totalExpenses");
const balance = document.getElementById("balance");
const themeToggle = document.getElementById("themeToggle");

// Render all transactions
function renderTransactions() {
  transactionTable.innerHTML = "";
  let income = 0, expenses = 0;

  transactions.forEach((t, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${t.name}</td>
      <td class="${t.type === "income" ? "income" : "expense"}">₹${t.amount}</td>
      <td>${t.type}</td>
      <td>${t.date}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteTransaction(${index})"><i class="bi bi-trash"></i></button></td>
    `;
    transactionTable.appendChild(row);

    if (t.type === "income") income += t.amount;
    else expenses += t.amount;
  });

  totalIncome.innerText = `₹${income}`;
  totalExpenses.innerText = `₹${expenses}`;
  balance.innerText = `₹${income - expenses}`;
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add new transaction
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;

  transactions.push({ name, amount, type, date });
  renderTransactions();
  transactionForm.reset();
});

// Delete transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
}

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌙" : "🌞";
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "🌙";
}

// Init
renderTransactions();
