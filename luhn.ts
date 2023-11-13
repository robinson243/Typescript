export function test() {
  let arg3 = process.argv[3].split("");
  arg3.push('0');
//   let arg2 = process.argv[2];
  let sum = 0;
  for (let index = arg3.length - 2; index >= 0; index = index - 2) {
    let inumb = parseInt(arg3[index]);
    let inumb2 = inumb * 2;
    if (inumb2 > 9) inumb = inumb2 - 9;
    else inumb = inumb2;
    arg3[index] = inumb.toString();
  }
  // console.log(arg3);
  for (const i of arg3) {
    sum += parseInt(i);
  }
  console.log(10 - (sum % 10));
}

export function luhn() {
  let arg3 = process.argv[3].split("");
  let arg2 = process.argv[2];
  let sum = 0;
  for (let index = arg3.length - 2; index >= 0; index = index - 2) {
    let inumb = parseInt(arg3[index]);
    let inumb2 = inumb * 2;
    if (inumb2 > 9) inumb = inumb2 - 9;
    else inumb = inumb2;
    arg3[index] = inumb.toString();
  }
  // console.log(arg3);
  for (const i of arg3) {
    sum += parseInt(i);
  }
  if (sum % 10 == 0 && arg2 == "-c") console.log("OK");
  else if (sum % 10 != 0 && arg2 == "-c") console.log("KO");
  // console.log(sum);

  // Second part
  if (arg2 == "-f") {
    if (sum % 10 == 0) console.log(0);
    if (sum % 10 != 0 && arg2 == "-f") {
    //   console.log(10 - (sum % 10));
    //   arg3.push("0");
      test();
      return;
    }
  }
}
luhn();