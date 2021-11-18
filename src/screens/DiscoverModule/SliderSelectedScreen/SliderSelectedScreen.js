/* eslint-disable */
import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

//Third Party
import {useSelector, useDispatch} from 'react-redux';

//Components
import CommonFoodCategoryMenu from '../../../components/CommonFoodCategoryMenu/CommonFoodCategoryMenu';
import CommonTabMenuList from '../../../components/CommonTabMenuList/CommonTabMenuList';
import FoodItem from '../../../components/FoodItem/FoodItem';
import Header from '../../../components/Header/Header';
import LongButton from '../../../components/LongButton/LongButton';
import NoInformationText from '../../../components/NoInformationText/NoInformationText';
import SearchBoxWithRightIcon from '../../../components/SearchBoxWithRightIcon/SearchBoxWithRightIcon';
import SingleFoodItemInfo from '../../../components/SingleFoodItemInfo/SingleFoodItemInfo';
import TitleWithSideIcons from '../../../components/TitleWithSideIcons/TitleWithSideIcons';


//Publicly Available Icons that Can be Used for Commercial Purposes
import ActiveBlock from '../../../assets/icons/discoverMenuIcons/active_blockSVG.svg';
import ActiveList from '../../../assets/icons/discoverMenuIcons/active_listSVG.svg';
import InActiveBlock from '../../../assets/icons/discoverMenuIcons/inactive_block.svg';
import InActiveList from '../../../assets/icons/discoverMenuIcons/inactive_list.svg';
import PriceDown from '../../../assets/icons/discoverMenuIcons/down_arrowSVG.svg';
import PriceUp from '../../../assets/icons/discoverMenuIcons/up_arrowSVG.svg';
import Search from '../../../assets/icons/discoverMenuIcons/searchSVG.svg';

//@TODO - Replace with Placeholder
import FavoriteInactiveIcon from '../../../assets/icons/discoverMenuIcons/favoriteSVG.svg';
import FavoriteActiveIcon from '../../../assets/icons/discoverMenuIcons/favoriteActiveSVG.svg';

//Publicly Available Icons that Can be Used for Commercial Purposes
import Menu from '../../../assets/icons/discoverMenuIcons/filtersSVG.svg';

//Utils
import Action from '../../../redux/action';
import globalStyles from '../../../assets/styles/globalStyles';
import styles from './style';
import {BUTTON_TYPE, FONT_FAMILY} from '../../../constants/constants';
import {allColors} from '../../../assets/styles/mainColors';

import {loadPagination} from '../../../utility/Helper';
import {navigate} from '../../../utility/NavigationService';
import Routes from '../../../navigation/Routes';

//Dummy Data
import SubItemsDummy from '../../../DummyData/SubItemsDummyData';

//right title icon definition with the function names
const rightIconArray = [
  {functionName: 'SearchClicked', component: <Search height={30} width={30} />},
  {functionName: 'MenuClick', component: <Menu />},
];

/* --- Start Title Top View --- */
const TitleWithTopIconView = props => {
  const [searchView, setSearchView] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [headerTitle, setHeaderTitle] = useState(
    props.route.params.headerTitle,
  );

  //on click of right icons, what functions should be shown
  function handleRightIconClick(value) {
    switch (value) {
      case 'SearchClicked': {
        setHeaderTitle(searchView ? props.route.params.headerTitle : '');
        setSearchView(!searchView);
        break;
      }
      case 'MenuClick': {
        navigate(Routes.FilterScreen);
        break;
      }
      default:
        return;
    }
  }

  //change the title if search view value is greater
  useEffect(() => {
    if (searchValue.length > 0) {
      setHeaderTitle(searchValue);
    } else {
      if (searchView) {
        setHeaderTitle('');
      } else {
        setHeaderTitle(props.route.params.headerTitle);
      }
    }
  }, [searchValue]);

  return (
    <View>
      {/*------- Header Start -----*/}
      <Header
        title={headerTitle}
        onLeftIconPress={() => props.navigation.goBack()}
        onRightIconPress={() => props.navigation.toggleDrawer()}
      />
      {/*------- Header End -----*/}

      {/*---- shows search box if user clicked on search box ----*/}
      <View style={globalStyles.horizontalGeneralPadding}>
        {searchView ? (
          <SearchBoxWithRightIcon
            placeholder={'Search Here..'}
            containerMarginTop={15}
            containerMarginBottom={10}
            rightIconComponent={<Menu />}
            value={searchValue}
            onBlur={() => {
              if (searchView) {
                handleRightIconClick('SearchClicked');
              }
            }}
            onChangeText={text => setSearchValue(text)}
            onPressRightIcon={() => navigate(Routes.FilterScreen)}
          />
        ) : (
          <TitleWithSideIcons
            titleFontWeight={'normal'}
            fontSize={24}
            title={props.topTitle}
            containerTopPadding={17}
            containerBottomPadding={23}
            rightIconComponentsArray={rightIconArray}
            iconOnPress={value => handleRightIconClick(value)}
          />
        )}
      </View>
    </View>
  );
};
/* --- End Title Top View --- */

