# Problem statement

You are planning a big programming conference and have received many proposals which have passed the initial screen process but you're having trouble fitting them into the time constraints of the day -- there are so many possibilities! So you write a program to do it for you.

* The conference has multiple tracks each of which has a morning and afternoon session.
* Each session contains multiple talks.
* Morning sessions begin at 9am and must finish by 12 noon, for lunch.
* Afternoon sessions begin at 1pm and must finish in time for the networking event.
* The networking event can start no earlier than 4:00 and no later than 5:00.
* No talk title has numbers in it.
* All talk lengths are either in minutes (not hours) or lightning (5 minutes).
* Presenters will be very punctual; there needs to be no gap between sessions.

Note that depending on how you choose to complete this problem, your solution may give a different ordering or combination of talks into tracks. This is acceptable; you don’t need to exactly duplicate the sample output given here.

# What is this?
This is a Javascript application that takes a list of talks that have a name
and duration and creates a schedule for a conference. The conference can have
multiple tracks, the morning session is 9am-12pm, lunch is 12-1pm, the afternoon
session must start at 1pm and end before 5pm , and the networking event starts after the afternoon session between 4 and 5pm.


# Notes On My Solution

## Design notes
Models that are used in this application:

1. `Conference` schedules the talks and print the tracks.
2. `Track` has two sessions. It represents a full days worth of events. 
3. `Session` has an array of Talk objects and has a  duration.
4. `Talk` has the duration of the talk as well as the title of the talk.

I broke the application into multiple small problems:

1. A getTalkList function that takes a file and converts lines to a list of `Talk` objects
2. A `Conference` class with `schedule` method that creates `Tracks`
3. A `Track`  creates morning and evening sessions.
4. A `Session` has list of `talks`


##Algorithm 

Greedy algorithm for this knapsack problem has been used.

Greedy algorithms don’t always yield optimal solutions but they’re the simplest and most efficient
algorithms available.

  1. Read data from file and create a list of `Talk` objects.   
  2. Sort the list of talks based on the duration.
  3.Create Track    
  3. Find out the combination of talks which can  be done in the morning session of the given track.   
  4. Find out the combination of talks that  can be done in the  evening session of the given track.
  5. If any tasks still remaining go to step 3.


##ASSUMPTION:
  
Tracks can be very many, much more than given example of 2 or even just 1.
  
The problem statement says `Afternoon sessions begin at 1pm and must finish in time for the networking event.`  I assume that talks can end before 4 in the evening but the networking event starts at 4.
Though algorithm can be changed to not be greedy and arrange talks in a way that sessions are optimised try ending evening sessions of all tracks between 4 and 5  


Sessions with keyword "lightning" have durations of 5 minutes.


#Development Environment Used   
 OS-X Yosemite 10.10.1 , Rubymine , Javascript, ES6, Node, Babel

# How do I run the application?

This is written in Javascript and uses node so you need node environment setup to run this application.

open terminal and go to project root.
 
Run `npm install` to install dependencies 

Run `npm test` to test

Run `npm start` to run the program  with default input file (at location `test/fixtures/talks.txt`)

Run `npm start <file_location>` where file_location is the location of the custom input file, to run the program with custom input file.It should be of the same format as file at location `test/fixtures/talks.txt`

