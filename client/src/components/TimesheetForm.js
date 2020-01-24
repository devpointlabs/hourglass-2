import React, { useState, } from "react";
import axios from "axios";
import { Redirect, } from 'react-router-dom';
import { Container, Form, Header, Segment, Dropdown, Menu} from "semantic-ui-react";
import Tasks from "./Tasks";
import Task from "./Task";

const TimesheetForm = (props) => {
  const [monday, setMonday] = useState('0:00');
  const [tuesday, setTuesday] = useState('0:00');
  const [wednesday, setWednesday] = useState('0:00');
  const [thursday, setThursday] = useState('0:00');
  const [friday, setFriday] = useState('0:00');
  const [saturday, setSaturday] = useState('0:00');
  const [sunday, setSunday] = useState('0:00');

	const getOptions = (obj) => {
		var options = [];
		obj.map(o => {
			o.tasks.map(t => {
				options.push(
					{
						key: t.id,
						text: `${o.project}: ${t.title}`,
						value: `${o.project}: ${t.title}`,
					}
				)
			})
		})
		return options;
	}
	
	const [tasks, setTasks] = useState(getOptions(props.tasks));
	const [taskId, setTaskId] = useState(null);


	const handleOptionChange = (e, { name, value }) =>{
		tasks.map(t => {
			if(value === t.value)
				setTaskId(t.key);
		})
	}

	const handleSubmit = (e) => {
		const days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
		e.preventDefault();
		const d = new Date();
		if(!props.isEditing) {
			axios.post(`/api/timesheets/`, {total_minutes: days, task_id: taskId})
			.then( res => {
					props.toggleTimesheetForm();
					return <Redirect to='/timesheets' />
				})
				.catch(err => {
					console.log(err);
				})
		}
		else {
			axios.post(`/api/timesheets/${props.timesheet.id}`, { total_minutes: days , task_id: taskId})
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

							<Dropdown
									placeholder='Select Task'
									name="task"
									fluid
									selection
									onChange={handleOptionChange}
									options={tasks}
								/>

              <Form.Input
                width="3"
                size="big"
                label="Monday"
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