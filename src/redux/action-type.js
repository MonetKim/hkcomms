const ActionType = {
  onSignup : 'onSignup',
  caseResult : 'caseResult',
  passChange : 'passChange',
  cardUpdate : 'cardUpdate',
  passUpdate : 'passUpdate',
  personalInfo : 'personalInfo',
  caseInsert : 'caseInsert',
  loginInfomation : 'loginInfomation',
  passwordFinder : 'passwordFinder',
  loginStatus : 'LOGINSTATUS',
  onSignin : 'onSignin',
  isEmailCheck : 'isEmailCheck',
  addPayPalAddress: 'ADD_PAYPAL_ADDRESS',
  addUserAddress: 'ADD_USER_ADDRESS',
  changePayPalAddresses: 'CHANGE_PAY_PAL_ADDRESS',
  changeUserAddress: 'CHANGE_USER_ADDRESS',
  deleteCheckoutItem: 'DELETE_CHECKOUT_ITEM',
  hideActivityLoader: 'HIDE_ACTIVITY_LOADER',
  isLoggedIn: 'IS_LOGGEDIN',
  performAutoLogout: 'PERFORM_AUTO_LOGOUT',
  pushNewMessage: 'PUSH_NEW_MESSAGE',
  selectedLanguage: 'STORE_LANGUAGE',
  setCurrentAddress: 'SET_CURRENT_ADDRESS',
  setProfileTabInitialScreen: 'SET_PROFILE_TAB_INITIAL_SCREEN',
  showActivityLoader: 'SHOW_ACTIVITY_LOADER',
  storeAuthToken: 'STORE_AUTH_TOKEN',
  storeBrowseList: 'STORE_BROWSE_LIST',
  storeCheckoutList: 'STORE_CHECKOUT_LIST',
  storeCouponList: 'STORE_COUPON_LIST',
  storeDeliveryAddressData: 'STORE_DELIVERY_ADDRESS_DATA',
  storeDeliveryItem: 'STORE_DELIVERY_ITEM',
  storeFAQs: 'STORE_FAQS',
  storeFavoriteList: 'STORE_FAVORITE_LIST',
  storeFilterHighLightsList: 'STORE_FILTER_HIGH_LIGHTS_LIST',
  storeFoodItems: 'STORE_FOOD_ITEM',
  storeFoodOptions: 'STORE_FOOD_OPTIONS',
  storeInvoiceData: 'STORE_INVOICE_DATA',
  storeMenuList: 'STORE_MENU_LIST',
  storeMessages: 'STORE_MESSAGES',
  storeOrderedItem: 'STORE_ORDERED_ITEM',
  storeOrderHistoryList: 'STORE_ORDER_HISTORY_LIST',
  storePayPalAddresses: 'STORE_PAY_PAL_ADDRESS',
  storeRestaurantList: 'STORE_RESTAURANT_LIST',
  storeShareEarnList: 'STORE_SHARE_EARN_LIST',
  storeSortByTitleList: 'STORE_SORT_BY_TITLE_LIST',
  storeSubItemData: 'STORE_SUB_ITEM_DATA',
  storeTabMenuItems: 'STORE_TAB_MENU_ITEMS',
  storeTypeOfFoodList: 'STORE_TYPE_OF_FOOD_LIST',
  storeUserAddress: 'STORE_USER_ADDRESS',
  storeUserInfo: 'STORE_USER_INFO',
  storeUserReviewList: 'STORE_USER_REVIEW_LIST',
  toggleFavoriteItem: 'TOGGLE_FAVORITE_ITEM',
  toggleFilterHighLightsItem: 'TOGGLE_FILTER_HIGHLIGHTS_ITEM',
  toggleFoodOption: 'TOGGLE_FOOD_OPTION',
  toggleSortByTitleItem: 'TOGGLE_SORT_BY_TITLE_ITEM',
  toggleTabMenuItem: 'TOGGLE_TAB_MENU_ITEM',
  toggleTypeOfFoodItem: 'TOGGLE_TYPE_OF_FOOD_ITEM',
  updateAppFirstLaunchToFalse: 'UPDATE_APP_FIRST_LAUNCH_TO_FALSE',
  updateCounterOfCheckoutList: 'UPDATE_COUNTER_OF_CHECKOUT_LIST',
  updateCounterOfInvoiceList: 'UPDATE_COUNTER_OF_INVOICE_LIST',
  updateDeliveryItemStatus: 'UPDATE_DELIVERY_ITEM_STATUS',
  updateInternetStatus: 'UPDATE_INTERNET_STATUS',
  updateInvoiceStatus: 'UPDATE_INVOICE_STATUS',

  getmenuitem: 'GET_MENU_ITEM',
  getorderitem: 'GET_ORDER_ITEM',


  GET_ORDERRESULTDETAIL_FAILURE: 'GET_ORDERRESULTDETAIL_FAILURE',
  GET_ORDERRESULTDETAIL_REQUEST: 'GET_ORDERRESULTDETAIL_REQUEST',
  GET_ORDERRESULTDETAIL_SUCCESS: 'GET_ORDERRESULTDETAIL_SUCCESS',

  CHANGE_CATEGORY: 'CHANGE_CATEGORY',



};

export default ActionType;
