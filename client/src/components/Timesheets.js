import React from 'react'
import { Header } from 'semantic-ui-react'

const Timesheets = () => (
  <>
  <div className="ui tabular menu">
    <a className="item" href="/timesheet">
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
  <Header>Timesheets</Header>
  </>
)

export default Timesheets