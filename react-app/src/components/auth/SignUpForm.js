import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [icon, setIcon] = useState('');
  const [email, setEmail] = useState('');
  const [street_address, setStreetAddress] = useState('');
  const [town_name, setTownName] = useState('');
  const [payment_method, setPayment] = useState('');
  const [password, setPassword] = useState('');
  // const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password) {
      const data = await dispatch(signUp(username, icon, email, street_address, town_name, payment_method, password));
      if (data) {
        setErrors(data)
      }
    }
  };


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateIcon = (e) => {
    setIcon(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateAddress = (e) => {
    setStreetAddress(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // const updateRepeatPassword = (e) => {
  //   setRepeatPassword(e.target.value);
  // };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>Username</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          required
        ></input>
      </div>
      <div>
        <label>Icon URL (optional)</label>
        <input
          type='text'
          name='icon'
          onChange={updateIcon}
          value={icon}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='email'
          name='email'
          onChange={updateEmail}
          value={email}
          required
        ></input>
      </div>
      <div>
        <label>Street Address</label>
        <input
          type='text'
          name='street_address'
          placeholder='123 Example Rd'
          onChange={updateAddress}
          value={street_address}
          required
        ></input>
      </div>
      <div>
        <label>Town/Island Name</label>
        <input
          type='text'
          name='town_name'
          placeholder='Nook Island'
          onChange={(e) => setTownName(e.target.value)}
          value={town_name}
        ></input>
      </div>
      <div>
        <label>Last 4 Digits of Payment Method</label>
        <input
          type='text'
          name='payment_method'
          placeholder='1234'
          onChange={(e) => setPayment(e.target.value)}
          value={payment_method}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required
        ></input>
      </div>
      {/* <div>
        <label>Confirm Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div> */}
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
