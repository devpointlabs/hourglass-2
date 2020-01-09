import React from 'react'
import { Header } from 'semantic-ui-react'

const PendingApproval = () => (
  <>
  <div class="ui tabular menu">
    <a class="item" href="/timesheet">
      Timesheet
    </a>
    <a class="active item" href="/pendingapproval">
      Pending Approval
    </a>
    <a class="item" href="/unsubmitted" >
      Unubmitted
    </a>
    <a class="item" href="/archive">
      Archive
    </a>
  </div>
  <Header>Pending</Header>
  </>
)

export default PendingApproval