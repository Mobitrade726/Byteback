import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectAddress from './TabNavigator/Cart/StorePickUp/SelectAddress';
import Cart from '../redux/CartScreen';
import Checkout from './TabNavigator/Cart/StorePickUp/Checkout';
import PaymentMethod from './TabNavigator/Cart/StorePickUp/PaymentMethod';
import ProcessToPay from './TabNavigator/Cart/StorePickUp/ProcessToPay';
import Wallet from './TabNavigator/Cart/Wallet/Wallet';
import WalletTransactions from './TabNavigator/Cart/Wallet/WalletTransactions';
import WalletAddMoney from './TabNavigator/Cart/Wallet/WalletAddMoney';
import Withdraw from './TabNavigator/Cart/Wallet/Withdraw';
import KycCompleteStatus from './TabNavigator/Cart/Kyc/KycCompleteStatus';
import KycConfirmation from './TabNavigator/Cart/Kyc/KycConfirmation';
import ProductList from '../screens/Home/Categories/ProductList';
import Grade from '../screens/Home/Grade/Grade';
import Invoice from '../screens/Home/Invoice';
import Shopbybrand from '../screens/Home/ShopByBrand/Shopbybrand';
import Shopbybrandfilter from '../screens/Home/ShopByBrand/Shopbybrandfilter';
import ShopbybrandsTab from '../screens/Home/ShopByBrand/ShopbybrandsTab';
import TrackOrder from './TabNavigator/Account/MyOrder/TrackOrder';
import Myorder from './TabNavigator/Account/MyOrder/Myorder';
import MyorderDetails from './TabNavigator/Account/MyOrder/MyorderDetails';

const Stack = createNativeStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartMain" component={Cart} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="KycCompleteStatus" component={KycCompleteStatus} />
      <Stack.Screen name="WalletTransactions" component={WalletTransactions} />
      <Stack.Screen name="WalletAddMoney" component={WalletAddMoney} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="ProcessToPay" component={ProcessToPay} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="SelectAddress" component={SelectAddress} />
      <Stack.Screen name="KycConfirmation" component={KycConfirmation} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="Grade" component={Grade} />
      <Stack.Screen name="Invoice" component={Invoice} />
      <Stack.Screen name="Shopbybrand" component={Shopbybrand} />
      <Stack.Screen name="Shopbybrandfilter" component={Shopbybrandfilter} />
      <Stack.Screen name="ShopbybrandsTab" component={ShopbybrandsTab} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} />
      <Stack.Screen name="Myorder" component={Myorder} />
      <Stack.Screen name="MyorderDetails" component={MyorderDetails} />
    </Stack.Navigator>
  );
}
