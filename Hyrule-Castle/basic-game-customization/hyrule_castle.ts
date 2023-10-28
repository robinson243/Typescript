import * as rl from "readline-sync";
const fs = require("fs");

// ANSI escape codes
const Reset = "\x1b[0m";

const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const fgYellow = "\x1b[33m";
const FgPurple = "\x1b[35m";

interface AnyPlayer {
  name: string;
  hp: number;
  str: number;
  id: number;
  rarity: number;
}

// path pour les json pricipaux
const bosses = JSON.parse(fs.readFileSync("./bosses.json", "utf-8"));
const enemies = JSON.parse(fs.readFileSync("./enemies.json", "utf-8"));
const players = JSON.parse(fs.readFileSync("./players.json", "utf-8"));

let n:number
function Def(){
  let add = rl.keyInSelect(difficulty, "", { cancel: false });
  console.log(add)
    if (add == 0)
      n = 1;
    else if (add == 1)
      n = 1.5;
    else
      n = 2;
    console.log(`Your adventure gonna be ${difficulty[add]} !`)
    return n
}

let Hero = selectCharacterByRarity(players);
let mainEnemie: AnyPlayer = selectCharacterByRarity(enemies);
let bigBoss: AnyPlayer = selectCharacterByRarity(bosses);
const maxHpEnemie = mainEnemie.hp;
const maxHpHero = Hero.hp;
const maxHpBoss = bigBoss.hp;
// Trouve la rareté
function findRarity(x: number): number {
  if (x <= 50) return 1;
  else if (x <= 80) return 2;
  else if (x <= 95) return 3;
  else if (x <= 99) return 4;
  else return 5;
}

