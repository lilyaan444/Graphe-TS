import { DAG } from "./DAG";
import { readFileSync } from "fs";
import { MPM } from "./MPM"

let lignes = readFileSync("DAG/dag_10_1.gr", "utf8").split("\n");
let [nbSommets, nbArcs] = lignes[0].split(" ").map(Number);

// Récupération des sommets et des arcs
let sommets = [];
let arcs = [];
for (let i = 1; i <= nbArcs; i++) {
  let [origine, but, poids] = lignes[i].split(" ").map((val) => {
    if (!isNaN(Number(val))) return Number(val);
    return val;
  });
  sommets.push(origine, but);
  arcs.push([origine, but, poids]);
}

// Création du graphe
let graphe = new DAG(sommets as string[], arcs as [string, string, number][]);
let mpm = new MPM(graphe)
let origine = "3";
let origineAnti = "8";
graphe.bellmanFord(origine);
graphe.bellmanFordMax(origine);
graphe.bellmanFordAnti(origineAnti);
graphe.bellmanFordMaxAnti(origineAnti);
graphe.afficherResultats();
mpm.appliquerMPM()
mpm.afficherResultatsMPM()

