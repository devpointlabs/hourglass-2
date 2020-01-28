import React, { Component, useEffect } from "react";
import { Dropdown, Grid, Menu } from 'semantic-ui-react'
import axios from 'axios'
import _ from 'lodash'
import "../App.css";


class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    tasks: [],
    taskOptions: [],
    currentProj: '',
    currentTask: '',
  };
  
  componentDidMount = () => {
    axios.get(`/api/user_tasks`)
      .then(res => {
        this.setState({ tasks: res.data,}, () => this.getTask());
      })
      .catch(err => {
        console.log(err);
      })
  };
  
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
    return this.setState({taskOptions: userTasks})
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
    }, 10000);
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