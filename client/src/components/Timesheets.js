import React from 'react'
import { Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Timesheets = () => (
  <>
  <div class="ui tabular menu">
    <a class="item" href="/timesheet">
      Timesheet
    </a>
    <a class="item" href="/pendingapproval">
      Pending Approval
    </a>
    <a class="item" href="/unsubmitted" >
      Unubmitted
    </a>
    <a class="item" href="/archive">
      Archive
    </a>
  </div>
  <Header>Timesheets</Header>
  </>
)

export default Timesheets