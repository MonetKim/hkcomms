import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Components
import ProfileWithBorder from '../components/ProfileWithBorder/ProfileWithBorder';

// Third Party
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

//Publicly Available Icons that Can be Used for Commercial Purposes
import CloseIcon from '../assets/icons/generalIcons/closeIconSVG.svg';

// Utility
import action from '../redux/action';
import globalStyles from '../assets/styles/globalStyles';
import Routes from './Routes';
import {allColors} from '../assets/styles/mainColors';
import {horizontalScale, screenWidth} from '../utility/Scale';
import * as images from '../assets/images/map';
import styles from './DrawerNavigation/styles';
import {pushScreen} from '../utility/NavigationService';

//Navigators
import {
  PaymentWebViewMenu, 
  CouponModuleMenu,
  DiscoverModuleMenu,
  FavoriteProductsModuleMenu,
  OrderHistoryModuleMenu,
  OtherModuleMenu,
  PaymentMethodModuleMenu,
  ProfileModuleMenu,
  SettingModuleMenu,
  ShareEarnModuleMenu,
  SupportModuleMenu,
} from './DrawerNavigation/DrawerStackNavigator';

const Stack = createStackNavigator();
//Modular menu consisting of screens
const Screens = ({style}) => {
  return (
    <View style={globalStyles.flex}>
      {/*-----Close Icon For the Menu Start----*/}
      <View style={styles.closeIcon}>
        <CloseIcon height={18} width={18} />
        <Text style={styles.closeText}>닫기</Text>
      </View>
      {/*-----Close Icon For the Menu End----*/}

      <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
        <Stack.Navigator>

          <Stack.Screen
            name={Routes.DiscoverModuleMenu}
            component={DiscoverModuleMenu}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.PaymentWebView}
            component={PaymentWebViewMenu}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={Routes.ProfileModuleMenu}
            component={ProfileModuleMenu}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={Routes.CouponModuleMenu}
            component={CouponModuleMenu}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={Routes.OrderHistoryModuleMenu}
            component={OrderHistoryModuleMenu}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={Routes.FavoriteProductsModuleMenu}
            component={FavoriteProductsModuleMenu}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={Routes.PaymentMethodModuleMenu}
            component={PaymentMethodModuleMenu}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={Routes.ShareEarnModuleMenu}
            component={ShareEarnModuleMenu}
            options={{headerShown: false}}
          />
          
          <Stack.Screen
            name={Routes.OtherModuleMenu}
            component={OtherModuleMenu}
            options={{headerShown: false}}
          />
          
          <Stack.Screen
            name={Routes.SettingModuleMenu}
            component={SettingModuleMenu}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={Routes.SupportModuleMenu}
            component={SupportModuleMenu}
            options={{headerShown: false}}
          />

        </Stack.Navigator>
      </Animated.View>
    </View>
  );
};

