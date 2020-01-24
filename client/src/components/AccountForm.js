import React, { useState, } from "react";
import { Form, Button, Modal, DropdownItem, } from "semantic-ui-react";
import {AuthContext} from '../providers/AuthProvider';
import axios from 'axios'
import Profile from './Profile'


class AccountForm extends React.Component {
  state = { 
    first_name: this.context.user.first_name, 
    last_name: this.context.user.last_name, 
    bio: this.context.user.bio,
    email: this.context.user.email, 
    phone: this.context.user.phone, 
  };
  
  handleChange = (e, { name, value }) => this.setState({ [name]: value, });
  
  handleSubmit = (e) => {
    e.preventDefault(); 
    const user = { ...this.state, };
    axios.put(`/api/users/${this.context.user.id}`, { user, })
    .then(res => {
      this.setState({ user: res.data.data, });
    })
  }

  caller = (e) => {
    this.handleSubmit(e)
    window.location.reload();
  }
  
  render() {
 
    console.log(this.context.user)
    const { first_name, last_name, bio, email, phone } = this.state;
    return (
      <Form>
        <h2>Account Settings</h2>
        <Form.Input
          label="First Name"
          type="text"
          name="first_name"
          value={first_name}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Last Name"
          type="text"
          name="last_name"
          value={last_name}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Bio"
          type="text"
          name="bio"
          value={bio}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Phone"
          type="number"
          name="phone"
          value={phone}
          onChange={this.handleChange}
        />
        <Form.Button 
          inverted
          color="blue" 
          type='submit'
          onClick={e => this.caller(e)}
          >Save
        </Form.Button>
      </Form>
    )
  }
}



AccountForm.contextType = AuthContext;
export default AccountForm;
