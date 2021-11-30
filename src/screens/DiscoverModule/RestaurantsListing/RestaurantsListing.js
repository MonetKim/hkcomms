/* eslint-disable */
import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, FlatList, Text, View, ScrollView, Image,Platform, PermissionsAndroid , Alert} from 'react-native';

//Third Party
import {useDispatch, useSelector} from 'react-redux';

//Components
import BorderDivider from '../../../components/BorderDivider/BorderDivider';
import CommonTabMenuList from '../../../components/CommonTabMenuList/CommonTabMenuList';
import Header from '../../../components/Header/Header';

import LargeRestaurantInfo from '../../../components/LargeRestaurantInfo/LargeRestaurantInfo';
import LongButton from '../../../components/LongButton/LongButton';
import LookingByMapScreen from '../LookingByMapScreen/LookingByMapScreen';
import NoInformationText from '../../../components/NoInformationText/NoInformationText';
import TitleWithSideIcons from '../../../components/TitleWithSideIcons/TitleWithSideIcons';

//Publicly Available Icons that Can be Used for Commercial Purposes
import ActiveLocation from '../../../assets/icons/discoverMenuIcons/active_locationSVG.svg';
import Location from '../../../assets/icons/discoverMenuIcons/inactive_locationSVG.svg';
import HomeLocation from '../../../assets/icons/generalIcons/locationIcons/red_houseSVG.svg';

//Utils
import Action from '../../../redux/action';
import globalStyles from '../../../assets/styles/globalStyles';
import Routes from '../../../navigation/Routes';
import {BUTTON_TYPE, FONT_FAMILY} from '../../../constants/constants';
import {allColors} from '../../../assets/styles/mainColors';
import {loadPagination} from '../../../utility/Helper';
import {horizontalScale, verticalScale} from '../../../utility/Scale';
import {navigate} from '../../../utility/NavigationService';
import Geolocation from '@react-native-community/geolocation';

//Dummy Data
import RestaurantListDummy from '../../../DummyData/RestaurantListDummyData.json';



/* --- Start Restaurant List --- */

