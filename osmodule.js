const OS = require("os");

console.log(OS.freemem() / (1024 * 1024 * 1024));
console.log(OS.totalmem() / (1024 * 1024 * 1024));
console.log(OS.hostname());
console.log(OS.arch());
console.log(OS.platform());
console.log(OS.userInfo());