/* --- Start Tab Menu --- */
const TabMenuView = () => {
  return (
    <View style={globalStyles.marginTop15}>
      <CommonTabMenuList />
    </View>
  );
};
/* --- End Tab Menu --- */

/* --- Start Tab Menu --- */
const CategoryView = () => {
  const dispatch = useDispatch();
  const category = useSelector(state => state.category, [category]);
  return (
    <View style={styles.navs}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => dispatch(Action.changeCategory(1))} style={[styles.navs_link, category==1 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>AMERICANO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(Action.changeCategory(2))} style={[styles.navs_link, category==2 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>COFFEE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(Action.changeCategory(3))} style={[styles.navs_link, category==3 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>NON-COFFEE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(Action.changeCategory(4))} style={[styles.navs_link, category==4 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>ESPRESSO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(Action.changeCategory(5))} style={[styles.navs_link, category==5 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>BAKERY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(Action.changeCategory(6))} style={[styles.navs_link, category==6 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>MD</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
  );
};
/* --- End Tab Menu --- */







/* --- Start Best Dish Menu --- */
const ListingView = () => {
  const dispatch = useDispatch();
  const [itemList, setItemList] = useState([]);
  const [blockView, setBlockView] = useState(true);
  const [listView, setListView] = useState(false);
  const [offset, setOffset] = useState(1);
  const [noDataAvailable, setNoDataAvailable] = useState(false);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  //get data for sub items in the redux store
  const storeSubItemList = useCallback(
    () => dispatch(Action.storeSubItemData(SubItemsDummy.data)),
    [dispatch],
  );
  const subItems = useSelector(state => state.subItems, []);
  const favoritedItems = useSelector(state => state.favoritedItems, []);
  
 
  
  //update after store update
  useEffect(() => {
    storeSubItemList();
  }, []);

  //매뉴 아이템 갖고오기 이부분 이전에 갖고오는걸로하자.
  useEffect(() => {
    dispatch(Action.fetchGetmenu());
    console.log("지금여기 타고잇냐?");
  }, []);
  useEffect(() => {
    dispatch(Action.fetchGetOption());
    console.log("옵션데이터 서버에서 갖고오기");
  }, []);

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const menudata = useSelector(state => state.menudata);
  
//이부분 usecallback 사용할지 정해서 잘사욧ㅇ하기


const category = useSelector(state => state.category, [category]);

  //pagination for items being viewed
  useEffect(() => {
    pagination(subItems, 2, offset);
  }, [subItems]);

  //pagination for items being viewed
  useEffect(() => {
    if (offset > 1) {
      pagination(subItems, 2, offset);
    }
  }, [offset]);

  //sort them in order
  useEffect(() => {
    if (itemList.length > 0) {
      setItemList(Array.from(itemList).reverse());
    }
  }, [ascendingOrder]);

  //pagination function
  function pagination(array, page_size, page_number) {
    let temp = loadPagination(array, page_size, page_number);
    if (temp.length > 0) {
      if (ascendingOrder) {
        setItemList([...itemList, ...temp]);
      } else {
        setItemList([...temp, ...itemList]);
      }
      if (subItems.length <= itemList.length + page_size) {
        setNoDataAvailable(true);
      } else {
        setNoDataAvailable(false);
      }
    } else {
      setNoDataAvailable(true);
    }
  }

  //load more button if there are many items available in the list
  const LoadMoreButton = () => (
    <View style={globalStyles.marginTop30}>
      {noDataAvailable ? null : (
        <LongButton
          title={'LOAD MORE 999'}
          titleFontSize={18}
          titleFontColor={allColors.black}
          titleFontWeight={'300'}
          titleFontFamily={FONT_FAMILY.RobotoCondensedLight}
          type={BUTTON_TYPE.LIGHT}
          onPress={() => console.log(JSON.stringify(isLoggedIn)+"  메뉴데이터 콘솔 찍어보기!!    "+JSON.stringify(menudata))}
        />
      )}
    </View>
  );

  //renders the rows when the item is viewed in 100% width
  const renderListRows = ({item}) => {
    let props = this.props;
    return (
      <FoodItem
        key={'food_item_row' + item.id}
        title={item.title}
        rating={item.rating}
        description={item.description}
        deliveryFee={'$' + item.deliveryFee}
        ratingNum={item.review}
        isRateVisible={false}
        topRightIconComponent={favoritedItems.indexOf(item.id) >=0 ? <FavoriteActiveIcon /> : <FavoriteInactiveIcon /> }
        onTopRightIconPress={() =>  dispatch(Action.toggleFavoriteItem(item.id))}
        addToCartOnPress={() => navigate(Routes.AddToCartScreen)}
        imageIconPath={item.imageIconPath}
      />
    );
  };

  function onClickShowMenu(menu_id, item) {
    dispatch(Action.showMenuDetail(menu_id))
    //props.fetchGetRoasting(props.current_store_info,menu_id);
    navigate(Routes.AddToCartScreen,{menudetail: item});
  } 

  //renders rows of two items in the same row
  const renderBlockRows = ({item, index}) => {
    if(category == item.category){
      return (
        <SingleFoodItemInfo
          key={'block_row_' + index}
          index={index}
          title={item.title}
          //rating={item.rating}
          //deliveryTime={item.deliveryTime}
          //description={item.description}
          onPress={() => onClickShowMenu(item.menu_id,item)}
          price={item.price}
          showCartIcon={true}
          isAddToCartVisible={false}
          //topRightIconComponent={favoritedItems.indexOf(item.menu_id) >=0 ? <FavoriteActiveIcon /> : <FavoriteInactiveIcon /> }
          onTopRightIconPress={() =>  dispatch(Action.toggleFavoriteItem(item.menu_id))}
          //addToCartOnPress={() => onClickShowMenu(item.menu_id,item)}
          imageIconPath={item.imageview}
        />
      );
    }
    return <View></View>
  };
//스토어 저장위치 전시하기




  return (
    <View
      style={[
        globalStyles.marginTop15,
        globalStyles.flex,
        globalStyles.justifyCenter,
      ]}>
      {itemList.length > 0 ? (
        <View style={globalStyles.flex}>
          {/* ------ List Settings Start ----- */}
          <View
            style={[
              globalStyles.horizontalGeneralPadding,
              globalStyles.flexDirectionRow,
              globalStyles.alignItemsCenter,
              globalStyles.width100,
              globalStyles.marginBottom5,
            ]}>
            <View
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
                globalStyles.justifySpaceBetween,
                globalStyles.flex,
              ]}>
              {/*------ Choose a list type to see the food items with start-------------*/}
              <View
                style={[
                  globalStyles.flexDirectionRow,
                  globalStyles.alignItemsCenter,
                ]}>
                <Text style={styles.titleText}>{'List Items:'}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setBlockView(true);
                    setListView(false);
                  }}
                  style={styles.verticalStyle}>
                  {blockView ? (
                    <ActiveBlock height={20} width={20} />
                  ) : (
                    <InActiveBlock height={18} width={18} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setListView(true);
                    setBlockView(false);
                  }}
                  style={styles.verticalStyle}>
                  {listView ? (
                    <ActiveList height={20} width={20} />
                  ) : (
                    <InActiveList height={20} width={20} />
                  )}
                </TouchableOpacity>
              </View>
              {/*------ Choose a list type to see the food items with end-------------*/}

              {/*------ List item filters start -------------*/}
              <View
                style={[
                  globalStyles.flexDirectionRow,
                  globalStyles.alignItemsCenter,
                ]}>
                <TouchableOpacity style={globalStyles.marginRight5}>
                  <Menu height={15} width={15} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setAscendingOrder(!ascendingOrder)}
                  style={[
                    styles.horizontalStyle,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignItemsCenter,
                    globalStyles.marginLeft5,
                  ]}>
                  <Text style={styles.titleText}>{'Price:'}</Text>
                  {ascendingOrder && <PriceDown />}
                  {!ascendingOrder && <PriceUp
                    height={20}

                  />}
                </TouchableOpacity>
              </View>
              {/*------ List item filters end -------------*/}
            </View>
          </View>
          {/* ------ List Settings End ----- */}

          {/* ------ Choose Render FlatList according to the user list type selection ----- */}
          <View
            style={[globalStyles.horizontalGeneralPadding, globalStyles.flex]}>
            {blockView ? (
              <FlatList
              data={menudata}
              numColumns={2}
              renderItem={renderBlockRows}
              keyExtractor={(item, index) => index.toString()}
            />
            ) : (
              <FlatList
                //performance settings
                //initialNumToRender={2} // Reduce initial render amount
                //maxToRenderPerBatch={1} // Reduce number in each render batch
                // windowSize={7} // Reduce the window size
                key={'2'}
                showsVerticalScrollIndicator={false}
                data={itemList}
                renderItem={renderListRows}
                contentContainerStyle={[
                  globalStyles.paddingTop15,
                  globalStyles.commonScrollViewPadding,
                ]}
                ItemSeparatorComponent={() => <View style={{height: 15}} />}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => <LoadMoreButton />}
              />
            )}
          </View>
        </View>
      ) : (
        <NoInformationText />
      )}
    </View>
  );
};
/* --- End Best Dish Menu --- */

