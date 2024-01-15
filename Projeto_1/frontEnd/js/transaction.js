firebase.auth().onAuthStateChanged(user => {
    if (user) {
        if (!isNewTransaction()) {
            const uid = getTransactionUid();
            findTransactionByUid(uid);
        }
    }
})

function getTransactionUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}


//Conferindo ID para atualizar dados
function isNewTransaction() {
    return getTransactionUid() ? false : true;
}

function findTransactionByUid(uid) {
    showLoading();

    transactionService.findByUid(uid)
        .then(transaction => {
            hideLoading();
            if (transaction) {
                fillTransactionScreen(transaction);
                toggleSaveButtonDisabled();
            } else {
                alert("Documento não encontrado");
                window.location.href = "../html/index.html";
            }
        })

    .catch(() => {
        hideLoading();
        window.location.href = "../html/index.html";
        alert('Erro ao recuperar documento');

    })
}

function fillTransactionScreen(transaction) {
    form.last().value = transaction.lastname;
    form.name().value = transaction.name
    form.part().value = transaction.part;
}


// Conferindo dados do firestore
function findTransactions(user) {
    showLoading();
    transactionService.findByUser(user)
        .then(transactions => {
            hideLoading();
            addTransactionsToScreen(transactions);
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Erro ao recuperar dados');
        })
}

//Salvar transações
function saveTransaction() {
    showLoading();
    const transaction = createTransaction();
    if (isNewTransaction()) {
        save(transaction);
    } else {
        update(transaction);
    }

}


function save(transaction) {
    transactionService.save(transaction)
        .then(() => {
            hideLoading();
            window.location.href = "../html/index.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao salvar dados');
        })

}
//Atualizar a transação dos dados
function update(transaction) {
    showLoading();
    transactionService.save(transaction)
        .then(() => {
            hideLoading();
            window.location.href = "../html/index.html";
        })
        .catch(() => {
            hideLoading();
            alert('Erro ao atualizar dados');
        });

}


//Criação de transação
function createTransaction() {
    return {
        name: form.name().value,
        lastname: form.last().value,
        part: parseFloat(form.part().value),
        user: {
            uid: firebase.auth().currentUser.uid
        }
    };
}


//Obrigatoriedades dos campos do form
function onChangeName() {
    const name = form.name().value;
    form.nameRequiredError().style.display = !name ? "block" : "none";
    toggleSaveButtonDisabled();
}


function onChangeLast() {
    const last = form.last().value;
    form.lastRequiredError().style.display = !last ? "block" : "none";
    toggleSaveButtonDisabled();
}

function onChangePart() {
    const part = form.part().value;
    form.partRequiredError().style.display = !part ? "block" : "none";
    form.partIncorretRequiredError().style.display = part <= 0 ? "block" : "none";
    toggleSaveButtonDisabled();
}

//Intertravamento do botão
function toggleSaveButtonDisabled() {
    form.saveButton().disabled = !isFormValid();
}

//Conferindo informações para habilitar button
function isFormValid() {
    const name = form.name().value;
    if (!name) {
        return false;
    }
    const last = form.last().value;
    if (!last) {
        return false;
    }
    const part = form.part().value;
    if (!part || part <= 0) {
        return false;
    }
    return true;
}

const form = {
    name: () => document.getElementById('name'),
    nameRequiredError: () => document.getElementById('name-required-error'),
    last: () => document.getElementById('last'),
    lastRequiredError: () => document.getElementById('last-required-error'),
    part: () => document.getElementById('part'),
    partRequiredError: () => document.getElementById('part-required-error'),
    partIncorretRequiredError: () => document.getElementById('part-incorret-required-error'),
    saveButton: () => document.getElementById('save-button')
}