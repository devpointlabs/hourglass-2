import React, { Component } from "react";
import { Dropdown, Grid, Menu, Button } from 'semantic-ui-react'
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
    const { getTime, timerOn} = this.context
    const time = getTime()
    if (prevState.timerOn !== timerOn()) {
      this.setState({ ...this.state, timerOn: timerOn() })
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
		this.context.resetTimer();
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
		this.setState({timerOn: false, timerTime: 0, hours: '00', minutes:'00', seconds:'00'});
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
              {this.state.timerOn === false && this.state.seconds === '00' ? 
                <Button onClick={this.context.startTimer}>Start</Button>
								:
								null
              }
              {this.state.timerOn === true ? 
                <Button onClick={this.context.stopTimer}>Stop</Button>
								:
								null
              }
              {this.state.timerOn === false && this.state.seconds !== '00' && (
                <Button onClick={this.context.startTimer}>Resume</Button>
              )}
              {this.state.timerOn === false && this.state.seconds !== '00' && (
                <Button onClick={() => this.resetTimer()}>Submit</Button>
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