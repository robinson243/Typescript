export function bunnyroad(instructions:string[]){
    let x: number = 0;
    let y: number = 0;
    for (let ins of instructions) {
        if (ins == 'gauche'){
            x--;
        }
        else if (ins == 'droite') {
            x++;
        }
        else if (ins == 'nord') {
            y++;
        }
        else if (ins == 'sud') {
            y--;
        }
    }
    return {x, y};
}

const instructions = ['droite', 'droite', 'gauche', 'droite', 'nord', 'sud', 'nord'];
const positionFinale = bunnyroad(instructions);
console.log(`Le lapin est à la position (${positionFinale.x}, ${positionFinale.y})`);