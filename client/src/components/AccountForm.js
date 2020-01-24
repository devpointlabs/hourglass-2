import React, { useState, } from "react";
import { Form, Grid, } from "semantic-ui-react";
import {AuthContext} from '../providers/AuthProvider';
import axios from 'axios'
import Dropzone from 'react-dropzone';


class AccountForm extends React.Component {
  state = { 
    first_name: this.context.user.first_name, 
    last_name: this.context.user.last_name, 
    bio: this.context.user.bio,
    email: this.context.user.email, 
    phone: this.context.user.phone, 
    image: this.context.user.image,
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

  onDrop = (files) => {
    debugger
    this.setState( { ...this.state, image: files[0], } );
  }
  
  render() {
 
    console.log(this.context.user)
    const { first_name, last_name, bio, email, phone, image } = this.state;
    return (
      <Grid>
        <Grid.Column width={8}>
        <Dropzone
          onDrop={this.onDrop}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div
                {...getRootProps()}
                style={styles.dropzone}
              >
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop file here...</p> :
                    <p>Try dropping some files here, or click to select files to upload.</p>
                }
              </div>
            )
          }}
        </Dropzone>
            </Grid.Column>
            <Grid.Column width={8}>
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
        <Form.TextArea
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
        </Grid.Column>
        </Grid>
    )
  }
}

const styles = {
dropzone: {
  height: "150px",
  width: "150px",
  border: "1px dashed black",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
},
}


AccountForm.contextType = AuthContext;
export default AccountForm;