const SliderSelectedScreen = ({navigation, route}) => {
  /* --- Start Top Category Menu --- */
  const TopCategoriesMenu = () => (
    <View>
      <CommonFoodCategoryMenu />
    </View>
  );
  /* --- End Top Category Menu --- */

  const current_store_name = useSelector(state => state.current_store_name, []);

    /*  매장이 선택되어 있지 않을 시 매장선택화면으로 이동 전 데이터설정 */
  /*  매장이 선택되어 있지 않을 시 매장선택화면으로 이동 s */
  function _gostore() {

    // let location = 
    //   {
    //     coords: {
    //       latitude: props.start_lat, //기본값 서울 중앙
    //       longitude: props.start_lon
    //     }
    //   }
    
    // console.log("로케이션 위치 알림 " + JSON.stringify(location));
    // props.fetchStores();
    // props.getdist(location);
    Alert.alert(
      "매장이 선택되어있지 않습니다",
      `매장을 먼전 선택하세요`,
      [

        { text: "확인", onPress: () => navigate(Routes.RestaurantsListing) }
      ],
      { cancelable: false }
    );
  }

  if (current_store_name === null) {
    return (
      <View style={styles.gostore}>
        <Text style={{ fontSize: 23, color: '#333' }}> {current_store_name} 매장을 먼저 선택해 주세요</Text>
        <TouchableOpacity onPress={() => _gostore()}>
          <Text style={{ fontSize: 20, color: '#333' }}> 매장 찾기</Text>
        </TouchableOpacity>
      </View>
    );
  }
else{
  return (
    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      {/*---- Title with top icon view Start (see definition above) ----*/}
      <TitleWithTopIconView
        //topTitle={route.params.topTitle}
        topTitle={'MENU'}
        route={route}
        navigation={navigation}
      />
      {/*---- Title with top icon view End----*/}

      {/*----- Top Categories Menu Start-----*/}
      {/*----- Top Categories Menu End-----*/}

      {/*----- Tab filters view start -----*/}
      <CategoryView />
      {/*----- Tab filters view end -----*/}

      {/*---- Food Item List View Start (see definition above) -----*/}
      <ListingView />
      {/*---- Food Item List View End (see definition above) -----*/}
    </SafeAreaView>
  );
}
};

export default SliderSelectedScreen;
