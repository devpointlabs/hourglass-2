import React, { Component } from "react";
import { Dropdown, Grid } from 'semantic-ui-react'
import axios from 'axios'
import _ from 'lodash'
import "../App.css";

const getProject = (number, prefix = 'Choice ') =>
_.times(number, (index) => ({
key: index,
text: `${prefix}${index}`,
value: index,
}))


class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    default: '',
    false: ''
  };
  
  submitTime = () => {
    const{timerTime}=this.state
    debugger
    axios.post(`/api/sessions`, {timerTime})
      .then( res =>{
        this.setState(res.data);
      }).catch(err => {
        console.log(err);
        })
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.submitTime();
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);



    return (
      <>
      <Grid>
        <Grid.Column width={8}>
          <label>Select Project</label>
          <Dropdown
          fluid
          selection
          options={getProject(4)}
          onChange={this.handleChange}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <div className="Stopwatch">
            <div className="Stopwatch-header"></div>
            <div className="Stopwatch-display">
              {hours} : {minutes} : {seconds}
            </div>
              {this.state.timerOn === false && this.state.timerTime === 0 && (
                <button onClick={this.startTimer}>Start</button>
              )}
              {this.state.timerOn === true && (
                <button onClick={this.stopTimer}>Stop</button>
              )}
              {this.state.timerOn === false && this.state.timerTime > 0 && (
                <button onClick={this.startTimer}>Resume</button>
              )}
              {this.state.timerOn === false && this.state.timerTime > 0 && (
                <button onClick={this.resetTimer}>Submit</button>
              )}
          </div>
        </Grid.Column>
      </Grid>
      </>
    );
  }
}

export default Stopwatch;