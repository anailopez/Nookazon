import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';
import '../navbar.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory();

  const onLogout = async (e) => {
    history.push('/')
    await dispatch(logout());
  };

  return <button id='logout-btn' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
