import React, { Fragment, useState, useEffect, } from 'react';
import { Button, Dropdown, Label, Table, Popup, Header } from 'semantic-ui-react';
import axios from 'axios';
import Cal from './Calendar';
import TimesheetForm from './TimesheetForm';
import TimesheetsBar from './TimesheetsBar';
import Tasks from './Tasks';

const Timesheet = (props) => {
	const [timesheets, setTimesheets] = useState([]);
	const [timeNumber, setTimesheet] = useState(0);
  const [showForm, setShowForm] = useState(false);
	const [tasks, setTasks] = useState([{description:"Katy Perry Sucks"},{description:"Today is Wednesday"}]);
	
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
      })
   }, [])

  const toggleTimesheetForm = () => {
		setShowForm(!showForm);
  }
  
  const decTimesheets = () => {
		if(timeNumber > 0)
			setTimesheet(timeNumber-1);
	}

  const incTimesheets = () => {
		if(timeNumber < timesheets.length-1)
			setTimesheet(timeNumber+1);
	}

	const getTimes = (id) => {
		axios.get(`/api/timesheets/${id}`)
			.then(res => {
				debugger
				return body(res.data);
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
          {timesheets.length > 0 ? timesheets[timeNumber].start_date : null}
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Label>Pending Approval</Label>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Button.Group>
              <Button icon='left chevron' 
								onClick={()=> decTimesheets()}
							/>
              <Button content='Today' />
              <Button icon='right chevron' 
								onClick={()=> incTimesheets()}
							/>
            </Button.Group>
          </Table.HeaderCell>
          <Table.HeaderCell>
          <Popup
            content={<Cal />}
            on='click'
            pinned
            trigger={<Button icon='calendar alternate outline' />}
          />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Button.Group buttons={['Day', 'Week']} />
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

  const body = (times) => (
      <Table.Body>
        <Table.Row>
          <Table.Cell width='1' selectable>
            <Header as="h3">M</Header>
						<p>{times[0]}</p>
          </Table.Cell>
          <Table.Cell width='1' selectable>
						<Header as="h3">T</Header>
						<p>{times[1]}</p>
          </Table.Cell>
          <Table.Cell width='1' selectable>
						<Header as="h3">W</Header>
						<p>{times[2]}</p>
          </Table.Cell>
          <Table.Cell width='1' selectable>
						<Header as="h3">TH</Header>
						<p>{times[3]}</p>
          </Table.Cell>
          <Table.Cell width='1' selectable>
						<Header as="h3">F</Header>
						<p>{times[4]}</p>
          </Table.Cell>
          <Table.Cell width='1' selectable>
						<Header as="h3">S</Header>
						<p>{times[5]}</p>
          </Table.Cell>
          <Table.Cell width='1' selectable>
						<Header as="h3">Su</Header>
						<p>{times[6]}</p>
          </Table.Cell>
          <Table.Cell active width='2'>
						<Header as="h3">Weekly Total: {times[7]}</Header>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
  )
  
  const footer = (
    <Fragment>
			<Table.HeaderCell>
				<Table.Footer>
						{tasks.map(task => {
							return <Table.Row colSpan='7'>
								<Table.Cell>
									{task.description}
								</Table.Cell>
							</Table.Row>
							})
						}
				</Table.Footer>
			</Table.HeaderCell>
    </Fragment>
	)

  return (
  <Fragment>
    <TimesheetsBar/>
      { showForm ? <TimesheetForm {...props} isEditing={false} toggleTimesheetForm={toggleTimesheetForm} tasks={tasks} 
      />
      :
        <div>
      <Table basic>
        {header}
      </Table>
			<Table celled striped columns={9}>
				{ timesheets.length > 0 ? getTimes(timesheets[timeNumber].id) : null}
			</Table>
      <Table basic>
        {footer}
      </Table>
      </div>
    }
      <Table.Cell>
        <Button onClick={() => toggleTimesheetForm(!showForm)}>
          { showForm ? 'Enter Time' : 'Show Time' }
        </Button>
      </Table.Cell>
    </Fragment>
  )
}


export default Timesheet;