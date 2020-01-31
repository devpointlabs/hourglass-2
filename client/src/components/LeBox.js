import React, { Component } from 'react'
import { Button, Divider, Segment, Transition, Icon } from 'semantic-ui-react'
import { AuthContext } from "../providers/AuthProvider"

export default class LeBox extends Component {
  state = { visible: true, hours: '', minutes: '', seconds: ''  }

  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }))

  componentDidMount(){
    const time = this.context.getTime()
    this.setState({hours: time.hours, minutes: time.minutes, seconds: time.seconds})
  }

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

  render() {
    const { visible } = this.state
    const { timerTime, hours, minutes, seconds, } = this.state;

    return (
      <>
        <Icon 
          size="large"
          style={{ 
            position: "fixed", 
            bottom: 1, 
            right: 1, 
            transform: "translateX(-40%) translateY(-700%) "
          }} 
          name="stopwatch"
          // content={visible ? 'Hide' : 'Show'}
          onClick={this.toggleVisibility}
        />
        <Divider hidden />
        <Transition visible={visible} duration={500}>
          <Segment compact style={{ 
            position: "fixed", 
            bottom: 0, 
            right: 0, 
            transform: "translateY(-145%)" 
          }}>    
                {hours} : {minutes} : {seconds}
          </Segment>
        </Transition>
      </>
    )
  }
}

LeBox.contextType = AuthContext