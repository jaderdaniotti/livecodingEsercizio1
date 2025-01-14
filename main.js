//! Creare un'applicazione per gestire una lista di spese personali (es. affitto, alimentari,
//! benzina, regali). Dvorà essere un'app con funzioni per aggiungere, modificare e rimuovere
//! spese, oltre a calcolare il totale delle spese inserite.
//! L'app dovrà permettere di:
//! ● Aggiungere una nuova spesa, creata attraverso una classe, con descrizione
//! (stringa), importo (numero) e categoria (stringa).
//! ● Visualizzare le spese in una tabella.
//! ● Modificare le spese esistenti (re-inserendole nel form).
//! ● Cancellare una spesa.
//! ● Visualizzare il totale delle spese aggiornato dinamicamente.
//! Aggiungere la possibilità di filtrare le spese per categoria mediante una select.
//! ● Creare un button per ordinare le spese per importo (freccia su/giu).

let expenseDescription = document.getElementById("expenseDescription");
let expenseAmount = document.getElementById ("expenseAmount");
let expenseCategory = document.getElementById ("expenseCategory").value;
let submitButton = document.getElementById ("submitButton");
let totalAmount = document.getElementById("totalAmount");
let expenseArray = [];
let tbodyExpense = document.getElementById("tbodyExpense");
tbodyExpense.innerHTML = "";

class Expense {
    constructor(description, amount) {
        this.id = Date.now()
        this.description = description;
        this.amount = Number(amount);
        this.expenseCategory = expenseCategory;
    }
    
}

submitButton.addEventListener("click", (event) =>{
    event.preventDefault();
    //* dichiaro variabili della classe
    let description = expenseDescription.value;
    let amount = expenseAmount.value;
    let category = expenseCategory.value;
    //* creo il nuovo oggetto
    const completeExpense = new Expense(description, amount, category);
    //* ripristino i cambi
    expenseArray.push(completeExpense);
    expenseDescription.value = "";
    expenseAmount.value = "";
    expenseCategory.value = "";
    //* creo un td
    document.createElement("td")
    //* chiamo le funzioni 
    addToList();
    totalPriceOfAmount()  
})

//* funzione per la somma dei prezzi
function totalPriceOfAmount() {
        let total = expenseArray.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total;
}

//* funzione per la creazione e stampa della spesa compilata
function addToList() {
    tbodyExpense.innerHTML = "";
    expenseArray.forEach(expense => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${expense.id}</td>
            <td>${expense.description}</td>
            <td>${expense.amount} €</td>
            <td>${expense.expenseCategory}</td>
            <td><button onclick="editExpense(${expense.id})">Modifica</button></td>
            <td><button onclick="deleteExpense(${expense.id})">Elimina</button></td>
        `;
        tbodyExpense.appendChild(row);
    });
}

function editExpense(id) {
    let expense = expenseArray.find(exp => exp.id === id);
    if (expense) {
        expenseDescription.value = expense.description;
        expenseAmount.value = expense.amount;
        expenseCategory.value = expense.expenseCategory;
        deleteExpense(id);
    }
}

function deleteExpense(id) {
    expenseArray = expenseArray.filter(exp => exp.id !== id);
    addToList();
    updateTotal();
}