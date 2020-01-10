//NEED:
//project admin dropdown field populated with users associated with the project
//'edit form' button to disappear upon form render
//complete boolean button functionality not working
//function to add a user??? or would we like that to live somewhere else?

import React, { useState, } from "react";
import axios from "axios";
import { Form, Icon } from "semantic-ui-react";
import { Redirect, Router } from "react-router-dom";

const ProjectForm = (props) => {
  const [title, setTitle] = useState(props.project.title);
  const [description, setDescription] = useState(props.project.description);
  const [client_name, setClient_Name] = useState(props.project.client_name)
  const [planned_start, setPlanned_Start] = useState(props.project.planned_start)
  const [planned_end, setPlanned_End] = useState(props.project.planned_end)
  const [budget, setBudget] = useState(props.project.budget)
  const [spent, setSpent] = useState(props.project.spent)
  const [cost, setCost] = useState(props.project.cost)
  const [project_admins, setProject_Admins] = useState(props.project.project_admins)
  const [complete, setComplete] = useState(props.project.complete)


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

  const handleProject_AdminsChange = (e) => {
      setProject_Admins(e.target.value);
  }

  const handleCompleteChange = (e) => {
      setComplete(e.target.value);
  }

  const handleSubmit = (e) => {
        e.preventDefault();
        if(!props.isEditing) {
            axios.post(`/api/projects`, {title, description, client_name, planned_start, planned_end, budget, cost, spent, project_admins, complete, } )
            .then( res => {
								props.toggleProjectForm();
                return <Redirect to='/projects' />
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            axios.put(`/api/projects/${props.project.id}`, {title, description, client_name, planned_start, planned_end, budget, cost, spent, project_admins, complete, })
            .then( res => {
                props.toggleProjectForm();
            })
            };
        }



    return (
        <>
        <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input
                    label="Title"
                    placeholder='Title'
                    name="title"
                    required
                    onChange={handleTitleChange}
                    value={title}
                    />
                    <Form.Input
                        label="Client Name"
                        placeholder='Client Name'
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
                        placeholder='Planned Start Date'
                        name="planned start"
                        required
                        onChange={handlePlanned_StartChange}
                        value={planned_start}
                    />
                    <Form.Input
                        type='date'
                        label="Planned End"
                        placeholder='Planned End Date'
                        name="planned end"
                        required
                        onChange={handlePlanned_EndChange}
                        value={planned_end}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        type='number'
                        min='0'
                        label="Budget"
                        placeholder='Budget'
                        name="budget"
                        required
                        onChange={handleBudgetChange}
                        value={budget}
                    />
                    <Form.Input
                        type='number'
                        min='0'
                        label="Spent"
                        placeholder='Spent'
                        name="spent"
                        required
                        onChange={handleSpentChange}
                        value={spent}
                    />
                    <Form.Input
                        type='number'
                        min='0'
                        label="Cost"
                        placeholder='Cost'
                        name="cost"
                        required
                        onChange={handleCostChange}
                        value={cost}
                    />
                    <Form.Dropdown 
                        label='Project Admins'
                        placeholder='Project Admins'
                        name='project_admins'
                        required
                        onChange={handleProject_AdminsChange}
                        value={project_admins}
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
                <Form.Group>
                    <Form.Checkbox
                        type='checkbox'
                        label='Completed?'
                        checked={complete === 'true'}
                        onChange={handleCompleteChange}
                        value={complete}
                    />
                </Form.Group>
            <Form.Button inverted color="purple" type='submit'>Submit</Form.Button>
            </Form>
        </>
  )
}

export default ProjectForm;