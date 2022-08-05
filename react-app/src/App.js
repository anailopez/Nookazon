import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
// import { thunkGetAllItems } from './store/items';
import AllItems from './components/AllItems/AllItems';
import SingleItem from './components/SingleItem/SingleItem';
import CreateReviewForm from './components/CreateReviewForm/CreateReviewForm';
import Cart from './components/Cart/Cart';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      // await dispatch(thunkGetAllItems());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <AllItems />
        </Route>
        <Route path='/items/:itemId'>
          <SingleItem />
        </Route>
        <ProtectedRoute path='/create-review/:itemId'>
          <CreateReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/cart/:userId'>
          <Cart />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
