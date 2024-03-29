/* eslint-disable */
import React from 'react';
import { Text } from 'react-native'

//Third Party
import { REHYDRATE } from 'redux-persist/src/constants';

//Components
import IconText from '../components/IconText/IconText';

//Publicly Available Icons that Can be Used for Commercial Purposes
import PayPal from '../assets/images/paypalSVG.svg';

//Utils
import ActionType from './action-type';
import haversine from 'haversine';

import globalStyles from '../assets/styles/globalStyles';

const reducerInitialState = {
  personalInfo : [],
  caseInsert : [],
  passChange : [],
  passUpdate : [],
  onSignup: [],
  //loginInfomation: [],
  passwordFinder: [],
  isEmailCheck: [],
  testis: [],
  menudata: [],
  orderitem: [],
  orderdetail: [],
  optionitem: [],
  cartitem: [],
  carttemp: [],
  category: 1,
  storeinfo: [],
  current_store_id: null,
  current_store_name: null,
  start_lat:  37.532600,
  start_lon: 127.024612,
  storedist: [],
  category_data: [], 

  authToken: null,
  userInfo: null,
  internetConnected: false,
  showActivityLoader: false,
  appFirstLaunch: true,
  selectedLanguage: null,
  isLoggedIn: false,
  profileTabInitialScreen: null,
  messageHistory: [],
  foodOptions: [],
  payPalAddresses: [],
  tabMenuList: [],
  browseList: [],
  filterHighLightsList: [],
  typeOfFoodList: [],
  sortByTitleList: [],
  userAddressList: [],
  currentAddress: null,
  restaurantList: [],
  subItems: [],
  menuList: [],
  userReviewList: [],
  caseResult: [],
  checkoutList: [],
  deliveryItem: {},
  orderedItems: {},
  foodItems: [],
  FAQList: [],
  favoriteList: [],
  shareEarnList: [],
  orderHistoryList: [],
  invoiceData: [],
  couponList: [],
  deliveryAddressData: {},
  favoritedItems: []
};

const reducerLogoutState = {
  personalInfo : [],
  caseInsert : [],
  passChange : [],
  passUpdate : [],
  onSignup: [],
  //loginInfomation: [],
  passwordFinder: [],
  isEmailCheck: [], 
  testis: [],
  menudata: [],
  orderitem: [],
  orderdetail: [],
  optionitem: [],
  cartitem: [],
  carttemp: [],
  category: 1,
  storeinfo: [],
  current_store_id: null,
  current_store_name: null,
  start_lat:  37.532600,
  start_lon: 127.024612,
  storedist: [],
  category_data: [], 

  authToken: null,
  showActivityLoader: false,
  autoLogout: false,
  isLoggedIn: false,
  messageHistory: [],
  foodOptions: [],
  payPalAddresses: [],
  tabMenuList: [],
  browseList: [],
  filterHighLightsList: [],
  typeOfFoodList: [],
  sortByTitleList: [],
  userAddressList: [],
  currentAddress: null,
  restaurantList: [],
  subItems: [],
  menuList: [],
  userReviewList: [],
  checkoutList: [],
  deliveryItem: {},
  orderedItems: {},
  foodItems: [],
  FAQList: [],
  favoriteList: [],
  shareEarnList: [],
  orderHistoryList: [],
  invoiceData: [],
  caseResult :[],
  couponList: [],
  favoritedItems: [],
  deliveryAddressData: {}
};

