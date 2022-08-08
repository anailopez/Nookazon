
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './navbar.css';
import nookazonIcon from '../images/nookazon-logo.png';
import cartIcon from '../images/cart.png';

const NavBar = () => {
  const userId = useSelector((state) => state.session?.user?.id);
  const user = useSelector((state) => state.session?.user);

  return (
    <nav>
      <ul className='navbar'>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img className='navbar-icon' src={`${nookazonIcon}`} />
          </NavLink>
        </li>
        {!userId && (
          <>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </>
        )}
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        {userId && (
          <>
            <li>
              <p>Deliver to {user.username}</p>
              <p>{user.town_name}</p>
            </li>
            <li>
              <p>Hello, {user.username}</p>
              <LogoutButton />
            </li>
            <li>
              <NavLink to='/orders'>
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to='/cart'>
                <span id='cart'>
                  <img className='cart-icon' src={`${cartIcon}`} />
                  <p>1</p>
                </span>
              </NavLink>
            </li>
            {/* <li>
              <LogoutButton />
            </li> */}
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
