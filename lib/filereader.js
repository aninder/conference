"use strict";
let fs = require("fs");
let path = require('path');
let Talk = require('./talk');

let loadFile = (file)=> {
  return fs.readFileSync(path.resolve(file), 'utf8');
};

let parseTalks = (talks)=> {
    let talksArr = talks.split(/\r\n|\r|\n/);
    let formattedTalks = [];
    for (let i = 0; i < talksArr.length; i++) {
        let unformattedTalk = talksArr[i];
        let formattedTalk = new Talk(unformattedTalk);
        formattedTalks.push(formattedTalk);
    }
    return formattedTalks;
};

module.exports.getTalkList = (file)=> {
  return parseTalks(loadFile(file));
};
