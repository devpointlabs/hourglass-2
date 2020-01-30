import React, { Component } from "react";
import { Dropdown, Grid, Menu } from 'semantic-ui-react'
import axios from 'axios'
import _ from 'lodash'
import "../App.css";
import { AuthContext } from "../providers/AuthProvider"



class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    hours: '',
    minutes: '',
    seconds: '',
    tasks: [],
    taskOptions: [],
    currentProj: '',
    currentTask: '',
  };

  componentDidMount = () => {
    axios.get(`/api/user_tasks`)
      .then(res => {
        this.setState({ tasks: res.data, }, () => this.getTask());
      })
      .catch(err => {
        console.log(err);
      })
  };

  componentDidUpdate(prevprops, prevState) {
    const { getTime, timerOn } = this.context
    const time = getTime()
    if (prevState.timerOn !== timerOn) {
      this.setState({ ...this.state, timerOn: timerOn })
    }
    if (prevState.hours !== time.hours ||
    prevState.minutes !== time.minutes ||
    prevState.seconds !== time.seconds) {
      this.setState({ ...this.state,
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds,
      })
    }
  }

  handleProject = (e) => {
    this.setState({ currentProj: e.currentTarget.innerText })
  }

  handleTask = (e) => {
    this.setState({ currentTask: e.currentTarget.innerText })
  }

  getProject = () => {
    const projects = this.state.tasks.map(p => ({
      key: p.id,
      text: p.project,
      value: p.project,
    })
    )
    return projects
  }


  getTask = () => {
    const { tasks, } = this.state
    const userTasks = tasks[0].tasks.map(t => ({
      key: t.id,
      text: t.title,
      value: t.title,
    })
    )
    return this.setState({ taskOptions: userTasks })
  };


  submitTime = () => {
    const { timerTime } = this.state
    axios.post(`/api/sessions`, { timerTime })
      .then(res => {
        this.setState(res.data);
      }).catch(err => {
        console.log(err);
      })
  };

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
    }, 1000);
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


  render() {
    const { timerTime, hours, minutes, seconds, } = this.state;
    // let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    // let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    // let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    // let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);


    return (
      <>
        <Grid>
          <Grid.Column width={8}>
            <Dropdown
              options={this.getProject()}
              onChange={e => this.handleProject(e)}
              value={this.state.currentProj}
              placeholder='Select Project'
              selection
            >
            </Dropdown>
            <Dropdown
              options={this.state.taskOptions}
              onChange={e => this.handleTask(e)}
              value={this.state.currentTask}
              placeholder='Select Task'
              selection
            >
            </Dropdown>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="Stopwatch">
              <div className="Stopwatch-header"></div>
              <div className="Stopwatch-display">
                {hours} : {minutes} : {seconds}
              </div>
              {this.state.timerOn === false && this.state.timerTime === 0 && (
                <button onClick={this.context.startTimer}>Start</button>
              )}
              {this.state.timerOn === true && (
                <button onClick={this.context.stopTimer}>Stop</button>
              )}
              {this.state.timerOn === false && this.state.seconds !== '00' && (
                <button onClick={this.context.startTimer}>Resume</button>
              )}
              {this.state.timerOn === false && this.state.seconds !== '00' && (
                <button onClick={this.context.resetTimer}>Submit</button>
              )}
            </div>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

Stopwatch.contextType = AuthContext
export default Stopwatch;