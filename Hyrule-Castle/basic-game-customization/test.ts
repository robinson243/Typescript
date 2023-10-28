import * as rl from "readline-sync";
const fs = require("fs");


const Reset = "\x1b[0m";

const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const fgYellow = "\x1b[33m";
const FgPurple = "\x1b[35m";


const play : string[] = ["NEW GAME", "QUIT"];
const difficulty : string[] = [`Normal`, `${fgYellow}Difficult${Reset}`, `${FgRed}Insane${Reset}`];

function Def(){
    const add = rl.keyInSelect(difficulty, "", { cancel: false })
    console.log(add)
      if (add == 1)
        add = 1;
      else if (add == 2)
        add = 1.5;
      else
      {
        add = 2;
      }
      return n
  }
Def();
console.log(add);