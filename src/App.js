import React, { Component } from 'react';
import './App.css';

function TimeInput(props) {
  return <p>I came to work at XX:XX</p>;
}

function DurationInput(props) {
  return <p>My break today was XX:XX</p>;
}

function TimeInputArea(props) {
  return (
    <div>
      <TimeInput />
      <TimeInput />
      <DurationInput />
    </div>
  );
}

function TimeOutput(props) {
  return <p>You worked XX:XX hours today</p>;
}

class WorkDurationCalculator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TimeInputArea />
        <TimeOutput />
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