const DrawerContent = props => {
  const dispatch = useDispatch();
  const DrawerArray = [
    {
      title: '홈 >',
      iconPath: images.drawerMenuIcons.discoverIcon,
      routeName: Routes.DiscoverModuleMenu,
      screen: Routes.FoodDiscover,
    },
    {
      title: '프로필 >',
      iconPath: images.drawerMenuIcons.profileIcon,
      routeName: Routes.ProfileModuleMenu,
      screen: Routes.ProfileHomeScreen,
    },
    {
      title: '쿠폰 >',
      iconPath: images.drawerMenuIcons.couponIcon,
      routeName: Routes.CouponModuleMenu,
      screen: Routes.CouponHomeScreen,
    },

    /*
    {
      title: 'Share & Earn',
      iconPath: images.drawerMenuIcons.shareEarnIcon,
      routeName: Routes.ShareEarnModuleMenu,
      screen: Routes.ShareEarnScreen,
    },
    */

    {
      title: '주문내역 >',
      iconPath: images.drawerMenuIcons.orderHistoryIcon,
      routeName: Routes.OrderHistoryModuleMenu,
      screen: Routes.OrderHistoryHomeScreen,
    },

    /*
    {
      title: 'Favorite Products',
      iconPath: images.drawerMenuIcons.featuredProductsIcon,
      routeName: Routes.FavoriteProductsModuleMenu,
      screen: Routes.FavoriteProductsHomeScreen,
    },
    */

    {
      title: '카드등록 >',
      iconPath: images.drawerMenuIcons.paymentMethodsIcon,
      routeName: Routes.PaymentMethodModuleMenu,
      screen: Routes.PaymentMethodsHomeScreen,
    },
    {
      title: '설정 >',
      iconPath: images.drawerMenuIcons.settingIcon,
      routeName: Routes.SettingModuleMenu,
      screen: Routes.Settings,
    },
    {
      title: '고객센터 >',
      iconPath: images.drawerMenuIcons.supportIcon,
      routeName: Routes.SupportModuleMenu,
      screen: Routes.SupportHomeScreen,
    },
    {
      title: 'Other >',
      iconPath: images.drawerMenuIcons.discoverIcon,
      routeName: Routes.OtherModuleMenu,
      screen: Routes.OtherModuleMenu,
    },
  ];

  const navigationWithPush = (routeName, params) => {
    props.navigation.toggleDrawer();
    pushScreen(routeName, params);
  };


  const loginInfomation = useSelector(state => state.loginInfomation, shallowEqual);

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={[
        globalStyles.flex,
        globalStyles.bgYellow,
        {paddingLeft: horizontalScale(36)},
      ]}>
      <SafeAreaView style={globalStyles.flex}>
        <View style={styles.safeAreaContex}>
          {/*---- User Profile Picture Container Start ----*/}
          <View style={styles.profileView}>
            <ProfileWithBorder
              imagePath={
                'https://images.unsplash.com/photo-1601999109332-542b18dbec57?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
              }
              imageHeight={screenWidth * 0.13}
              imageWidth={screenWidth * 0.13}
              borderColor={allColors.borderBlack}
            />
            <View style={styles.userDetailView}>
              <Text style={[styles.welcomeText]}>반갑습니다</Text>
              <Text style={styles.userNameText}>{loginInfomation[0].name}</Text>
              <Text style={[globalStyles.RobotoFont100, styles.userNumberText]}>
                {loginInfomation[0].phone}
              </Text>
            </View>
          </View>
          {/*---- User Profile Picture Container End ----*/}

          {/*---- Menu Items Display Scrollable Container Start ------*/}
          <ScrollView style={[globalStyles.marginTop15, globalStyles.flex]}>
            {DrawerArray.map((item, index) => {
              return (
                <TouchableOpacity
                  key={'drawer_item_' + index}
                  onPress={() =>
                    navigationWithPush(item.routeName, item.screen)
                  }
                  style={styles.drawerView}>
                  <Image source={item.iconPath} style={styles.iconStyle} />
                  <Text style={styles.drawerLabel}>{item.title}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/*---- Menu Items Display Scrollable Container End ------*/}
        </View>

        {/*----Logout Button Start ------*/}
        <TouchableOpacity
          onPress={() => dispatch(action.isLoggedIn(false))}
          style={styles.logoutView}>
          <Image
            source={images.drawerMenuIcons.logoutIcon}
            style={styles.logoutIconStyle}
          />
          <Text style={styles.drawerLabel}>로그아웃</Text>
        </TouchableOpacity>
        {/*----Logout Button End ------*/}
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

/*---------- Drawer Navigator setup and styles start --------*/
const DrawerNavigator = () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));

  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.75],
  });

  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 35],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

  return (
    <Drawer.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      headerMode="float"
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={styles.drawerStyles}
      contentContainerStyle={globalStyles.flex}
      drawerContentOptions={{
        activeBackgroundColor: allColors.transparent,
        activeTintColor: allColors.white,
        inactiveTintColor: allColors.white,
      }}
      sceneContainerStyle={{backgroundColor: allColors.yellow}}
      drawerContent={newProps => {
        setTimeout( () => setProgress(newProps.progress), 10)
        return <DrawerContent {...newProps} />;
      }}>
      <Drawer.Screen
        name="Drawer"
        unmountOnBlur={true}
        options={{headerShown: false, unmountOnBlur: true}}>
        {props => <Screens {...props} style={animatedStyle} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
/*---------- Drawer Navigator setup and styles end --------*/
export default DrawerNavigator;
