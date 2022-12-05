class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }
    execute() {
        for (let utxo of this.inputUTXOs) {
            if (utxo.spent) {
                throw "UTXO already spent";
            }
        }
    }
}

module.exports = Transaction;
