import ActionType from './action-type';
import {reducerInitialState} from './reducer';
import API from "../API/WebService";

// Third Party
import {REHYDRATE} from 'redux-persist/src/constants';

export const addPayPalAddress = item => ({
  type: ActionType.addPayPalAddress,
  data: item,
});

export const addUserAddress = item => ({
  type: ActionType.addUserAddress,
  data: item,
});

export const changePayPalAddresses = id => ({
  type: ActionType.changePayPalAddresses,
  data: id,
});

export const changeUserAddress = id => ({
  type: ActionType.changeUserAddress,
  data: id,
});

export const deleteCheckoutItem = id => ({
  type: ActionType.deleteCheckoutItem,
  data: id,
});

export const hideActivityLoader = () => ({
  type: ActionType.hideActivityLoader,
  data: false,
});

export const isLoggedIn = isLoggedIn => ({
  type: ActionType.isLoggedIn,
  data: isLoggedIn,
});


export const logout = () => ({type: REHYDRATE, payload: reducerInitialState});

export const performAutoLogout = () => ({
  type: ActionType.performAutoLogout,
  data: true,
});

export const pushNewMessage = message => ({
  type: ActionType.pushNewMessage,
  data: message,
});

export const setCurrentAddress = address => ({
  type: ActionType.setCurrentAddress,
  data: address,
});

export const setProfileTabInitialScreen = screen => ({
  type: ActionType.setProfileTabInitialScreen,
  data: screen,
});

export const showActivityLoader = () => ({
  type: ActionType.showActivityLoader,
  data: true,
});

export const storeAuthToken = token => ({
  type: ActionType.storeAuthToken,
  data: token,
});

export const storeBrowseList = items => ({
  type: ActionType.storeBrowseList,
  data: items,
});

export const storeCheckoutList = items => ({
  type: ActionType.storeCheckoutList,
  data: items,
});

export const storeCouponList = items => ({
  type: ActionType.storeCouponList,
  data: items,
});

export const storeDeliveryAddressData = item => ({
  type: ActionType.storeDeliveryAddressData,
  data: item,
});

export const storeDeliveryItem = item => ({
  type: ActionType.storeDeliveryItem,
  data: item,
});

export const storeFAQs = items => ({
  type: ActionType.storeFAQs,
  data: items,
});

export const storeFavoriteList = items => ({
  type: ActionType.storeFavoriteList,
  data: items,
});

export const storeFilterHighLightsList = items => ({
  type: ActionType.storeFilterHighLightsList,
  data: items,
});

export const storeFoodItems = items => ({
  type: ActionType.storeFoodItems,
  data: items,
});

export const storeFoodOptions = foodOptions => ({
  type: ActionType.storeFoodOptions,
  data: foodOptions,
});

export const storeMenuList = items => ({
  type: ActionType.storeMenuList,
  data: items,
});

export const storeOrderedItem = (restaurantName, items) => ({
  type: ActionType.storeOrderedItem,
  restaurantName: restaurantName,
  itemsOrdered: items,
});

export const storeOrderHistoryList = items => ({
  type: ActionType.storeOrderHistoryList,
  data: items,
});

export const storePayPalAddresses = addresses => ({
  type: ActionType.storePayPalAddresses,
  data: addresses,
});

export const storeRestaurantList = items => ({
  type: ActionType.storeRestaurantList,
  data: items,
});

export const storeSelectedLanguage = selectedLanguage => ({
  type: ActionType.selectedLanguage,
  data: selectedLanguage,
});

export const storeShareEarnList = items => ({
  type: ActionType.storeShareEarnList,
  data: items,
});

export const storeSortByTitleList = items => ({
  type: ActionType.storeSortByTitleList,
  data: items,
});

export const storeSubItemData = items => ({
  type: ActionType.storeSubItemData,
  data: items,
});

export const storeTabMenuItems = items => ({
  type: ActionType.storeTabMenuItems,
  data: items,
});

export const storeTypeOfFoodList = items => ({
  type: ActionType.storeTypeOfFoodList,
  data: items,
});

export const storeUserAddress = items => ({
  type: ActionType.storeUserAddress,
  data: items,
});

export const storeUserInfo = userInfo => ({
  type: ActionType.storeUserInfo,
  data: userInfo,
});

