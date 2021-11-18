import ActionType from './action-type';
import {reducerInitialState} from './reducer';
import API from "../API/WebService";

// Third Party
import {REHYDRATE} from 'redux-persist/src/constants';

 const addPayPalAddress = item => ({
  type: ActionType.addPayPalAddress,
  data: item,
});

 const addUserAddress = item => ({
  type: ActionType.addUserAddress,
  data: item,
});

 const changePayPalAddresses = id => ({
  type: ActionType.changePayPalAddresses,
  data: id,
});

 const changeUserAddress = id => ({
  type: ActionType.changeUserAddress,
  data: id,
});

 const deleteCheckoutItem = id => ({
  type: ActionType.deleteCheckoutItem,
  data: id,
});

 const hideActivityLoader = () => ({
  type: ActionType.hideActivityLoader,
  data: false,
});

const isEmailChecks = isEmailCheck =>({
  type: ActionType.isEmailCheck,
  data : isEmailCheck,  
})

 const isLoggedIn = isLoggedIn => ({
  type: ActionType.isLoggedIn,
  data: isLoggedIn,
});

const onSignups = onSignup => ({
  type: ActionType.onSignup,
  data: onSignup,
});

const passwordFinders = passwordFinder => ({
  type : ActionType.passwordFinder,
  data : passwordFinder,
});

const passChanges = passChange => ({
  type: ActionType.passChange,
  data : passChange,
})

const logout = () => ({type: REHYDRATE, payload: reducerInitialState});

const performAutoLogout = () => ({
  type: ActionType.performAutoLogout,
  data: true,
});

 const pushNewMessage = message => ({
  type: ActionType.pushNewMessage,
  data: message,
});

 const setCurrentAddress = address => ({
  type: ActionType.setCurrentAddress,
  data: address,
});

 const setProfileTabInitialScreen = screen => ({
  type: ActionType.setProfileTabInitialScreen,
  data: screen,
});

 const showActivityLoader = () => ({
  type: ActionType.showActivityLoader,
  data: true,
});

 const storeAuthToken = token => ({
  type: ActionType.storeAuthToken,
  data: token,
});

 const storeBrowseList = items => ({
  type: ActionType.storeBrowseList,
  data: items,
});

 const storeCheckoutList = items => ({
  type: ActionType.storeCheckoutList,
  data: items,
});

 const storeCouponList = items => ({
  type: ActionType.storeCouponList,
  data: items,
});

 const storeDeliveryAddressData = item => ({
  type: ActionType.storeDeliveryAddressData,
  data: item,
});

 const storeDeliveryItem = item => ({
  type: ActionType.storeDeliveryItem,
  data: item,
});

 const storeFAQs = items => ({
  type: ActionType.storeFAQs,
  data: items,
});

 const storeFavoriteList = items => ({
  type: ActionType.storeFavoriteList,
  data: items,
});

 const storeFilterHighLightsList = items => ({
  type: ActionType.storeFilterHighLightsList,
  data: items,
});

 const storeFoodItems = items => ({
  type: ActionType.storeFoodItems,
  data: items,
});

 const storeFoodOptions = foodOptions => ({
  type: ActionType.storeFoodOptions,
  data: foodOptions,
});

 const storeMenuList = items => ({
  type: ActionType.storeMenuList,
  data: items,
});

 const storeOrderedItem = (restaurantName, items) => ({
  type: ActionType.storeOrderedItem,
  restaurantName: restaurantName,
  itemsOrdered: items,
});

 const storeOrderHistoryList = items => ({
  type: ActionType.storeOrderHistoryList,
  data: items,
});

 const storePayPalAddresses = addresses => ({
  type: ActionType.storePayPalAddresses,
  data: addresses,
});

 const storeRestaurantList = items => ({
  type: ActionType.storeRestaurantList,
  data: items,
});

 const storeSelectedLanguage = selectedLanguage => ({
  type: ActionType.selectedLanguage,
  data: selectedLanguage,
});

 const storeShareEarnList = items => ({
  type: ActionType.storeShareEarnList,
  data: items,
});

 const storeSortByTitleList = items => ({
  type: ActionType.storeSortByTitleList,
  data: items,
});

 const storeSubItemData = items => ({
  type: ActionType.storeSubItemData,
  data: items,
});

 const storeTabMenuItems = items => ({
  type: ActionType.storeTabMenuItems,
  data: items,
});

 const storeTypeOfFoodList = items => ({
  type: ActionType.storeTypeOfFoodList,
  data: items,
});

 const storeUserAddress = items => ({
  type: ActionType.storeUserAddress,
  data: items,
});

 const storeUserInfo = userInfo => ({
  type: ActionType.storeUserInfo,
  data: userInfo,
});

 const storeUserMessages = messages => ({
  type: ActionType.storeMessages,
  data: messages,
});

 const storeUserReviewList = items => ({
  type: ActionType.storeUserReviewList,
  data: items,
});

 const toggleFavoriteItem = items => ({
  type: ActionType.toggleFavoriteItem,
  data: items,
});

 const toggleFilterHighLightsItem = item => ({
  type: ActionType.toggleFilterHighLightsItem,
  data: item,
});

 const toggleFoodOption = item => ({
  type: ActionType.toggleFoodOption,
  data: item,
});

 const storeInvoiceData = data => ({
  type: ActionType.storeInvoiceData,
  data: data,
});

 const toggleSortByTitleItem = item => ({
  type: ActionType.toggleSortByTitleItem,
  data: item,
});

 const toggleTabMenuItem = item => ({
  type: ActionType.toggleTabMenuItem,
  data: item,
});

 const toggleTypeOfFoodItem = item => ({
  type: ActionType.toggleTypeOfFoodItem,
  data: item,
});

 const updateAppFirstLaunchToFalse = () => ({
  type: ActionType.updateAppFirstLaunchToFalse,
});

 const updateCounterOfInvoiceList = (id, counter) => ({
  type: ActionType.updateCounterOfInvoiceList,
  data: id,
  counter: counter,
});

 const updateDeliveryItemStatus = item => ({
  type: ActionType.updateDeliveryItemStatus,
  data: item,
});

 const updateCounterOfCheckoutList = (id, counter) => ({
  type: ActionType.updateCounterOfCheckoutList,
  data: id,
  counter: counter,
});

 const updateInvoiceStatus = status => ({
  type: ActionType.updateInvoiceStatus,
  data: status,
});

 const updateInternetStatus = isConnected => ({
  type: ActionType.updateInternetStatus,
  data: isConnected,
});

