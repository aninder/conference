"use strict";
let expect = require('expect.js');
let Conference = require('../lib/conference');
let path_to_existing_file = 'test/fixtures/talks.txt';
let invalid_file = 'talks.txt';

describe('Testing Conference functions', ()=> {
    let conference;
    before(() => {conference = new Conference()});

    it('should not throw error via correct file', (done)=>  {
        expect(()=>{conference.schedule(path_to_existing_file)}).to.not.throwError();
        done();
    });

    it('should throw error via correct file', (done)=> {
        expect(()=>{conference.schedule(invalid_file)}).to.throwError();
        done();
    });
});