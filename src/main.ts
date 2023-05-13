import { Hanoi } from "./hanoi";

function main(): void {
  const hanoi = new Hanoi(3, 3);
  let nbMoves = hanoi.play();

  console.log(`\nYou won in ${nbMoves} moves`);
}

main();
