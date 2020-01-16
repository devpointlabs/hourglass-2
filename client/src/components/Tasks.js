//cross off when completed?
//edit/delete function?



import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Header, Menu, Dropdown, Table, Button, } from 'semantic-ui-react';
import axios from 'axios';
import {AuthContext} from '../providers/AuthProvider';
import TaskForm from './TaskForm';


const Tasks = (props) => {
    const [project, setProject] = useState([]);
    const [task, setTask] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [taskForm, setTaskForm] = useState(false);
    const user = useContext(AuthContext);

    useEffect( () => {
        axios.get(`/api/tasks`)
        .then( res =>{
            setTasks(res.data);
        }).catch(err => {
            console.log(err);
        })
    },[taskForm])

    const toggleTaskForm = () => {
        setTaskForm(!taskForm);
    }

    const users = [
		{ key: 1, text: 'User 1', value: 1 },
		{ key: 2, text: 'User 2', value: 2 },
		{ key: 3, text: 'User 3', value: 3 },
	]

    return (
        <>
            <>
            {/* <div className="ui tabular menu">
                <a className="item" href="/projects">
                    Projects
                </a>
                <a className="active item" href="/tasks">
                    Tasks
                </a>
            </div> */}
            <br />
            <Header as='h1'>Tasks</Header>
            </>
                <div class="ui menu">
                    <div class="item">
                        <Button color='purple' onClick={() => toggleTaskForm (!taskForm)}>
                            { TaskForm ? "+ New Task" : "Close Form" }
                        </Button>
                    </div>
                </div>
                
                {taskForm ? 
      
                    <TaskForm {...props} task={task} isEditing={false} toggleTaskForm={toggleTaskForm} />
    
                : 
                    <>
                    <Container>
                    <br />
                    <Segment>
                    {tasks.map(task => {  
                    return <Table striped>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={3}>{task.title}</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Description</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Complete?</Table.HeaderCell>
                            <Table.HeaderCell width={5}>Billable</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Hourly Rate</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Project Id</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Link to={`tasks/${task.id}`}>
                                    {task.title} 
                                </Link>
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
                            <br />
                            <Menu compact>
                                <Dropdown text='Dropdown' options={users} simple item />
                            </Menu>
                        </Table.Row>
                    </Table.Body>
                </Table>
                })
            }
            </Segment>
            </Container>
        </>
    }
</>
)
};

export default Tasks;