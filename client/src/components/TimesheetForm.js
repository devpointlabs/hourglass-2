import React, { useState, } from "react";
import axios from "axios";
import { Redirect, } from 'react-router-dom';
import { Container, Form, Header, Segment, } from "semantic-ui-react";

const TimesheetForm = (props) => {
  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);
  const [sunday, setSunday] = useState([]);

  const days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];


  const handleSubmit = (e) => {
    e.preventDefault();
    const now = Date.now();
    if(!props.isEditing) {
      axios.post(`/api/timesheets/`, {start_date: now, total_minutes: days})
      .then( res => {
          props.toggleTimesheetForm();
          return <Redirect to='/timesheets' />
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      axios.post(`/api/timesheets/${props.timesheet.id}`, {start_date: now, total_minutes: days})
      .then( res => {
          props.toggleTimesheetForm();
        })
      };
    }




  return (
    <>
      <Container>
        <Segment>
          <Form onSubmit={handleSubmit}>
            <Header>Week Of:</Header>
            <Form.Group widths='equal'>


              <Form.Field
                width="10"
                size="big"
                label="Project Title"
                type="text"
                name="title"
                // onChange={handleTitleChange}
                // value={title}
              />


              <Form.Input
                width="3"
                size="big"
                label="Monday"
                type="number"
                min="0"
                max="24"
                placeholder="HRS"
                name="monday"
                required
                onChange={(e) => {setMonday(e.target.value)}}
                value={monday}
              />


              <Form.Input
                width="3"
                size="big"
                label="Tuesday"
                type="number"
                min="0"
                max="24"
                placeholder="HRS"
                name="tuesday"
                required
                onChange={(e) => {setTuesday(e.target.value)}}
                value={tuesday}
              />



              <Form.Input
                width="3"
                size="big"
                label="Wednesday"
                type="number"
                min="0"
                max="24"
                placeholder="HRS"
                name="wednesday"
                required
                onChange={(e) => {setWednesday(e.target.value)}}
                value={wednesday}
              />


              <Form.Input
                width="3"
                size="big"
                label="Thursday"
                type="number"
                min="0"
                max="24"
                placeholder="HRS"
                name="thursday"
                required
                onChange={(e) => {setThursday(e.target.value)}}
                value={thursday}
              />


              <Form.Input
                width="3"
                size="big"
                label="Friday"
                type="number"
                min="0"
                max="24"
                placeholder="HRS"
                name="friday"
                required
                onChange={(e) => {setFriday(e.target.value)}}
                value={friday}
              />


              <Form.Input
                width="3"
                size="big"
                label="Saturday"
                type="number"
                min="0"
                max="24"
                placeholder="HRS"
                name="saturday"
                required
                onChange={(e) => {setSaturday(e.target.value)}}
                value={saturday}
              />


              <Form.Input
                width="3"
                size="big"
                label="Sunday"
                type="number"
                min="0"
                max="24"
                placeholder="HRS"
                name="sunday"
                required
                onChange={(e) => {setSunday(e.target.value)}}
                value={sunday}
                />




            </Form.Group>
            <Header>
            <Form.Button content='Save' size='big' fitted icon='save' color='purple' type='submit' />
            </Header>
          </Form>
        </Segment>
      </Container>
    </>
  )
};

export default TimesheetForm;