const RestaurantListView = React.memo(({route}) => {
  const dispatch = useDispatch();
  //store the restaurant list in redux
  const storeRestaurantList = useCallback(
    () => dispatch(Action.storeRestaurantList(RestaurantListDummy.data)),
    [dispatch],
  );
  //get the restaurant list
  const tempRestaurantList = useSelector(state => state.restaurantList, []);
  const [restaurantList, setRestaurantList] = useState([]);
  const [offset, setOffset] = useState(1);
  const [noDataAvailable, setNoDataAvailable] = useState(false);

  const storedist = useSelector(state => state.storedist, []);
    //현재 위치 갖고오기 테스트
     async function requestLocationPermission() 
{
  
  
  //이부분 테스트해봐야함 아이폰일때~~~
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
     authorizationLevel: 'whenInUse',
   });
  }




  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {//여기서 기본값으로 세팅하자..

      console.log("You can use the location     ")
      alert("You can use the location   " +Platform.OS+' '+ granted);
      geoLocation();
    } else {
      console.log("location permission denied     ")
      alert("Locationㄴㄴ permission denied  " +Platform.OS+' '+ granted);
      //여기서 기본값으로 세팅하자..

    }
  }
}
    
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLogitude] = useState(null);

    
    const geoLocation = () => {
      console.log("적어도 시작은 해야지 " );
        Geolocation.getCurrentPosition(
            position => {
                var lat = JSON.stringify(position.coords.latitude);
                var lon = JSON.stringify(position.coords.longitude);
                console.log(lon + ' 위경도전시 ' +lat)
                setLatitude(lat);
                setLogitude(lon);
                dispatch(Action.SetCurLocation(position.coords));
                dispatch(Action.SetCurDistance(position.coords));
                
               
                console.log("거리계산 리스트는 " + JSON.stringify(storedist));
            },
            error => { console.log(error.code, error.message); },
            {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
        )
    }




  //updates after redux store update   왜 이렇게 하는지 알필요가잇어요~~
  useEffect(() => {
    storeRestaurantList();
  }, []);

  useEffect(() => {
    dispatch(Action.fetchStores());
    requestLocationPermission();
    //geoLocation();
    console.log(latitude+"스토어 서버에서 인포갖고옴"+longitude);
  }, []);

  


  //get other pages
  useEffect(() => {
    pagination(tempRestaurantList, 2, offset);
  }, [tempRestaurantList]);

  //get other pages
  useEffect(() => {
    if (offset > 1) {
      pagination(tempRestaurantList, 2, offset);
    }
  }, [offset]);

  //pagination function that takes care of how many elements should show
  function pagination(array, page_size, page_number) {
    let temp = loadPagination(array, page_size, page_number);
    if (temp.length > 0) {
      setRestaurantList([...restaurantList, ...temp]);
      if (tempRestaurantList.length <= restaurantList.length + page_size) {
        setNoDataAvailable(true);
      } else {
        setNoDataAvailable(false);
      }
    } else {
      setNoDataAvailable(true);
    }
  }

  //border divider component for dividing each restaurant
  const SeparatorComponent = () => {
    return (
      <View>
        <BorderDivider
          containerTopMargin={12}
          containerBottomMargin={20}
          activeAreaAlignment={'left'}
          activeAreaWidth={0}
          isActiveOnly={false}
          activeAreaHeight={1}
        />
      </View>
    );
  };

  //load more button to get more data
  const LoadMoreButton = () => {
    return (
      <View style={globalStyles.marginTop30}>
        {noDataAvailable ? null : (
          <LongButton
            title={latitude+'LOAD MORE^^'+longitude}
            titleFontSize={18}
            titleFontColor={allColors.black}
            titleFontWeight={'300'}
            titleFontFamily={FONT_FAMILY.RobotoCondensedLight}
            type={BUTTON_TYPE.LIGHT}
            onPress={() => geoLocation()}
          />
        )}
      </View>
    );
  };

  //for performance purposes
  const getRestaurantListItemLayout = (data, index) => ({
    length: 300,
    offset: 300 * index,
    index,
  });

  //restaurant list row item
  // const renderRestaurantListRows = ({item, index}) => { console.log("스토어 거리확인 전시 " + JSON.stringify(item));
  //   return (
  //     <LargeRestaurantInfo
  //       key={'large_restaurant_info_' +index}
  //       title={item.store_name}
  //       //rating={item.rating}
  //       store_dist={Number(item.store_dist)}
  //       description={item.store_address}
  //       deliveryFee={ item.store_tel}
  //       onPress={() =>
  //         navigate(Routes.SliderSelectedScreen, {
  //           headerTitle: route.params.headerTitle,
  //           topTitle: route.params.topTitle,
  //         })
  //       }
  //       imageIconPath={item.store_imageview}
  //     />
  //   );
  // };
  function saveStore(storeid, storename) {
    Alert.alert(
      String(storename),
      "선택하신 매장이 맞습니까? " + Number(storeid),
      [
        //{ text: '확인', onPress: _gomenu.bind(this) },
        { text: '확인', onPress: () => _gomenu(storeid,storename) }, // 스토어저장하고 화면이동
        { text: '취소', onPress: () => null },
      ],
      { cancelable: true }

    )
  }
  function _gomenu(storeid,storename) {
    //스토어 아이디 테이블에 저장해야함... db유저테이블에 스토어컬럼 추가해~
    dispatch(Action.SetCurStoreInfo(storeid,storename)); 
    //여기서 데이터카트 아이 초기화 기능 만들어야함
    //navigate("MenuScreen");
    navigate(Routes.SliderSelectedScreen);
  }
  const renderRestaurantListRows = ({item, index}) => { //console.log("스토어 거리확인 전시 " + JSON.stringify(item));
  return (
    <LargeRestaurantInfo
      key={'large_restaurant_info_' +index}
      title={item.store_name}
      //rating={item.rating}
      store_dist={Number(item.store_dist)}
      description={item.store_address}
      deliveryFee={ item.store_tel}
      onPress={() => saveStore(item.store_id, item.store_name)}
      imageIconPath={item.store_imageview}
    />
  );
};

  const store_list = useSelector(state => state.storeinfo);

  return (
    <View style={[globalStyles.flex, globalStyles.justifyCenter]}>
      {restaurantList.length > 0 ? (
        <FlatList
          // Performance settings
          //removeClippedSubviews={true} // Unmount components when outside of window
          // initialNumToRender={1} // Reduce initial render amount
          // maxToRenderPerBatch={1} // Reduce number in each render batch
          // windowSize={7} // Reduce the window size
          showsVerticalScrollIndicator={false}
          //data={store_list}
          data={ store_list.sort((a, b) => (String(Number(a.store_dist / 1000))).localeCompare(String(Number(b.store_dist / 1000)))) }
          //data={store_list.sort((a, b) => (String(a.store_name)).localeCompare(String(b.store_name)))}
          // getItemLayout={getRestaurantListItemLayout}
          renderItem={renderRestaurantListRows}
          contentContainerStyle={[
            globalStyles.horizontalGeneralPadding,
            globalStyles.commonScrollViewPadding,
          ]}
          ItemSeparatorComponent={SeparatorComponent}
          ListFooterComponent={LoadMoreButton}
          //keyExtractor={(_item, index) => _item.title.split(' ').join('')+index}
          
          keyExtractor={(_item, index) => index.toString()}
        />
      ) : (
        <NoInformationText />
      )}
    </View>
  );
}, [true]);

