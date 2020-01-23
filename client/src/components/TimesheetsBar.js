import React from 'react';

const TimesheetsBar = (props) => (
  <>
		<div className="ui tabular menu">
			<a className="active item" href="/timesheet">
				Timesheet
			</a>
			<a className="item" href="/pendingapproval">
				Pending Approval
			</a>
			<a className="item" href="/unsubmitted" >
				Unubmitted
			</a>
			<a className="item" href="/archive">
				Archive
			</a>
		</div>
  </>
)

export default TimesheetsBar;