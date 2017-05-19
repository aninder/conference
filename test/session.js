"use strict";
let expect = require('expect.js');
let Session = require('../lib/session');
let Talk = require('../lib/talk');

describe('Testing Session functions', ()=> {
  let session;
  before(()=> {session = new Session([], "morning")});

  it('should return minutes in the morning', (done)=> {
    expect(session.durationInMinutes).to.equal(180);
    done();
  });

  it('should return morning session', (done)=> {
    let talk = new Talk("AJA HAMMERLY 45min");
    session.addEventTalk(talk);
    expect(session.events[0]).to.equal(talk);
    done();
  });

  it('should return status of sessions in the morning', (done)=> {
    session.addEventTalk(new Talk("PORTABLE SESSIONS WITH JSON WEB TOKENS 30min"));
    session.addEventTalk(new Talk("IN RELENTLESS PURSUIT OF REST 45min"));
    session.addEventTalk(new Talk("BUILDING BETTER TEAMS THROUGH COMMUNICATION 60min"));
    session.addEventTalk(new Talk("A DEEP DIVE INTO SESSIONS 45min"));

    expect(session.sessionFull()).to.equal(true);
    done();
  });

  it('should return latest count of sessions in the morning', (done)=> {
    session.addEventTalk(new Talk("IN RELENTLESS PURSUIT OF REST 45min"));
    session.addEventTalk(new Talk("A DEEP DIVE INTO SESSIONS 45min"));
    session.addEventTalk(new Talk("BUILDING BETTER TEAMS THROUGH COMMUNICATION 60min"));

    let talk1 = new Talk("AJA HAMMERLY 30min");
    let talk2 = new Talk("Excellence through diversity 30min");
    session.updateTalkList([talk1, talk2]);

    expect(session.events.length).to.equal(2);
    done();
  });
});