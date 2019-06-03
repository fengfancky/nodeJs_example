var Calculation = require('./exam_module');

var cal = new Calculation();

var res = cal.add(1,1);
console.log('1 + 1 = '+res);

var res1 = cal.sub(1,1);
console.log('1 - 1 = '+res1);

var res2 = cal.mul(1,1);
console.log('1 * 1 = '+res2);

var res3 = cal.div(1,1);
console.log('1 / 1 = '+res3);