import React, { Component } from 'react';
import './App.css';

// Component for entering when you came or left
class TimeInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>{this.props.text} 
        <input 
          type="text"  
          pattern="[0-9]{1,2}[:][0-9]{2}"
          value={this.props.time}
        />
      </p>
    );
  }
}

// Component for entering how long your breaks were
class DurationInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>My break today was 
        <input 
          type="text"  
          pattern="[0-9]{1,2}[:][0-9]{2}"
          value={this.props.duration}
        /> 
        long.
      </p>
    );
  }
}

// Creates elements for entering start and end time and pause duration
function TimeInputArea(props) {
  return (
    <div>
      <TimeInput text="I came to work at " time={props.startTime}/>
      <TimeInput text="I'm leaving work at " time={props.endTime}/>
      <DurationInput duration={props.breakDuration}/>
    </div>
  );
}

// Displays how long you worked
function TimeOutput(props) {
  return <p>You worked <strong>{props.timeWorked}</strong> hours today</p>;
}

// Component which keeps the state and does the work time calculation
class WorkDurationCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "10:00",
      endTime: "18:00",
      breakDuration: "1:30"
    }
  }

  calculateWorkingHours() {
    Date.prototype.addHours= function(h){
      this.setHours(this.getHours()+h);
      return this;
    }
    Date.prototype.addMinutes= function(m){
      this.setMinutes(this.getMinutes()+m);
      return this;
    }

    const startTime = this.state.startTime.split(":");
    const endTime = this.state.endTime.split(":");
    const breakDuration = this.state.breakDuration.split(":");
    let startDate = new Date(0, 0, 0, startTime[0], startTime[1], 0);
    const endDate = new Date(0, 0, 0, endTime[0], endTime[1], 0);

    // move start date to later time as to factor in the break time
    startDate.addHours(parseInt(breakDuration[0]));
    startDate.addMinutes(parseInt(breakDuration[1]));

    let diff = endDate.getTime() - startDate.getTime();
    let workHours = Math.floor(diff / 1000 / 60 / 60);
    diff -= workHours * 1000 * 60 * 60;
    const workMinutes = Math.floor(Math.floor(diff / 1000 / 60) / 60 * 10);
    if (workHours < 0) {
      workHours += 24;
    }
    return workHours + "." + workMinutes;
  }

  render() {
    console.log(this.calculateWorkingHours())
    return (
      <div>
        <TimeInputArea 
          startTime={this.state.startTime} 
          endTime={this.state.endTime} 
          breakDuration={this.state.breakDuration} 
        />
        <TimeOutput timeWorked={this.calculateWorkingHours()}/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <WorkDurationCalculator />
      </div>
    );
  }
}

export default App;
