/* eslint-disable */
import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';

//Third Party
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

//Components
import BorderDivider from '../../../components/BorderDivider/BorderDivider';
import ChevronRightIcon from '../../../components/icons/ChevronRightIcon/ChevronRightIcon';
import FoodItem from '../../../components/FoodItem/FoodItem';
import Header from '../../../components/Header/Header';
import LogoIcon from '../../../components/icons/LogoIcon/LogoIcon';
import LookingByMapScreen from '../../DiscoverModule/LookingByMapScreen/LookingByMapScreen';
import ProfileWithBorder from '../../../components/ProfileWithBorder/ProfileWithBorder';

//Publicly Available Icons that Can be Used for Commercial Purposes
import ActiveLocation from '../../../assets/icons/discoverMenuIcons/active_locationSVG.svg';
import Location from '../../../assets/icons/discoverMenuIcons/inactive_locationSVG.svg';

//@TODO - GET Placeholders for these
import DeliveredIcon from '../../../assets/images/deliveredSVG.svg';
import DeclinedIcon from '../../../assets/images/declinedSVG.svg';
import FavoriteInactiveIcon from '../../../assets/icons/discoverMenuIcons/favoriteSVG.svg';
import FavoriteActiveIcon from '../../../assets/icons/discoverMenuIcons/favoriteActiveSVG.svg';

//Publicly Available Icons that Can be Used for Commercial Purposes
import DateIcon from '../../../assets/icons/storeIcons/dateSVG.svg';
import TimeIcon from '../../../assets/icons/storeIcons/inactive/inactive_clockSVG.svg';

//Utils
import Action from '../../../redux/action';
import globalStyles from '../../../assets/styles/globalStyles';
import * as images from '../../../assets/images/map';
import styles from './style';
import Routes from '../../../navigation/Routes';
import { allColors } from '../../../assets/styles/mainColors';
import { horizontalScale, screenWidth, verticalScale } from '../../../utility/Scale';
import { navigate } from '../../../utility/NavigationService';
import { returnDeliveryDate, returnDeliveryTime } from '../../../utility/Helper';

//Dummy Data
import InvoiceDummy from '../../../DummyData/InvoiceItemDummyData';
import DeliveryAddressDummy from '../../../DummyData/DeliveryDummyData';

