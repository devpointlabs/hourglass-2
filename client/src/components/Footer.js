import React from 'react'
import {Container, Divider, Grid, Header, Image, List, Segment,} from 'semantic-ui-react'

const Footer = () => (
  <div style={{ position: 'absolute', bottom: '0', width: '100%'}} >
    <Segment inverted vertical style={{ background: '#643cc9', margin: '2em 0em 0em', padding: '2em 0em',}}>
    <Container textAlign='center'>
      {/* <Grid divided inverted stackable> */}
        {/* <Grid.Column width={3}>
          <Header inverted as='h4' content='Group 1' />
          <List link inverted>
            <List.Item as='a'>Link One</List.Item>
            <List.Item as='a'>Link Two</List.Item>
            <List.Item as='a'>Link Three</List.Item>
            <List.Item as='a'>Link Four</List.Item>
          </List>
        </Grid.Column> */}
        {/* <Grid.Column width={3}>
          <Header inverted as='h4' content='Group 2' />
          <List link inverted>
            <List.Item as='a'>Link One</List.Item>
            <List.Item as='a'>Link Two</List.Item>
            <List.Item as='a'>Link Three</List.Item>
            <List.Item as='a'>Link Four</List.Item>
          </List>
        </Grid.Column> */}
        {/* <Grid.Column width={3}>
          <Header inverted as='h4' content='Group 3' />
          <List link inverted>
            <List.Item as='a'>Link One</List.Item>
            <List.Item as='a'>Link Two</List.Item>
            <List.Item as='a'>Link Three</List.Item>
            <List.Item as='a'>Link Four</List.Item>
          </List>
        </Grid.Column> */}
        {/* <Grid.Column width={7}>
          <Header inverted as='h4' content='Footer Header' />
          <p>
            Extra space for a call to action inside the footer that could help re-engage users.
          </p>
        </Grid.Column> */}
      {/* </Grid> */}

      {/* <Divider inverted section /> */}
      <List horizontal inverted divided link size='small'>
        <List.Item as='a' href='#'>
          Site Map
        </List.Item>
        <List.Item as='a' href='#'>
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