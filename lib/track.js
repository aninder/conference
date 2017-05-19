"use strict";
let Session = require('./session');

class Track {
  constructor(originalTalks) {
    this.hours = 9;
    this.minutes = 0;
    this.period = 'AM';
    this.eventsInTrack = [];
    this.assembleTracks(originalTalks || []);
  }

  assembleTracks(talks) {
    if (talks.length === 0) {
      return;
    }
    this.talkList = orderTalksByDuration(talks);
    this.configSessionToTrack(this.talkList, 'morning');
    this.configLunchToTrack();
    this.configSessionToTrack(this.talkList, 'afternoon');
    this.configNetworkingEventToTrack();
  };

  configSessionToTrack(talksInSession, time_of_day) {
    let session = new Session(talksInSession, time_of_day);
    talksInSession = this.sortTalksForSessionFormat(session, talksInSession);
    session.updateTalkList(talksInSession);
    this.addSessionToTrack(session);
  };

  sortTalksForSessionFormat(sessionToSortFor, talksToBeSorted) {
    let talksAllocatedForSession = [];
    let minutesToBeAllocated = sessionToSortFor.durationInMinutes;
    if (minutesToBeAllocated !== 0) {
      for (let i = 0; i < talksToBeSorted.length; i++) {
        let talk = talksToBeSorted[i];
        if (talk.isScheduled()) {
          continue;
        }
        if (minutesToBeAllocated >= talk.durationInMinutes) {
          minutesToBeAllocated = minutesToBeAllocated - talk.durationInMinutes;
          talksAllocatedForSession.push(talk);
        }
      }
    }
    return talksAllocatedForSession;
  };

  addSessionToTrack(session) {
    let eventsInSession = session.getEventList();
    for (let i = 0; i < eventsInSession.length; i++) {
      let talk = eventsInSession[i];
      let finalEvent = this.timeToString() + '' + talk.talkContents;
      this.eventsInTrack.push(finalEvent);
      this.updateTime(talk.durationInMinutes);
      talk.setScheduled(true);
    }
  };

  getAccumulatedTime() {
    let accumulatedTimeInMinutes = 0;
    if (this.period === 'PM') {
      accumulatedTimeInMinutes += 12 * 60;
    }
    accumulatedTimeInMinutes += this.hours * 60;
    accumulatedTimeInMinutes += this.minutes;
    return accumulatedTimeInMinutes;
  };

  updateTime(durationInMinutes) {
    let accumulatedTime = this.getAccumulatedTime() + Number(durationInMinutes);
    if (accumulatedTime >= (12 * 60)) {
      this.period = 'PM';
      accumulatedTime = accumulatedTime - (12 * 60);
    } else {
      this.period = 'AM';
    }
    this.hours = Math.floor(accumulatedTime / 60);
    this.minutes = accumulatedTime % 60;

    return this.timeToString();
  };

  timeToString() {
    let hour = '0';
    let minute = '0';
    if (this.hours < 10) {
      hour += this.hours;
    } else {
      hour = this.hours;
    }
    if (this.minutes < 10) {
      minute += this.minutes;
    } else {
      minute = this.minutes;
    }
    return hour + ':' + minute + this.period + ' ';
  };

  configLunchToTrack() {
    this.eventsInTrack.push("12:00PM Lunch");
    this.hours += 1;
  };

  configNetworkingEventToTrack() {
    this.checkNetworkEventTime();
    this.eventsInTrack.push(this.timeToString() + "Networking Event");
  };

  checkNetworkEventTime() {
    if (this.hours < 4 && this.period === 'PM') {
      this.hours = 4;
      this.minutes = 0;
    }
  };

  printTrackList() {
    for (let i = 0; i < this.eventsInTrack.length; i++) {
      console.log(this.eventsInTrack[i]);
    }
  };
}

let orderTalksByDuration = (talksToBeOrdered)=> {
  talksToBeOrdered.sort(function (a, b) {
    if (b.durationInMinutes > a.durationInMinutes) {
      return 1;
    }
    if (b.durationInMinutes < a.durationInMinutes) {
      return -1;
    }
    return 0;
  });
  return talksToBeOrdered;
};

module.exports = Track;