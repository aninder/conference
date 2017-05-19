"use strict";
let expect = require('expect.js');
let Track = require('../lib/track');
let Talk = require('../lib/talk');

describe('Testing Track functions', ()=> {

  let track;
  before(()=> {track = new Track()});

  it('should return the morning time', (done)=> {
    expect(track.timeToString()).to.equal('09:00AM ');
    done();
  });

  it('should return the update time', (done)=> {
    let talkList = [];
    talkList.push(new Talk('Accounting­Driven Development 45min'));
    talkList.push(new Talk('Communicating Over Distance 60min'));
    track.assembleTracks(talkList);
    track.updateTime(5);
    expect(track.timeToString()).to.equal('11:50AM ');
    done();
  });
});