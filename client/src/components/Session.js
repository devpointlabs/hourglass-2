import React, { useState, useEffect, useContext } from 'react';
import {AuthContext} from '../providers/AuthProvider';
import { Input, Table, Header, Button, Icon } from 'semantic-ui-react';

const TIME_FORMAT = /^([0-9]{2}:[0-9]{2})$/;

const Session = (props) => {

	const [editing, setEditing] = useState(false);
	const {task} = props;
	const context = useContext(AuthContext);
	const [timerOn, setTimerOn] = useState(context.timerOn());
	const [hasError, setHasError] = useState(false);
	const [time, setTime] = useState(task.time);

	useEffect(() => {
	
	}, [time]);

	const handleStartClick = () => {
		context.startTimer();
		setTimerOn(context.timerOn());
	}

	const validatedTime = (str) => {
		console.log(str);
		return TIME_FORMAT.test(str);
	}

	const handleStopClick = () => {
		context.stopTimer();
		setTimerOn(context.timerOn());
	}

	const handleChange = (e) => {
		setTime(e.target.value);
		setHasError(!validatedTime(time));
	}

	return(
		<Table.Row>
			<Table.Cell width='2'>
				<Header as ="h3">{task.project}</Header>
				<p>{task.task}</p>
			</Table.Cell>
			<Table.Cell width='5'>
			</Table.Cell>
			<Table.Cell width='1'>
				{
					editing ?
						<Input 
							focus
							label={hasError? '00:00' : null}
							placeholder='Enter Time'
							onChange={handleChange}
							error={hasError}
						/>
					:
						<p>{time}</p>
				}
			</Table.Cell>
			<Table.Cell width='1'>
				{ props.today ?
						timerOn ?
							<Button 
								basic
								onClick={() => handleStopClick()}
							>
								Stop
							</Button>
						:
							<Button 
								basic
								onClick={() => handleStartClick()}
							>
								Start
							</Button>
					:
						null
				}
				<Icon
					name='pencil'
					onClick={() => setEditing(!editing)}
				>
				</Icon>       
			</Table.Cell>
		</Table.Row>
	);
}

export default Session;