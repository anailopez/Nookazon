import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import AllItems from './components/AllItems/AllItems';
import SingleItem from './components/SingleItem/SingleItem';
import CreateReviewForm from './components/CreateReviewForm/CreateReviewForm';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import AllOrders from './components/AllOrders/AllOrders';
import OrderDetails from './components/OrderDetails/OrderDetails';
import AllLists from './components/AllLists/AllLists';
import './index.css';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className='app'>
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
          <ProtectedRoute path='/orders'>
            <AllOrders />
          </ProtectedRoute>
          <ProtectedRoute path='/order-details/:orderId'>
            <OrderDetails />
          </ProtectedRoute>
          <ProtectedRoute path='/cart'>
            <Cart />
          </ProtectedRoute>
          <ProtectedRoute path='/checkout'>
            <Checkout />
          </ProtectedRoute>
          <ProtectedRoute path='/lists'>
            <AllLists />
          </ProtectedRoute>
          <Route>
            <AllItems />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