const loginInfomations = loginInfomation => ({
  type : ActionType.loginInfomation,
  data : loginInfomation,
});

const passUpdateInfo = passUpdate => ({

  type : ActionType.passUpdate,
  data : passUpdate,

})

const insertCaseInfo = caseInsert => ({
    type : ActionType.caseInsert,
    data : caseInsert
})

const caseResults = caseResult =>({
    type : ActionType.caseResult,
    data : caseResult

})


const caseResult = (index_id)=>{
  return (dispatch) => {
    // dispatch(fetchCommentRequest())
    // fetch("http://jsonplaceholder.typicode.com/comments")
    //dispatch(fetchMenulistRequest())
    API.post("user/getCases",{
      index_id
    })
          //.then(response => response.json())
          .then((response) => {                      
              dispatch(caseResults(response.data));                                        
          })    
  }
}


//비밀번호 수령 후 업데이트
const passUpdates = (token,password,index_id) => {
  return (dispatch) => {
    // dispatch(fetchCommentRequest())
    // fetch("http://jsonplaceholder.typicode.com/comments")
    //dispatch(fetchMenulistRequest())
    API.post("user/passwordChange",{
      token,
      password,
      index_id
    })
          //.then(response => response.json())
          .then((response) => {        

            if(response.data === 'success'){
              alert('비밀번호 재설정에 성공하였습니다. 어플을 재시작 합니다.');
              dispatch(passUpdateInfo(response.data));
              dispatch(logout);
              dispatch(isLoggedIn(false));
            }              
          })    
  }
}


const cardUpdate = (cardNumber, expirationMonth, expirationYear, lastname, index_id) => {
  return (dispatch) => {    
    API.post("user/cardUpdate",{
      cardNumber,
      expirationMonth,
      expirationYear,
      lastname,
      index_id,
    })
    //.then(response => response.json())
    .then((response) => {
      console.log(' 카드 등록 성공이에요' + JSON.stringify(response.data));
      dispatch(loginInfomations(response.data));  
    })
  }
}


