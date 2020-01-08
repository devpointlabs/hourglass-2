import React, { useState, } from "react";
import axios from "axios";
import { Form, Icon } from "semantic-ui-react";
import { Redirect, Router } from "react-router-dom";

const ProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [client_name, setClient_Name] = useState("")
  const [planned_start, setPlanned_Start] = useState("")
  const [planned_end, setPlanned_End] = useState("")
  const [budget, setBudget] = useState("")
  const [spent, setSpent] = useState("")
  const [cost, setCost] = useState("")
  const [project_admins, setProject_Admins] = useState("")
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

  const handleProject_AdminsChange = (e) => {
      setProject_Admins(e.target.value);
  }

  const handleSubmit = (e) => {
        e.preventDefault();
        if(!props.isEditing) {
            axios.post("/api/projects", {title, description, client_name, planned_start, planned_end, budget, cost, spent, project_admins, complete, } )
            .then( res => {
                return <Redirect to='/projects' />
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            axios.put(`/api/projects/${props.project.id}`, {title, description, client_name, planned_start, planned_end, budget, cost, spent, project_admins, complete, })
            .then( res => {
                props.toggleProjectForm()
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
                    placeholder=''
                    name="title"
                    required
                    onChange={handleTitleChange}
                    value={title}
                    />
                    <Form.Input
                        label="Client Name"
                        placeholder=''
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
                        placeholder=''
                        name="planned start"
                        onChange={handlePlanned_StartChange}
                        value={planned_start}
                    />
                    <Form.Input
                        type='date'
                        label="Planned End"
                        placeholder=''
                        name="planned end"
                        onChange={handlePlanned_EndChange}
                        value={planned_end}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        label="Budget"
                        type='number'
                        placeholder=''
                        name="budget"
                        onChange={handleBudgetChange}
                        value={budget}
                    />
                    <Form.Input
                        type='number'
                        label="Spent"
                        placeholder=''
                        name="spent"
                        onChange={handleSpentChange}
                        value={spent}
                    />
                    <Form.Input
                        type='number'
                        label="Cost"
                        placeholder=''
                        name="cost"
                        onChange={handleCostChange}
                        value={cost}
                    />
                    <Form.Dropdown 
                        label='Project Admins'
                        placeholder=''
                        name='project_admins'
                        onChange={handleProject_AdminsChange}
                        value={project_admins}
                    />
                </Form.Group>
                    <Form.Input
                    label='Description'
                    placeholder=''
                    name='description'
                    required
                    onChange={handleDescriptionChange}
                    value={description}
                    />
                <Form.Group>
                    <Form.Radio
                        label='Completed?'
                        value='false'
                        checked={complete === 'true'}
                        onChange={handleCompleteChange}
                    />
                    <Icon name='checkmark' />
                </Form.Group>
            <Form.Button type='submit'>Update Project</Form.Button>
            </Form>
        </>
  )
}

export default ProjectForm;