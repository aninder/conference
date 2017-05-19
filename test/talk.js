"use strict";
let expect = require('expect.js');
let Talk = require('../lib/talk');

describe('Testing Talk functions', ()=> {
    it('should return the title of talk', (done)=> {
        let toTest = 'Programming in the Boondocks of Seattle 30min';
        let talk = new Talk(toTest);
        expect(talk.title).to.equal('Programming in the Boondocks of Seattle');
        done();
    });

    it('should return the minutes of talk', (done)=> {
        let toTest = 'User Interface CSS in Rails Apps 30min';
        let talk = new Talk(toTest);
        expect(talk.durationInMinutes).to.equal(30);
        done();
    });

    it('should return the minutes of lightning talk with 5 minutes', (done)=> {
        let toTest = 'Rails for Python Developers lightning';
        let talk = new Talk(toTest);
        expect(talk.durationInMinutes).to.equal(5);
        done();
    });

    it('should throw Error while passing invalid talk format (not end with \'min\')', (done)=> {
        let toTest = 'Ruby on Rails: Why We Should Move On 60mintest';
        expect(()=>{new Talk(toTest)}).to.throwError();
        done();
    });

    it('should throw Error while passing invalid talk format (not end with \'lightning\')', (done)=> {
        let toTest = 'Ruby on Rails: Why We Should Move On lightningtest';
        expect(()=>{new Talk(toTest)}).to.throwError();
        done();
    });
});
