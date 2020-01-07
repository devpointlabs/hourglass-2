import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Header, Table, Button, List } from 'semantic-ui-react';
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
    {projectForm ? <ProjectForm /> 
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
        <Table.HeaderCell>Complete</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Hourglass</Table.Cell>
        <Table.Cell>Timesheet app</Table.Cell>
        <Table.Cell>DPL</Table.Cell>
        <Table.Cell>1/3/20</Table.Cell>
        <Table.Cell>2/1/20</Table.Cell>
        <Table.Cell>budget</Table.Cell>
        <Table.Cell>spent</Table.Cell>
        <Table.Cell>cost</Table.Cell>
        <Table.Cell>complete checkmark</Table.Cell>
      </Table.Row>
    </Table.Body>
    </Table>
    
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width='full'>
            Notes:
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>project notes
          </Table.Cell>
        </Table.Row>
      </Table.Header>
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