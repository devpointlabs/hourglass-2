//NEED: 
//decimal limit on budget, spent, cost.

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Dropdown, Menu, Segment, Table, Progress, Button} from "semantic-ui-react"
import axios from 'axios';
import {AuthContext} from '../providers/AuthProvider';
import ProjectForm from './ProjectForm';


const Projects = (props) => {
	const [projects, setProjects] = useState([]);
	const [project, setProject] = useState({});
	const [projectButton, setProjectButton] = useState("+ New Project");
	const [projectForm, setProjectForm] = useState(false);
	const user = useContext(AuthContext);
	

	useEffect( () => {
		axios.get(`/api/projects`)
		.then( res =>{
			setProjects(res.data);
		}).catch(err => {
			console.log(err);
			})
		},[])
	
	const toggleProjectForm = () => {
		setProjectForm(!projectForm);
		!projectForm ? setProjectButton("Cancel") : setProjectButton("+ New Project");
	}
	

	const ActiveProjects = projects.map ( project => {
			return { key: project.id, text: project.title, value: project.id };
		}
	);


	const Clients = [
		{ key: 1, text: 'Choice 1', value: 1 },
		{ key: 2, text: 'Choice 2', value: 2 },
		{ key: 3, text: 'Choice 3', value: 3 },
	]

	return (
    <>
        <>
    {/* <div className="ui tabular menu">
      <a className="active item" href="/projects">
        Projects
      </a>
      <a className="item" href="/tasks">
        Tasks
      </a>
    </div> */}
    <br />
    <Header as='h1'>Projects</Header>
    </>
      <div class="ui menu">
        <div class="item">
          <Button color='purple' onClick={() => toggleProjectForm (!projectForm)}>
            {projectButton}
          </Button>
        </div>
        <div class="item">
          <div class="ui button">Import</div>
        </div>
        <div class="item">
          <div class="ui button">Export</div>
        </div>
        <div class="right menu">
          <div class="ui input"><input type="text" placeholder="Search..."/></div>
        </div>
      </div>
      
      {projectForm ? 
      
        <ProjectForm {...props} project={project} isEditing={false} toggleProjectForm={toggleProjectForm} />
      
      : 
        <>
          <Menu compact>
            <Dropdown text='Active Projects' options={ActiveProjects} simple item />
            <Dropdown text='All Clients' options={Clients} simple item />
          </Menu>
            <Container>
              <br />
              <Segment>
              {projects.map(project => {  
                return <Table striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={3}>{project.client_name}</Table.HeaderCell>
                      <Table.HeaderCell width={1}>Budget</Table.HeaderCell>
                      <Table.HeaderCell width={1}>Spent</Table.HeaderCell>
                      <Table.HeaderCell width={5}></Table.HeaderCell>
                      <Table.HeaderCell width={1}>Remaining</Table.HeaderCell>
                      <Table.HeaderCell width={2}>Cost</Table.HeaderCell>
                      <Table.HeaderCell width={2}></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Link to={`projects/${project.id}`}>
                          {project.title} 
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        ${project.budget}
                      </Table.Cell>
                      <Table.Cell>
                        ${project.spent}
                      </Table.Cell>
                      <Table.Cell>
                        <br />	
                        <Progress percent={(project.spent/project.budget)*100} color='red' size="small" />
                      </Table.Cell>
                      <Table.Cell>
                        ${project.budget - project.spent}
                      </Table.Cell>
                      <Table.Cell>
                        ${project.cost}
                      </Table.Cell>
                        <br />
                        <Menu compact>
                          <Dropdown text='Dropdown' options={Clients} simple item />
                        </Menu>
                    </Table.Row>
                  </Table.Body>
                </Table>
                  })
                }
              </Segment>
            </Container>
            <br />
            <br />
          </>
        }
    </>
	)
};

export default Projects;