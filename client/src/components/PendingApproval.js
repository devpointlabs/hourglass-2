import React from 'react'
import { Header } from 'semantic-ui-react'
import TimesheetsBar from './TimesheetsBar'

const PendingApproval = () => (
  <>
  <TimesheetsBar 
    activeItem="pendingapproval"
  />
  <Header>Pending</Header>
  </>
)

export default PendingApproval