//assign a user?? dropdown of available team members based on the project?
//need the project options to be dynamic based on the user and what projects they are associated with
//need the project id to automatically populate based on what they select in the project options
//routes are incorrect


import React, { useState, } from "react";
import axios from "axios";
import { Form, Checkbox, } from "semantic-ui-react";
import { Redirect, Router } from "react-router-dom";
import Search from "./Search";

const TaskForm = (props) => {
    const [title, setTitle] = useState(props.task.title);
    const [description, setDescription] = useState(props.task.description);
    const [price_per_hour, setPrice_Per_Hour] = useState(props.task.price_per_hour);
    const [billable, setBillable] = useState(props.task.budget);
    const [project_id] = useState(props.task.project_id);
    const [complete, setComplete] = useState(props.task.complete);
  
  
      const handleTitleChange = (e) => {
          setTitle(e.target.value);
      }
  
      const handleDescriptionChange = (e) => {
          setDescription(e.target.value);
      }

      const handlePrice_Per_HourChange = (e) => {
          setPrice_Per_Hour(e.target.value);
      }
  
      const handleBillableChange = (e) => {
          setBillable(e.target.value);
      }
  
      const handleCompleteChange = (e) => {
          setComplete(e.target.value);
      }
  
      const projectOptions = [
          { key: 'Project 1', text: 'Project 1', value: 'Project 1' },
          { key: 'Project 2', text: 'Project 2', value: 'Project 2' },
          { key: 'Project 3', text: 'Project 3', value: 'Project 3' },
      ]
  
      const handleSubmit = (e) => {
          e.preventDefault();
          if(!props.isEditing) {
              axios.post(`/api/projects/${project_id}/tasks`, {title, description, billable,price_per_hour,  project_id, complete, } )
              .then( res => {
                  props.toggleTaskForm();
                  return <Redirect to='/tasks' />
              })
              .catch(err => {
                  console.log(err);
              })
          }
          else {
              axios.put(`/api/projects/${project_id}/${props.task.id}`, {title, description, billable,price_per_hour,  project_id, complete, })
              .then( res => {
                  props.toggleTaskForm();
              })
              };
          }
  
      return (
          <>
          <br />
          <h2>New Task</h2>
          
              <Form onSubmit={handleSubmit}>
                  <Form.Group>
                      <Form.Dropdown
                          width={9}
                          fluid
                          selection
                          label="Project"
                          placeholder='Choose a  project...'
                          options={projectOptions}
                          onChange=''
                          value=''
                      />
                      <Form.Input 
                          width={4}
                          fluid label='Project Code' 
                          placeholder='PROJECT ID GOES HERE' 
                          readOnly 
                      />
                  </Form.Group>
                  <Form.Group>
                      <Form.Input
                        width={9}
                        label="Task Name"
                        placeholder='Task Name'
                        name="title"
                        required
                        onChange={handleTitleChange}
                        value={title}
                      />
                      <Form.Field>
                          <p></p>
                        <Checkbox
                            label='Completed?'
                            name='complete'
                            value='complete'
                            checked={complete === true}
                            onChange={handleCompleteChange}
                        />
                        <p></p>
                        <Form.Checkbox
                            label='Billable?'
                            name='billable'
                            value='billable'
                            checked={billable === true}
                            onChange={handleBillableChange}
                        />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    </Form.Group>
                  <Form.Group>
                      <Form.Input
                        width={3}
                        type='number'
                        min='0'
                        label='Hourly Rate'
                        placeholder='Hourly Rate'
                        name='price_per_hour'
                        onChange={handlePrice_Per_HourChange}
                        value={price_per_hour}
                      />
                  </Form.Group>
                  <Form.Group>
                      <Form.TextArea
                          width={16}
                          label='Notes'
                          placeholder=''
                          name='description'
                          onChange={handleDescriptionChange}
                          value={description}
                      />
                  </Form.Group>
                      <br />
                      <hr />
                      <br />
                  <Form.Group>
                      <h4>Team</h4>
                      <br />
                  </Form.Group>
                  <Form.Group>
                      <Form.Dropdown 
                          width={9}
                          placeholder='Assign a person...'
                          name='all_users'
                          required
                          onChange=''
                          value=''
                      />
                  </Form.Group>
                  <Search/>
                  <br />
              <Form.Button inverted color="purple" type='submit'>Submit</Form.Button>
              <br />
              </Form>
          </>
      )
  }
  
export default TaskForm;