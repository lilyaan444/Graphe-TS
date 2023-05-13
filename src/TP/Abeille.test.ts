import { Reine, Travailleuse, Drone } from "./Abeille";

let reine: Reine;
let travailleuse: Travailleuse;
let drone: Drone;

beforeEach(() => {
  reine = new Reine("Mellifera");
  travailleuse = new Travailleuse("Maya");
  drone = new Drone("Willy");
});

test("doit retourner la chaîne de caractères attendue pour la Reine", () => {
  expect(reine.travaille()).toEqual("Mellifera, je suis une abeille et je suis la reine");
});

test("doit retourner la chaîne de caractères attendue pour la Travailleuse", () => {
  expect(travailleuse.travaille()).toEqual("Maya, je suis une abeille et je suis une travailleuse");
});

test("doit retourner la chaîne de caractères attendue pour le Drone", () => {
  expect(drone.travaille()).toEqual("Willy, je suis une abeille et je suis un drone");
});

test("doit retourner la chaîne de caractères attendue pour la Reine", () => {
  expect(reine.vole()).toEqual("Je vole");
});

test("doit retourner la chaîne de caractères attendue pour la Travailleuse", () => {
  expect(travailleuse.vole()).toEqual("Je vole");
});

test("doit retourner la chaîne de caractères attendue pour le Drone", () => {
  expect(drone.vole()).toEqual("Je vole");
});
