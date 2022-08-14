import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './login.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(login('maple@nookmail.com', 'password'))
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-page'>
      <form id='form-styling' className='login-form' onSubmit={onLogin}>
        <h1>Log In</h1>
        <div>
          {errors.map((error, ind) => (
            <div id='error-msgs' key={ind}>{error}</div>
          ))}
        </div>
        <label htmlFor='email'>Email</label>
        <div>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            required
          />
        </div>
        <label htmlFor='password'>Password</label>
        <div>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            required
          />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
      <div id='new-demo'>
        <p id='new-p'>New to Nookazon?</p>
        <Link to='/sign-up'>
          <button>Create your Nookazon account</button>
        </Link>
        <p id='or-p'>Or shop as a guest</p>
        <button onClick={demoLogin}>Demo User login</button>
      </div>
    </div>
  );
};

export default LoginForm;
