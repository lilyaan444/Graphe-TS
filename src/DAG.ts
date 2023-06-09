import { Graphe } from "./graph";

export class DAG extends Graphe {
  private distances: { [sommet: string]: number };
  private distancesMax: { [sommet: string]: number };
  private predecesseurs: { [sommet: string]: string };
  private predecesseursMax: { [sommet: string]: string };
  private distancesAnti: { [sommet: string]: number };
  private distancesAntiMax: { [sommet: string]: number };
  private predecesseursAnti: { [sommet: string]: string };
  private predecesseursAntiMax: { [sommet: string]: string };

  constructor(sommets: string[], arcs: [string, string, number][]) {
    super(sommets, arcs);
    this.distances = {};
    this.distancesMax = {};
    this.predecesseurs = {};
    this.predecesseursMax = {};
    this.distancesAnti = {};
    this.distancesAntiMax = {};
    this.predecesseursAnti = {};
    this.predecesseursAntiMax = {};
  }

  private triTopologique(): string[] {
    const indegree: { [sommet: string]: number } = {};
    const file: string[] = [];
    const tri: string[] = [];

    // Initialisation de l'indice d'entrée (indegree) pour chaque sommet
    for (const sommet of this.sommets) {
      indegree[sommet] = 0;
    }

    // Calcul de l'indice d'entrée (indegree) pour chaque sommet
    for (const [origine, but, poids] of this.arcs) {
      indegree[but] += 1;
    }

    // Ajout des sommets avec un indice d'entrée de 0 à la file
    for (const sommet of this.sommets) {
      if (indegree[sommet] === 0) {
        file.push(sommet);
      }
    }

    // Parcours en largeur pour déterminer l'ordre topologique
    while (file.length > 0) {
      const sommet = file.shift() as string;
      tri.push(sommet);

      for (const [origine, but, poids] of this.arcs) {
        if (origine === sommet) {
          indegree[but] -= 1;
          if (indegree[but] === 0) {
            file.push(but);
          }
        }
      }
    }

    return tri;
  }

  private triTopologiqueInverse(): string[] {
    const indegree: { [sommet: string]: number } = {};
    const file: string[] = [];
    const tri: string[] = [];

    // Initialisation de l'indice d'entrée (indegree) pour chaque sommet
    for (const sommet of this.sommets) {
      indegree[sommet] = 0;
    }

    // Calcul de l'indice d'entrée (indegree) pour chaque sommet
    for (const [origine, but, poids] of this.arcs) {
      indegree[origine] += 1;
    }

    // Ajout des sommets avec un indice d'entrée de 0 à la file
    for (const sommet of this.sommets) {
      if (indegree[sommet] === 0) {
        file.push(sommet);
      }
    }

    // Parcours en largeur pour déterminer l'ordre topologique inverse
    while (file.length > 0) {
      const sommet = file.shift() as string;
      tri.push(sommet);

      for (const [origine, but, poids] of this.arcs) {
        if (but === sommet) {
          indegree[origine] -= 1;
          if (indegree[origine] === 0) {
            file.push(origine);
          }
        }
      }
    }

    return tri;
  }

  public bellmanFord(origine: string): void {
    const triTopologique = this.triTopologique();

    for (let sommet of this.sommets) {
      this.distances[sommet] = Infinity;
      this.predecesseurs[sommet] = "";
    }
    this.distances[origine] = 0;

    for (let i = 0; i < triTopologique.length - 1; i++) {
      for (let [orig, but, poids] of this.arcs) {
        if (orig === triTopologique[i]) {
          let distanceActuelle = this.distances[orig];
          let distanceRelaxee = distanceActuelle + poids;
          if (distanceRelaxee < this.distances[but]) {
            this.distances[but] = distanceRelaxee;
            this.predecesseurs[but] = orig;
          }
        }
      }
    }
  }

  public bellmanFordAnti(origine: string): void {
    const triTopologiqueInverse = this.triTopologiqueInverse();

    for (let sommet of this.sommets) {
      this.distancesAnti[sommet] = Infinity;
      this.predecesseursAnti[sommet] = "";
    }
    this.distancesAnti[origine] = 0;

    for (const element of triTopologiqueInverse) {
      // Correction de la condition de boucle
      for (let [orig, but, poids] of this.arcs) {
        if (but === element) {
          let distanceActuelle = this.distancesAnti[but];
          let distanceRelaxee = distanceActuelle + poids;
          if (distanceRelaxee < this.distancesAnti[orig]) {
            this.distancesAnti[orig] = distanceRelaxee;
            this.predecesseursAnti[orig] = but;
          }
        }
      }
    }
  }

