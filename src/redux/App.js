// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CartScreen from '../navigation/TabNavigator/Cart/Cart';
import Home from '../screens/Home/Home';
import { navigationRef } from '../navigation/RootNavigation';


export default function App() {
  return (
    <Provider ref={navigationRef} store={store}>
      <CartScreen />
      <Home/>
    </Provider>
  );
}
