import { Tower, HanoiError } from "../src/tower";
import { Disc } from "../src/disc";

describe("Tower", () => {
  let tower: Tower;

  beforeEach(() => {
    tower = new Tower();
  });

  test("retourne true quand la tour est vide", () => {
    expect(tower.isEmpty()).toBe(true);
  });

  test("retourne true quand la tour n'es pas vide", () => {
    tower.addDisc(new Disc(3));
    expect(tower.isEmpty()).toBe(false);
  });

  test("Retourne le nombre de disque dans la tours", () => {
    tower.addDisc(new Disc(2));
    tower.addDisc(new Disc(1));
    expect(tower.size()).toBe(2);
  });

  test("Envoyer une erreur quand la tours est vide", () => {
    expect(() => {
      tower.topDisc;
    }).toThrow(HanoiError);
  });

  test("retourner le disque du haut", () => {
    const disc = new Disc(5);
    tower.addDisc(disc);
    expect(tower.topDisc).toBe(disc);
  });

  test("Renvoyer une erreur si le disque est plus grand ", () => {
    tower.addDisc(new Disc(3));
    expect(() => {
      tower.addDisc(new Disc(5));
    }).toThrow(HanoiError);
  });

  test("Renvoyer une erreur quand la tours est vide", () => {
    expect(() => {
      tower.removeDisc();
    }).toThrow(HanoiError);
  });

  test("devrais retourner les disques dans l'ordre", () => {
    tower.addDisc(new Disc(3));
    tower.addDisc(new Disc(2));
    tower.addDisc(new Disc(1));
    expect(tower.toString()).toBe("3 2 1");
  });
});