const InvoiceScreen = ({ navigation, route }) => {

    const dispatch = useDispatch();
    //store invoice data in redux store
    const storeInvoiceData = useCallback(() => dispatch(Action.storeInvoiceData(InvoiceDummy.data)), [dispatch])
    //store delivery address data in redux store
    const storeDeliveryAddressData = useCallback(() => dispatch(Action.storeDeliveryAddressData(DeliveryAddressDummy.data)), [dispatch])
    const tempInvoiceData = useSelector(state => state.invoiceData, [])
    const tempDeliveryAddressData = useSelector(state => state.deliveryAddressData, [])
    const favoritedItems = useSelector(state => state.favoritedItems, [])
    const [showMap, setShowMap] = useState(false)
    const [invoiceItemList, setInvoiceList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [taxPrice, setTaxPrice] = useState(0)
    const [totalPriceWithTax, setTotalPriceWithTax] = useState(0)
    const [deliveryAddressData, setDeliveryAddressData] = useState([])
    let isCompleted = route.params.isCompleted;
    let order_id = route.params.order_id;

    const orderdetail = useSelector(state => state.orderdetail);
    const optionitem = useSelector(state => state.optionitem);
    const currentAddress = useSelector(state => state.currentAddress, []);
    const current_store_name = useSelector(state => state.current_store_name, []);

    //get the data in redux store and update
    useEffect(() => {
        storeInvoiceData()
        storeDeliveryAddressData()
    }, [])

    //put the data in invoice History
    useEffect(() => {
        setInvoiceList(tempInvoiceData.itemsOrdered)
    }, [tempInvoiceData])

    //set delivery information for map view
    useEffect(() => {
        if (tempDeliveryAddressData) {
            let tempData = []
            tempData.push(tempDeliveryAddressData.pickupInformation)
            tempData.push(tempDeliveryAddressData.restaurantInformation)
            tempData.push(tempDeliveryAddressData.deliveryInformation)

            setDeliveryAddressData(tempData)
        }
    }, [tempDeliveryAddressData])

    //update the item list if any changes occur
    useEffect(() => {
        updateItemList()
    }, [invoiceItemList])

    //update the invoice information if any changes in quantities occur
    function updateItemList() {
        if (invoiceItemList && invoiceItemList.length > 0) {
            let total = 0;
            for (let i = 0; i < invoiceItemList.length; i++) {
                total += invoiceItemList[i].totalPrice;
            }
            setTotalPrice(total)
        } else {
            setTotalPrice(0)
        }
    }

    //set the tax price
    useEffect(() => {
        setTaxPrice(totalPrice * 0.15)
    }, [totalPrice])

    //set total price
    useEffect(() => {
        setTotalPriceWithTax(totalPrice + taxPrice)
    }, [taxPrice])

    /*---------------------------------------- Invoice Title Information Start -----------------------------------------*/
    const TitleView = () => {
        return (
            <View style={[globalStyles.alignSelf, globalStyles.alignItemsCenter]} >
                <View style={styles.titleView} >
                    {isCompleted ? <Image
                        source={require('../../../assets/icons/generalIcons/invoice.png')}
                        style={{
                            width: verticalScale(55),
                            height: horizontalScale(60),
                            borderRadius: 3,
                        }}
                    /> : <LogoIcon />}
                </View>
                <View style={[globalStyles.marginTop15, globalStyles.flexDirectionRow, globalStyles.alignItemsCenter]}>
                    <Text style={styles.invoiceTitle} >{'주문번호:  '}</Text>
                    <Text style={styles.invoiceText}>{order_id}</Text>
                </View>
                <View style={[globalStyles.marginTop5]} >
                    <Text style={styles.descriptionText} >{JSON.stringify(route.params)}
                        <Text style={styles.reviewText} onPress={() => navigate(Routes.ProductReviewScreen, { headerTitle: 'Restaurant Review' })} >{'Add Review'}<ChevronRightIcon /></Text>
                    </Text>
                </View>
                {!isCompleted && <View style={{ position: 'absolute', top: verticalScale(112) }}>
                    <DeclinedIcon />
                </View>}
            </View>
        )
    }
    /*---------------------------------------- Invoice Title Information End -----------------------------------------*/

    /*---------------------------------------- Map View Title Start -----------------------------------------*/
    const MapViewTitle = () => {
        return (
            <View style={[globalStyles.alignSelf, globalStyles.alignItemsCenter]} >
                {/*-------------Profile Picture Start-----------*/}
                <View style={styles.titleView} >
                    <ProfileWithBorder
                        imagePath={'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
                        imageHeight={screenWidth * 0.14}
                        imageWidth={screenWidth * 0.14}
                        borderColor={allColors.borderBlack}
                    />
                </View>
                {/*-------------Profile Picture End-----------*/}

                {/*-------------Profile Information Start-------*/}
                <View style={styles.shipperView} >
                    <Text style={styles.shipperText} >{'Your Shipper'}</Text>
                    <Text style={styles.deliveryManName} >{tempInvoiceData && tempInvoiceData.driverName}</Text>
                </View>
                <View style={[globalStyles.marginTop5, globalStyles.flexDirectionRow, globalStyles.alignItemsCenter]}>
                    <Text style={styles.smallInvoiceTitle} >{'주문번호:  '}</Text>
                    <Text style={styles.smallInvoiceText}>{order_id}</Text>
                    <TouchableOpacity style={globalStyles.marginLeft5} onPress={() => navigate(Routes.SurrenderActScreen, { totalPrice: totalPriceWithTax.toFixed(2) })}>
                        <Image style={styles.pdfImage} source={images.generalIcons.pdfIcon} />
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.marginTop5, globalStyles.flexDirectionRow, globalStyles.alignItemsCenter]}>
                    <Text style={styles.smallInvoiceText} >{'Delivered by: '}</Text>
                    <Text style={styles.smallInvoiceTitle}>{tempInvoiceData && tempInvoiceData.deliveredBy}</Text>
                </View>
                {/*-------------Profile Information End-------*/}
            </View>
        )
    }
    /*---------------------------------------- Map View Title End -----------------------------------------*/

    /*---------------------------------------- Tracking Map Title Start -----------------------------------------*/
    const TrackingMapTitleAndIcon = () => {
        return (
            <View style={[globalStyles.alignItemsFlexEnd, globalStyles.marginTop25]} >
                <TouchableOpacity onPress={() => setShowMap(!showMap)} style={[globalStyles.flexDirectionRow, globalStyles.alignItemsCenter]} >
                    {showMap ? <ActiveLocation /> : <Location />}
                    <Text style={styles.trackingHistoryText} >{current_store_name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    /*---------------------------------------- Tracking Map Title End -----------------------------------------*/

    /*---------------------------------------- Map View Screen Definition Start -------------------------------*/
    const ShowMapView = () => {
        return (
            <View style={[globalStyles.flex, globalStyles.marginTop15]} >
                {deliveryAddressData.length > 0 && <LookingByMapScreen
                    googleMarker={deliveryAddressData}
                    showRoute={true}
                    tempMarkers={false}
                />}
            </View>
        )
    }
    /*---------------------------------------- Map View Screen Definition End -------------------------------*/

    //change counter on items
    const changeCounter = (item, counter) => {
        dispatch(Action.updateCounterOfInvoiceList(item.id, counter))
        updateItemList()
    }

    function total(item) { //데이터카트에 닮긴 옵션가격도 추가해주자. //여기선 각자 해야함...
        var total = 0;
        console.log(JSON.stringify(optionitem)+" 옵션 가격갖고오기   "+JSON.stringify(item))
        const cart = item;
        total = total + ((cart.menu_price
          + findOptionPrice(cart.menu_option)
          + findOptionPrice(cart.taste_option)
          + findOptionPrice(cart.add_option)         // 체크박스로 변경될시 여러개들어올것 체크 가격부분 저장 콤마로 나누기등등 다 고려해야함
        )
          * cart.quantity);
    
        var total_price = total;
        return total_price;
      }

      
  //옵션 이름찾기
  function findOptionName(option_num) {
    if (option_num === null) {
      return 0;
    }
    for (var i = 0; i < optionitem.length; i++) {
      if (optionitem[i].option_id == option_num)
        return optionitem[i].option_name;
    }
  }
  //옵션 가격찾기
  function findOptionPrice(option_num) {
    if (option_num === null) {
      return 0;
    }
    for (var i = 0; i < optionitem.length; i++) {
      if (optionitem[i].option_id == option_num)
        return optionitem[i].option_price;
    }
  }


    //render list of items that user ordered
    const renderListRows = ({ item }) => {
        if (item.order_id === order_id) {
            return (
                <View>
                    {

                        <View style={styles.singleFood}>
                            <View style={styles.multiMenu}>
                                <View style={styles.imageviewst}>
                                    <Image style={styles.OrderImages} source={{ uri: item.imageview }} />
                                </View>
                                <View>
                                    <View style={styles.foodTitle}>
                                        <Text>메뉴이름 : {item.menu_title}</Text>
                                    </View>
                                    <View style={styles.foodPrice}>
                                        <View>
                                            <Text>메뉴 가격 {item.menu_price}</Text>
                                        </View>
                                        <View>
                                            <Text>메뉴 수량 {item.quantity}</Text>
                                        </View>
                                        
                                        <View style={styles.cartRightSection}>
              {
                findOptionName(item.menu_option) == 0 ? <View></View> :
                  <Text> {findOptionName(item.menu_option)}</Text>
              }
              {
                findOptionPrice(item.menu_option) == 0 ? <View></View> :
                  <Text> {findOptionPrice(item.menu_option)}</Text>
              }
            </View>
            <View style={styles.cartRightSection}>
              {
                findOptionName(item.taste_option) == 0 ? <View></View> :
                  <Text> {findOptionName(item.taste_option)}</Text>
              }
              {
                findOptionPrice(item.taste_option) == 0 ? <View></View> :
                  <Text> {findOptionPrice(item.taste_option)}</Text>
              }
            </View>
            <View style={styles.cartRightSection}>
              {
                findOptionName(item.add_option) == 0 ? <View></View> :
                  <Text> {findOptionName(item.add_option)}</Text>
              }
              {
                findOptionPrice(item.add_option) == 0 ? <View></View> :
                  <Text> {findOptionPrice(item.add_option)}</Text>
              }
            </View>


                                        <View>
                                            <Text>합 : {total(item)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                    }
                </View>
            )
        }
    }

    /*---------------------------------------- Invoice View Start -----------------------------------------*/
    const InvoiceView = () => {
        return (
            <View style={globalStyles.commonScrollViewPadding}>
                <FlatList
                    //performance settings
                    // removeClippedSubviews={true}
                    //maxToRenderPerBatch={1} // Reduce number in each render batch
                    // windowSize={7} // Reduce the window size
                    showsVerticalScrollIndicator={false}
                    data={orderdetail}
                    renderItem={renderListRows}
                    contentContainerStyle={[globalStyles.paddingTop10]}
                    keyExtractor={(item, index) => index.toString()} />

                <View style={globalStyles.marginTop30} >

                </View>
            </View>
        )
    }
    /*---------------------------------------- Invoice View End -----------------------------------------*/

    return (
        <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
            {/*------- Header Start -----*/}
            <Header title={'Invoice History'} onLeftIconPress={() => navigation.goBack()} onRightIconPress={() => navigation.toggleDrawer()} />
            {/*------- Header End -----*/}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.flexGrow1}>
                <View style={globalStyles.flexGrow1} >
                    <View style={[globalStyles.horizontalGeneralPadding, globalStyles.flex]}>
                        {showMap ? <MapViewTitle /> : <TitleView />}
                        {/*------- Tracking Map Title To Toggle Map View Start ------*/}
                        <TrackingMapTitleAndIcon />
                        {/*------- Tracking Map Title To Toggle Map View End ------*/}

                        {/*------ Divider Start -----------*/}
                        <BorderDivider activeAreaAlignment={'left'} containerTopMargin={0} containerBottomMargin={15} activeAreaWidth={79} isActiveOnly={true} activeAreaHeight={1} activeAreaColor={isCompleted ? allColors.yellow : allColors.black} />
                        {/*------ Divider End -----------*/}

                        {/*-------  Map View or Invoice Information View ----*/}
                        {showMap ? <ShowMapView /> : <InvoiceView />}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
/*---- Default Props Start -------*/
InvoiceScreen.defaultProps = {
    isCompleted: true,
    order_id: 0

};
/*---- Default Props End -------*/

/*---- Prop Type Expectations Start -------*/
InvoiceScreen.propTypes = {
    isCompleted: PropTypes.bool,
    order_id: PropTypes.number,
};
/*---- Prop Type Expectations End -------*/
export default InvoiceScreen;
