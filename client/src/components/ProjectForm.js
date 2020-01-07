import React, { useState, } from "react";
import axios from "axios";
import { Form, Icon } from "semantic-ui-react";

const ProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [client_name, setClient_Name] = useState("")
  const [planned_start, setPlanned_Start ] = useState("")
  const [planned_end, setPlanned_End ] = useState("")
  const [budget, setBudget ] = useState("")
  const [spent, setSpent ] = useState("")
  const [cost, setCost ] = useState("")
  const [project_admin, setProject_Admin ] = useState("")
  const [complete, setComplete] = useState("")


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    }
    
const handleClient_NameChange = (e) => {
    setClient_Name(e.target.value);
    }

    const handlePlanned_StartChange = (e) => {
    setPlanned_Start(e.target.value);
  }

  const handlePlanned_EndChange = (e) => {
    setPlanned_End(e.target.value);
  }

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  }

  const handleSpentChange = (e) => {
    setSpent(e.target.value);
  }
  const handleCostChange = (e) => {
    setCost(e.target.value);
  }

  const handleCompleteChange = (e) => {
      setComplete(e.target.value);
  }

  const handleProject_AdminChange = (e) => {
      setProject_Admin(e.target.value);
  }

  const handleSubmit = (e) => {
		e.preventDefault();
    axios.post("/api/projects", {title, description, client_name, planned_start, planned_end, budget, complete, } )
    .then( res => {
        props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
  }


return (
    <>
        <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
                <Form.Input
                label="Title"
                placeholder="Title"
                name="title"
                required
                onChange={handleTitleChange}
                value={title}
                />
                <Form.Input
                    label="Client Name"
                    placeholder="Client Name"
                    name="client name"
                    required
                    onChange={handleClient_NameChange}
                    value={client_name}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    type='date'
                    label="Planned Start"
                    placeholder="Planned Start"
                    name="planned start"
                    required
                    onChange={handlePlanned_StartChange}
                    value={planned_start}
                />
                <Form.Input
                    type='date'
                    label="Planned End"
                    placeholder="Planned End"
                    name="planned end"
                    required
                    onChange={handlePlanned_EndChange}
                    value={planned_end}
                />
            </Form.Group>
            <Form.Group>
                <Form.Input
                    label="Budget"
                    type='number'
                    placeholder="Budget"
                    name="budget"
                    required
                    onChange={handleBudgetChange}
                    value={budget}
                />
                <Form.Input
                    type='number'
                    label="Spent"
                    placeholder="Spent"
                    name="spent"
                    required
                    onChange={handleSpentChange}
                    value={spent}
                />
                <Form.Input
                    type='number'
                    label="Cost"
                    placeholder="Cost"
                    name="cost"
                    required
                    onChange={handleCostChange}
                    value={cost}
                />
            </Form.Group>
            <Form.Input
              label='Description'
              placeholder='Description'
              name='description'
              required
              onChange={handleDescriptionChange}
              value={description}
            />
            <Form.Input 
                label='Project Admin'
                placeholder={project_admin}
                name='project_admin'
                required
                onChange={handleProject_AdminChange}
                value={project_admin}
            />
            <Form.Group>
                <Form.Radio
                    label='Completed?'
                    value='no'
                    checked={complete === 'yes'}
                    onChange={handleCompleteChange}
                />
                <Icon name='checkmark' />
            </Form.Group>
        <Form.Button>Update Project</Form.Button>
        </Form>
    </>
  )
}

export default ProjectForm;