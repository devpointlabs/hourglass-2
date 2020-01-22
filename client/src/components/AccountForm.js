import React, { useState, } from "react";
import { Form,} from "semantic-ui-react";
import {AuthContext} from '../providers/AuthProvider';
import axios from 'axios'


class AccountForm extends React.Component {
  state = { 
    first_name: this.context.user.first_name, 
    last_name: this.context.user.last_name, 
    email: this.context.user.email, 
    phone: this.context.user.phone, 
  };
  
  
  handleChange = (e, { name, value }) => this.setState({ [name]: value, });
  
  handleSubmit = (e) => {

    e.preventDefault(); 
    const user = { ...this.state, };
    axios.put(`/api/users/${this.context.user.id}`, { user, })
  }
  
  render() {

    console.log(this.context.user)
    const { first_name, last_name, email, phone } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Account settings</h2>
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
        <Form.Button color="blue">Save</Form.Button>
      </Form>
    )
  }
}



AccountForm.contextType = AuthContext;
export default AccountForm;
