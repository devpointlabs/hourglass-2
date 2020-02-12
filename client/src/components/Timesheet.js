import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Button, Dropdown, Label, Table, Popup, Header, Divider, Icon } from 'semantic-ui-react';
import axios from 'axios';
import Cal from './Calendar';
import TimesheetWeek from './TimesheetWeek';
import TimesheetDay from './TimesheetDay';
import TimesheetsBar from './TimesheetsBar';
import dateFormat from '../tools/dateFormat';
import {AuthContext} from '../providers/AuthProvider';
import Session from './Session';
const DAY = 24 * 60 * 60 * 1000;
const DAYS = ['sunday', "monday", "tuesday", "wednesday", "thursday", "friday", 'saturday', 'sunday'];
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
	const [disabled, setDisabled] = useState([]);
	const [daySessions, setDaySessions] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [activeDay, setActiveDay] = useState(new Date().setHours(0,0,0,0));
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

	const getDay = () => {
		if(activeDay)
			return dateFormat(
				activeDay,  
				"dddd, mmmm dS, yyyy"
			);
	}
	
	const [activeItem, setActiveItem] = useState(getDay());

	const addTask = (task) => {
		setTasks([...tasks, task]);
	}

	const getDayTasks = (id, time) => {
		axios.get(`/api/tasks/${id}`)
			.then(res => {
				console.log(res.data);
				addTask({...res.data, time});
			})
			.catch(err => console.log(err));
	}

  useEffect( () => {
		axios.get(`/api/timesheets`, {params: {active_day: date(activeDay)}})
			.then( res => {
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
		console.log('Rendered again.');
		if(timesheet) {
			checkSameWeek();
			axios.get(`/api/timesheets/${timesheet.id}`)
				.then(res => {
					setDaySessions(res.data);
					daySessions.map(s => {
						return s.sessions != undefined && s.day === DAYS[date(activeDay).getDay()]?
							s.sessions.map(sess => {
								if(sess.total)
									return null;
								getDayTasks(sess.task, sess.time);
							})
						:
							null
					});
				})
				.catch(err => console.log(err))
		}	else {
			setDaySessions([]);
			axios.post(`/api/timesheets/`, {active_day: date(activeDay)})
				.then(res => {
					console.log('created new timesheet.');
					setTimesheet(res.data);
				})
				.catch(err => console.log(err))
		}
		setActiveItem(getDay());
	}, [activeDay, timesheet]);

	const checkSameWeek = () => {
		const bool = (dateParse(timesheet.start_date) - activeDay) / DAY > 0 || 
			(dateParse(timesheet.start_date) - activeDay) / DAY <= -7 ? false : true;
		setSameWeek(bool);
	}

	const date = (datetime) => {
		return (new Date(datetime));
	}

	const dateParse = (str) => {
		const input = str.split('T')[0];
		var parts = input.split('-');
		return new Date(parts[0], parts[1]-1, parts[2]);
	}

	const checkToday = () => {
		const bool = activeDay ?
			datesAreOnSameDay(date(activeDay), date(Date.now()))
		:
			false;
		return bool;
	}

	const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
  
  const decDay = () => {
		setActiveDay(activeDay - DAY);
	}

  const incDay = () => {
		setActiveDay(activeDay + DAY);
	}

	const setDay = (index) => {
		const day = dateParse(timesheet.start_date).getTime() + (DAY * index);
		if(day <= Date.now())
			setActiveDay(day);
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
						{activeItem}
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
						<Button icon='calendar alternate outline' />
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
					<TimesheetDay sessions={daySessions} setDay={setDay} activeDay={DAYS[date(activeDay).getDay()]}/>
				</>
		)
	}
  
  const footer = (
    <Fragment>
			{
				tasks.length > 0?
					tasks.map(task => {
						return task ?
							<Session  task={task} today={checkToday()}/>
						: 
							null
					})
				:
					null
			}
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