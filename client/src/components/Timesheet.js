import React from 'react';
import { Container, Segment, Table, } from 'semantic-ui-react'

const Timesheet = () => (
  <>
  <Container>
    <Segment.Group horizontal>
      <Segment size='large'>Date</Segment>
      <Segment>Pending Approvial</Segment>
      <Segment>Today Button</Segment>
      <Segment>Calendar Button</Segment>
      <Segment>Day/Week slider</Segment>
      <Segment>Teammate drop down</Segment>
    </Segment.Group>
  <Table celled>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell>M</Table.HeaderCell>
        <Table.HeaderCell>T</Table.HeaderCell>
        <Table.HeaderCell>W</Table.HeaderCell>
        <Table.HeaderCell>T</Table.HeaderCell>
        <Table.HeaderCell>F</Table.HeaderCell>
        <Table.HeaderCell>S</Table.HeaderCell>
        <Table.HeaderCell>S</Table.HeaderCell>
        <Table.HeaderCell>Weekly Total:</Table.HeaderCell>
      </Table.Row>
    </Table.Body>
  </Table>

  </Container>
  </>
)


export default Timesheet;