import React from 'react';
import { Button, Icon, } from 'semantic-ui-react';

const Timesheet = () => (
  <>
    <Button.Group>
      <Button icon='left chevron' />
      <Button content='Today' />
      <Button icon='right chevron' />
    </Button.Group>
    <Button icon>
      <Icon name='calendar alternate outline' />
    </Button>
    <Button.Group buttons={['Day', 'Week']} />
  </>
)


export default Timesheet;