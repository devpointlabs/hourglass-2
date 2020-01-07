import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Header, Table, Button } from 'semantic-ui-react';
import {AuthConsumer} from '../providers/AuthProvider';
import ProjectForm from './ProjectForm';


const Project = (props) => {
  const [project, setProject] = useState([]);
  const [projectForm, setProjectForm] = useState(false);
  const user = useContext(AuthConsumer);
  
  useEffect( () => {
		const { id } = props.match.params;
    axios.get(`/api/projects/${id}`)
    .then( res =>{
			setProject(res.data);
    })
  },[projectForm])

	const toggleProjectForm = () => {
		setProjectForm(!projectForm);
	}

  return (
    <Container>
      <Header>
        Project
      </Header>
      <br />
        <Button onClick={() => toggleProjectForm(!projectForm)}>
          { ProjectForm ? "Edit Project" : "Close Form" }
        </Button>
        <br />
      {projectForm ? <ProjectForm project={project} isEditing={true}  /> 
      :
      <>
      <Table celled striped >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Client Name</Table.HeaderCell>
          <Table.HeaderCell>Planned Start</Table.HeaderCell>
          <Table.HeaderCell>Planned End</Table.HeaderCell>
          <Table.HeaderCell>Budget</Table.HeaderCell>
          <Table.HeaderCell>Spent</Table.HeaderCell>
          <Table.HeaderCell>Cost</Table.HeaderCell>
          <Table.HeaderCell>Project Admins</Table.HeaderCell>
          <Table.HeaderCell>Complete</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>{project.title}</Table.Cell>
          <Table.Cell>{project.description}</Table.Cell>
          <Table.Cell>{project.client_name}</Table.Cell>
          <Table.Cell>{project.planned_start}</Table.Cell>
          <Table.Cell>{project.planned_end}</Table.Cell>
          <Table.Cell>{project.budget}</Table.Cell>
          <Table.Cell>{project.spent}</Table.Cell>
          <Table.Cell>{project.cost}</Table.Cell>
          <Table.HeaderCell>{project.project_admins}</Table.HeaderCell>
          <Table.Cell>{project.complete}</Table.Cell>
        </Table.Row>
      </Table.Body>
      </Table>
    </>
    }
    <br />
    <br />
    <br />
      <Button>Back to Projects</Button>
  </Container>
  )
};


export default Project;