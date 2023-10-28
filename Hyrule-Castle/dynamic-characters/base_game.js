"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rl = require("readline-sync");
var fs = require("fs");
// ANSI escape codes
var Reset = "\x1b[0m";
var FgRed = "\x1b[31m";
var FgGreen = "\x1b[32m";
var fgYellow = "\x1b[33m";
var FgPurple = "\x1b[35m";
// path pour les json pricipaux
var bosses = JSON.parse(fs.readFileSync("./bosses.json", "utf-8"));
var enemies = JSON.parse(fs.readFileSync("./enemies.json", "utf-8"));
var players = JSON.parse(fs.readFileSync("./players.json", "utf-8"));
var Hero = selectCharacterByRarity(players);
var mainEnemie = selectCharacterByRarity(enemies);
var bigBoss = selectCharacterByRarity(bosses);
var maxHpEnemie = mainEnemie.hp;
var maxHpHero = Hero.hp;
// Trouve la rareté
function findRarity(x) {
    if (x <= 50)
        return 1;
    else if (x <= 80)
        return 2;
    else if (x <= 95)
        return 3;
    else if (x <= 99)
        return 4;
    else
        return 5;
}
function selectCharacterByRarity(data) {
    var rarity = findRarity(Math.floor(Math.random() * (101 - 1) + 1));
    var candidates = data.filter(function (character) { return character.rarity == rarity; });
    return candidates[Math.floor(Math.random() * candidates.length)];
}
function displayEnemyHP(mainEnemie) {
    var maxHpBar = "I".repeat(maxHpEnemie - mainEnemie.hp);
    var hpBar = "I".repeat(mainEnemie.hp);
    console.log("".concat(FgRed, " ").concat(mainEnemie.name, " ").concat(Reset, " \n HP: ").concat(fgYellow, " ").concat(hpBar, " ").concat(Reset, "  ").concat(maxHpBar, " ").concat(mainEnemie.hp, " / ").concat(maxHpEnemie, " "));
}
function displayPlayerHP(Hero) {
    var maxHpBar = "I".repeat(maxHpHero - Hero.hp);
    var hpBar = "I".repeat(Hero.hp);
    console.log("".concat($), { FgPurple: FgPurple });
}
$;
{
    Hero.name;
}
$;
{
    Reset;
}
n;
HP: $;
{
    fgYellow;
}
$;
{
    hpBar;
}
$;
{
    Reset;
}
$;
{
    maxHpBar;
}
$;
{
    Hero.hp;
}
/ ${maxHpHero} `;
;
function hyruleCastle() {
    var fight = 1;
    var maxHpEnemie = mainEnemie.hp;
    while (fight < 11 && Hero.hp > 0) {
        console.log("".concat(FgPurple, "================ Fight ").concat(fight, " ========================").concat(Reset));
        fightRounds();
        if (fight == 10) {
            fightBoss();
        }
        if (mainEnemie.hp === 0) {
            mainEnemie.hp = maxHpEnemie;
        }
        if (Hero.hp === 0) {
            console.log("".concat(Hero.name, " died"));
        }
        fight++;
    }
}
function fightRounds() {
    mainEnemie.hp = maxHpEnemie;
    while (Hero.hp > 0 && mainEnemie.hp > 0) {
        displayEnemyHP(mainEnemie);
        displayPlayerHP(Hero);
        console.log("\n---Options------");
        var options = ["Attack", "Heal"];
        var choice = rl.keyInSelect(options, "", { cancel: false });
        // Get user input with keyInSelect
        switch (choice) {
            case 0: //case 0 parceque c'est l'index du choix attack
                Hero.hp -= mainEnemie.str;
                mainEnemie.hp -= Hero.str;
                if (mainEnemie.hp !== 0) {
                    console.log("You attacked and dealt ".concat(Hero.str, " damages!"));
                    console.log("".concat(mainEnemie.name, " dealt ").concat(mainEnemie.str, " damages!"));
                }
                if (mainEnemie.hp == 0) {
                    console.log("You attacked and dealt ".concat(Hero.str, " damages!"));
                    console.log("".concat(mainEnemie.name, " died\n"));
                    console.log(rl.question("Press ".concat(FgGreen, "Enter").concat(Reset, " to continue or ").concat(FgRed, "Ctrl+C").concat(Reset, " to quit")));
                }
                break;
            case 1:
                Hero.hp -= mainEnemie.str;
                console.log("".concat(mainEnemie.name, " dealt ").concat(mainEnemie.str, " damages!"));
                console.log("You used heal!");
                if (Hero.hp >= Math.floor(maxHpHero / 2)) {
                    Hero.hp = maxHpHero;
                }
                if (Hero.hp < Math.floor(maxHpHero / 2)) {
                    Hero.hp += Math.floor(maxHpHero / 2);
                }
                if (Hero.hp === 0) {
                    console.log("".concat(mainEnemie.name, " dealt ").concat(mainEnemie.str, " damages!"));
                    console.log("".concat(Hero.name, " died !"));
                }
                break;
            default:
                break;
        }
    }
}
function fightBoss() {
    var maxHpHero = Hero.hp;
    while (Hero.hp > 0 && bigBoss.hp > 0) {
        displayEnemyHP(bigBoss);
        displayPlayerHP(Hero);
        console.log("\n---Options------");
        var options = ["Attack", "Heal"];
        var choice = rl.keyInSelect(options, "", { cancel: false });
        // Get user input with keyInSelect
        switch (choice) {
            case 0: //case 0 parceque c'est l'index du choix attack
                Hero.hp -= bigBoss.str;
                bigBoss.hp -= Hero.str;
                if (bigBoss.hp !== 0) {
                    console.log("You attacked and dealt ".concat(Hero.str, " damages!"));
                    console.log("".concat(bigBoss.name, " dealt ").concat(bigBoss.str, " damages!"));
                }
                if (bigBoss.hp === 0) {
                    console.log("You attacked and dealt ".concat(Hero.str, " damages!"));
                    console.log("".concat(bigBoss.name, " died \n").concat(Hero.hp, " won"));
                }
                if (Hero.hp === 0 && bigBoss.hp > 0) {
                    console.log("".concat(Hero.name, " died"));
                }
                break;
            case 1:
                Hero.hp -= bigBoss.str;
                console.log("".concat(bigBoss.name, " dealt ").concat(bigBoss.str, " damages!"));
                console.log("You used heal!");
                if (Hero.hp >= Math.floor(maxHpHero / 2)) {
                    Hero.hp = maxHpHero;
                }
                if (Hero.hp < Math.floor(maxHpHero / 2)) {
                    Hero.hp += Math.floor(maxHpHero / 2);
                }
                if (Hero.hp === 0 && bigBoss.hp > 0) {
                    console.log("".concat(Hero.name, " died"));
                }
                break;
            default:
                break;
        }
    }
}
hyruleCastle();
