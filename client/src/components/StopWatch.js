import React, { Component } from "react";
import "../App.css";

class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
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
    }, 10);
  };

<<<<<<< Updated upstream
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="app">
      <div className="row">
        <Modal trigger={<Button>Show Modal</Button>}>
          <Modal.Header>New Time Entry</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <div className="time">
                {seconds}s
              </div>
              <Button 
                className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} 
                size="large"                
                onClick={toggle}>
                {isActive ? 'Stop' : 'Start'}
              </Button>
              <Button 
                size="large"
              >
                Cancel
              </Button>
            
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
};
=======
  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
>>>>>>> Stashed changes

    return (
      <div className="Stopwatch">
        <div className="Stopwatch-header">Stopwatch</div>
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
    );
  }
}

export default Stopwatch;