import React, { Component } from "react";
import { Dropdown, Grid, Menu, Button, Header, Input } from 'semantic-ui-react'
import axios from 'axios'
import _ from 'lodash'
import "../App.css";
import { AuthContext } from "../providers/AuthProvider"


/* TO DO:
	-Correctly display tasks.
	-Select task id, submit that to context.
	-After hitting submit, bring up dialogue that requires the user to enter a note about the session
*/

class Stopwatch extends Component {

	state = {
    timerOn: false,
    timerStart: 0,
		timerTime: 0,
		isSubmitting: false,
    hours: '',
    minutes: '',
    seconds: '',
    tasks: [],
    taskOptions: [],
    currentProj: '',
		currentTask: null,
		note: '',
		readyMessage: 'select a task and enter a note.',
		ready: false,
  };


  componentDidMount = () => {
    axios.get(`/api/user_tasks`)
      .then(res => {
        this.setState({ tasks: res.data, });
      })
      .catch(err => {
        console.log(err);
			})
		const {getTime} = this.context;
		const time = getTime();
		this.setState({hours: time.hours, minutes: time.minutes, seconds: time.seconds });
  };

  componentDidUpdate(prevprops, prevState) {
    const { getTime, timerOn} = this.context;
    const time = getTime();
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
    this.setState({ currentProj: e.currentTarget.innerText }, () => this.getTask());
  }

  getProject = () => {
    const projects = this.state.tasks.map(p => ({
      key: p.id,
      text: p.project,
      value: p.project,
    })
    )
    return projects;
  }

	checkReady = () => {
		const msg = !this.context.isSubmittable() ? 'submit a minimum of 15 minutes.' :
								this.state.currentTask && this.state.note === '' ? 'enter a note.' : 
								!this.state.currentTask && this.state.note !== '' ? 'select a task.' :
								'select a task and enter a note.';
		const bool = this.state.currentTask && this.state.note !== '' ? true : false;
		this.setState({ready: bool, readyMessage: msg});
	}

  getTask = () => {
		const { tasks, } = this.state;
		this.setState({currentTask: null});
		tasks.map(p => {
			return this.state.currentProj === p.project ?
				p.tasks.map(t => {
					const option = {
						key: t.id,
						text: t.title,
						value: t.title,
					};
					this.setState(prevState => ({
						taskOptions: [...prevState.taskOptions, option]
					}));
				})
			:
				null
		})
  };

	handleOptionChange = (e) =>{
		const value = e.target.innerText;
		const { taskOptions, } = this.state;
		taskOptions.map(t => {
			if(value === t.value) {
				this.setState({currentTask: {id: t.key, title: t.value}}, () => this.checkReady());
			}
		})
	}

	handleNoteChange = (e, {value}) => {
		this.setState({note: value}, () => this.checkReady());
	}
  submitTime = () => {
		const {currentTask, note} = this.state;
		this.context.resetTimer(currentTask.id, note);
	};
	
	initSubmit = () => {
		this.setState({isSubmitting: true}, () => this.checkReady());
	}

	cancelSubmit = () => {
		this.setState({isSubmitting: false});
	}

  resetTimer = () => {
		this.submitTime();
		this.setState({timerOn: false, timerTime: 0, hours: '00', minutes:'00', seconds:'00', ready: false, isSubmitting: false});
  };


  render() {
    const { isSubmitting, hours, minutes, seconds, note, ready, currentTask} = this.state;
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
              onChange={e => this.handleOptionChange(e)}
              value={currentTask ? currentTask.title : null}
              placeholder='Select Task'
              selection
            >
            </Dropdown>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="Stopwatch">
							{
								!isSubmitting ?
									<>
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
											<Button onClick={() => this.initSubmit()}>Submit</Button>
										)}
									</>
								:
									<>
										<Header as='h1'>Submitting {hours}:{minutes}:{seconds}</Header>
										<Input
											fluid
											required
											focus
											placeholder='Enter a detailed note'
											value={note}
											onChange={this.handleNoteChange}
										/>
										{
											ready?
												<p style={{color:'green'}}>Ready to submit!</p>
											:
												<p style={{color:'red'}}>Please {this.state.readyMessage} </p>
										}
										<Button 
											onClick={() => this.resetTimer()}
											disabled={!ready}
										>Finalize Submit</Button>
										<Button 
											onClick={() => this.setState({isSubmitting: false})}
										>Cancel</Button>
									</>
							}
            </div>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

Stopwatch.contextType = AuthContext
export default Stopwatch;