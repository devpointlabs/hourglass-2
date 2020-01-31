//NEED
//styling needs work
//complete boolean not populating
//project admins not populating(as we haven't assigned any?)
//function to pull all users
//do we need to update schema to include project type??

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Header, Table, Button, Segment, } from 'semantic-ui-react';
import {Link, Redirect} from 'react-router-dom';
import {AuthContext} from '../providers/AuthProvider';
import ProjectForm from './ProjectForm';
import TaskForm from './TaskForm';


const Project = (props) => {
  const [project, setProject] = useState([]);
  const [projectForm, setProjectForm] = useState(false);
  const user = useContext(AuthContext);
  const [taskForm, setTaskForm] = useState(false);
  const [taskEditForm, setTaskEditForm] = useState(false);
  const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState([]);
	const [addTaskButton, setTaskButton] = useState('+ Add Task');
	const [projectFormButton, setProjectButton] = useState('Edit Project');
  
  useEffect( () => {
		const { id } = props.match.params;
    axios.get(`/api/projects/${id}`)
    .then( res =>{
			setProject(res.data);
    })
    axios.get(`/api/projects/${id}/tasks`)
    .then( res =>{
			setTasks(res.data);
    })
  },[])

	const toggleProjectForm = () => {
		setProjectForm(!projectForm);
		!projectForm ? setProjectButton("Cancel") : setProjectButton("Edit Project");
  }

  const toggleTaskForm = () => {
		setTaskForm(!taskForm);
		!taskForm ? setTaskButton("Cancel") : setTaskButton("+ Add Task");
  }

  const toggleTaskEditForm = () => {
    setTaskEditForm(!taskEditForm);
  } 
  
  const handleDeleteTask = (task) => {
    const { id } = props.match.params;
    axios.delete(`/api/projects/${id}/tasks/${task.id}`)
    .then( res => {
      setTasks(tasks.filter(t => {
        if (t.id !== task.id)
        return t
      }))
    })
  }

  const handleDeleteProject = () => {
    const { id } = props.match.params;
    axios.delete(`/api/projects/${id}`)
    .then( res => {
      return <Redirect to='/projects' />
    })
    .catch(err => {
			console.log(err);
    })
  } 

  
  return (
    <Container>
      <br />
      <Header as='h1'>
      {project.title}
      </Header>
      <br />
        <Button color='purple' onClick={() => toggleProjectForm(!projectForm)}>
          { projectFormButton}
        </Button>
        <Button color='red' onClick={() => handleDeleteProject(project)}>Delete Project
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
              <Table.Cell>{project.id}</Table.Cell>
              <Table.Cell>{project.description}</Table.Cell>
              <Table.Cell>{project.client_name}</Table.Cell>
              <Table.Cell>{project.planned_start}</Table.Cell>
              <Table.Cell>{project.planned_end}</Table.Cell>
              <Table.Cell>
                {/* 'project.type' */}
                </Table.Cell>
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
            <Header>Tasks</Header>
            <Button color='purple' onClick={() => toggleTaskForm(!taskForm)}>
              { addTaskButton }
            </Button>
            {taskForm ? <TaskForm {...props} project_id={project.id}  project_title={project.title} isEditing={false} toggleTaskForm={toggleTaskForm} 
        /> 
        : null }
        {tasks.map(task => {
          return ( 
            <>
							<Table celled striped>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell width={5}>Task</Table.HeaderCell>
										<Table.HeaderCell width={5}>Description</Table.HeaderCell>
										<Table.HeaderCell width={1}>Complete?</Table.HeaderCell>
										<Table.HeaderCell width={1}>Billable</Table.HeaderCell>
										<Table.HeaderCell width={3}>Hourly Rate</Table.HeaderCell>
										<Table.HeaderCell width={2}>Project Code</Table.HeaderCell>
										<Table.HeaderCell width={3}>Owner</Table.HeaderCell>
										<Table.Cell width={3}>
                      <Button 
                        inverted
                        color='purple'
												icon='pencil'
												onClick={() => toggleTaskEditForm(!taskEditForm)}
												/>
										</Table.Cell>
									</Table.Row>
								</Table.Header> 
								<>
									<Table.Body>
										<Table.Row>
												<Table.Cell>
													{task.title}
												</Table.Cell>
												<Table.Cell>
														{task.description}
												</Table.Cell>
												<Table.Cell>
														{task.complete}
												</Table.Cell>
												<Table.Cell>
														{task.billable}
												</Table.Cell>
												<Table.Cell>
														${task.price_per_hour}
												</Table.Cell>
												<Table.Cell>
														{task.project_id}
												</Table.Cell>
												<Table.Cell>
														{task.user_id}
												</Table.Cell>
												<Table.Cell>
                          <Button 
                            inverted
                            color='red'
                            icon='trash'
														onClick={() => handleDeleteTask(task)} 
														/>
												</Table.Cell>
										</Table.Row>
									</Table.Body>
								</>
							</Table>
						{taskEditForm ? <TaskForm {...task} project_id={task.project_id} isEditing={true} taskEditForm={toggleTaskEditForm}
							/> : null }
					</>
        )}
        )}
        <br />
        </Segment>
        </>
    }
    <br />
      <Button inverted color='purple'>    
        <Link to={`/projects`}>
          Back to Projects
        </Link>
      </Button>
      <br /> 
      <br /> 
      <br /> 
      <br /> 
      <br /> 
      <br /> 
      <br /> 
    </Container>
  )
};


export default Project;