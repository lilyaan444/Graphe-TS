export abstract class Graphe {
  public sommets: string[];
  public arcs: [string, string, number][];

  constructor(sommets: string[], arcs: [string, string, number][]) {
    this.sommets = sommets;
    this.arcs = arcs;
  }

  public abstract bellmanFord(origine: string): void;
  public abstract bellmanFordMax(origine: string): void;
}
