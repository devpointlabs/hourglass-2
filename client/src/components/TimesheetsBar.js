import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const TimesheetsBar = (props) => {
	
	
	const [activeItem, setActiveItem] = useState(props.activeItem)
	const handleItemClick = (e, { name }) => setActiveItem( name )
	
	return (
		<>
			<Menu pointing secondary>
				<Link 
					to="/timesheet"
					>
				<Menu.Item
					name="timesheet"
					active={activeItem === 'timesheet'} 
					onClick={handleItemClick}
				>
						Timesheet
				</Menu.Item>
					</Link>
					<Link 
						to="/pendingapproval"
						>
				<Menu.Item
					name="pendingapproval"
					active={activeItem === 'pendingapproval'} 
					onClick={handleItemClick}
				>
						Pending Approval
				</Menu.Item>
					</Link>
					<Link to="/unsubmitted" >
				<Menu.Item
					name="unsubmitted"
					active={activeItem === 'unsubmitted'} 
					onClick={handleItemClick}
				>
						Unsubmitted
				</Menu.Item>
					</Link>
					<Link to="/archive">
				<Menu.Item
					name="archive"
					active={activeItem === 'archive'} 
					onClick={handleItemClick}
				>
						Archive
				</Menu.Item>
				</Link>
			</Menu>
		</>
	)
}

export default TimesheetsBar;