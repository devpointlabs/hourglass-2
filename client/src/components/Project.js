//NEED
//styling needs work
//complete boolean not populating
//project admins not populating(as we haven't assigned any?)
//function to pull all users
//make task button toggle the task form


import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Header, Table, Button, Menu, Dropdown, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../providers/AuthProvider';
import ProjectForm from './ProjectForm';
import Task from './Task';
import TaskForm from './TaskForm';


const Project = (props) => {
  const [project, setProject] = useState([]);
  const [projectForm, setProjectForm] = useState(false);
  const user = useContext(AuthContext);
  
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
      <br />
      <Header as='h1'>
      {project.title}
      </Header>
      <br />
        <Button color='purple' onClick={() => toggleProjectForm(!projectForm)}>
          { ProjectForm ? "Edit Project" : "Close Form" }
        </Button>
        <br />
      {projectForm ? <ProjectForm {...props} project={project} isEditing={true} toggleProjectForm={toggleProjectForm} 
      /> 
      : 
      <>
      <Segment>
        <Table celled striped >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Project Code</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Client Name</Table.HeaderCell>
              <Table.HeaderCell>Planned Start</Table.HeaderCell>
              <Table.HeaderCell>Planned End</Table.HeaderCell>
              <Table.HeaderCell>Project Type</Table.HeaderCell>
              <Table.HeaderCell>Budget</Table.HeaderCell>
              <Table.HeaderCell>Spent</Table.HeaderCell>
              <Table.HeaderCell>Cost</Table.HeaderCell>
              <Table.HeaderCell>Project Admins</Table.HeaderCell>
              <Table.HeaderCell>All Users</Table.HeaderCell>
              <Table.HeaderCell>Complete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>'project.code'</Table.Cell>
              <Table.Cell>{project.description}</Table.Cell>
              <Table.Cell>{project.client_name}</Table.Cell>
              <Table.Cell>{project.planned_start}</Table.Cell>
              <Table.Cell>{project.planned_end}</Table.Cell>
              <Table.Cell>'project.type'</Table.Cell>
              <Table.Cell>{project.budget}</Table.Cell>
              <Table.Cell>{project.spent}</Table.Cell>
              <Table.Cell>{project.cost}</Table.Cell>
              <Table.Cell>{project.project_admins}</Table.Cell>
              <Table.Cell>{project.all_users}</Table.Cell>
              <Table.Cell>{project.complete}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        </Segment>
        <Segment>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                  <Table.HeaderCell width={5}>Title</Table.HeaderCell>
                  <Table.HeaderCell width={5}>Description</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Complete?</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Billable</Table.HeaderCell>
                  <Table.HeaderCell width={3}>Hourly Rate</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Project Id</Table.HeaderCell>
                  <Table.HeaderCell width={3}>Owner</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                  <Table.Cell>
                    task.title
                  </Table.Cell>
                  <Table.Cell>
                      task.description
                  </Table.Cell>
                  <Table.Cell>
                      task.complete
                  </Table.Cell>
                  <Table.Cell>
                      task.billable
                  </Table.Cell>
                  <Table.Cell>
                      $task.price_per_hour
                  </Table.Cell>
                  <Table.Cell>
                      task.project_id
                  </Table.Cell>
                  <Table.Cell>
                      task.user_id
                  </Table.Cell>
              </Table.Row>
          </Table.Body>
      </Table>
          <Button inverted color='purple'>
            <Link to=''>
              +  New Task
            </Link>
          </Button>
    </Segment>
    </>
    }
    <br />
      <Button color='purple'>
        <Link to={`/projects`}>
          Back to Projects
        </Link>
      </Button>
    </Container>
  )
};


export default Project;