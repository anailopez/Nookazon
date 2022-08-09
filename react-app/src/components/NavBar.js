
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Badge from '@material-ui/core/Badge';
import './navbar.css';
import nookazonIcon from '../images/nookazon-logo.png';
import cartIcon from '../images/cart.png';

const NavBar = () => {
  const userId = useSelector((state) => state.session?.user?.id);
  const user = useSelector((state) => state.session?.user);
  const dispatch = useDispatch();

  let [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
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

  // useEffect(() => {
  //   setQuantity(cart.length)
  // }, [dispatch, cart, savedCart])


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
                <span id='cart'>
                  {/* <Badge style={inlineStyles.badgeFix} badgeContent={cart.length}> */}
                  <img className='cart-icon' src={`${cartIcon}`} />
                  {/* </Badge> */}
                  <p>{cart.length}</p>
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
