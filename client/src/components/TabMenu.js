import React from 'react'
import { Tab, Form } from 'semantic-ui-react'

const Panes = (props)=> ( [
  {
    menuItem: 'Time and Materials',
    render: () => <Tab.Pane attached={false}>
      <h4>Hourly Rates</h4>
      <p>We need hourly rates to track your project's billable amount.</p>
      <Form.Group>
        <Form.Input
          type='number'
          min='0'
          placeholder='Project Hourly Rate'
          name=""
          required
          onChange=''
          value=''
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
          min='0'
          placeholder='Total Project Fees'
          name="budget"
          required
          onChange={props.handleBudgetChange}
          value={props.budget}
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
          <h4>Placeholder</h4>
          <p>Set a budget to track total project expenses.</p>
          <Form.Group>
            <Form.Input
              type='number'
              min='0'
              placeholder='placeholder'
              name=""
              required
              onChange=''
              value=''
            />$
            <Form.Input 
              width={4}
              placeholder='calculation goes here'
              readOnly
            />
          </Form.Group>
          <h4>Placeholder</h4>
          <p>Set a budget to track total project expenses.</p>
          <Form.Group>
            <Form.Input
              type='number'
              min='0'
              placeholder='placeholder'
              name="budget"
              required
              onChange='{}'
              value='{}'
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
    menuItem: 'Non-Billable',
    render: () => 
    <Tab.Pane attached={false}>
    <h4>Placeholder</h4>
    <p>Set a budget to track total project expenses.</p>
      <Form.Group>
        <Form.Input
          type='number'
          min='0'
          placeholder='Placeholder'
          name=""
          required
          onChange=''
          value=''
        />$
        <Form.Input 
          width={4}
          placeholder='calculation goes here'
          readOnly
        />
      </Form.Group>
      <h4>Placeholder</h4>
      <p>Set a budget to track total project expenses.</p>
      <Form.Group>
        <Form.Input
          type='number'
          min='0'
          placeholder='placeholder'
          name="budget"
          required
          onChange='{handleBudgetChange}'
          value='{budget}'
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
])

const TabText = (props) => <Tab menu={{ text: true }} panes={Panes(props)} />

export default TabText;