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
    "메뉴",
  );

  //on click of right icons, what functions should be shown
  function handleRightIconClick(value) {
    switch (value) {
      case 'SearchClicked': {
        setHeaderTitle(searchView ? "MENU": '');
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
        setHeaderTitle("MENU");
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
          <TouchableOpacity onPress={() => dispatch(Action.SetCategoryData(1))} style={[styles.navs_link, category==1 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>AMERICANO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(Action.SetCategoryData(2))} style={[styles.navs_link, category==2 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>COFFEE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(Action.SetCategoryData(3))} style={[styles.navs_link, category==3 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>NON-COFFEE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(Action.SetCategoryData(4))} style={[styles.navs_link, category==4 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>ESPRESSO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(Action.SetCategoryData(5))} style={[styles.navs_link, category==5 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>BAKERY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(Action.SetCategoryData(6))} style={[styles.navs_link, category==6 ? styles.navs_link__active : ""]}>
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

  //매뉴 아이템 갖고오기 이부분 이전에 갖고오는걸로하자.
  useEffect(() => {
    dispatch(Action.fetchGetmenu());
  }, []);
  useEffect(() => {
    dispatch(Action.fetchGetOption());
  }, []);

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const menudata = useSelector(state => state.menudata);
  const category_data = useSelector(state => state.category_data);
  const category = useSelector(state => state.category, [category]);






  


  function onClickShowMenu(menu_id, item) {
    dispatch(Action.showMenuDetail(menu_id))
    //props.fetchGetRoasting(props.current_store_info,menu_id);
    navigate(Routes.AddToCartScreen,{menudetail: item});
  } 

  //renders rows of two items in the same row
  const renderBlockRows = ({item, index}) => {
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
          //category= {category == item.category ? true : false}
          category= {true}
          showCartIcon={true}
          isAddToCartVisible={false}
          //topRightIconComponent={favoritedItems.indexOf(item.menu_id) >=0 ? <FavoriteActiveIcon /> : <FavoriteInactiveIcon /> }
          onTopRightIconPress={() =>  dispatch(Action.toggleFavoriteItem(item.menu_id))}
          //addToCartOnPress={() => onClickShowMenu(item.menu_id,item)}
          imageIconPath={item.imageview}
        />
      );
  };
//스토어 저장위치 전시하기




  return (
    <View
      style={[
        globalStyles.marginTop15,
        globalStyles.flex,
        globalStyles.justifyCenter,
      ]}>
      {category_data.length > 0 ? (
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
              
              {/*------ Choose a list type to see the food items with end-------------*/}

              {/*------ List item filters start -------------*/}
              
              {/*------ List item filters end -------------*/}
            </View>
          </View>
          {/* ------ List Settings End ----- */}

          {/* ------ Choose Render FlatList according to the user list type selection ----- */}
          <View
            style={[globalStyles.horizontalGeneralPadding, globalStyles.flex]}>
              <FlatList
              data={category_data}
              numColumns={2}
              renderItem={renderBlockRows}
              keyExtractor={(item, index) => index.toString()}
            />
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