const caseInsert = (index_id,supportTitle,supportText) => {
  return async dispatch => {
    API.post("user/caseInsert",{
      index_id,
      supportTitle,
      supportText,
    })
      .then((response) => {
            console.log(JSON.stringify(response.data)+'인서트 케이스');
            dispatch(insertCaseInfo(response.data));  
      })
    }
}

//개인정보 변경
const personalInfoChange = (email,password,name) => {

  return async dispatch => { 
    API.post("user/InfoChange",{
      email,
      password,
      name
    })  
          //.then(response => response.json())
          .then((response) => {             
            //console.log(JSON.stringify(response.data)+'리스폰스@@tt');      
            dispatch(loginInfomations(response.data));
            //dispatch(loginInfomations(response.data));                                    
          })         
  }
}

const emailCheck = (email) => {
  return async dispatch => { 
    // dispatch(fetchCommentRequest())
    // fetch("http://jsonplaceholder.typicode.com/comments")
    //dispatch(fetchMenulistRequest())
    API.post("user/emailcheck",{
      email,
    }) 
          //.then(response => response.json())
          .then((response) => {                       
            dispatch(isEmailChecks(response.data));                         
          })         
  }
};

const onSignup = (email,Phonenum,password,name) => {  
  return async dispatch => {
      API.post("user/signup",{
        email,
        Phonenum,
        password,
        name
      }) 
          //.then(response => response.json())
      .then((response) => {                       
          dispatch(onSignups(response.data)); 
          dispatch(isLoggedIn(true));                
          console.log('회원가입 성공이에요' + JSON.stringify(response.data));                   
      })         
    }
  };
  
const passwordFinder = (email,Phonenum) => {  

  console.log('찾는쪽'+ email  + ' ;;;;;;;;;;;;' + '휴대폰' + Phonenum);
  return async dispatch => {
      API.post("user/passfinder",{
        email,
        Phonenum,
      })  
      //.then(response => response.json())
      .then((response) => {                       
          dispatch(passwordFinders(response.data)); 
          //dispatch(isLoggedIn(true));      
          console.log('이메일찾기 성공이에요' + JSON.stringify(response.data));                   
      })         
    }
  };
//-------------------------------------유저정보----------------------------------------------------------------------
 const loginStatus = (comments) => {
  console.log("에라이 집가 "+ comments);
    return {
      type: ActionType.loginStatus,
      payload: comments
      }
  }
  
  
const passChange = (index_id) => {
  
  console.log('인덱스 아이디 >>>>' +index_id);
  return (dispatch) =>{
    API.post("user/passChange",{
      index_id
    })
          //.then(response => response.json())
          .then((response) => {
            console.log('성공이에요' + JSON.stringify(response.data));
              dispatch(passChanges(response.data));
          })

  }
}


 const onSignin = (email, password) => {
  console.log('이메일' + email  + ' 페수워드      '  + password);
  return (dispatch) => {
      // dispatch(fetchCommentRequest())
      // fetch("http://jsonplaceholder.typicode.com/comments")
      //dispatch(fetchMenulistRequest())
      API.post("user/login",{
        email,
        password,
      })
            //.then(response => response.json())
            .then((response) => {
              console.log('성공이에요' + JSON.stringify(response.data));
                configureAPI({ token: `Bearer ${response.data}` });
                dispatch(loginInfomations(response.data));
                dispatch(isLoggedIn(true));
            })
            //.catch(error => console.log("오류는??      "  +JSON.stringify(error)))
            //.catch(error => {console.log('오류에요'); alert("잘못된 비밀번호 혹은 존재하지 않은 ID입니다");})  //동기적이라서 서버에서 응답받기전에 벌써 안된다고 답이온다.. 이부분을 비동기로
            //바거서 서버응답 기다릴때가지 로딩으로 처리 반드시해야할것임
            //서버에서도 응답을 바로할수잇게 오류를 넘기지말고 리턴을 다른것으로 해주는게 좋을듯
  }
}
//-------------------------------------메뉴갖고오기----------------------------------------------------------------------
const fetchMenulistSuccess = (item) => {
  return {
      type: ActionType.getmenuitem,
      payload: item
  }
} 


const fetchGetmenu = () => {
  return (dispatch) => {
      // dispatch(fetchCommentRequest())
      // fetch("http://jsonplaceholder.typicode.com/comments")
      //dispatch(fetchMenulistRequest())
      API.post("user/menu",)
            //.then(response => response.json())
            .then((response) => {
                configureAPI({ token: `Bearer ${response.data}` });
                dispatch(fetchMenulistSuccess(response.data));
            })
  }
}
//------------------------------------------------------------------------------------------------------------------