export const storeUserMessages = messages => ({
  type: ActionType.storeMessages,
  data: messages,
});

export const storeUserReviewList = items => ({
  type: ActionType.storeUserReviewList,
  data: items,
});

export const toggleFavoriteItem = items => ({
  type: ActionType.toggleFavoriteItem,
  data: items,
});

export const toggleFilterHighLightsItem = item => ({
  type: ActionType.toggleFilterHighLightsItem,
  data: item,
});

export const toggleFoodOption = item => ({
  type: ActionType.toggleFoodOption,
  data: item,
});

export const storeInvoiceData = data => ({
  type: ActionType.storeInvoiceData,
  data: data,
});

export const toggleSortByTitleItem = item => ({
  type: ActionType.toggleSortByTitleItem,
  data: item,
});

export const toggleTabMenuItem = item => ({
  type: ActionType.toggleTabMenuItem,
  data: item,
});

export const toggleTypeOfFoodItem = item => ({
  type: ActionType.toggleTypeOfFoodItem,
  data: item,
});

export const updateAppFirstLaunchToFalse = () => ({
  type: ActionType.updateAppFirstLaunchToFalse,
});

export const updateCounterOfInvoiceList = (id, counter) => ({
  type: ActionType.updateCounterOfInvoiceList,
  data: id,
  counter: counter,
});

export const updateDeliveryItemStatus = item => ({
  type: ActionType.updateDeliveryItemStatus,
  data: item,
});

export const updateCounterOfCheckoutList = (id, counter) => ({
  type: ActionType.updateCounterOfCheckoutList,
  data: id,
  counter: counter,
});

export const updateInvoiceStatus = status => ({
  type: ActionType.updateInvoiceStatus,
  data: status,
});

export const updateInternetStatus = isConnected => ({
  type: ActionType.updateInternetStatus,
  data: isConnected,
});


export const loginStatus = (comments) => {
  console.log("에라이 집가 "+ comments);
  return {
      type: ActionType.loginStatus,
      payload: comments
  }
} 
  
// export const onSignin = (email, password) => {
//   console.log('이메일' + email  + ' 페수워드      '  + password);
//   return (dispatch) => {
//       // dispatch(fetchCommentRequest())
//       // fetch("http://jsonplaceholder.typicode.com/comments")
//       //dispatch(fetchMenulistRequest())
//       API.post("user/option",)
//             //.then(response => response.json())
//             .then((response) => {
//               console.log('성공이에요');
//                 configureAPI({ token: `Bearer ${response.data}` });
//                 dispatch(loginStatus(response.data));
//             })
//             .catch(error => console.log(JSON.stringify(error)))
//   }
// }

export const onSignin = (email, password) => {
  console.log('이메일' + email  + ' 페수워드      '  + password);
  return (dispatch) => {
      // dispatch(fetchCommentRequest())
      // fetch("http://jsonplaceholder.typicode.com/comments")
      //dispatch(fetchMenulistRequest())
      API.post("user/login",{
        email,
        password,
      }
      )
            //.then(response => response.json())
            .then((response) => {
              console.log('성공이에요');
                configureAPI({ token: `Bearer ${response.data}` });
                //dispatch(loginStatus(true));
                
            })
            //.catch(error => console.log("오류는??      "  +JSON.stringify(error)))
            .catch(error => {console.log('오류에요'); alert("잘못된 비밀번호 혹은 존재하지 않은 ID입니다");})
  }
}


// const onSignin = (dispatch) => async ({ email, password }) => {
//   console.log(JSON.stringify(dispatch));
//   console.log('오냐1');
//   API.post("user/login", {
//     email,
//     password,
//   }) 
//     .then((response) => {
//       console.log('오냐2');
      
//       dispatch(loginStatus(response.data));       
//      // navigate("MainHome");
//     })
//     .catch((err) => {
//       dispatch({
//         //type: aType.ERROR,
//         //payload: "잘못된 비밀번호 혹은 존재하지 않은 ID입니다"+err,        
//       });
//       //alert("잘못된 비밀번호 혹은 존재하지 않은 ID입니다"); 
 
//     });
// };



const configureAPI = ({ token }) => {
  API.defaults.headers.common["Authorization"] = token;
};
