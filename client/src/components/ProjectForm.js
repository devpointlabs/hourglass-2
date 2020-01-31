//NEED:
//client dropdown menu to populate with available clients
//project admin dropdown field populated with users associated with the project
// do we want a project complete button?

import React, { useState, Fragment } from "react";
import axios from "axios";
import { Form, GridColumn, Button, Grid, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import Search from "./Search";
import TabMenu from './TabMenu';

const ProjectForm = (props) => {
  const [title, setTitle] = useState(props.project.title);
  const [description, setDescription] = useState(props.project.description);
  const [client_name, setClient_Name] = useState(props.project.client_name);
  const [planned_start, setPlanned_Start] = useState(props.project.planned_start);
  const [planned_end, setPlanned_End] = useState(props.project.planned_end);
  const [budget, setBudget] = useState(props.project.budget);
  const [spent, setSpent] = useState(props.project.spent);
  const [cost, setCost] = useState(props.project.cost);
  const [project_admins, setProject_Admins] = useState(props.project.project_admins);
  const [project_users, setProject_Users] = useState(props.project.all_users);
  const [complete, setComplete] = useState(props.project.complete);

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
	
    const addProjectUser = (user) => {
			project_users ?
				setProject_Users([...project_users,user])
			:
        setProject_Users([user]);
		}
		
    const deleteProjectUser = (user) => {
        setProject_Users(project_users.filter(u => {
			if(user.id !== u.id)
				return u;
			}));
		}
		
    const handleCompleteChange = (e) => {
        setComplete(e.target.value);
    }

    const clientOptions = [
        { key: 'Client 1', text: 'Client 1', value: 'Client 1' },
        { key: 'Client 2', text: 'Client 2', value: 'Client 2' },
        { key: 'Client 3', text: 'Client 3', value: 'Client 3' },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!props.isEditing) {
            axios.post(`/api/projects`, {title, description, client_name, planned_start, planned_end, budget, cost, spent, project_admins, complete, } )
            .then( res => {
                props.toggleProjectForm();
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            axios.put(`/api/projects/${props.project.id}`, {title, description, client_name, planned_start, planned_end, budget, cost, spent, project_admins, complete, })
            .then( res => {
            props.toggleProjectForm();
            window.location.reload();
            })
            };
        }

    return (
        <>
        <br />
        <h2>New Project</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Dropdown
                    width={9}
                    fluid
                    selection
                    label="Client"
                    placeholder='Choose a client...'
                    options={clientOptions}
                    onChange={handleClient_NameChange}
                    value={client_name}
                />
                <Form.Input
                    label='+ New Client'
                    width={3}
                    placeholder='+ New Client'
                    name="client name"
                    onChange={handleClient_NameChange}
                    value={client_name}
                />
            </Form.Group>
            <Form.Group> 
                <Form.Input
                width={9}
                label="Project Name"
                placeholder='Project Name'
                name="title"
                required
                onChange={handleTitleChange}
                value={title}
                />
                <Form.Input 
                    width={2}
                    fluid label='Project Code' 
                    placeholder={props.project.id}
                    readOnly 
                />
            </Form.Group>
            <Form.Group> 
            </Form.Group>
            <Form.Group widths={4}>
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
                    width={16}
                    label='Notes'
                    placeholder=''
                    name='description'
                    onChange={handleDescriptionChange}
                    value={description}
                />
            </Form.Group>
                <br />
                <hr />
                <br />
            <Form.Group>
                <h4>Project Type</h4>
                <TabMenu />
            </Form.Group>
                <br />
                <hr />
                <br />
            <Form.Group>
                <h4>Team</h4>
                <br />
            </Form.Group>
            <Form.Group>
            <Grid relaxed columns={4}>
                { project_users ? project_users.map(user => {
                    return(
                        <Fragment key={user.id}>
                            <GridColumn>
                                <Button 
                                    icon
                                    labelPosition='right'
                                    color='purple'
                                    onClick={()=> deleteProjectUser(user)}
                                >
                                    {user.first_name + " " + user.last_name}
                                    <Icon circular name='x' />
                                </Button>
                            </GridColumn>
                        </Fragment>
                        )
                    })
                :
                    null
                }
            </Grid>
            </Form.Group>
                <Search type="users" add={addProjectUser} current={project_users}/>
            <br />
        <Form.Button inverted color="purple" type='submit'>Submit</Form.Button>
        <br />
        </Form>
        <br />
        <br />
        <br />
        <br/>
        </>
  )
}

export default ProjectForm;

