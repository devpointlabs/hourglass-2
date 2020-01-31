import React, { useState, useEffect} from 'react';
import { Table, Header} from 'semantic-ui-react';

const TimesheetDay = (props) => {

	const [times, setTimes] = useState(props.sessions);
	const [activeItem, setActiveItem] = useState(props.activeDay);
	const handleItemClick = (name, index) => {
		setActiveItem(name);
		props.setDay(index);
	};

	useEffect(() => {
		setActiveItem(props.activeDay);
		setTimes(props.sessions);
	}, [props.sessions, props.activeDay])

	return (
		<Table.Body>
			{times[0] !== undefined ?
				<Table.Row>
					<Table.Cell
						width='1' 
						name='monday'
						selectable
						active={activeItem ==='monday'}
						onClick={() => handleItemClick('monday', 0)}
					>
						<Header as="h3">M</Header>
						<p>{times[0].sessions[times[0].sessions.length-1].total}</p>
					</Table.Cell>
					<Table.Cell
						width='1' 
						name='tuesday'
						selectable
						active={activeItem ==='tuesday'}
						onClick={() => handleItemClick('tuesday', 1)}
					>
						<Header as="h3">T</Header>
						<p>{times[1].sessions[times[1].sessions.length-1].total}</p>
					</Table.Cell>
					<Table.Cell 
						width='1' 
						name='wednesday'
						selectable
						active={activeItem ==='wednesday'}
						onClick={() => handleItemClick('wednesday', 2)}
					>
						<Header as="h3">W</Header>
						<p>{times[2].sessions[times[2].sessions.length-1].total}</p>
					</Table.Cell>
					<Table.Cell 
						width='1' 
						name='thursday'
						selectable
						active={activeItem ==='thursday'}
						onClick={() => handleItemClick('thursday', 3)}
					>
						<Header as="h3">TH</Header>
						<p>{times[3].sessions[times[3].sessions.length-1].total}</p>
					</Table.Cell>
					<Table.Cell
						width='1' 
						name='friday'
						selectable
						active={activeItem ==='friday'}
						onClick={() => handleItemClick('friday', 4)}
						>
						<Header as="h3">F</Header>
						<p>{times[4].sessions[times[4].sessions.length-1].total}</p>
					</Table.Cell>
					<Table.Cell 
						width='1' 
						name='saturday'
						selectable
						active={activeItem ==='saturday'}
						onClick={() => handleItemClick('saturday', 5)}
					>
						<Header as="h3">S</Header>
						<p>{times[5].sessions[times[5].sessions.length-1].total}</p>
					</Table.Cell>
					<Table.Cell
						width='1' 
						name='sunday'
						selectable
						active={activeItem ==='sunday'}
						onClick={() => handleItemClick('sunday', 6)}
					>
						<Header as="h3">Su</Header>
						<p>{times[6].sessions[times[6].sessions.length-1].total}</p>
					</Table.Cell>
					<Table.Cell active width='2'>
						<Header as="h3">Weekly Total: {times[7]}</Header>
					</Table.Cell>
				</Table.Row>
			:
				<Table.Row>
					<Table.Cell
						width='1' 
						name='monday'
						selectable
						active={activeItem ==='monday'}
						onClick={() => handleItemClick('monday', 0)}
					>
						<Header as="h3">M</Header>
						<p>0:00</p>
					</Table.Cell>
					<Table.Cell
						width='1' 
						name='tuesday'
						selectable
						active={activeItem ==='tuesday'}
						onClick={() => handleItemClick('tuesday', 1)}
					>
						<Header as="h3">T</Header>
						<p>0:00</p>
					</Table.Cell>
					<Table.Cell 
						width='1' 
						name='wednesday'
						selectable
						active={activeItem ==='wednesday'}
						onClick={() => handleItemClick('wednesday', 2)}
					>
						<Header as="h3">W</Header>
						<p>0:00</p>
					</Table.Cell>
					<Table.Cell 
						width='1' 
						name='thursday'
						selectable
						active={activeItem ==='thursday'}
						onClick={() => handleItemClick('thursday', 3)}
					>
						<Header as="h3">TH</Header>
						<p>0:00</p>
					</Table.Cell>
					<Table.Cell
						width='1' 
						name='friday'
						selectable
						active={activeItem ==='friday'}
						onClick={() => handleItemClick('friday', 4)}
						>
						<Header as="h3">F</Header>
						<p>0:00</p>
					</Table.Cell>
					<Table.Cell 
						width='1' 
						name='saturday'
						selectable
						active={activeItem ==='saturday'}
						onClick={() => handleItemClick('saturday', 5)}
					>
						<Header as="h3">S</Header>
						<p>0:00</p>
					</Table.Cell>
					<Table.Cell
						width='1' 
						name='sunday'
						selectable
						active={activeItem ==='sunday'}
						onClick={() => handleItemClick('sunday', 6)}
					>
						<Header as="h3">Su</Header>
						<p>0:00</p>
					</Table.Cell>
					<Table.Cell active width='2'>
						<Header as="h3">Weekly Total: 0:00</Header>
					</Table.Cell>
				</Table.Row>
			}
			</Table.Body>
	)
}

export default TimesheetDay;