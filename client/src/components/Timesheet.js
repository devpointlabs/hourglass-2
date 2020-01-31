import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button, Dropdown, Label, Table, Popup, Header, Divider, Icon } from 'semantic-ui-react';
import axios from 'axios';
import Cal from './Calendar';
import TimesheetWeek from './TimesheetWeek';
import TimesheetDay from './TimesheetDay';
import TimesheetsBar from './TimesheetsBar';
import dateFormat from '../tools/dateFormat';
import {AuthContext} from '../providers/AuthProvider';
const DAY = 24 * 60 * 60 * 1000;
const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", 'saturday', 'sunday'];
/**
 * TO DO:
 * 1. Add Default timesheet of current week, (start date = monday)
 * 		Add Week / Day Views
 * 		Week ===>
 * 2. Add Button to button of time sheet form that can add a new row
 * Select Project and Task when adding new row
 * 		Day ===>
 * 3. Start timer button on row
 * 4. Submit button that moves timesheet to pending approvals
 * 5. Add approval feature only to admins of project that the task is assigned to
 *
 */

const Timesheet = (props) => {
	const [timesheet, setTimesheet] = useState(null);
	const [isWeekView, setWeekView] = useState(false);
	const [projects, setProjects] = useState([]);
	const [activeItem, setActiveItem] = useState('');
	const [daySessions, setDaySessions] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [activeDay, setActiveDay] = useState(Date.now());
	const context = useContext(AuthContext);
	const [sameWeek, setSameWeek] = useState(true);
	const [stopWatchTime, setStopTime] = useState(context.getTime());
	const [showTimer, setShowTimer] = useState(false);
	const [timerOn, setTimerOn] = useState(context.timerOn());
	const [buttonPressed, setButtonPressed] = useState(false); 
	
  const Teams = [
		{ key: 'Team 1', text: 'Team 1', value: 'Team 1' },
		{ key: 'Team 2', text: 'Team 2', value: 'Team 2' },
		{ key: 'Team 3', text: 'Team 3', value: 'Team 3' },
		{ key: 'Team 4', text: 'Team 4', value: 'Team 4' },
		{ key: 'Team 5', text: 'Team 5', value: 'Team 5' },
	]
	
  useEffect( () => {
		axios.get(`/api/timesheets`, {params: {active_day: date(activeDay)}})
			.then( res => {
				console.log("Grabbing timesheet...", res.data);
				setTimesheet(res.data);
			})
			.catch( err => {
				console.log(err);
			})
    axios.get(`/api/user_tasks`)
			.then( res => {
				setProjects(res.data);
			})
			.catch( err => {
				console.log(err);
			})
	}, [ , sameWeek])

	useEffect( ()=> {
		const {hours, minutes, seconds} = context.getTime();
		setStopTime(hours+':'+minutes+":"+seconds);
	}, [context.time])

	useEffect( () => {
		setTimerOn(context.timerOn());
	}, [buttonPressed])

	useEffect( () => {
		console.log(date(activeDay));
		if(timesheet) {
			setSameWeek(Date.parse(timesheet.start_date) > activeDay);
			axios.get(`/api/timesheets/${timesheet.id}`)
				.then(res => {
					setDaySessions(res.data);
					daySessions.map(s => {
						return s.sessions != undefined ?
							s.sessions.filter(sess => {
								if(sess.task == undefined)
									return;
								setProjectTask(sess.task);
							})
						:
							null
					});
				})
				.catch(err => console.log(err))
		}	else {
			console.log('creating new timesheet.');
			setDaySessions([]);
			axios.post(`/api/timesheets/`)
				.then(res => {
					console.log(res.data);
					setTimesheet(res.data);
				})
				.catch(err => console.log(err))
		}
	}, [activeDay, timesheet])

	const setProjectTask = (id) => {
		axios.get(`/api/tasks/${id}`)
			.then(res => {
				setTasks([...tasks, res.data]);
			})
			.catch(err => console.log(err));
	}

	const getDay = () => {
		if(activeDay)
			return dateFormat(
				activeDay,  
				"dddd, mmmm dS, yyyy"
			);
	}

	const date = (datetime) => {
		return (new Date(datetime));
	}

	const checkToday = () => {
		if(activeDay)
		return date(activeDay).getDay() === date(Date.now()).getDay();
	}
  
  const decDay = () => {
		setActiveDay(activeDay - DAY);
		
	}

  const incDay = () => {
		setActiveDay(activeDay + DAY);
	}

	const setDay = (index) => {
		setActiveDay(Date.parse(timesheet.start_date) + (DAY * index));
	}

	// const handleStartClick = () => {
	// 	const {task_id, session_id} = task;
	// 	context.startTimer(task_id, session_id);
	// 	setShowTimer(true);
	// 	setButtonPressed(!buttonPressed);
	// }
	const handleStopClick = () => {
		context.stopTimer();
		setButtonPressed(!buttonPressed);
	}

	const handleViewClick = (e) => {
		if(e.target.innerText === 'Day') {
			setWeekView(false);
			setActiveDay(Date.now());
		}
		else {
			setWeekView(true);
			setActiveItem('');
			setActiveDay(null);
		}
	}

  const header = (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='9'>
          <Table.HeaderCell>
						{
							getDay()
						}
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Label>Pending Approval</Label>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Button.Group>
							<Button icon='left chevron'    
								onClick={()=> decDay()}
							/>
							<Button content='Today' 
								onClick={()=> setActiveDay(Date.now())}/>
							<Button icon='right chevron'
								disabled={checkToday()} 
								onClick={()=> incDay()}
							/>
            </Button.Group>
          </Table.HeaderCell>
          <Table.HeaderCell>
						<Popup
							content={<Cal />}
							on='click'
							// pinned
							trigger={<Button icon='calendar alternate outline' />}
						/>
          </Table.HeaderCell>
          <Table.HeaderCell>
						<Button.Group buttons={['Day', 'Week']}
							onClick={handleViewClick}
						/>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Dropdown
              button
              floating
              labeled
              options={Teams}
              search
              text='Teammates'
              direction='right'
              />
          </Table.HeaderCell>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    
  )

  const body = () => {
		return(
			isWeekView ?
				<>
					<TimesheetWeek
						{...props} 
						isEditing={false} 
						tasks={projects} 
					/>
				</>
			:
				<>
					<TimesheetDay sessions={daySessions} setDay={setDay} activeDay={DAYS[date(activeDay).getDay()-1]}/>
				</>
		)
	}
  
  const footer = (
    <Fragment>
				{/* { task ?
					<> 
						<Table.Row>
							<Table.Cell width='2'>
								<Header as ="h3">{task.project_title}</Header>
								<p>{task.task_title}</p>
							</Table.Cell>
							<Table.Cell width='5'>
							</Table.Cell>
							<Table.Cell width='1' textAlign='right'>
								<p>{task.time} {showTimer? '+ ' + stopWatchTime : null}</p>
							</Table.Cell>
							<Table.Cell width='1'>
									{showTimer ?
										!timerOn?
											<Button 
												basic
												onClick={() => handleStartClick()}
											>
												Start
											</Button>
										:
											<Button 
												basic
												onClick={() => handleStopClick()}
											>
												Stop
											</Button>
									:
										timerOn?
											<Header as='h4'>Timer running...</Header>
										:
											null
								}
								<Icon
									name='pencil'
								>
								</Icon>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell width='2'>
							</Table.Cell>
							<Table.Cell width='5'>
							</Table.Cell>
							<Table.Cell width='2' textAlign='right'>
								<Header>Daily Total: {task.time}</Header>
							</Table.Cell>
							<Table.Cell width='1'>
							</Table.Cell>
						</Table.Row>
					</>
				:
					null
			} */}
    </Fragment>
	)

  return (
  <Fragment>
    <TimesheetsBar 
			activeItem='timesheet'
		/>
		<div>
      <Table basic>
        {header}
      </Table>
			<Table celled striped columns={9}>
				{body()}
			</Table>
      <Table basic='very' columns={9}>
        {footer}
      </Table>
		</div>
    </Fragment>
  )
}


export default Timesheet;