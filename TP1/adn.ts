import * as readline from "readline-sync";
//----------------------------------- estAdn -----------------------------------//
function estAdn(sequence: string): boolean {
  const validBases = ["A", "C", "G", "T"];
  for (const base of sequence) {
    if (!validBases.includes(base)) {
      return false;
    }
  }
  return true;
}

//----------------------------------- transcrit -----------------------------------//
function transcrit(sequence: string): string {
  return sequence.replace(/T/g, "U");
}

//----------------------------------- baseComplementaire -----------------------------------//
function baseComplementaire(base: string): string {
  switch (base) {
    case "A":
      return "T";
    case "C":
      return "G";
    case "G":
      return "C";
    case "T":
      return "A";
    default:
      return "";
  }
}

//----------------------------------- sequenceComplementaireInversee -----------------------------------//
function sequenceComplementaireInversee(sequence: string): string {
  let complement = "";
  for (const base of sequence) {
    complement = baseComplementaire(base) + complement;
  }
  return complement;
}

//----------------------------------- nombreOccurrencesCodon -----------------------------------//
function nombreOccurrencesCodon(codon: string, sequence: string): number {
  let count = 0;
  for (let i = 0; i < sequence.length - 2; i += 3) {
    if (sequence.substring(i, i + 3) === codon) {
      count++;
    }
  }
  return count;
}

let sequenceAdn = readline.question("Entrez une séquence ADN : ");
if (estAdn(sequenceAdn)) {
  let codon = readline.question("Entrez un codon : ");
  console.log(`Séquence complémentaire-inversée : ${sequenceComplementaireInversee(sequenceAdn)}`);
  console.log(`Séquence ARN : ${transcrit(sequenceAdn)}`);
  console.log(
    `Le codon ${codon} apparaît ${nombreOccurrencesCodon(
      codon,
      transcrit(sequenceAdn)
    )} fois dans la séquence ARN`
  );
} else {
  console.log("Séquence ADN erronée !!!");
}
