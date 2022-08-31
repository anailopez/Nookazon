
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './navbar.css';
import nookazonIcon from '../images/nookazon-logo.png';
import CartIcon from './CartIcon/carticon';
import SearchBar from './Searchbar/searchbar';

const NavBar = () => {
  const userId = useSelector((state) => state.session?.user?.id);
  const user = useSelector((state) => state.session?.user);

  return (
    <nav>
      <ul className='navbar'>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img className='navbar-icon' src={`${nookazonIcon}`} alt='nookazon logo' />
          </NavLink>
        </li>
        {!userId && (
          <>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li id='nav-signup'>
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
              <p><i className="fa-solid fa-location-dot" /> {user.town_name}</p>
            </li>
            <li>
              <SearchBar />
            </li>
            <li>
              <div className='dropdown'>
                <p>Hello, {user.username} <i className="fa-solid fa-caret-down" /></p>
                <div className='dropdown-content'>
                  <LogoutButton />
                  <br />
                  <Link to='/lists'>
                    <p>Your Lists</p>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <NavLink to='/orders'>
                Orders
              </NavLink>
            </li>
            <li id='cart-icon-link'>
              <NavLink to='/cart'>
                <CartIcon />
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
