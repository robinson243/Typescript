"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rl = require("readline-sync");
// ANSI escape codes
var Reset = "\x1b[0m";
var FgRed = "\x1b[31m";
var FgGreen = "\x1b[32m";
var Link = {
    name: "Link",
    hp: 60,
    maxHp: 60,
    str: 15,
};
var Bokoblin = {
    name: "Bokoblin",
    hp: 30,
    maxHp: 30,
    str: 5,
};
var Ganon = {
    name: "Ganon",
    hp: 150,
    maxHp: 150,
    str: 20,
};
function displayEnemyHP(character) {
    var hpBar = "I".repeat(character.hp);
    console.log("".concat(FgRed, " ").concat(character.name, " ").concat(Reset, " \n HP: ").concat(hpBar, " ").concat(character.hp, " / ").concat(character.maxHp, " "));
}
function displayPlayerHP(character) {
    var hpBar = "I".repeat(character.hp);
    console.log("".concat(FgGreen, " ").concat(character.name, "  ").concat(Reset, " \n HP: ").concat(hpBar, " ").concat(character.hp, " / ").concat(character.maxHp));
}
function hyruleCastle() {
    var fight = 1;
    while (fight < 10 && Link.hp > 0) {
        console.log("======== Fight ".concat(fight, " ========"));
        fightRounds();
        if (Bokoblin.hp === 0) {
            Bokoblin.hp = Bokoblin.maxHp;
            fight++;
        }
    }
}
function fightRounds() {
    while (Link.hp > 0 && Bokoblin.hp > 0) {
        displayEnemyHP(Bokoblin);
        displayPlayerHP(Link);
        var options = ["Attack", "Heal"];
        console.log("\n---Options-----------");
        // Get user input with keyInSelect
        var choice = rl.keyInSelect(options, "");
        switch (choice) {
            case 0: //case 0 parceque c'est l'index du choix attack
                Link.hp -= Bokoblin.str;
                Bokoblin.hp -= Link.str;
                if (Bokoblin.hp > Link.str) {
                    console.log("You attacked and dealt ".concat(Link.str, " damages!"));
                    console.log("".concat(Bokoblin.name, " dealt ").concat(Bokoblin.str, " damages!"));
                    break;
                }
                else {
                    console.log("You attacked and dealt ".concat(Link.str, " damages!"));
                    console.log("".concat(Bokoblin.name, " died"));
                }
                break;
            case 1:
                console.log("You used heal!");
                console.log("".concat(Bokoblin.name, " dealt ").concat(Bokoblin.str, " damages!"));
                if (Link.hp >= 30)
                    Link.hp = Link.maxHp;
                else
                    Link.hp += 30;
                break;
            default:
                break;
        }
    }
}
hyruleCastle();
