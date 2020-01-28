import React, { useState, } from "react";
import axios from "axios";
import { Redirect, } from 'react-router-dom';
import { Table, Button} from "semantic-ui-react";


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
			<Table.Header>
				<Table.HeaderCell width='6'>
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					<p>M</p>
					<p>11 Feb</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					<p>T</p>
					<p>11 Feb</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					<p>W</p>
					<p>11 Feb</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					<p>TH</p>
					<p>11 Feb</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					<p>F</p>
					<p>11 Feb</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					<p>S</p>
					<p>11 Feb</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					<p>Su</p>
					<p>11 Feb</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
				</Table.HeaderCell>
			</Table.Header>
			<Table.Body>
				<Table.Cell width='6'>
					Project Name
					Task Title
				</Table.Cell>
				{/* Change cells below to inputs  */}
				<Table.Cell width='1'>
					M
				</Table.Cell>
				<Table.Cell width='1'>
					T
				</Table.Cell>
				<Table.Cell width='1'>
					W
				</Table.Cell>
				<Table.Cell width='1'>
					TH
				</Table.Cell>
				<Table.Cell width='1'>
					F
				</Table.Cell>
				<Table.Cell width='1'>
					S
				</Table.Cell>
				<Table.Cell width='1'>
					Su
				</Table.Cell>

				{/* Inputs above^ */}

				<Table.Cell width='1'>
					Total
				</Table.Cell>
			</Table.Body>
			<Table.Footer>
				<Table.HeaderCell width='1'>
					<Button basic>+ New Row</Button>
					<Button basic>Save</Button>
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					M
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					T
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					W
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					TH
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					F
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					S
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					Su
				</Table.HeaderCell>
				<Table.HeaderCell width='1'>
					Total
				</Table.HeaderCell>

			</Table.Footer>
			{/* <Form onSubmit={handleSubmit}>
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
			</Form> */}
    </>
  )
};

export default TimesheetForm;