
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Badge from '@material-ui/core/Badge';
import './navbar.css';
import nookazonIcon from '../images/nookazon-logo.png';
import CartIcon from './CartIcon/carticon';

const NavBar = () => {
  const userId = useSelector((state) => state.session?.user?.id);
  const user = useSelector((state) => state.session?.user);
  const dispatch = useDispatch();

  let [cart, setCart] = useState([]);
  // const [quantity, setQuantity] = useState(0);
  let quantity = 0;
  let savedCart = null;

  if (userId) {
    savedCart = localStorage.getItem(userId);
  }

  useEffect(() => {
    savedCart = JSON.parse(savedCart);
    if (savedCart !== null) {
      setCart(savedCart)
    }
  }, [savedCart]);


  const inlineStyles = {
    spacer: {
      flex: 1
    },
    badgeFix: {
      display: 'inline-flex'
    }
  };

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
              <p> <i class="fa-solid fa-location-dot" /> Deliver to {user.username}</p>
              <p>{user.town_name}</p>
            </li>
            <li>
              <p>Hello, {user.username} <i class="fa-solid fa-caret-down" /></p>
              <LogoutButton />
            </li>
            <li>
              <NavLink to='/orders'>
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to='/cart'>
                <CartIcon />
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
