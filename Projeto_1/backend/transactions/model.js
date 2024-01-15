import { TransactionNotFoundError } from "./errors/transaction-not-found.error.js";
import { TransactionUidNotInformedError } from "./errors/transaction-uid-not-informed.error.js";
import { UserDoesntOwnTransactionError } from "./errors/user-doesnt-own-transaction.error.js";
import { UserNotInformedError } from "./errors/user-not-informed.error.js";
import { TransactionRepository } from "./repository.js";

export class Transaction {

    name;
	lastname;
	part;
    uid;
    user;

    #repository;

    constructor(transactionRepository) {
        this.#repository = transactionRepository || new TransactionRepository();
    }

    findByUser() {
        if (!this.user?.uid) {
            return Promise.reject(new UserNotInformedError());
        }

        return this.#repository.findByUserUid(this.user.uid);
    }

    findByUid() {
        if (!this.uid) {
            return Promise.reject(new TransactionUidNotInformedError());
        }

        return this.#repository.findByUid(this.uid).then(transactionDb => {
            if (!transactionDb) {
                return Promise.reject(new TransactionNotFoundError());
            }
            if (this.user.uid != transactionDb.user.uid) {
                return Promise.reject(new UserDoesntOwnTransactionError());
            }
            this.name = transactionDb.name;
            this.lastname = transactionDb.lastname;
            this.part = transactionDb.part;
            this.user = transactionDb.user;
        })
    }

    create(params) {
        this.name = params.name;
        this.lastname = params.lastname;
        this.part = params.part;
        this.user = params.user;

        return this.#repository.save(this).then(response => {
            this.uid = response.uid;
          })          
    }

    update(params) {
        return this.findByUid().then(() => {
            this.name = params.name;
            this.lastname = params.lastname;
            this.part = params.part;
    
            return this.#repository.update(this);
        })
    }

    delete() {
        return this.findByUid().then(() => {
            return this.#repository.delete(this);
        })
    }

}