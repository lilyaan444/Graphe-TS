class Ruche {
  private reine: Reine;
  private abeilles: Abeille[];

  constructor(reine: Reine) {
    this.reine = reine;
    this.abeilles = [];
  }

  ajout(abeille: Abeille): void {
    if (abeille instanceof Reine) {
      throw new Error("Impossible d'ajouter une reine à la ruche.");
    }

    if (this.abeilles.includes(abeille)) {
      throw new Error("Cette abeille existe déjà dans la ruche.");
    }

    this.abeilles.push(abeille);
  }

  affiche(): void {
    console.log("La ruche contient :");
    console.log(this.reine.travaille());

    for (const abeille of this.abeilles) {
      console.log("----------------");
      console.log(abeille.travaille());
      console.log(abeille.vole());
    }
  }

  compte(): void {
    let total = 1;

    const types: { [key: string]: number } = {};

    types[this.reine.constructor.name] = 1;

    for (const abeille of this.abeilles) {
      const typeName = abeille.constructor.name;
      total++;

      if (types[typeName]) {
        types[typeName]++;
      } else {
        types[typeName] = 1;
      }
    }

    console.log("La ruche contient", total, "abeille(s)");
    console.log("dont");

    for (const type in types) {
      console.log(types[type], type + "(s)");
    }

    console.log("et 1 reine");
  }
}

class Abeille {
  private nom: string;

  constructor(nom: string) {
    this.nom = nom;
  }

  protected getNom(): string {
    return this.nom;
  }

  travaille(): string {
    return `${this.getNom()}, je suis une abeille`;
  }

  vole(): string {
    return "Je vole";
  }
}

export class Reine extends Abeille {
  travaille(): string {
    return `${super.travaille()} et je suis la reine`;
  }
}

export class Travailleuse extends Abeille {
  travaille(): string {
    return `${super.travaille()} et je suis une travailleuse`;
  }
}

export class Drone extends Abeille {
  travaille(): string {
    return `${super.travaille()} et je suis un drone`;
  }
}

function main(): void {
  let reine = new Reine("Mellifera");
  let premièreTravailleuse = new Travailleuse("Maya");
  let deuxièmeTravailleuse = new Travailleuse("Marguerite");
  let troisièmeTravailleuse = new Travailleuse("Gudule");
  let premierDrone = new Drone("Willy");
  let deuxièmeDrone = new Drone("Raoul");

  let ruche = new Ruche(reine);
  ruche.ajout(premièreTravailleuse);
  ruche.ajout(premierDrone);
  ruche.ajout(deuxièmeTravailleuse);
  ruche.ajout(troisièmeTravailleuse);
  ruche.ajout(deuxièmeDrone);
  ruche.affiche();
  console.log();
  ruche.compte();
}

main();
