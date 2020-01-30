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

  render() {
    const { visible } = this.state

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
            {/* put the clock in here */}
              {/* {console.log(this.context.getTime())} */}
              Dude
          </Segment>
        </Transition>
      </>
    )
  }
}

LeBox.contextType = AuthContext