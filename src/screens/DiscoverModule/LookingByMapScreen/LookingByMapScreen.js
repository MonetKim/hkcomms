import React, { useState, useEffect } from 'react';
import { View ,Alert } from 'react-native';

//Third Party
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import PropTypes from 'prop-types';

//Components
import GoogleInfoPin from '../../../components/GoogleInfoPin/GoogleInfoPin';

//Utils
import Action from '../../../redux/action';
import globalStyles from '../../../assets/styles/globalStyles';
import { allColors } from '../../../assets/styles/mainColors';
import {useDispatch, useSelector} from 'react-redux';

const tempMarkers = [
  {
    id: 0,
    coordinate: { latitude: 42.36652518703266, longitude: -71.05495023721711 },
  },
  {
    id: 1,
    coordinate: { latitude: 42.364749515843414, longitude: -71.05464982981947 },
  },
];

const LookingByMapScreen = props => {
  const [markers, setMarkers] = useState([]);
  const [polylineData, setPolylineData] = useState([]);

  const dispatch = useDispatch();

  //set temporary marker data
  useEffect(() => {
    setMarkers(props.tempMarkers ? tempMarkers : []);
  }, [props.tempMarkers]);

  //set routes for the passed in markers
  useEffect(() => {
    if (props.showRoute) {
      let tempRoute = [];
      props.googleMarker.map(item => {
        tempRoute.push({ latitude: item.latitude, longitude: item.longitude });
      });
      setPolylineData(tempRoute);
    }
  }, [props.googleMarker, props.showRoute]);


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
  }
  console.log("이시 다 " +JSON.stringify(props.googleMarker[0].latitude) )

  return (
    <View
      style={[
        globalStyles.marginBottom11,
        globalStyles.flex,
        { borderRadius: 5 },
      ]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={globalStyles.flex}
        showsScale={true}
        region={{ //시작부분
          latitude: props.googleMarker[0].latitude,
          longitude: props.googleMarker[0].longitude,
          // latitude: 37.532600,
          // longitude: 127.024612,
          latitudeDelta: 0.005,
          longitudeDelta: 0.03,
        }}>
        {/*------ Passed in Google Markers Map View Render Start ------*/}
        {props.googleMarker.map((item, index) => {
          return (
            <Marker
              key={'marker_' + index}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}>
              {item.homeIcon}
              <Callout>
                <GoogleInfoPin
                  imagePath={item.profilePicturePath}
                  title={JSON.stringify(props.googleMarker[0].longitude)}
                  address={item.address}
                  showRatingView={item.showRatingView}
                  rating={item.rating}
                  ratingNum={item.ratingNum}
                />
              </Callout>
            </Marker>
          );
        })}
        {/*------ Passed in Google Markers Map View Render End ------*/}

        {/*------ Route Render Start ------*/}
        {props.showRoute && (
          <MapViewDirections
            origin={polylineData[0]}
            waypoints={
              polylineData.length > 2 ? polylineData.slice(1, -1) : null
            }
            destination={polylineData[polylineData.length - 2]}
            apikey={'AIzaSyANG0-LliP9w-QPFBo1Oz7WyYoXgra2Tcc'}
            strokeWidth={5}
            strokeColor={'rgb(214,50,41)'}
            optimizeWaypoints={true}
            lineDashPattern={[35, 35]}
          />
        )}
        {/*------ Route Render End ------*/}

        {/*------ Route Render Start ------*/}
        {props.showRoute && (
          <MapViewDirections
            origin={polylineData[1]}
            waypoints={
              polylineData.length > 2 ? polylineData.slice(1, -1) : null
            }
            destination={polylineData[polylineData.length - 1]}
            apikey={'AIzaSyANG0-LliP9w-QPFBo1Oz7WyYoXgra2Tcc'}
            strokeWidth={2}
            strokeColor={'"rgb(59,89,152)"'}
            optimizeWaypoints={true}
          />
        )}
        {/*------ Route Render End ------*/}

        {/*------ Temporary Markers Render Start ------*/}
        {props.storeinfo.map(marker => (
          <Marker
            key={'marker_temp_' + marker.store_id}
            coordinate={{
              latitude: Number(marker.store_lat),
              longitude: Number(marker.store_lon),
            }}
            title={marker.store_name}
            description={marker.store_state}
            pinColor={'red'}
            onPress={() => saveStore(marker.store_id, marker.store_name)}
          />
        ))}
        {/*------ Temporary Markers Render End ------*/}
      </MapView>
    </View>
  );
};

/*---- Default Props Start -------*/
LookingByMapScreen.defaultProps = {
  googleMarker: [],
  storeinfo: [],
  markerBackgroundColor: allColors.white,
  showRoute: false,
  tempMarkers: true,
};
/*---- Default Props End -------*/

/*---- Prop Type Expectations Start -------*/
LookingByMapScreen.propTypes = {
  googleMarker: PropTypes.array,
  storeinfo: PropTypes.array,
  markerBackgroundColor: PropTypes.string,
  showRoute: PropTypes.bool,
  tempMarkers: PropTypes.bool,
};
/*---- Prop Type Expectations End -------*/

export default LookingByMapScreen;
