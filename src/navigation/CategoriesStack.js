import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Categories from '../screens/Home/Categories/Categories';
import CategoriesTab from '../screens/Home/Categories/CategoriesTab';
import CategoriesSmartphones from '../screens/Home/Categories/CategoriesTab';
import CatPage from '../screens/Home/Categories/CatPage';
import Cat_OS_Product from '../screens/Home/Categories/Cat_OS_Product';
import ShopByBudget from '../screens/Home/Categories/ShopByBudget';
import ProductList from '../screens/Home/Categories/ProductList';
import Grade from '../screens/Home/Grade/Grade';
import Invoice from '../screens/Home/Invoice';

import Search from '../screens/Home/Search';
import Header from '../screens/Home/Header';
import RecentlyAddedTab from '../screens/Home/RecentlyAdd/RecentlyAddedTab';
import Recentlyadd from '../screens/Home/RecentlyAdd/Recentlyadd';
import RecentlyView from '../screens/Home/RecentlyView/RecentlyView';
import Shopbybrand from '../screens/Home/ShopByBrand/Shopbybrand';
import Shopbybrandfilter from '../screens/Home/ShopByBrand/Shopbybrandfilter';
import ShopbybrandsTab from '../screens/Home/ShopByBrand/ShopbybrandsTab';
import Checkout from './TabNavigator/Cart/StorePickUp/Checkout';
import ProcessToPay from './TabNavigator/Cart/StorePickUp/ProcessToPay';
import Wallet from './TabNavigator/Cart/Wallet/Wallet';
import WalletTransactions from './TabNavigator/Cart/Wallet/WalletTransactions';
import WalletAddMoney from './TabNavigator/Cart/Wallet/WalletAddMoney';
import Withdraw from './TabNavigator/Cart/Wallet/Withdraw';
import TrackOrder from './TabNavigator/Account/MyOrder/TrackOrder';
import Myorder from './TabNavigator/Account/MyOrder/Myorder';
import MyorderDetails from './TabNavigator/Account/MyOrder/MyorderDetails';
import KycCompleteStatus from './TabNavigator/Cart/Kyc/KycCompleteStatus';


const Stack = createNativeStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="CategoriesTab" component={CategoriesTab} />
      <Stack.Screen
        name="CategoriesSmartphones"
        component={CategoriesSmartphones}
      />
      <Stack.Screen name="CatPage" component={CatPage} />
      <Stack.Screen name="Cat_OS_Product" component={Cat_OS_Product} />
      <Stack.Screen name="ShopByBudget" component={ShopByBudget} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="Grade" component={Grade} />
      <Stack.Screen name="Invoice" component={Invoice} />

      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Header" component={Header} />
      <Stack.Screen name="RecentlyAddedTab" component={RecentlyAddedTab} />
      <Stack.Screen name="Recentlyadd" component={Recentlyadd} />
      <Stack.Screen name="RecentlyView" component={RecentlyView} />
      <Stack.Screen name="Shopbybrand" component={Shopbybrand} />
      <Stack.Screen name="Shopbybrandfilter" component={Shopbybrandfilter} />
      <Stack.Screen name="ShopbybrandsTab" component={ShopbybrandsTab} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="ProcessToPay" component={ProcessToPay} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="WalletTransactions" component={WalletTransactions} />
      <Stack.Screen name="WalletAddMoney" component={WalletAddMoney} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} />
      <Stack.Screen name="Myorder" component={Myorder} />
      <Stack.Screen name="MyorderDetails" component={MyorderDetails} />
      <Stack.Screen name="KycCompleteStatus" component={KycCompleteStatus} />
    </Stack.Navigator>
  );
}
