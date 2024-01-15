/*Função para realizar o logout do usuario */
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../html/login.html";
    }).catch(() => {
        alert("Erro ao fazer logout");
    });
}

//Conferindo User logado
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        user.getIdToken().then(token => console.log(token));
        findTransactions(user);
    }
});


//Exibindo os dados do firestore
function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions');
    transactions.forEach(transactions => {
        const li = document.createElement('li');
        orderedList.appendChild(li);
        li.id = transactions.uid;
        li.addEventListener('click', () => {
            hideLoading();
            window.location.href = "../html/index.html?uid=" + transactions.uid;
        })



        const name = document.createElement('p');
        name.innerHTML = transactions.name;
        li.appendChild(name);

        const lastname = document.createElement('p');
        lastname.innerHTML = transactions.lastname;
        li.appendChild(lastname);

        const part = document.createElement('p');
        part.innerHTML = transactions.part;
        li.appendChild(part);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Remover";
        deleteButton.classList.add('outline', 'delete');
        deleteButton.addEventListener('click', event => {
            event.stopPropagation();
            askRemoveTransaction(transactions);
        })
        li.appendChild(deleteButton);

    });

}
//Confirmação de remoção dos dados
function askRemoveTransaction(transaction) {
    const shouldRemove = confirm('Deseja realmente remover os dados?');
    if (shouldRemove) {
        removeTransaction(transaction);
    }
}

//Remoção dos dados
function removeTransaction(transaction) {
    showLoading();
    transactionService.remove(transaction)
        .then(() => {
            hideLoading();
            document.getElementById(transaction.uid).remove();
        }).catch(() => {
            hideLoading();
            alert("Erro ao fazer logout");
        });
}