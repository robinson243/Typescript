import { getInput,getRandomWord } from "./lib";
const rl = require('readline-sync');
function MyWordle(){
    const motAdeviner = getRandomWord();
    console.log(motAdeviner);
    let Player : string = getInput("Trouve le mot >");
    let i : number = 0;
    while (i < 7) 
    {
        let motAdevinerSplit = motAdeviner.split('');
        let playerSplit = Player.split('');
        let caseWord : String[]=[];
        for (let iterator:number = 0; iterator < caseWord.length;iterator++){
            caseWord.shift();
        }
        
        for (const l of playerSplit){
            let lc = motAdevinerSplit.includes(l);
            if( lc == true )
            {
                let indexOfWord = motAdevinerSplit.indexOf(l);
                caseWord[indexOfWord] = l;
                //console.log(`La lettre ${l} est à la place ${indexOfWord + 1}`);
            }
            else 
                caseWord.push('-');
        }

        if (Player == motAdeviner)
        {
            console.log("Tu as gagné trouvé le bon mot ! C'était", motAdeviner);
            return;
        }
        else if (i == 5)
        {
            console.log("Tu n'as pas trouvé à temps !");
            return;
        }
        else if (Player != Player.toUpperCase())
        {
            console.log("Votre mot n'est pas en majuscule !");
            i--;
        }
        else if (Player.length != 5)
        {
            console.log("Votre mot ne fait pas 5 lettres !");
            i--;
        }
        else if (parseInt(Player) <= 99999) {
            console.log("Votre mot est rempli de chiffres !");
            i--;
        }
        else
        console.log(caseWord.join(' '));
        Player = getInput("Encore "+ (5-i) + " tentative");
        i++;
    }
}

MyWordle();