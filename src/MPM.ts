import { DAG } from "./DAG";
import { Graphe } from "./graph";

export class MPM {
  private datesDebutAuPlusTot: { [sommet: string]: number };
  private datesDebutAuPlusTard: { [sommet: string]: number };
  private margesTotales: { [sommet: string]: number };
  private margesLibres: { [sommet: string]: number };
  private dag: DAG;
  private graphe: Graphe;

  constructor(graphe: Graphe) {
    this.datesDebutAuPlusTot = {};
    this.datesDebutAuPlusTard = {};
    this.margesTotales = {};
    this.margesLibres = {};
    this.dag = new DAG([], []);
    this.graphe = graphe;
  }

  public appliquerMPM(): void {
    //code
  }

  public afficherResultatsMPM(): void {
    console.log("Dates de début au plus tôt:");
    for (const sommet in this.graphe.sommets) {
      //code
    }

    console.log("\nDates de début au plus tard:");
    for (const sommet in this.datesDebutAuPlusTard) {
      //code
    }

    console.log("\nMarges totales:");

    console.log("\nMarges libres:");
  }
}
