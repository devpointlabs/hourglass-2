import React, { useState, } from "react";
import axios from "axios";
import { Icon, Button, Container, Form, Header, Segment, } from "semantic-ui-react";

const TimesheetForm = (props) => {
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");
  const [totalhours, setTotalhours] = useState("");
  const [title, setTitle] = useState("");

  const handleMondayChange = (e) => {
    setMonday(e.target.value);
  };

  const handleTuesdayChange = (e) => {
    setTuesday(e.target.value);
  };

  const handleWednesdayChange = (e) => {
    setWednesday(e.target.value);
  };

  const handleThursdayChange = (e) => {
    setThursday(e.target.value);
  };

  const handleFridayChange = (e) => {
    setFriday(e.target.value);
  };

  const handleSaturdayChange = (e) => {
    setSaturday(e.target.value);
  };

  const handleSundayChange = (e) => {
    setSunday(e.target.value);
  };


  const handleSubmit = (e) => {
		e.preventDefault();
    axios.post("/api/", {monday, tuesday, wednesday, thursday, friday, saturday, sunday, totalhours })
    .then( res => {
        props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
  };




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
                value={title}
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
                onChange={handleMondayChange}
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
                onChange={handleTuesdayChange}
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
                onChange={handleWednesdayChange}
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
                onChange={handleThursdayChange}
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
                onChange={handleFridayChange}
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
                onChange={handleSaturdayChange}
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
                onChange={handleSundayChange}
                value={sunday}
              />


              <Form.Field
                width="4"
                size="big"
                label="Total Hours"
                type="number"
                min="0"
                max="40"
                name="totalhours"
                value={totalhours}
              />


            </Form.Group>
            <Header>
            <Button content='New Row' size='big' color='purple' icon='plus' />
            <Button content='Save' size='big' fitted icon='save' color='purple' />
            </Header>
          </Form>
        </Segment>
      </Container>
    </>
  )
};

export default TimesheetForm;