  public bellmanFordMax(origine: string): void {
    const triTopologique = this.triTopologique();

    for (let sommet of this.sommets) {
      this.distancesMax[sommet] = -Infinity;
      this.predecesseursMax[sommet] = "";
    }
    this.distancesMax[origine] = 0;

    for (let i = 0; i < triTopologique.length - 1; i++) {
      for (let [orig, but, poids] of this.arcs) {
        if (orig === triTopologique[i]) {
          let distanceActuelle = this.distancesMax[orig];
          let distanceRelaxee = distanceActuelle + poids;
          if (distanceRelaxee > this.distancesMax[but]) {
            this.distancesMax[but] = distanceRelaxee;
            this.predecesseursMax[but] = orig;
          }
        }
      }
    }
  }

  public bellmanFordMaxAnti(origine: string): void {
    const triTopologiqueInverse = this.triTopologiqueInverse();

    for (let sommet of this.sommets) {
      this.distancesAntiMax[sommet] = -Infinity;
      this.predecesseursAntiMax[sommet] = "";
    }
    this.distancesAntiMax[origine] = 0;

    for (let i = 0; i < triTopologiqueInverse.length - 1; i++) {
      for (let [orig, but, poids] of this.arcs) {
        if (but === triTopologiqueInverse[i]) {
          let distanceActuelle = this.distancesAntiMax[but];
          let distanceRelaxee = distanceActuelle + poids;
          if (distanceRelaxee > this.distancesAntiMax[orig]) {
            this.distancesAntiMax[orig] = distanceRelaxee;
            this.predecesseursAntiMax[orig] = but;
          }
        }
      }
    }
  }

  public afficherResultats(): void {
    let resultatsMin: { [sommet: string]: number } = {};
    let cheminsMin: { [sommet: string]: string } = {};
    let resultatsMax: { [sommet: string]: number } = {};
    let cheminsMax: { [sommet: string]: string } = {};
    let resultatsAntiMin: { [sommet: string]: number } = {};
    let cheminsAntiMin: { [sommet: string]: string } = {};
    let resultatsAntiMax: { [sommet: string]: number } = {};
    let cheminsAntiMax: { [sommet: string]: string } = {};

    for (let sommet of this.sommets) {
      resultatsMin[sommet] = this.distances[sommet];
      cheminsMin[sommet] = this.construireCheminOptimal(sommet);
      resultatsMax[sommet] = this.distancesMax[sommet];
      cheminsMax[sommet] = this.construireCheminOptimalMax(sommet);
      resultatsAntiMin[sommet] = this.distancesAnti[sommet];
      cheminsAntiMin[sommet] = this.construireCheminOptimalAnti(sommet);
      resultatsAntiMax[sommet] = this.distancesAntiMax[sommet];
      cheminsAntiMax[sommet] = this.construireCheminOptimalMaxAnti(sommet);
    }

    console.log("Résultats :");
    for (let sommet in resultatsMin) {
      console.log(`Sommet: ${sommet}`);
      console.log(`Chemin optimal (Min): ${cheminsMin[sommet]}`);
      console.log(`Longueur du chemin optimal (Min): ${resultatsMin[sommet]}`);
      console.log(`Chemin optimal (Max): ${cheminsMax[sommet]}`);
      console.log(`Longueur du chemin optimal (Max): ${resultatsMax[sommet]}`);
      console.log(`Chemin optimal Anti (Min): ${cheminsAntiMin[sommet]}`);
      console.log(`Longueur du chemin optimal Anti (Min): ${resultatsAntiMin[sommet]}`);
      console.log(`Chemin optimal Anti (Max): ${cheminsAntiMax[sommet]}`);
      console.log(`Longueur du chemin optimal Anti (Max): ${resultatsAntiMax[sommet]}`);
      console.log();
    }
  }

  private construireCheminOptimalAnti(sommet: string): string {
    const chemin: string[] = [];
    let predecesseur = this.predecesseursAnti[sommet];

    while (predecesseur !== "") {
      chemin.unshift(predecesseur);
      predecesseur = this.predecesseursAnti[predecesseur];
    }

    chemin.push(sommet);

    return chemin.join(" -> ");
  }

  private construireCheminOptimalMaxAnti(sommet: string): string {
    const chemin: string[] = [];
    let predecesseur = this.predecesseursAntiMax[sommet];

    while (predecesseur !== "") {
      chemin.unshift(predecesseur);
      predecesseur = this.predecesseursAntiMax[predecesseur];
    }

    chemin.push(sommet);

    return chemin.join(" -> ");
  }

  private construireCheminOptimal(sommet: string): string {
    let chemin: string[] = [];
    let predecesseur = this.predecesseurs[sommet];
    while (predecesseur) {
      chemin.unshift(predecesseur);
      predecesseur = this.predecesseurs[predecesseur];
    }
    chemin.push(sommet);
    return chemin.join(" -> ");
  }

  private construireCheminOptimalMax(sommet: string): string {
    let chemin: string[] = [];
    let predecesseur = this.predecesseursMax[sommet];
    while (predecesseur) {
      chemin.unshift(predecesseur);
      predecesseur = this.predecesseursMax[predecesseur];
    }
    chemin.push(sommet);
    return chemin.join(" -> ");
  }
}
