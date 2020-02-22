import React from 'react'
import {Container, List, Segment, Image} from 'semantic-ui-react'
import DevImage from './Images/Dev.jpg'

const Footer = () => (
  <div style={{ position: 'fixed', bottom: '0', width: '100%', color: "white", }} >
    <Segment inverted vertical style={{ background: '#643cc9', margin: '2em 0em 0em', padding: '2em 0em',}}>
    <Container textAlign='center'>
      {/* <Image src={DevImage} style={{ width: 315, height: 70, }}/> */}
      <List horizontal inverted divided link size='small'>
        <List.Item as='a' >
           {/*put the email or something here  */}
        </List.Item>
        <List.Item style={{ color: "white" }} >
        © 2020 DevPoint Labs 
        </List.Item>
        <List.Item style={{ color: "white" }} >
        contact@devpointlabs.com
        </List.Item>
        <List.Item style={{ color: "white" }}>
        801-448-7240
        </List.Item>
        <List.Item style={{ color: "white" }}>
        370 S. 300 E. SLC, Utah 84111
        </List.Item>
        <List.Item as='a' style={{ color: "white" }}>
        Terms
        </List.Item>
        <List.Item as='a' style={{ color: "white" }}>
        Policy
        </List.Item>
      </List>
    </Container>
    </Segment>
  </div>
)

export default Footer