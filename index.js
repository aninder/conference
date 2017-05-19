let Conference = require('./lib/conference');
let filePath = process.argv[2] ? process.argv[2] : "test/fixtures/talks.txt";
new Conference().schedule(filePath);
