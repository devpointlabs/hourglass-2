import React, { Component, useEffect } from "react";
import { Dropdown, Grid, Menu } from 'semantic-ui-react'
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

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {

    return (
      <>
      <Grid>
        <Grid.Column width={8}>
            <Dropdown text='Projects'>
              <Dropdown.Menu>
                  <Dropdown item text='Project 1'>
                    <Dropdown.Menu>
                      <Dropdown.Item>Task 1</Dropdown.Item>
                      <Dropdown.Item>Task 2</Dropdown.Item>
                      <Dropdown.Item>Task 3</Dropdown.Item>
                      <Dropdown.Item>Task 4</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown item text='Project 2'>
                    <Dropdown.Menu>
                      <Dropdown.Item>Task 1</Dropdown.Item>
                      <Dropdown.Item>Task 2</Dropdown.Item>
                      <Dropdown.Item>Task 3</Dropdown.Item>
                      <Dropdown.Item>Task 4</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown item text='Project 3'>
                    <Dropdown.Menu>
                      <Dropdown.Item>Task 1</Dropdown.Item>
                      <Dropdown.Item>Task 2</Dropdown.Item>
                      <Dropdown.Item>Task 3</Dropdown.Item>
                      <Dropdown.Item>Task 4</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown item text='Project 4'>
                    <Dropdown.Menu>
                      <Dropdown.Item>Task 1</Dropdown.Item>
                      <Dropdown.Item>Task 2</Dropdown.Item>
                      <Dropdown.Item>Task 3</Dropdown.Item>
                      <Dropdown.Item>Task 4</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown item text='Project 5'>
                    <Dropdown.Menu>
                      <Dropdown.Item>Task 1</Dropdown.Item>
                      <Dropdown.Item>Task 2</Dropdown.Item>
                      <Dropdown.Item>Task 3</Dropdown.Item>
                      <Dropdown.Item>Task 4</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
              </Dropdown.Menu>
            </Dropdown>
        </Grid.Column>
        <Grid.Column width={8}>
          <div className="Stopwatch">
            <div className="Stopwatch-header"></div>
            <div className="Stopwatch-display">
              
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