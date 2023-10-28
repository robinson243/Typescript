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

function displayHP(character: AnyPlayer, maxHp: any) {
  const maxHpBar = "I".repeat(maxHp - character.hp);
  const hpBar = "I".repeat(character.hp);

  let colorCode = character === Hero ? FgGreen : FgRed;
  console.log(
    `${colorCode} ${character.name} ${Reset} \n HP: ${fgYellow} ${hpBar} ${Reset} ${maxHpBar} ${character.hp} / ${maxHp} `
  );
}

function hyruleCastle() {
  let fight: number = 1;

  while (fight < 11 && Hero.hp > 0) {
    console.log(
      `${FgPurple}================ Fight ${fight} ========================`
    );

    if (fight === 10) {
      fightBoss();
    } else {
      fightRounds();
    }

    if (Hero.hp <= 0) {
      console.log(`${Hero.name} DIED GAME OVER`);
      break; // Exit the loop since Hero is dead
    }
    if (bigBoss.hp <= 0) {
      console.log(`YOU'VE SLAYED THE ENEMY ${bigBoss.name} is dead`);
      break;
    }
    fight++;
  }
}

function fightRounds() {
  mainEnemie.hp = maxHpEnemie;

  while (Hero.hp > 0 && mainEnemie.hp > 0) {
    displayHP(mainEnemie, maxHpEnemie);
    displayHP(Hero, maxHpHero);

    console.log(`\n---Options------`);
    const options = ["Attack", "Heal"];
    const choice = rl.keyInSelect(options, "", { cancel: false });
    // Get user input with keyInSelect
    switch (choice) {
      case 0: //case 0 parceque c'est l'index du choix attack
        Hero.hp -= mainEnemie.str;
        mainEnemie.hp -= Hero.str;
        if (mainEnemie.hp > 0) {
          console.log(`${Hero.name} attacked and dealt ${Hero.str} damages!`);
          console.log(`${mainEnemie.name} dealt ${mainEnemie.str} damages!`);
        }
        if (mainEnemie.hp <= 0) {
          console.log(`You attacked and dealt ${Hero.str} damages!`);
          console.log(`${mainEnemie.name} died\n`);
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
        Hero.hp -= mainEnemie.str;
        console.log(`${mainEnemie.name} dealt ${mainEnemie.str} damages!`);
        console.log(`${Hero.name} used heal!`);
        if (Hero.hp >= Math.floor(maxHpHero / 2)) {
          Hero.hp = maxHpHero;
        }
        if (Hero.hp < Math.floor(maxHpHero / 2)) {
          Hero.hp += Math.floor(maxHpHero / 2);
        }
        if (Hero.hp <= 0) {
          console.log(`${mainEnemie.name} dealt ${mainEnemie.str} damages!`);
          console.log(`${Hero.name} died GAME OVER`);
          //~console.log(`${Hero.name} died !`);
        }
        break;
      default:
        break;
    }
  }
}
function fightBoss() {
  while (Hero.hp > 0 && bigBoss.hp > 0) {
    displayHP(bigBoss, maxHpBoss);
    displayHP(Hero, maxHpHero);

    console.log(`\n---Options------`);
    const options = ["Attack", "Heal"];
    const choice = rl.keyInSelect(options, "", { cancel: false });
    // Get user input with keyInSelect
    switch (choice) {
      case 0: //case 0 parceque c'est l'index du choix attack
        Hero.hp -= bigBoss.str;
        bigBoss.hp -= Hero.str;
        if (bigBoss.hp != 0) {
          console.log(`${Hero.name} attacked and dealt ${Hero.str} damages!`);
          console.log(`${bigBoss.name} dealt ${bigBoss.str} damages!`);
        }
        if (bigBoss.hp === 0) {
          console.log(`${Hero.name} attacked and dealt ${Hero.str} damages!`);
          //console.log(`${bigBoss.name} died \n${Hero.hp} won`);
        }
        break;
      case 1:
        console.log(`${Hero.name} used heal!`);
        if (Hero.hp >= Math.floor(maxHpHero / 2)) {
          Hero.hp = maxHpHero; // no bigBoss.str inflincted to prevent loosing to easely to a too powerfull opponent
        }
        if (Hero.hp < Math.floor(maxHpHero / 2)) {
          Hero.hp += Math.floor(maxHpHero / 2);
          //Hero.hp -= bigBoss.str;
        }

        if (Hero.hp <= 0) {
          console.log(`${bigBoss.name} dealt ${bigBoss.str} damages!`);
          console.log(`${Hero.name} died GAME OVER`);
          //~console.log(`${Hero.name} died !`);
        }
        // Hero.hp -= bigBoss.str;
        console.log(`${bigBoss.name} dealt ${bigBoss.str} damages!`);
        break;
      default:
        break;
    }
  }
}
hyruleCastle();