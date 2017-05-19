"use strict";
let Track = require('./track');
let FileReader = require('./fileReader');

class Conference {
  constructor() {
    this.trackList = [];
  }

  schedule(file) {
    let fileContents = FileReader.getTalkList(file);
    this.calculateTracks(fileContents);
    this.printTracks();
  };

  calculateTracks(trackContents) {
    for (let i = 0; i < trackContents.length; i++) {
      if (!trackContents[i].isScheduled()) {
        this.trackList.push(new Track(trackContents));
        i = 0;
      }
    }
  };

  printTracks() {
    for (let i = 1; i <= this.trackList.length; i++) {
      console.log("\nTrack:" + i);
      this.trackList[i - 1].printTrackList();
    }
  };
}

module.exports = Conference;