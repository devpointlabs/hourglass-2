import React, { useState, } from "react";
import axios from "axios";
import { Redirect, } from 'react-router-dom';
import { Table, Button, Segment, Input } from "semantic-ui-react";


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


	// const newRow = () => {
	// 	var table = document.getElementById('newTimesheet')
	// 	var row = table.insertRow(-1)
	// 	var cell1 = row.insertCell(0);
	// 	var cell2 = row.insertCell(1);
	// 	cell1.innerHTML = "NEW CELL1";
	// 	cell2.innerHTML = "NEW CELL2";
	// }

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
	<Segment>
		<Table celled striped>
			<Table.Header>
				<Table.HeaderCell width='equal'>
				</Table.HeaderCell>
				<Table.HeaderCell width='equal'>
					<p>M</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='equal'>
					<p>T</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='equal'>
					<p>W</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='equal'>
					<p>TH</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='equal'>
					<p>F</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='equal'>
					<p>S</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='equal'>
					<p>SU</p>
				</Table.HeaderCell>
				<Table.HeaderCell width='equal'>
				</Table.HeaderCell>
			</Table.Header>
			<Table.Body id='newTimesheet'>
				<Table.Row>
				<Table.Cell width='1'>
					<p>Project Name</p>
					<p>Task Title</p>
				</Table.Cell>
				{/* Change cells below to inputs  */}
				<Table.Cell width='2'>
					<Input
						fluid
						label='20th'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setMonday(e.target.value)}}
						value={monday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					<Input
						fluid
						label='21st'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setTuesday(e.target.value)}}
						value={tuesday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					<Input
						fluid
						label='22nd'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setWednesday(e.target.value)}}
						value={wednesday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					<Input
						fluid
						label='23rd'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setThursday(e.target.value)}}
						value={thursday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					<Input
						fluid
						label='24th'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setFriday(e.target.value)}}
						value={friday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					<Input
						fluid
						label='25th'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setSaturday(e.target.value)}}
						value={saturday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					<Input
						fluid
						label='26th'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setSunday(e.target.value)}}
						value={sunday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					Week Total
				</Table.Cell>
				</Table.Row>
				<Table.Row>
				<Table.Cell width='1'>
					<p>Project Name</p>
					<p>Task Title</p>
				</Table.Cell>
				{/* Change cells below to inputs  */}
				<Table.Cell width='2'>
					<Input
						fluid
						label='20th'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setMonday(e.target.value)}}
						value={monday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					<Input
						fluid
						label='21st'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setTuesday(e.target.value)}}
						value={tuesday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					<Input
						fluid
						label='22nd'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setWednesday(e.target.value)}}
						value={wednesday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					<Input
						fluid
						label='23rd'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setThursday(e.target.value)}}
						value={thursday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					<Input
						fluid
						label='24th'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setFriday(e.target.value)}}
						value={friday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					<Input
						fluid
						label='25th'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setSaturday(e.target.value)}}
						value={saturday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					<Input
						fluid
						label='26th'
						type="text"
						placeholder='0:00'
						onChange={(e) => {setSunday(e.target.value)}}
						value={sunday}
					/>
				</Table.Cell>
				<Table.Cell width='2'>
					Week Total
				</Table.Cell>
				</Table.Row>	
			</Table.Body>
			<Table.Footer>
				<Table.HeaderCell>
					<Button basic
					//  onClick={newRow()}
					 >
						 + New Row</Button>
				</Table.HeaderCell>
				<Table.HeaderCell>
					<Button basic>Save</Button>
				</Table.HeaderCell>
				<Table.HeaderCell>
				</Table.HeaderCell>
				<Table.HeaderCell>
				</Table.HeaderCell>
				<Table.HeaderCell>
				</Table.HeaderCell>
				<Table.HeaderCell>
				</Table.HeaderCell>
				<Table.HeaderCell>
				</Table.HeaderCell>
				<Table.HeaderCell>
					Total:
				</Table.HeaderCell>

			</Table.Footer>
			</Table>
			</Segment>
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