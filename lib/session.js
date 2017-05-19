"use strict";

class Session {
  constructor(talks, time_of_day) {
    this.events = talks;
    this.durationInMinutes = (time_of_day === 'morning') ? 180 : 240;
  }

  addEventTalk(unlistedTalk) {
    if (this.checkSessionCapacity(unlistedTalk)) {
      this.events.push(unlistedTalk);
      this.durationInMinutes -= unlistedTalk.durationInMinutes;
    } else if (this.sessionFull()) {
      console.log("No time left in session");
    }
  };

  checkSessionCapacity(unlistedTalk){
    return (this.durationInMinutes < unlistedTalk.durationInMinutes) ? false : true
  };

  updateTalkList(updatedTalks) {
    this.events = updatedTalks;
  };

  sessionFull() {
    return (this.durationInMinutes === 0) ? true : false;
  };

  getEventList() {
    return this.events;
  };
}

module.exports = Session;