//-------------------------------------오더갖고오기----------------------------------------------------------------------
const fetchOrderSuccess = (item) => {
  console.log("오더아이템 "+ JSON.stringify(item) );
  return {
      type: ActionType.getorderitem,
      payload: item
  }
} 


export const getOrderresults =(user_id) =>{
  return (dispatch) => {
      API.post("user/orderresult",{    
        user_id, 
      })
            .then((response) => {
                configureAPI({ token: `Bearer ${response.data}` });
                dispatch(fetchOrderSuccess(response.data));
            })
  }
}
//------------------------------------------------------------------------------------------------------------------

//-------------------------------------상세 오더갖고오기----------------------------------------------------------------------
const fetchOrderResultDetailRequest  =() =>{
  return {
      type: ActionType.GET_ORDERRESULTDETAIL_REQUEST
  }
}
const fetchOrderResultDetailSuccess  =(item) =>{
  
  console.log("상세오더아이템 "+ JSON.stringify(item) );
  return {
      type: ActionType.GET_ORDERRESULTDETAIL_SUCCESS,
      payload :item
  }
}
const fetchOrderResultDetailFailure  =() =>{
  return {
      type: ActionType.GET_ORDERRESULTDETAIL_FAILURE
  }
}


const getOrderresultsDetail =(user_id) =>{
    return (dispatch) =>{
        dispatch(fetchOrderResultDetailRequest())
        API.post("/user/orderresultdetail", {    
            user_id, 
          })
        .then((response) => {
            configureAPI({ token: `Bearer ${response.data}` });
            dispatch(fetchOrderResultDetailSuccess(response.data))
        })
        
        .catch(error=> dispatch(fetchOrderResultDetailFailure(error)))
    }
}
//------------------------------------------------------------------------------------------------------------------

//-------------------------------------옵션 데이터갖고오기----------------------------------------------------------------------
const fetchOptionSuccess = (comments) => {
  return {
      type: ActionType.FETCH_OPTION_SUCCESS,
      payload: comments
  }
}
const fetchOptionRequest = () => {
  return {
      type: ActionType.FETCH_OPTION_REQUEST,

  }
}
const fetchOptionFailure = (error) => {
  return {
      type: ActionType.FETCH_OPTION_FAILURE,
      payload: error
  }
}


//옵션 갖고오기
const fetchGetOption = () => {
  return (dispatch) => {
      // dispatch(fetchCommentRequest())
      // fetch("http://jsonplaceholder.typicode.com/comments")
      dispatch(fetchOptionRequest())
      API.post("user/option",)
          //.then(response => response.json())
          .then((response) => {
              configureAPI({ token: `Bearer ${response.data}` });
              dispatch(fetchOptionSuccess(response.data));
          })
          .catch(error => dispatch(fetchOptionFailure(error)))
  }
}
//------------------------------------------------------------------------------------------------------------------
//----------------------카트에 아이템 추가
const insertCart = (item,num) => {
  return {
      type: ActionType.INSERT_CART,
      payload: item,
      num: num,
  }
}
//------------------------------------------------------------------------------------------------------------------
//----------------------카트 중복 개수 바꾸기
const changeCartNum = (item, num) => {
  return {
      type: ActionType.CHANGE_CART_NUM,
      payload: item,
      num: num,
  }
}
//------------------------------------------------------------------------------------------------------------------
//----------------------임시카트 초기값
const showMenuDetail = (item) => {
  return {
      type: ActionType.SHOW_MENUDETAIL,
      payload: item
  }
}
//------------------------------------------------------------------------------------------------------------------
//----------------------임시카트 설정하기
const setDataCart = (item, kind) => {
  return {
      type: ActionType.SET_DATACART,
      payload: item,
      kind: kind,
  }
}
//------------------------------------------------------------------------------------------------------------------

//-------------------------------------카테고리 변경----------------------------------------------------------------------
const changeCategory = (item) => {
  return {
      type: ActionType.CHANGE_CATEGORY,
      payload: item
  }
}
//------------------------------------------------------------------------------------------------------------------

//-------------------------------------스토어 인포 변경----------------------------------------------------------------------

