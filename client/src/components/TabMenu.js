import React from 'react'
import { Tab, Form, Checkbox } from 'semantic-ui-react'

const Panes = (props)=> ( [
  {
    menuItem: 'Time and Materials',
    render: () => <Tab.Pane attached={false}>
      <h4>Hourly Rates</h4>
      <p>We need hourly rates to track your project's billable amount.</p>
      <Form.Group>
        <Form.Input
          type='number'
          min='0.00'
          step="any"
          placeholder='Project Hourly Rate'
          name="hourly rate"
          required
          onChange={props.handleRateChange}
          value={props.rate}
        />$
        <Form.Input 
          width={4}
          placeholder='calculation goes here'
          readOnly
        />
      </Form.Group>
      <h4>Budget</h4>
      <p>Set a budget to track total project expenses.</p>
      <Form.Group>
        <Form.Input
          type='number'
          placeholder='Total Project Fees'
          name="budget"
          required
          // testnonsense is just there so it actually has input, it doesn't do anything or links to anything
          onChange={props.testnonsense}
          value={props.testnonsense}
        />
        $
        <Form.Input 
          width={4}
          placeholder='calculation goes here'
          readOnly
        />
      </Form.Group>
    </Tab.Pane>,
  },
  {
    menuItem: 'Fixed Fee',
    render: () => 
    <Tab.Pane attached={false}>
          <h4>Project Fees</h4>
          <p>Enter the amount you plan to invoice.</p>
          <Form.Group>
            $<Form.Input
              type='number'
              min='0'
              placeholder='Enter Amount'
              name="Invoice"
              onChange={props.testnonsense}
              value={props.testnonsense}
            />
          </Form.Group>
          <h4>Budget</h4>
          <Form.Group>
            <Form.Dropdown placeholder='Total Project Fees'/>
            $
            <Form.Input 
              width={4}
              placeholder='fees'
              name="fees"
              onChange={props.testnonsense}
              value={props.testnonsense}
              readOnly
            />
            </Form.Group>
            <Form.Group>
            <Checkbox label='Budget includes billable and non-billable project expenses.' />
          </Form.Group>
            <h4>Project Fees</h4>
            <p>Enter the amount you plan to invoice.</p>
          <Form.Group>
          <Form.Dropdown placeholder='project hourly rate'/>
            $
            <Form.Input 
              width={4}
              placeholder='calculation goes here'
              readOnly
            />
          </Form.Group>
      </Tab.Pane>,
  },
  {
    menuItem: 'Non-Billable',
    render: () => 
    <Tab.Pane attached={false}>
    <h4>Budget</h4>
      <p>Set a budget to track project progress.</p>
      <Form.Group>
        <Form.Dropdown placeholder='No budget.'/>
        $
        <Form.Input 
          width={4}
          placeholder='calculation goes here'
          readOnly
        />
      </Form.Group>
    </Tab.Pane>,
  },
])

const TabText = (props) => <Tab menu={{ text: true }} panes={Panes(props)} />

export default TabText;