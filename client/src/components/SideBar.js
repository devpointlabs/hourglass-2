import React from 'react';
import { Link, } from 'react-router-dom';
import { Menu, } from 'semantic-ui-react';

const SideBar = () => (
  <Menu pointing secondary vertical>
    <Link to='/login'>
      <Menu.Item>
        Login
      </Menu.Item>
    </Link>
    <Link to='/register'>
      <Menu.Item>
        Register
      </Menu.Item>
    </Link>
    <Link to='/'>
      <Menu.Item>
        Home
      </Menu.Item>
    </Link>
    <Link to='/project'>
      <Menu.Item>
        Project
      </Menu.Item>
    </Link>
    <Link to='/session'>
      <Menu.Item>
        Sessions
      </Menu.Item>
    </Link>
    <Link to='/tasks'>
      <Menu.Item>
        Tasks
      </Menu.Item>
    </Link>
  </Menu>
);

export default SideBar;