const fetchStoreSuccess = (stores) =>{
  return {
      type: ActionType.FETCH_STORES_SUCCESS,
      payload: stores
  }
}
const fetchStoreRequest = () =>{
  return {
      type: ActionType.FETCH_STORES_REQUEST,

  }
}
const fetchStoreFailure = (error) =>{
  return {
      type: ActionType.FETCH_STORES_FAILURE,
      payload: error
  }
}


const fetchStores =() =>{
  return (dispatch) =>{
      
      // dispatch(fetchCommentRequest())
      // fetch("http://jsonplaceholder.typicode.com/comments")
      dispatch(fetchStoreRequest())
      API.post("/user/store", {
          
        })
      //.then(response => response.json())
      .then((response) => {
          configureAPI({ token: `Bearer ${response.data}` });
          dispatch(fetchStoreSuccess(response.data))
      })
      
      .catch(error=> dispatch(fetchStoreFailure(error)))
  }
}
//스토어 선택 저장
const SetCurStoreInfo = (item ,name) =>{ 
  return {
      type: ActionType.SET_CUR_STORE_INFO,
      payload: item,
      name: name,
  }
}

//------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------현재 위치 좌표 설정--------------------------------------------------
const SetCurLocation = (loca) =>{
  return {
      type: ActionType.SET_CUR_LOCATION,
      payload: loca, 
  }
}
//------------------------------------------------------------------------------------------------------------------
//---------------------------스토어 거리 계산하기------------------------------------------------------------
const SetCurDistance = (dist) =>{
  return {
      type: ActionType.SET_GET_DISTANCE,
      payload: dist, 
  }
}
//-----------------------------------------------------------------------------------------------------------




const configureAPI = ({ token }) => {
  API.defaults.headers.common["Authorization"] = token;
};
  export default {
  passUpdates,
  passwordFinder,
  cardUpdate,  
  onSignup,
  emailCheck,
  onSignin,
  loginStatus,
  personalInfoChange,
  passChange,
  fetchGetmenu,  
  fetchMenulistSuccess,
  fetchOrderSuccess,
  getOrderresults,
  caseInsert,

<<<<<<< HEAD
  caseResult,

  changeCategory,  
=======
  insertCart,
  changeCartNum,

  showMenuDetail,
  setDataCart,

  changeCategory,
  
  fetchStoreSuccess,
  fetchStoreRequest,
  fetchStoreFailure,
  fetchStores,
  SetCurStoreInfo,


>>>>>>> 0ae05ed1cf6b5e077f2e0cf65908c1f12a5822b3
  getOrderresultsDetail,
  fetchOrderResultDetailFailure,
  fetchOrderResultDetailSuccess,
  fetchOrderResultDetailRequest,

  fetchGetOption,
  fetchOptionSuccess,
  fetchOptionRequest,
  fetchOptionFailure,

  SetCurLocation,
  SetCurDistance,


  addPayPalAddress,
  addUserAddress,
  changePayPalAddresses,
  changeUserAddress,
  deleteCheckoutItem,
  hideActivityLoader,
  isLoggedIn,
  logout,
  performAutoLogout,
  pushNewMessage,
  setCurrentAddress,
  setProfileTabInitialScreen,
  showActivityLoader,
  storeAuthToken,
  storeBrowseList,
  storeCheckoutList,
  storeCouponList,
  storeDeliveryAddressData,
  storeDeliveryItem,
  storeFAQs,
  storeFavoriteList,
  storeFilterHighLightsList,
  storeFoodItems,
  storeFoodOptions,
  storeInvoiceData,
  storeMenuList,
  storeOrderedItem,
  storeOrderHistoryList,
  storePayPalAddresses,
  storeRestaurantList,
  storeSelectedLanguage,
  storeShareEarnList,
  storeSortByTitleList,
  storeSubItemData,
  storeTabMenuItems,
  storeTypeOfFoodList,
  storeUserAddress,
  storeUserInfo,
  storeUserMessages,
  storeUserReviewList,
  toggleFavoriteItem,
  toggleFilterHighLightsItem,
  toggleFoodOption,
  toggleSortByTitleItem,
  toggleTabMenuItem,
  toggleTypeOfFoodItem,
  updateAppFirstLaunchToFalse,
  updateCounterOfCheckoutList,
  updateCounterOfInvoiceList,
  updateDeliveryItemStatus,
  updateInternetStatus,
  updateInvoiceStatus,
};