import React, { Component } from 'react'
import { Button, Divider, Segment, Transition, Icon } from 'semantic-ui-react'

export default class LeBox extends Component {
  state = { visible: true }

  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }))

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
              Dude
          </Segment>
        </Transition>
      </>
    )
  }
}

