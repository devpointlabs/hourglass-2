import React from 'react'
import {Container, List, Segment,} from 'semantic-ui-react'

const Footer = () => (
  <div style={{ position: 'fixed', bottom: '0', width: '100%'}} >
    <Segment inverted vertical style={{ background: '#643cc9', margin: '2em 0em 0em', padding: '2em 0em',}}>
    <Container textAlign='center'>
      <List horizontal inverted divided link size='small'>
        <List.Item as='a' >
           {/*put the email or something here  */}
        </List.Item>
        <List.Item as='a' >
          Contact Us
        </List.Item>
        <List.Item as='a' href='#'>
          Terms and Conditions
        </List.Item>
        <List.Item as='a' href='#'>
          Privacy Policy
        </List.Item>
      </List>
    </Container>
    </Segment>
  </div>
)

export default Footer