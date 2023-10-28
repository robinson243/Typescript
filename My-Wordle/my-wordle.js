"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
var rl = require('readline-sync');
function MyWordle() {
    var motAdeviner = (0, lib_1.getRandomWord)();
    console.log(motAdeviner);
    var Player = (0, lib_1.getInput)("Trouve le mot >");
    var i = 0;
    while (i < 7) {
        var motAdevinerSplit = motAdeviner.split('');
        var playerSplit = Player.split('');
        var caseWord = [];
        for (var iterator = 0; iterator < caseWord.length; iterator++) {
            caseWord.shift();
        }
        for (var _i = 0, playerSplit_1 = playerSplit; _i < playerSplit_1.length; _i++) {
            var l = playerSplit_1[_i];
            var lc = motAdevinerSplit.includes(l);
            if (lc == true) {
                var indexOfWord = motAdevinerSplit.indexOf(l);
                caseWord[indexOfWord] = l;
                //console.log(`La lettre ${l} est à la place ${indexOfWord + 1}`);
            }
            else
                caseWord.push('-');
        }
        if (Player == motAdeviner) {
            console.log("Tu as gagné trouvé le bon mot ! C'était", motAdeviner);
            return;
        }
        else if (i == 5) {
            console.log("Tu n'as pas trouvé à temps !");
            return;
        }
        else if (Player != Player.toUpperCase()) {
            console.log("Votre mot n'est pas en majuscule !");
            i--;
        }
        else if (Player.length != 5) {
            console.log("Votre mot ne fait pas 5 lettres !");
            i--;
        }
        console.log(caseWord.join(' '));
        Player = (0, lib_1.getInput)("Encore " + (5 - i) + " tentative");
        i++;
    }
}
MyWordle();
