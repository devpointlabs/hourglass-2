import React, { useState, useEffect, } from 'react';
import { Button, Dropdown, Icon, Label, Table, Popup, } from 'semantic-ui-react';
import axios from 'axios';
import Cal from './Calendar';


const Teams = [
  { key: 'Team 1', text: 'Team 1', value: 'Team 1' },
  { key: 'Team 2', text: 'Team 2', value: 'Team 2' },
  { key: 'Team 3', text: 'Team 3', value: 'Team 3' },
  { key: 'Team 4', text: 'Team 4', value: 'Team 4' },
  { key: 'Team 5', text: 'Team 5', value: 'Team 5' },
]





const header = (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell colSpan='9'>
        <Table.HeaderCell>
        Wednesday, Responsive Date/Time
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

const Body = () => {
  const [time, setTime] = useState([]);
  
  useEffect( () => {
    axios.get(`/api/timesheets`)
      .then( res => {
        setTime(res.data);
      })
   }, [])
  
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Button color='purple' icon='plus square' />
          </Table.Cell>
          <Table.Cell >
            Monday
            <br />
            5.00
          </Table.Cell>
          <Table.Cell>
            Tuesday
            <br />
            5.00
          </Table.Cell>
          <Table.Cell>
            Wednesday
            <br />
            5.00
          </Table.Cell>
          <Table.Cell>
            Thursday
            <br />
            5.00
          </Table.Cell>
          <Table.Cell>
            Friday
            <br />
            5.00
          </Table.Cell>
          <Table.Cell>
            Saturday
            <br />
            5.00
          </Table.Cell>
          <Table.Cell>
            Sunday
            <br />
            5.00
          </Table.Cell>
          <Table.Cell>
            Weekly
            <br />
            35.00
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    )
  }
  
  const footer = (
  <Table.Footer>
    <Table.HeaderCell colSpan='7'>
      <Table.Row>
        # Project (client)
      </Table.Row>
      <Table.Row>
        Programming
      </Table.Row>
      <Table.Cell>
        something
      </Table.Cell>
    </Table.HeaderCell>
  </Table.Footer>
)

const Timesheet = () => (
  <>
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
    <Table basic>
      {header}
    </Table>
    <Table celled striped selectable>
      <Body/>
    </Table>
    <Table basic>
      {footer}
    </Table>
  </>
)


export default Timesheet;