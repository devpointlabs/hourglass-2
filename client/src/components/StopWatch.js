import React, { useState, useEffect } from 'react';
import { Button, Modal, Header } from 'semantic-ui-react'

const StopWatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
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
      <div className="time">
        {seconds}s
      </div>
      <div className="row">
        <button className="button" onClick={reset}>
          Reset
        </button>
        <Modal trigger={<Button>Show Modal</Button>}>
          <Modal.Header>New Time Entry</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>
                We've found the following gravatar image associated with your e-mail
                address.
              </p>
              <button 
                className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} 
                size="large"                
                onClick={toggle}>
                {isActive ? 'Stop' : 'Start'}
              </button>
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