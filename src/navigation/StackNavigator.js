import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash/Splash';
import Signup from '../screens/SignupScreen/Signup';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import BottomNavigator from './TabNavigator/BottomNavigator';
import ConfirmSignup from '../screens/SignupScreen/ConfirmSignup';
import LandingPage from '../screens/Landing/LandingPage';
import ForgetOTP from '../screens/ForgetPassword/ForgetOTP';
import SetPassword from '../screens/ForgetPassword/setPassword';
import LoginScreen from '../screens/Login/LoginScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import AboutMobiTrade from './TabNavigator/Account/About/AboutMobiTrade';
import Addresses from './TabNavigator/Account/Addresses/Addresses';
import AddNewAddress from './TabNavigator/Account/Addresses/AddNewAddress';
import Settings from './TabNavigator/Account/Settings/Setting';
import Signup_Address from '../screens/SignupScreen/Signup_Address';
import SignUpTab from '../screens/SignupScreen/SignUpTab';
import PushNotification from './TabNavigator/Account/Settings/PuchNotification/PushNotification';
import Language from './TabNavigator/Account/Settings/Languages/Language';
import ChangePassword from './TabNavigator/Account/Settings/ChangePassword/ChangePassword';
import LogoutDevices from './TabNavigator/Account/Settings/LogoutFromAllDevices/LogoutDevices';
import Privacy from './TabNavigator/Account/Settings/Privacy/Privacy';
import DeleteAccount from './TabNavigator/Account/Settings/DeleteMyAccount/DeleteAccount';
import Warranty from './TabNavigator/Account/WarrantyTracking/Warranty';
import HelpSupport from './TabNavigator/Account/HelpSupport/HelpSupport';
import WatchList from './TabNavigator/Account/Watchlist/WatchList';
import SubWatchList from './TabNavigator/Account/Watchlist/SubWatchList';
import Myorder from './TabNavigator/Account/MyOrder/Myorder';
import TrackOrder from './TabNavigator/Account/MyOrder/TrackOrder';
import ReturnRequest from './TabNavigator/Account/MyOrder/ReturnRequest';
import Cart from './TabNavigator/Cart/Cart';
import Search from '../screens/Home/Search';
import shopbybrand from '../screens/Home/ShopByBrand/shopbybrand';
import Recentlyadd from '../screens/Home/RecentlyAdd/Recentlyadd';
import RecentlyView from '../screens/Home/RecentlyView/RecentlyView';
import ProductList from '../screens/Home/Categories/ProductList';
import HomeShopByBuget from '../screens/Home/Categories/HomeShopByBudget';
import SimilarProducts from '../screens/Home/RecentlyAdd/SimilarProducts';
import Categories from '../screens/Home/Categories/Categories';
import CategoriesSmartphones from '../screens/Home/Categories/CategoriesTab';
import Checkout from './TabNavigator/Cart/StorePickUp/Checkout';
import KYCStatus from './TabNavigator/Account/KYCStatus/KYCStatus';
import PaymentMethod from './TabNavigator/Cart/StorePickUp/PaymentMethod';
import ProcessToPay from './TabNavigator/Cart/StorePickUp/ProcessToPay';
import KycCompleteStatus from './TabNavigator/Cart/Kyc/KycCompleteStatus';
import KycConfirmation from './TabNavigator/Cart/Kyc/KycConfirmation';
import WishlistScreen from './TabNavigator/Account/Watchlist/WatchList';
import shopbybrandfilter from '../screens/Home/ShopByBrand/shopbybrandfilter';
import SelectAddress from './TabNavigator/Cart/StorePickUp/SelectAddress';
import Wallet from './TabNavigator/Cart/Wallet/Wallet';
import WalletTransactions from './TabNavigator/Cart/Wallet/WalletTransactions';
import WalletAddMoney from './TabNavigator/Cart/Wallet/WalletAddMoney';
import Withdraw from './TabNavigator/Cart/Wallet/Withdraw';
import Grade from '../screens/Home/Grade/Grade';
import carousel1 from '../screens/Home/carousel/carousel1';
import carousel2 from '../screens/Home/carousel/carousel2';
import carousel3 from '../screens/Home/carousel/carousel3';
import Home from '../screens/Home/Home';
import Header from '../screens/Home/Header';
import FAQsScreen from './TabNavigator/Account/HelpSupport/FAQsScreen';
import ReturnRefundPolicy from './TabNavigator/Account/HelpSupport/Return&RefundPolicy';
import ShippingDeliveryInfo from './TabNavigator/Account/HelpSupport/Shipping&DeliveryInfo';
import TermsConditions from './TabNavigator/Account/HelpSupport/Terms&Conditions';
import ContactUs from './TabNavigator/Account/HelpSupport/ContactUs';
import CatPage from '../screens/Home/Categories/CatPage';
import CategoriesTab from '../screens/Home/Categories/CategoriesTab';
import ShopByBudget from '../screens/Home/Categories/ShopByBudget';
import RecentlyAddedTab from '../screens/Home/RecentlyAdd/RecentlyAddedTab';
import shopbybrandsTab from '../screens/Home/ShopByBrand/shopbybrandsTab';
import Invoice from '../screens/Home/Invoice';
import MyorderDetails from './TabNavigator/Account/MyOrder/MyorderDetails';
import Cat_OS_Product from '../screens/Home/Categories/Cat_OS_Product';
import DialerScreen from '../navigation/TabNavigator/Account/MyOrder/DialerScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
        <>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="ConfirmSignup" component={ConfirmSignup} />
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="ForgetOTP" component={ForgetOTP} />
          <Stack.Screen name="setPassword" component={SetPassword} />
          <Stack.Screen name="Signup_Address" component={Signup_Address} />
          <Stack.Screen name="SignUpTab" component={SignUpTab} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        </>
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Header" component={Header} />
          <Stack.Screen name="AboutMobiTrade" component={AboutMobiTrade} />
          <Stack.Screen name="Addresses" component={Addresses} />
          <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="PushNotification" component={PushNotification} />
          <Stack.Screen name="Language" component={Language} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="LogoutDevices" component={LogoutDevices} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
          <Stack.Screen name="Warranty" component={Warranty} />
          <Stack.Screen name="HelpSupport" component={HelpSupport} />
          <Stack.Screen name="WatchList" component={WatchList} />
          <Stack.Screen name="SubWatchList" component={SubWatchList} />
          <Stack.Screen name="Myorder" component={Myorder} />
          <Stack.Screen name="TrackOrder" component={TrackOrder} />
          <Stack.Screen name="ReturnRequest" component={ReturnRequest} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="shopbybrand" component={shopbybrand} />
          <Stack.Screen name="Recentlyadd" component={Recentlyadd} />
          <Stack.Screen name="RecentlyView" component={RecentlyView} />
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen name="SimilarProducts" component={SimilarProducts} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen
            name="CategoriesSmartphones"
            component={CategoriesSmartphones}
          />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="KYCStatus" component={KYCStatus} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
          <Stack.Screen name="ProcessToPay" component={ProcessToPay} />
          <Stack.Screen
            name="KycCompleteStatus"
            component={KycCompleteStatus}
          />
          <Stack.Screen name="KycConfirmation" component={KycConfirmation} />
          <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
          <Stack.Screen
            name="shopbybrandfilter"
            component={shopbybrandfilter}
          />
          <Stack.Screen name="SelectAddress" component={SelectAddress} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen
            name="WalletTransactions"
            component={WalletTransactions}
          />
          <Stack.Screen name="WalletAddMoney" component={WalletAddMoney} />
          <Stack.Screen name="Withdraw" component={Withdraw} />
          <Stack.Screen name="Grade" component={Grade} />
          <Stack.Screen name="carousel1" component={carousel1} />
          <Stack.Screen name="carousel2" component={carousel2} />
          <Stack.Screen name="carousel3" component={carousel3} />
          <Stack.Screen name="FAQsScreen" component={FAQsScreen} />
          <Stack.Screen
            name="ReturnRefundPolicy"
            component={ReturnRefundPolicy}
          />
          <Stack.Screen
            name="ShippingDeliveryInfo"
            component={ShippingDeliveryInfo}
          />
          <Stack.Screen name="TermsConditions" component={TermsConditions} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="CatPage" component={CatPage} />
          <Stack.Screen name="CategoriesTab" component={CategoriesTab} />
          <Stack.Screen name="ShopByBudget" component={ShopByBudget} />
          <Stack.Screen name="RecentlyAddedTab" component={RecentlyAddedTab} />
          <Stack.Screen name="shopbybrandsTab" component={shopbybrandsTab} />
          <Stack.Screen name="Invoice" component={Invoice} />
          <Stack.Screen name="MyorderDetails" component={MyorderDetails} />
          <Stack.Screen name="Cat_OS_Product" component={Cat_OS_Product} />
          <Stack.Screen name="HomeShopByBudget" component={HomeShopByBuget} />
          <Stack.Screen name="DialerScreen" component={DialerScreen} />
        </>
    </Stack.Navigator>
  );
};

export default StackNavigator;
