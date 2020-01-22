import React, { useState, useEffect } from 'react';
import { Button, Modal, Header } from 'semantic-ui-react'

const StopWatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="app">
      <div className="row">
        <Modal trigger={<Button>Show Modal</Button>}>
          <Modal.Header>New Time Entry</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <div className="time">
                {seconds}s
              </div>
              <Button 
                className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} 
                size="large"                
                onClick={toggle}>
                {isActive ? 'Stop' : 'Start'}
              </Button>
              <Button 
                size="large"
              >
                Cancel
              </Button>
            
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
};

export default StopWatch;