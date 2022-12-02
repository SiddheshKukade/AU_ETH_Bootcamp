// NOTE: This code is only for Brainstroming and It is not tested or executed yet. I may be completely wrong here.
class Tx {
    // lets set the tx data
    constructor(to, amount) {
        this.to = to;
        this.amount = amount;
    }
    // Let's create locking script also called scriptSig
    sign(privateKey, inputUtxos) {
        return privateKey + inputUtxos; // example signing
    }
    scriptSig() {
        this.privateKey = "1FNv3tXLkejPBYxDHDaZz6ENNz3zn3G4GM"; //random zibberish
        const sender = "1FNv3tXLkejPBYxDHDaZz6ENNz3zn3G4GM"; //random zibberish
        const recepient = this.to;
        const signature = this.sign(this.privateKey, inputUtxos);
        const conditionToSpendUtxos = "wait for 30 days";
        return {
            sign: signature,
            sender: sender,
            conditionToSpendUtxos: conditionToSpendUtxos,
            recepient,
            inputUtxos, // some utxos
            amount: this.amount,
        };
    }
    // Let's create unlocking script also called scriptPubKey
    scriptPubKey(scriptSig) {
        const {
            sign,
            sender,
            conditionToSpendUtxos,
            recepient,
            inputUtxos,
            amount,
        } = scriptSig;
        if (conditionToSpendUtxos === true) {
            return "GO AHEAD AND SPEND THE UTXOS";
        }
    }
}
/*********************
 *  WHAT IS SCRIPT *
 *********************/
/***********************************************************************************************************************
 * A SCRIPT IN THE BITCOIN TRANSACTION UNLOCKS THE INPUT UTXOS BY VERIFYING THEIR DIGITAL SIGNATURES. A LOCKING SCRIPT SETS THE CONDITIONS FOR HOW THE UTXO OUTPUTS CAN BE SPENT; FOR EXAMPLE, POST DATING THE PAYMENT FOR 30 DAYS *
 ***********************************************************************************************************************/

/***********************************************************************************************************************
 *                         WHAT IS TX INPUT?                                                 *                         *
 *                          => TX INPUT ARE THE UTXOS THAT ARE USED TO FUND THE TRANSACTION.                           *
 *                                                 WHAT IS TX OUTPUT?                                                  *
 * => TX OUTPUT ARE THE UTXOS THAT ARE CREATED BY THE TRANSACTION.IN SIMPLE TERM OUTPUT ARE THE AMOUNT THAT ARE SENT TO THE RECEIVER *
 ***********************************************************************************************************************/
