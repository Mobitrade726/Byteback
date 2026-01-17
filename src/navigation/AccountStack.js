import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutMobiTrade from './TabNavigator/Account/About/AboutMobiTrade';
import Settings from './TabNavigator/Account/Settings/Setting';
import Language from './TabNavigator/Account/Settings/Languages/Language';
import ChangePassword from './TabNavigator/Account/Settings/ChangePassword/ChangePassword';
import LogoutDevices from './TabNavigator/Account/Settings/LogoutFromAllDevices/LogoutDevices';
import Privacy from './TabNavigator/Account/Settings/Privacy/Privacy';
import DeleteAccount from './TabNavigator/Account/Settings/DeleteMyAccount/DeleteAccount';
import Addresses from './TabNavigator/Account/Addresses/Addresses';
import AddNewAddress from './TabNavigator/Account/Addresses/AddNewAddress';
import Myorder from './TabNavigator/Account/MyOrder/Myorder';
import MyorderDetails from './TabNavigator/Account/MyOrder/MyorderDetails';
import TrackOrder from './TabNavigator/Account/MyOrder/TrackOrder';
import ReturnRequest from './TabNavigator/Account/MyOrder/ReturnRequest';
import WatchList from './TabNavigator/Account/Watchlist/WatchList';
import SubWatchList from './TabNavigator/Account/Watchlist/SubWatchList';
import WishlistScreen from './TabNavigator/Account/Watchlist/WatchList';
import Warranty from './TabNavigator/Account/WarrantyTracking/Warranty';
import KYCStatus from './TabNavigator/Account/KYCStatus/KYCStatus';
import FAQsScreen from './TabNavigator/Account/HelpSupport/FAQsScreen';
import ReturnRefundPolicy from './TabNavigator/Account/HelpSupport/Return&RefundPolicy';
import ShippingDeliveryInfo from './TabNavigator/Account/HelpSupport/Shipping&DeliveryInfo';
import TermsConditions from './TabNavigator/Account/HelpSupport/Terms&Conditions';
import ContactUs from './TabNavigator/Account/HelpSupport/ContactUs';
import DialerScreen from '../navigation/TabNavigator/Account/MyOrder/DialerScreen';
import HelpSupport from './TabNavigator/Account/HelpSupport/HelpSupport';
import Account from './TabNavigator/Account/Account';
import Wallet from './TabNavigator/Cart/Wallet/Wallet';
import WalletTransactions from './TabNavigator/Cart/Wallet/WalletTransactions';
import WalletAddMoney from './TabNavigator/Cart/Wallet/WalletAddMoney';
import Withdraw from './TabNavigator/Cart/Wallet/Withdraw';
import LoginScreen from '../screens/Login/LoginScreen';
import Signup_Address from '../screens/SignupScreen/Signup_Address';
import SignUpTab from '../screens/SignupScreen/SignUpTab';
import ConfirmSignup from '../screens/SignupScreen/ConfirmSignup';
import Invoice from '../screens/Home/Invoice';
import KycCompleteStatus from './TabNavigator/Cart/Kyc/KycCompleteStatus';
import Search from '../screens/Home/Search';
import Home from '../screens/Home/Home';




const Stack = createNativeStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AboutMobiTrade" component={AboutMobiTrade} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="LogoutDevices" component={LogoutDevices} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen name="Addresses" component={Addresses} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="Myorder" component={Myorder} />
      <Stack.Screen name="MyorderDetails" component={MyorderDetails} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} />
      <Stack.Screen name="ReturnRequest" component={ReturnRequest} />
      <Stack.Screen name="WatchList" component={WatchList} />
      <Stack.Screen name="SubWatchList" component={SubWatchList} />
      <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
      <Stack.Screen name="Warranty" component={Warranty} />
      <Stack.Screen name="KYCStatus" component={KYCStatus} />
      <Stack.Screen name="FAQsScreen" component={FAQsScreen} />
      <Stack.Screen name="ReturnRefundPolicy" component={ReturnRefundPolicy} />
      <Stack.Screen
        name="ShippingDeliveryInfo"
        component={ShippingDeliveryInfo}
      />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="DialerScreen" component={DialerScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="WalletTransactions" component={WalletTransactions} />
      <Stack.Screen name="WalletAddMoney" component={WalletAddMoney} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
      <Stack.Screen name="Signup_Address" component={Signup_Address} />
      <Stack.Screen name="SignUpTab" component={SignUpTab} />
      <Stack.Screen name="ConfirmSignup" component={ConfirmSignup} />
      <Stack.Screen name="Invoice" component={Invoice} />
      <Stack.Screen name="KycCompleteStatus" component={KycCompleteStatus} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Home" component={Home} />
      
      
    </Stack.Navigator>
  );
}