function selectCharacterByRarity(data: AnyPlayer[]): AnyPlayer {
  const rarity = findRarity(Math.floor(Math.random() * (101 - 1) + 1));
  const candidates = data.filter((character) => character.rarity == rarity);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function displayHP(character: AnyPlayer, maxHp: any, x:number=1) {
  const maxHpBar = "I".repeat(maxHp*x - (character.hp*x));
  const hpBar = "I".repeat(character.hp*x);
  let colorCode = character === Hero ? FgGreen : FgRed;
  console.log(
    `${colorCode} ${character.name} ${Reset} \n HP: ${fgYellow} ${hpBar} ${Reset} ${maxHpBar} ${Math.round(character.hp*x)} / ${Math.round(maxHp*x)} `
  );
}
const play : string[] = [`${FgGreen}NEW GAME${Reset}`, `${FgRed}QUIT${Reset}`];
const difficulty : string[] = [`Normal`, `${fgYellow}Difficult${Reset}`, `${FgRed}Insane${Reset}`];

console.log(`Welcome to the game Hyrule Castle`);

function hyruleCastle() {
  Def();
  let choice = rl.keyInSelect(["10","20","50","100"], "", { cancel: false });
  if (choice == 0)
    choice = 10;
  else if (choice == 1)
    choice = 20;
  else if (choice == 2)
    choice = 50;
  else
    choice = 100;
  console.log(`You choose ${FgRed}${choice} levels${Reset}.`);
  let fight: number = (choice - choice)+1;
  while (fight < choice+1 && Hero.hp > 0) {
    console.log(
      `${FgPurple}================ Fight ${fight} ========================`
    );
    if (fight % 10 == 0) {
      fightBoss(n);
    } else {
      fightRounds(n);
    }

    if (Hero.hp <= 0) {
      console.log(`${Hero.name} DIED\n${FgRed}GAME OVER`);
      break; // Exit the loop since Hero is dead
    }
    if (bigBoss.hp <= 0) {
      console.log(`YOU'VE SLAYED THE ENEMY ${bigBoss.name} is dead`);
      console.log(`You earn a new key`);
      if (fight == choice)
        break;
    }
    fight++;
  }
}
let coins:number = 12;
function fightRounds(n:number) {
  mainEnemie.hp = Math.round(mainEnemie.hp*n);
  const str = Math.round(mainEnemie.str*n);
  mainEnemie.hp = maxHpEnemie;
  while (Hero.hp > 0 && mainEnemie.hp > 0) {
    displayHP(mainEnemie, maxHpEnemie,n);
    displayHP(Hero, maxHpHero);

    console.log(`\n---Options------`);
    const options = ["Attack", "Heal"];
    const choice = rl.keyInSelect(options, "", { cancel: false });
    // Get user input with keyInSelect
    switch (choice) {
      case 0: //case 0 parceque c'est l'index du choix attack
        Hero.hp -= str;
        mainEnemie.hp -= Hero.str;
        if (mainEnemie.hp > 0) {
          console.log(`${Hero.name} attacked and dealt ${Hero.str} damages!`);
          console.log(`${mainEnemie.name} dealt ${str} damages!`);
        }
        if (mainEnemie.hp <= 0) {
          console.log(`You attacked and dealt ${Hero.str} damages!`);
          console.log(`${mainEnemie.name} died\n`);
          coins++;
          console.log(`You have ${fgYellow}${coins}${Reset} kokiri now!`);
          if (Hero.hp !== 0) {
            console.log(
              rl.question(
                `Press ${FgGreen}enter${Reset} to continue or ${FgRed}Ctrl+C${Reset} for quit`
              )
            );
          }
        }

        break;
      case 1:
        Hero.hp -= str;
        console.log(`${mainEnemie.name} dealt ${str} damages!`);
        console.log(`${Hero.name} used heal!`);
        if (Hero.hp >= Math.round(maxHpHero / 2)) {
          Hero.hp = maxHpHero;
        }
        if (Hero.hp < Math.round(maxHpHero / 2)) {
          Hero.hp += Math.round(maxHpHero / 2);
        }
        if (Hero.hp <= 0) {
          console.log(`${mainEnemie.name} dealt ${str} damages!`);
          console.log(`${Hero.name} died\n${FgRed}GAME OVER`);
          //~console.log(`${Hero.name} died !`);
        }
        break;
      default:
        break;
    }
  }
}
function fightBoss(n:number) {
  bigBoss.hp = Math.round(bigBoss.hp*n);
  const str = Math.round(bigBoss.str*n);
  bigBoss.hp = maxHpBoss;
  while (Hero.hp > 0 && bigBoss.hp > 0) {
    displayHP(bigBoss, maxHpBoss,n);
    displayHP(Hero, maxHpHero);

    console.log(`\n---Options------`);
    const options = ["Attack", "Heal"];
    const choice = rl.keyInSelect(options, "", { cancel: false });
    // Get user input with keyInSelect
    switch (choice) {
      case 0: //case 0 parceque c'est l'index du choix attack
        Hero.hp -= str;
        bigBoss.hp -= Hero.str;
        if (bigBoss.hp != 0) {
          console.log(`${Hero.name} attacked and dealt ${Hero.str} damages!`);
          console.log(`${bigBoss.name} dealt ${str} damages!`);
        }
        if (bigBoss.hp === 0) {
          console.log(`${Hero.name} attacked and dealt ${Hero.str} damages!`);
          //console.log(`${bigBoss.name} died \n${Hero.hp} won`);
        }
        break;
      case 1:
        console.log(`${Hero.name} used heal!`);
        if (Hero.hp >= Math.round(maxHpHero / 2)) {
          Hero.hp = maxHpHero; // no bigBoss.str inflincted to prevent loosing to easely to a too powerfull opponent
        }
        if (Hero.hp < Math.round(maxHpHero / 2)) {
          Hero.hp += Math.round(maxHpHero / 2);
          //Hero.hp -= bigBoss.str;
        }
        if (Hero.hp <= 0) {
          console.log(`${bigBoss.name} dealt ${str} damages!`);
          console.log(`${Hero.name} died\n${FgRed}GAME OVER`);
          //~console.log(`${Hero.name} died !`);
        }
        // Hero.hp -= bigBoss.str;
        console.log(`${bigBoss.name} dealt ${str} damages!`);
        break;
      default:
        break;
    }
  }
}

const gameOrNot = rl.keyInSelect(play, "", { cancel: false });
switch (gameOrNot) {
  case 0:
    //Def();
    hyruleCastle();
    break;
  case 1:
    console.log("You quit the game Goodbye!");
  default:
    break;
}