/* --- End Restaurant List --- */

/* --- Start Tab Menu --- */
const TabMenuView = React.memo(() => {
  return (
    <View style={globalStyles.marginTop15}>
      <CommonTabMenuList />
    </View>
  );
});
/* --- End Tab Menu --- */

const RestaurantsListing = ({navigation, route}) => {
  const [showMap, setShowMap] = useState(false);

  //title right icons definition
  const rightIconArray = [
    {
      functionName: 'LocationClick',
      component: showMap ? <ActiveLocation /> : <Location />,
    },
  ];

  //what happens on click of right icon
  const handleRightIconClick = value => {
    switch (value) {
      case 'LocationClick': {
        setShowMap(!showMap);
        break;
      }
      default:
        return;
    }
  };

  //border divider styles
  const TopBorderView = () => (
    <View style={globalStyles.paddingLeftGeneral}>
      <BorderDivider
        containerTopMargin={16}
        containerBottomMargin={20}
        activeAreaAlignment={'left'}
        activeAreaWidth={79}
        isActiveOnly={false}
        activeAreaHeight={2}
      />
    </View>
  );

  /* --- Start Title Top View --- */
  const TitleWithTopIconView = () => (
    <View style={globalStyles.horizontalGeneralPadding}>
      <TitleWithSideIcons
        titleFontWeight={'normal'}
        fontSize={20}
        title={'Restaurants'}
        containerTopPadding={17}
        containerBottomPadding={9}
        leftIcon={<Image
            source={require('../../../assets/placeholders/20x20.png')}
            style={{
              height: verticalScale(20),
              width: horizontalScale(20),
              borderRadius: 3,
            }}
        />}
        rightIconComponentsArray={rightIconArray}
        iconOnPress={value => handleRightIconClick(value)}
      />
      <Text style={[globalStyles.commonRobotoText]}>
        {
          'Cras blandit consquat sapien ut curcus. Duis in mollis magna. Sed sit amet nulla. Pellentesque non ex velit.'
        }
      </Text>
    </View>
  );
  /* --- End Title Top View --- */

  /* ---- Start map view component ----*/
  const ShowMapView = () => {
    const currentAddress = useSelector(state => state.currentAddress);
    const storeinfo  = useSelector(state => state.storeinfo);
    const start_lat = useSelector(state => state.start_lat);//즉각반영 가능하도록
    const start_lon = useSelector(state => state.start_lon);
    console.log("구글맵은 "+JSON.stringify(storeinfo ));

    return (
      <View style={[globalStyles.flex, globalStyles.horizontalGeneralPadding]}>
        <LookingByMapScreen
          googleMarker={[
            {
              profilePicturePath:
                'https://images.unsplash.com/photo-1601999109332-542b18dbec57?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
              name: 'Sabrina Lorenshtein',
              address: currentAddress,
              showRatingView: true,
              rating: 4,
              ratingNum: 4,
              homeIcon: <HomeLocation height={80} width={80} />,
              // latitude: 42.35433012130913,
              // longitude: -71.05910008814041,
              latitude: start_lat,
              longitude: start_lon,
            },
          ]}
          storeinfo = {storeinfo}
        />
      </View>
    );
  };
  /* ---- end map view component ----*/

  return (
    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      {/*------- Header Start -----*/}
      <Header
        title={showMap ? 'Looking by Map' : 'Restaurants Listing'}
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => navigation.toggleDrawer()}
      />
      {/*------- Header End -----*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.flexGrow1}>
        <View style={globalStyles.flexGrow1}>
          {/*------ Title and Description with icons start -----------*/}
          <TitleWithTopIconView />
          {/*------ Title and Description with icons end -----------*/}
          <TabMenuView />
          {/*------ Divider start -----------*/}
          <TopBorderView />
          {/*------ Divider End -----------*/}


          {/*-- shows appropriate view according to users selection --*/}
          {showMap ? <ShowMapView /> : <RestaurantListView route={route} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestaurantsListing;
