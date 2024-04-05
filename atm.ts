#! /usr/bin/env node
import inquirer from 'inquirer'
interface ansType {
    userId: string;
    userPin: number;
    accountType: string;
    transactionType: string;
    selectedAmount?: number;  
    enteredAmount?: number;
}

async function main() {
    const answers: ansType = await inquirer.prompt([
        {
            name: "userId",
            type: "input",
            message: "Kindly enter your Id: "
        },
        {
            name: "userPin",
            type: "number",
            message: "Kindly Enter your PIN: "
        },
        {
            name: "accountType",
            type: "list",
            choices: ["Current", "Saving"],
            message: "Select your account type: "
        },
        {
            name: "transactionType",
            type: "list",
            choices: ["Fast Cash", "Withdraw"],
            message: "Select your transaction"
        },
        {
            name: "selectedAmount",
            type: "list",
            choices: ["1000", "5000", "10000", "20000"],
            message: "Select your amount",
            when: (answers) => answers.transactionType === "Fast Cash"
        },
        {
            name: "enteredAmount",
            type: "number",
            message: "Enter your amount:",
            when: (answers) => answers.transactionType === "Withdraw"
        }
    ]);

    if (answers.userId && answers.userPin) {
        const balance = Math.floor(Math.random() * 50000);
        console.log("Current balance:", balance);

        let enteredAmount;
        if (answers.transactionType === "Fast Cash" && answers.selectedAmount) {
            enteredAmount = parseInt(answers.selectedAmount.toString());
        } else if (answers.transactionType === "Withdraw" && answers.enteredAmount) {
            enteredAmount = answers.enteredAmount;
        } else {
            console.log("Invalid transaction type or amount");
            return;
        }

        if (balance >= enteredAmount) {
            const remaining = balance - enteredAmount;
            console.log("Your remaining balance is ", remaining);
        } else {
            console.log("Insufficient Balance");
        }
    }
}

main();