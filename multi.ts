export default function multi(a:number, b:number){
    for (let index = 0; index <= b; index++) {
        console.log(` ${index} x ${a} = ${a*index}`);
    }
}
multi(4,7);