import { link } from "fs";
import * as rl from "readline-sync";

// ANSI escape codes
const Reset = "\x1b[0m";

const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const fgYellow = "\x1b[33m";
const FgPurple = "\x1b[35m";

interface player {
  name: string;
  hp: number;
  maxHp: number;
  str: number;
}

const Link: player = {
  name: "Link",
  hp: 60,
  maxHp: 60,
  str: 15,
};

const Bokoblin: player = {
  name: "Bokoblin",
  hp: 30,
  maxHp: 30,
  str: 5,
};

const Ganon: player = {
  name: "Ganon",
  hp: 150,
  maxHp: 150,
  str: 20,
};
function displayEnemyHP(character: player) {
  const maxHpBar = "I".repeat(character.maxHp - character.hp);
  const hpBar = "I".repeat(character.hp);
  console.log(
    `${FgRed} ${character.name} ${Reset} \n HP: ${fgYellow} ${hpBar} ${Reset}  ${maxHpBar} ${character.hp} / ${character.maxHp} `
  );
}

function displayPlayerHP(character: player) {
  const maxHpBar = "I".repeat(character.maxHp - character.hp);
  const hpBar = "I".repeat(character.hp);
  console.log(
    `${FgGreen} ${character.name} ${Reset} \n HP: ${fgYellow} ${hpBar} ${Reset}  ${maxHpBar} ${character.hp} / ${character.maxHp} `
  );
}
function hyruleCastle() {
  let fight: number = 1;
  while (fight < 11 && Link.hp > 0) {
    console.log(`${FgPurple}================ Fight ${fight} ========================`);
    fightRounds();
    if (fight === 10) {
      fightBoss();
    }
    if (Bokoblin.hp === 0) {
      Bokoblin.hp = Bokoblin.maxHp;
    }
    if (Link.hp === 0) {
      console.log(`${Link.name} died ${FgRed}GAME OVER`);
    }
    fight++;
  }
}
function fightRounds() {
  Bokoblin.hp = Bokoblin.maxHp;
  while (Link.hp > 0 && Bokoblin.hp > 0) {
    displayEnemyHP(Bokoblin);
    displayPlayerHP(Link);

    console.log(`\n---Options------`);
    const options = ["Attack", "Heal"];
    const choice = rl.keyInSelect(options, "", { cancel: false });
    // Get user input with keyInSelect
    switch (choice) {
      case 0: //case 0 parceque c'est l'index du choix attack
        Link.hp -= Bokoblin.str;
        Bokoblin.hp -= Link.str;
        if (Bokoblin.hp !== 0) {
          console.log(`You attacked and dealt ${Link.str} damages!`);
          console.log(`${Bokoblin.name} dealt ${Bokoblin.str} damages!`);
        }
        if (Bokoblin.hp <= 0) {
          console.log(`You attacked and dealt ${Link.str} damages!`);
          console.log(`${Bokoblin.name} died\n`);
          if (Link.hp > 0 )
          console.log(rl.question(`Press ${FgGreen}enter${Reset} to continue or ${FgRed}Ctrl+C${Reset} for quit`));
        }
        break;
      case 1:
        Link.hp -= Bokoblin.str;
        console.log(`${Bokoblin.name} dealt ${Bokoblin.str} damages!`);
        console.log(`You used heal!`);
        if (Link.hp >= 30) {
          Link.hp = 60;
        }
        if (Link.hp < 30) {
          Link.hp += 30;
        }
        if (Link.hp === 0) {
          console.log(`${Bokoblin.name} dealt ${Bokoblin.str} damages!`);
          console.log(`${Link.name} died ${FgRed} GAME OVER`);
        }
        break;
      default:
        break;
    }
  }
}

function fightBoss() {
  Ganon.hp = Ganon.maxHp;
  while (Link.hp > 0 && Ganon.hp > 0) {
    console.log(`${FgRed}================ Final Stage ========================`);
    displayEnemyHP(Ganon);
    displayPlayerHP(Link);

    console.log(`\n---Options------`);
    const options = ["Attack", "Heal"];
    const choice = rl.keyInSelect(options, "", { cancel: false });
    // Get user input with keyInSelect
    switch (choice) {
      case 0: //case 0 parceque c'est l'index du choix attack
        Link.hp -= Ganon.str;
        Ganon.hp -= Link.str;
        if (Ganon.hp !== 0) {
          console.log(`You attacked and dealt ${Link.str} damages!`);
          console.log(`${Ganon.name} dealt ${Ganon.str} damages!`);
        }
        if (Ganon.hp === 0) {
          console.log(`You attacked and dealt ${Link.str} damages!`);
          console.log(`${Ganon.name} died \n You won`);
        }
        if (Link.hp <= 0) {
          console.log(`${Link.name} died ${FgRed}GAME OVER`);
        }
        break;
      case 1:
        Link.hp -= Ganon.str;
        console.log(`${Ganon.name} dealt ${Ganon.str} damages!`);
        console.log(`You used heal!`);
        if (Link.hp >= 30) {
          Link.hp = 60;
        }
        if (Link.hp < 30) {
          Link.hp += 30;
        }
        if (Link.hp <= 0) {
          console.log(`${Link.name} died GAME OVER`);
        }
        break;
      default:
        break;
    }
  }
}
hyruleCastle();