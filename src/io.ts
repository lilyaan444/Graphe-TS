import * as readline from "readline-sync";

let name = readline.question("Quel est ton nom ? ");
console.log(`Bonjour, ${name} !`);

let age = readline.question("Quel est ton age ? ");
console.log(`Tu as ${age} ans.`);
