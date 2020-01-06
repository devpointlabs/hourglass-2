import React from 'react';
import { Link, } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
// import { Menu, } from 'semantic-ui-react';

const NavBar = () => (
    <Menu color='purple inverted' borderless>

    <Link to='/'>
      <a class="active item">
        Home
      </a>
    </Link>
    <Link to='/session'>
      <a class="item">
        Sessions
      </a>
    </Link>
    <Link to='/task'>
      <a class="item">
        Task
      </a>
    </Link>
    <Link to='/'>
      <a class="item">
        Expenses
      </a>
    </Link>
    <Link to='/'>
      <a class="item">
        Reports
      </a>
    </Link>
    <Link to='/'>
      <a class="item">
        Invoices
      </a>
    </Link>
    <Link to='/'>
      <a class="item">
        Estimates
      </a>
    </Link><Link to='/'>
      <a class="item">
        Manage
      </a>
    </Link>
    <Menu.Menu position='right'>
      <Link to='/login'>
        <a class="item">
          Login
        </a>
      </Link>
      <Link to='/register'>
        <a class="item">
          Register
        </a>
      </Link>
    </Menu.Menu>
    </Menu>
);

export default NavBar;