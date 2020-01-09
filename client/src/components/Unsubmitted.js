import React from 'react'
import { Header } from 'semantic-ui-react'

const Unsubmitted = () => (
  <>
  <div class="ui tabular menu">
    <a class="item" href="/timesheet">
      Timesheet
    </a>
    <a class="item" href="/pendingapproval">
      Pending Approval
    </a>
    <a class="item active" href="/unsubmitted" >
      Unubmitted
    </a>
    <a class="item" href="/archive">
      Archive
    </a>
  </div>
  <Header>Unsubmitted</Header>
  </>
)

export default Unsubmitted