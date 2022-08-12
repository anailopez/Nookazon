import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [icon, setIcon] = useState('https://i.pinimg.com/originals/b7/2e/f2/b72ef278f70bd20a7345ad297a380274.png');
  const [email, setEmail] = useState('');
  const [street_address, setStreetAddress] = useState('');
  const [town_name, setTownName] = useState('');
  const [payment_method, setPayment] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password) {
      const data = await dispatch(signUp(username, icon, email, street_address, town_name, payment_method, password, confirm_password));
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

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(login('maple@nookmail.com', 'password'))
  };

  if (user) {
    return <Redirect to='/' />;
  };

  return (
    <div>
      <form id='form-styling' onSubmit={onSignUp}>
        <h1>Sign Up</h1>
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
            required
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
            required
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
        <div>
          <label>Confirm Password</label>
          <input
            type='password'
            name='confirm_password'
            onChange={updateConfirmPassword}
            value={confirm_password}
            required
          ></input>
        </div>
        <div>
          <button type='submit'>Sign Up</button>
          <p>or</p>
          <button onClick={demoLogin}>Demo User login</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
