"use strict";

class Talk {
  constructor(talkInput) {
    this.talkContents = talkInput;
    this.title = this.getTitle();
    this.durationInMinutes = this.getDuration();
    this.scheduledFlag = false;
  }

  getTitle() {
    if (!strEndsWith(this.talkContents, "min") && !strEndsWith(this.talkContents, "lightning")) {
      throw ('Invalid task format.' + this.talkContents);
    }
    return this.talkContents.substring(0, this.talkContents.lastIndexOf(" "));
  };

  getDuration() {
    try {
      if (strEndsWith(this.talkContents, "min")) {
        let x = this.talkContents.substring(this.title.length + 1, this.talkContents.lastIndexOf("min"));
        this.durationInMinutes = Number(x);
      } else {
        this.durationInMinutes = 5;
      }
    } catch (ex) {
      throw ("Invalid talk time, " + this.talkContents + ". Time must be in min or in lightning. Detail:" + ex.message);
    }
    return this.durationInMinutes;
  };

  setScheduled(flag) {
    this.scheduledFlag = flag;
  };

  isScheduled() {
    return this.scheduledFlag;
  };
}

let strEndsWith = (str, suffix)=> {
  if (!str) {
    return false;
  }
  if (str.length < suffix.length)
    return false;
  return str.lastIndexOf(suffix) === str.length - suffix.length;
};

module.exports = Talk;