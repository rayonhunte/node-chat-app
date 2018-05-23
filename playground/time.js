const moment = require('moment');

let date = moment();
let someTimeStamp = moment().valueOf();

console.log(date.format('MMM Do, YYYY'));

console.log(date.format('HH:m A'));

console.log(someTimeStamp);
