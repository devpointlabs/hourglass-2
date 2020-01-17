import React, { Fragment, useState, useEffect, } from 'react';
import { Button, Dropdown, Label, Table, Popup, } from 'semantic-ui-react';
import axios from 'axios';
import Cal from './Calendar';
import TimesheetForm from './TimesheetForm';



const Timesheet = (props) => {
  const [timesheet, setTimesheet] = useState([]);
  const [showForm, setShowForm] = useState(false);
    
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
        setTimesheet(res.data);
      })
   }, [showForm])

  const toggleTimesheetForm = () => {
		setShowForm(!showForm);
  }
  
  const now = Date.now();

  const header = (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='9'>
          <Table.HeaderCell>
          {now}
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Label>Pending Approval</Label>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Button.Group>
              <Button icon='left chevron' />
              <Button content='Today' />
              <Button icon='right chevron' />
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

  const body = (

      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Button color='purple' icon='plus square' />
          </Table.Cell>
          <Table.Cell >
            Monday
            <br />
            {timesheet.monday}
          </Table.Cell>
          <Table.Cell>
            Tuesday
            <br />
            {timesheet.tuesday}
          </Table.Cell>
          <Table.Cell>
            Wednesday
            <br />
            {timesheet.wednesday}
          </Table.Cell>
          <Table.Cell>
            Thursday
            <br />
            {timesheet.thursday}
          </Table.Cell>
          <Table.Cell>
            Friday
            <br />
            {timesheet.friday}
          </Table.Cell>
          <Table.Cell>
            Saturday
            <br />
            {timesheet.saturday}
          </Table.Cell>
          <Table.Cell>
            Sunday
            <br />
            {timesheet.sunday}
          </Table.Cell>
          <Table.Cell>
            Weekly
            <br />
            {timesheet.total_hours}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
  )
  
  const footer = (
    <Fragment>
      <Table.Footer>
        <Table.HeaderCell>
          <Table.Row colSpan='7'>
            <Table.Cell>
            # Project (client)
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
            Programming
            </Table.Cell>
          </Table.Row>
        </Table.HeaderCell>
      </Table.Footer>
    </Fragment>
)

  return (
  <Fragment>
    <div className="ui tabular menu">
      <a className="active item" href="/timesheet">
        Timesheet
      </a>
      <a className="item" href="/pendingapproval">
        Pending Approval
      </a>
      <a className="item" href="/unsubmitted" >
        Unubmitted
      </a>
      <a className="item" href="/archive">
        Archive
      </a>
    </div>

      {showForm ? <TimesheetForm {...props} isEditing={false} toggleTimesheetForm={toggleTimesheetForm} 
      />
      :
        <div>
      <Table basic>
        {header}
      </Table>
      <Table celled striped selectable>
        {body}
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