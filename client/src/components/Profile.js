//Need:
//content adjusted to wireframes when we receive them
//data pulled in from whatever user is logged in



import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Container, Header, Image, Icon, Card } from 'semantic-ui-react';
import { AuthConsumer, } from "../providers/AuthProvider";
import {AuthContext} from '../providers/AuthProvider';



const Profile = () => (
    <Container>
        <Header as='h1'>Profile</Header>
        <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>User Name</Card.Header>
                <Card.Meta>
                    <span className='date'>User Company</span>
                </Card.Meta>
                <Card.Description>
                    User bio could go here.
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                <Icon name='pencil' />
                6 Active Projects
            </a>
            </Card.Content>
        </Card>
    </Container>
  )
  
  export default Profile;