import React, { Fragment, useState, useEffect, } from 'react';
import { Button, Dropdown, Label, Table, Popup, Header, Divider, Icon } from 'semantic-ui-react';
import axios from 'axios';
import Cal from './Calendar';
import TimesheetForm from './TimesheetForm';
import TimesheetsBar from './TimesheetsBar';
import dateFormat from '../tools/dateFormat';

/**
 * TO DO:
 * 1. Add Default timesheet of current week, (start date = monday)
 * 		Add Week / Day Views
 * 		Week ===>
 * 2. Add Button to button of time sheet form that can add a new row
 * Select Project and Task when adding new row
 * 		Day ===>
 * 3. Start timer button on row
 * 4. Submit button that moves timesheet to pending approvals
 * 5. Add approval feature only to admins of project that the task is assigned to
 *
 */

const Timesheet = (props) => {
	const [timesheets, setTimesheets] = useState([]);
	const [timeNumber, setTimesheet] = useState(0);
	const [showForm, setShowForm] = useState(false);
	const [isLoaded, setLoaded] = useState(false);
	const [isWeekView, setWeekView] = useState(false);
	const [projects, setProjects] = useState([]);
	const [task, setTask] = useState(null);
	const [times, setTimes] = useState([]);
	const [activeItem, setActiveItem] = useState('');
	
  const Teams = [
		{ key: 'Team 1', text: 'Team 1', value: 'Team 1' },
		{ key: 'Team 2', text: 'Team 2', value: 'Team 2' },
		{ key: 'Team 3', text: 'Team 3', value: 'Team 3' },
		{ key: 'Team 4', text: 'Team 4', value: 'Team 4' },
		{ key: 'Team 5', text: 'Team 5', value: 'Team 5' },
	]
	
  useEffect( () => {
		axios.get(`/api/timesheets`)
		.then( res => {
			setTimesheets(res.data);
			setLoaded(true);
		})
		.catch( err => {
			console.log(err);
		})
    axios.get(`/api/user_tasks`)
		.then( res => {
			setProjects(res.data);
		})
		.catch( err => {
			console.log(err);
		})
	}, [])
	
	const getToday = () => {
		// var d = new Date();
		// document.getElementById("today").innerHTML = d;
	}
	
  const toggleTimesheetForm = () => {
		setShowForm(!showForm);
  }
  
  const decTimesheets = () => {
		if(timeNumber > 0)
			setTimesheet(timeNumber-1);
	}

	const handleStartClick = () => {
		
	}

  const incTimesheets = () => {
		if(timeNumber < timesheets.length-1)
			setTimesheet(timeNumber+1);
	}

	const handleViewClick = (e) => {
		if(e.target.innerText === 'Day')
			setWeekView(false);
		else {
			setTask(null);
			setWeekView(true);
			setActiveItem('');
		}
	}

	const handleItemClick = (name, index) => {
		setTask(times[index]);
		setActiveItem(name);
	};

	const getTimes = (id) => {
		axios.get(`/api/timesheets/${id}`)
			.then(res => {
				setTimes(res.data);
				setLoaded(false);
			})
			.catch( err => {
				console.log(err);
			})
	}
  
  const header = (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='9'>
          <Table.HeaderCell>
			{timesheets.length > 0 ? 
				dateFormat(
					Date.parse(timesheets[timeNumber].start_date.split('T')[0]),  
					"dddd, mmmm dS, yyyy"
				)
			: null }
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Label>Pending Approval</Label>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Button.Group>
				<Button icon='left chevron' 
					onClick={()=> decTimesheets()}
				/>
              <Button content='Today' 
					onClick={()=> getToday()}/>
              <Button icon='right chevron' 
				onClick={()=> incTimesheets()}
				/>
            </Button.Group>
          </Table.HeaderCell>
          <Table.HeaderCell>
          <Popup
            content={<Cal />}
            on='click'
            // pinned
            trigger={<Button icon='calendar alternate outline' />}
          />
          </Table.HeaderCell>
          <Table.HeaderCell>
						<Button.Group buttons={['Day', 'Week']}
							onClick={handleViewClick}
						/>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Dropdown
              button
              floating
              labeled
              options={Teams}
              search
              text='Teammates'
              direction='right'
              />
          </Table.HeaderCell>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    
  )

  const body = () => {
		if(isLoaded) getTimes(timesheets[timeNumber].id);
		if(!times[0])
			return null;
		else {
			return(
				isWeekView ?
					<>
						<TimesheetForm 
							{...props} 
							isEditing={false} 
							toggleTimesheetForm={toggleTimesheetForm} 
							tasks={projects} 
						/>
					</>
				:
					<Table.Body>
						<Table.Row id="days">
							<Table.Cell
								width='1' 
								name='m'
								selectable
								active={activeItem ==='m'}
								onClick={() => handleItemClick('m', 0)}
							>
								<Header as="h3">M</Header>
								<p>{times[0].time}</p>
							</Table.Cell>
							<Table.Cell
								width='1' 
								name='t'
								selectable
								active={activeItem ==='t'}
								onClick={() => handleItemClick('t', 1)}
							>
								<Header as="h3">T</Header>
								<p>{times[1].time}</p>
							</Table.Cell>
							<Table.Cell 
								width='1' 
								name='w'
								selectable
								active={activeItem ==='w'}
								onClick={() => handleItemClick('w', 2)}
							>
								<Header as="h3">W</Header>
								<p>{times[2].time}</p>
							</Table.Cell>
							<Table.Cell 
								width='1' 
								name='th'
								selectable
								active={activeItem ==='th'}
								onClick={() => handleItemClick('th', 3)}
							>
								<Header as="h3">TH</Header>
								<p>{times[3].time}</p>
							</Table.Cell>
							<Table.Cell
							 width='1' 
							 name='f'
							 selectable
							 active={activeItem ==='f'}
							 onClick={() => handleItemClick('f', 4)}
							 >
								<Header as="h3">F</Header>
								<p>{times[4].time}</p>
							</Table.Cell>
							<Table.Cell 
								width='1' 
								name='s'
								selectable
								active={activeItem ==='s'}
								onClick={() => handleItemClick('s', 5)}
							>
								<Header as="h3">S</Header>
								<p>{times[5].time}</p>
							</Table.Cell>
							<Table.Cell
								width='1' 
								name='su'
								selectable
								active={activeItem ==='su'}
								onClick={() => handleItemClick('su', 6)}
							>
								<Header as="h3">Su</Header>
								<p>{times[6].time}</p>
							</Table.Cell>
							<Table.Cell active width='2'>
								<Header as="h3">Weekly Total: {times[7].time}</Header>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				)
			}
	}
  
  const footer = (
    <Fragment>
				{ task ? 
					<Table.Row>
						<Table.Cell width='2'>
							<Header as ="h3">{task.project_title}</Header>
							<p>{task.task_title}</p>
						</Table.Cell>
						<Table.Cell width='5'>
						</Table.Cell>
						<Table.Cell width='1'>
							<p>{task.time}</p>
						</Table.Cell>
						<Table.Cell width='1'>
							<Button 
								basic
								onClick={() => handleStartClick()}
							>
								Start
							</Button>
							<Icon
								name='pencil'
								onClick={() => toggleTimesheetForm(!showForm)}
							>
							</Icon>
						</Table.Cell>
					</Table.Row>
				:
					null
			}
    </Fragment>
	)

  return (
  <Fragment>
    <TimesheetsBar 
			activeItem='timesheet'
		/>
		<div>
      <Table basic>
        {header}
      </Table>
			<Table celled striped columns={9}>
				{ timesheets.length > 0 ? body() : null}
			</Table>
      <Table basic='very' columns={9}>
        {footer}
      </Table>
		</div>
			<Divider />
    </Fragment>
  )
}


export default Timesheet;