const reducer = (state = reducerInitialState, action) => {
  switch (action.type) {

    case ActionType.personalInfo:
      return {
        ...state,
        personalInfo : action.data,
      }

    case ActionType.passUpdate : {
      return {
        ...state,
        passUpdate : action.data
      }
    }
    case ActionType.caseInsert :{
      return {
        ...state,
        caseInsert : action.data
      }

    } 

    case ActionType.caseResult : {
      return {
        ...state,
        caseResult : action.data
      }


    }

    //비밀번호 초기화
    case ActionType.passChange:
      return {
        ...state,
        passChange : action.data,
      }  
    case ActionType.storeAuthToken:
      return Object.assign({}, state, { authToken: action.data });

    case ActionType.loginStatus:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case ActionType.passwordFinder:
      return {
        ...state,
        passwordFinder: action.data,
      }
    //---------------------메뉴갖고오기
    case ActionType.getmenuitem:
      return {
        ...state,
        menudata: action.payload,
      };
    //---------------------오더갖고오기
    case ActionType.getorderitem:
      return {
        ...state,
        orderitem: action.payload,
      };
    //------------------------------오더상세갖고오기
    case ActionType.GET_ORDERRESULTDETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ActionType.GET_ORDERRESULTDETAIL_SUCCESS:
      return {
        ...state,
        orderdetail: action.payload,
        loading: false,
      }
    case ActionType.GET_ORDERRESULTDETAIL_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      }
    //---------------------카테고리 바꾸기 , 카테고리별 메뉴데이터 분류
    case ActionType.CHANGE_CATEGORY:
      let newCategory = state.category; //making a new array
      newCategory = action.payload;//changing value in the new array
      return {
        ...state,
        category: Number(newCategory),    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }

      case ActionType.SET_MENU_CATEGORY_DATA:
      const Array_category_data = JSON.parse(JSON.stringify(state.menudata.filter(i => i.category == action.payload)));
      //newCategory = action.payload;//changing value in the new array
      return {
        ...state,
        category: Number(action.payload),  
        category_data: Array_category_data,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }


    ////////////////////////////////////////////////////////
    case ActionType.onSignup:
      return {
        ...state,
        onSignup: action.data,
      }
    case ActionType.loginInfomation:
      return {
        ...state,
        loginInfomation: action.data,
      }

    //////////////////////////////////////////////
    //-----------------옵션 데이터갖고오기 DB
    case ActionType.FETCH_OPTION_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ActionType.FETCH_OPTION_SUCCESS:
      return {
        ...state,
        optionitem: action.payload,
        loading: false,
      }
    case ActionType.FETCH_OPTION_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      }
    ///////////////////////////////////////////////
    //임시 카트 초기값설정
    case ActionType.SHOW_MENUDETAIL:   //상세메뉴보여주기
      const indexshow = state.menudata.findIndex(menudata => menudata.menu_id == action.payload); //인덱스찾기..
      const newArrayshow = [...state.menudata]; //making a new array
      return {
        ...state,
        carttemp: newArrayshow[indexshow],    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }

    //------------------------------------
    //----------------------------------------------
    case ActionType.SET_DATACART:   //임시 카트 아이템
      //const indexDataCart = state.dataMenudetail.findIndex(dataMenudetail => dataMenudetail.menu_id == action.find_menu); //인덱스찾기..
      //const newArrayDataCart = [state.dataMenudetail]; 왜 이건안돼고 밑에것만되는거지?!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const newArrayDataCart = JSON.parse(JSON.stringify(state.carttemp)); //making a new array
      if (action.kind == 1) {
        newArrayDataCart.quantity = action.payload;
      }
      else if (action.kind == 2) {
        newArrayDataCart.menu_option_insert = action.payload;
      }
      else if (action.kind == 3) {
        newArrayDataCart.taste_option_insert = action.payload;
      }
      else if (action.kind == 4) {
        newArrayDataCart.add_option_insert = action.payload;
      }

      return {
        ...state,
        carttemp: newArrayDataCart,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }

    //-----------------------------------------

    //////////--------------------------------스토어인포
    case ActionType.FETCH_STORES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ActionType.FETCH_STORES_SUCCESS:
      return {
        ...state,
        storeinfo: action.payload,
        loading: false,
      }
    case ActionType.FETCH_STORES_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      }
      case ActionType.SET_CUR_STORE_INFO:
            var storeinfo_id = Number(action.payload);
            var storeinfo_name = action.name;
            return {
                ...state,
                current_store_id: storeinfo_id,
                current_store_name: storeinfo_name,
            }
    ////////----------------------------------------

    ////////////////////////////////////--카트에 아이템 넣기
    case ActionType.INSERT_CART: //데이터카트 장바구니 요소 추가
      // const newArrayCartItem = JSON.parse(JSON.stringify(state.carttemp));
      // newArrayCartItem.quantity = action.num;
      return {
        ...state,
        cartitem: [...state.cartitem, state.carttemp]
      }

    case ActionType.CHANGE_CART_NUM:   //수량추가
      const newArrayCartNum = [...state.cartitem]; //making a new array
      newArrayCartNum[action.payload].quantity = newArrayCartNum[action.payload].quantity + action.num;//changing value in the new array

      return {
        ...state,
        cartitem: newArrayCartNum,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    //////////////////////////////////////

  ////////////////////////////////////--현재위치저장하기
    case ActionType.SET_CUR_LOCATION:
      var curlat = Number(action.payload.latitude);
      var curlon = Number(action.payload.longitude);
      return {
          ...state,
          start_lat: curlat,
          start_lon: curlon,
      }
  //////////////////////////////////////

////////////////////////////////////--스토어에서 현재위치 거리 계산
  case ActionType.SET_GET_DISTANCE:
    //const index = state.dataFood.findIndex(dataFood => dataFood.menu_id == action.payload); //인덱스찾기..
    //const newArray = [...state.storeinfo]; //making a new array

    const newArray = JSON.parse(JSON.stringify(state.storeinfo));//making a new array
    
    //newArray[index].iscart = true;//changing value in the new array
    //newArray[index].quantity = newArray[index].quantity + 1;  //수량증가

    for (var i = 0; i < newArray.length; i++) {


        let a = { latitude: Number(newArray[i].store_lat), longitude: Number(newArray[i].store_lon) }
        let b = { latitude: Number(state.start_lat), longitude: Number(state.start_lon) }


        newArray[i].store_dist = haversine(a, b).toFixed(2);
        //newArray[i].store_dist = action.payload.coords.latitude;

    }
    return {
        ...state,
        storedist: newArray,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
    }
//////////////////////////////////////

////////////////////////////////////--카트아이템 삭제하기
case ActionType.DELETE_CARTITEM:
  const indexdec = state.cartitem.findIndex(cartitem => (cartitem.menu_id == action.payload) && (cartitem.menu_option_insert == action.paymenu) &&
        (cartitem.taste_option_insert == action.paytaste) && (cartitem.add_option_insert == action.payadd)); //인덱스찾기..
      const newArraydec = [...state.cartitem]; //making a new array
      //newArraydec[indexdec].quantity = newArraydec[indexdec].quantity - 1;//changing value in the new array
      //if (newArraydec[indexdec].quantity == 0) {
        newArraydec.splice(indexdec, 1); // 제이슨 파스로 할지 정하자
        //console.log(" 삭제 0일때 " + JSON.stringify(newArraydec.splice(indexdec)) )
      //}

      return {
        ...state,
        cartitem: newArraydec,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }

      case ActionType.REMOVE_ALL_CART: //데이터카트 장바구니 모두 비우기
      const newArraycart = [];
      return {
        ...state,
        cartitem: newArraycart,
      }


//////////////////////////////////////





    case ActionType.storeUserInfo:
      return Object.assign({}, state, { userInfo: action.data });

    case ActionType.updateInternetStatus:
      return Object.assign({}, state, { internetConnected: action.data });

    case ActionType.showActivityLoader:
      return Object.assign({}, state, { showActivityLoader: action.data });

    case ActionType.hideActivityLoader:
      return Object.assign({}, state, { showActivityLoader: action.data });

    case ActionType.performAutoLogout:
      return Object.assign({}, state, { autoLogout: action.data });

    case ActionType.selectedLanguage:
      return Object.assign({}, state, { selectedLanguage: action.data });

    case ActionType.isEmailCheck:
      return {
        ...state,
        isEmailCheck: action.data,
      }
    case ActionType.isLoggedIn:
      return Object.assign({}, state, { isLoggedIn: action.data });
    //return { ...state, msg:action.payload, token: action.payload };
    case ActionType.updateAppFirstLaunchToFalse:
      return Object.assign({}, state, { appFirstLaunch: false });

    case ActionType.setProfileTabInitialScreen:
      return Object.assign({}, state, { profileTabInitialScreen: action.data });

    case ActionType.storeMessages:
      return Object.assign({}, state, { messageHistory: action.data });

    case ActionType.pushNewMessage:
      let tempData = [action.data, ...state.messageHistory.messages]
      return Object.assign({}, state, { messageHistory: { messages: tempData } });

    case ActionType.storeFoodOptions:
      return Object.assign({}, state, { foodOptions: action.data });

    case ActionType.storePayPalAddresses:
      let payPalAddressData = action.data;
      let tempPayPalAddressData = payPalAddressData.map((itemData) => {
        return {
          ...itemData,
          component: <IconText title={itemData.email} leftIconComponent={<PayPal />} />
        };
      })
      return Object.assign({}, state, { payPalAddresses: tempPayPalAddressData });

    case ActionType.addPayPalAddress:
      let newAddress = action.data;
      let payPalAddresses = state.payPalAddresses;
      payPalAddresses.map((value) => value.isActive = false)
      payPalAddresses.push({
        "id": 0,
        "isActive": true,
        "email": newAddress,
        component: <IconText title={newAddress} leftIconComponent={<PayPal />} />
      });
      return Object.assign({}, state, { payPalAddresses: payPalAddresses });

    case ActionType.changePayPalAddresses:
      let tempPayPalAddressChangeData = state.payPalAddresses.map((object) => {
        if (object.id == action.data) {
          return { ...object, isActive: true }
        } else return { ...object, isActive: false }
      })
      return Object.assign({}, state, { payPalAddresses: tempPayPalAddressChangeData });

    case ActionType.storeTabMenuItems:
      return Object.assign({}, state, { tabMenuList: action.data });

    case ActionType.toggleTabMenuItem:
      let tempTabData = state.tabMenuList
      const indexTab = tempTabData.findIndex(project => project.id === action.data.id);
      tempTabData[indexTab].isActive = !tempTabData[indexTab].isActive;
      return Object.assign({}, state, { tabMenuList: tempTabData });

    case ActionType.storeBrowseList:
      return Object.assign({}, state, { browseList: action.data });

    case ActionType.storeFilterHighLightsList:
      return Object.assign({}, state, { filterHighLightsList: action.data });

    case ActionType.toggleFilterHighLightsItem:
      let tempFilterHighlightData = state.filterHighLightsList
      const indexHighLight = tempFilterHighlightData.findIndex(project => project.id === action.data.id);
      tempFilterHighlightData[indexHighLight].isActive = !tempFilterHighlightData[indexHighLight].isActive;
      return Object.assign({}, state, { filterHighLightsList: tempFilterHighlightData });

    case ActionType.storeTypeOfFoodList:
      return Object.assign({}, state, { typeOfFoodList: action.data });

    case ActionType.toggleTypeOfFoodItem:
      let tempFilterTypeOfFood = state.typeOfFoodList
      const indexTypeofFood = tempFilterTypeOfFood.findIndex(project => project.id === action.data.id);
      tempFilterTypeOfFood[indexTypeofFood].isActive = !tempFilterTypeOfFood[indexTypeofFood].isActive;
      return Object.assign({}, state, { typeOfFoodList: tempFilterTypeOfFood });

    case ActionType.storeSortByTitleList:
      return Object.assign({}, state, { sortByTitleList: action.data });

    case ActionType.toggleSortByTitleItem:
      let tempFilterSortByTitle = state.sortByTitleList
      const indexSortByTitle = tempFilterSortByTitle.findIndex(project => project.id === action.data.id);
      tempFilterSortByTitle[indexSortByTitle].isActive = !tempFilterSortByTitle[indexSortByTitle].isActive;
      return Object.assign({}, state, { sortByTitleList: tempFilterSortByTitle });

    case ActionType.storeUserAddress:
      let userAddressData = action.data;
      let tempUserAddressData = userAddressData.map((itemData) => {
        return {
          ...itemData,
          component: <Text style={globalStyles.commonAddressText} >{itemData.address}</Text>
        };
      })
      return Object.assign({}, state, { userAddressList: tempUserAddressData });

    case ActionType.addUserAddress:
      let userAddressValue = action.data;
      let addressList = state.userAddressList;
      addressList.push({
        id: addressList[addressList.length - 1].id + 1,
        isActive: false,
        address: userAddressValue,
        component: <Text style={globalStyles.commonAddressText} >{userAddressValue}</Text>
      });
      return Object.assign({}, state, { userAddressList: addressList });

    case ActionType.changeUserAddress:
      let tempUserAddressChangeData = state.userAddressList.map((object) => {
        if (object.id == action.data) {
          return { ...object, isActive: true }
        } else return { ...object, isActive: false }
      })
      return Object.assign({}, state, { userAddressList: tempUserAddressChangeData });

    case ActionType.setCurrentAddress:
      return Object.assign({}, state, { currentAddress: action.data });

    case ActionType.storeRestaurantList:
      return Object.assign({}, state, { restaurantList: action.data });

    case ActionType.storeSubItemData:
      return Object.assign({}, state, { subItems: action.data });

    case ActionType.toggleFoodOption:
      let tempFoodOption = state.foodOptions;
      const indexFoodOption = tempFoodOption.findIndex(project => project.id === action.data);
      tempFoodOption[indexFoodOption].isActive = !tempFoodOption[indexFoodOption].isActive;
      return Object.assign({}, state, { foodOptions: tempFoodOption });

    case ActionType.storeMenuList:
      return Object.assign({}, state, { menuList: action.data });

    case ActionType.storeUserReviewList:
      return Object.assign({}, state, { userReviewList: action.data });

    case ActionType.storeCheckoutList:
      let checkOutData = action.data;
      if (checkOutData.length > 0) {
        let tempCheckoutData = checkOutData.map((object) => {
          return { ...object, totalPrice: object.deliveryFee * object.itemPurchased };
        })
        return Object.assign({}, state, { checkoutList: tempCheckoutData });
      } else {
        return Object.assign({}, state, { checkoutList: action.data });
      }

    case ActionType.storeDeliveryItem:
      return Object.assign({}, state, { deliveryItem: action.data });

    case ActionType.storeOrderedItem:
      return Object.assign({}, state, {
        orderedItems: { restaurantName: action.restaurantName, itemsOrdered: action.itemsOrdered }
      });

    case ActionType.storeFoodItems:
      return Object.assign({}, state, { foodItems: action.data });

    case ActionType.deleteCheckoutItem:
      let tempCheckOutList = state.checkoutList
      const indexCheckout = tempCheckOutList.findIndex(project => project.id === action.data);
      tempCheckOutList.splice(indexCheckout, 1)
      return Object.assign({}, state, { checkoutList: tempCheckOutList });

    case ActionType.updateCounterOfCheckoutList:
      let tempCheckOutCounterList = state.checkoutList
      const indexCheckoutCount = tempCheckOutCounterList.findIndex(project => project.id === action.data);
      tempCheckOutCounterList[indexCheckoutCount].itemPurchased = action.counter;
      tempCheckOutCounterList[indexCheckoutCount].totalPrice = tempCheckOutCounterList[indexCheckoutCount].deliveryFee * action.counter;
      return Object.assign({}, state, { checkoutList: tempCheckOutCounterList });

    case ActionType.storeFAQs:
      return Object.assign({}, state, { FAQList: action.data });

    case ActionType.storeFavoriteList:
      return Object.assign({}, state, { favoriteList: action.data });

    case ActionType.toggleFavoriteItem:
      let favoritedItems = state.favoritedItems;
      let index = favoritedItems.indexOf(action.data);
      if (index < 0) {
        favoritedItems.push(action.data);
      }
      else {
        favoritedItems.splice(index, 1);
      }
      return Object.assign({}, state, { favoritedItems: favoritedItems });

    case ActionType.storeShareEarnList:
      return Object.assign({}, state, { shareEarnList: action.data });

    case ActionType.storeOrderHistoryList:
      return Object.assign({}, state, { orderHistoryList: action.data });

    case ActionType.storeInvoiceData:
      let invoiceData = action.data;
      if (invoiceData.hasOwnProperty('itemsOrdered') && invoiceData.itemsOrdered.length > 0) {
        const tempItemOrderedList = invoiceData.itemsOrdered
        let tempItemOrderedData = tempItemOrderedList.map((object) => {
          return { ...object, totalPrice: object.itemPrice * object.itemNum };
        })
        action.data.itemsOrdered = tempItemOrderedData
        return Object.assign({}, state, { invoiceData: action.data });
      } else { return Object.assign({}, state, { invoiceData: action.data }); }

    case ActionType.updateCounterOfInvoiceList:
      let invoiceList = state.invoiceData.itemsOrdered
      const indexInvoiceCount = invoiceList.findIndex(project => project.id === action.data);
      invoiceList[indexInvoiceCount].itemNum = action.counter;
      invoiceList[indexInvoiceCount].totalPrice = invoiceList[indexInvoiceCount].itemPrice * action.counter;
      const tempInvoiceList = state.invoiceData
      tempInvoiceList.itemsOrdered = invoiceList
      return Object.assign({}, state, { invoiceData: tempInvoiceList });

    case ActionType.updateInvoiceStatus:
      let tempInvoiceStatus = state.invoiceData
      tempInvoiceStatus.isConfirmed = action.data
      return Object.assign({}, state, { invoiceData: tempInvoiceStatus });

    case ActionType.storeCouponList:
      return Object.assign({}, state, { couponList: action.data });

    case ActionType.storeDeliveryAddressData:
      return Object.assign({}, state, { deliveryAddressData: action.data });

    case ActionType.updateDeliveryItemStatus:
      let object = {};
      object[action.data] = { isActive: true }
      return Object.assign({}, state, { deliveryItem: { ...state.deliveryItem, ...object } })

    case REHYDRATE:
      return { ...state, ...reducerLogoutState };

    default:
      return state;
  }
};

export { reducer, reducerInitialState };
