/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  Platform,
  TextInput,
  Image,
} from 'react-native';

//Third Party
import { useDispatch, useSelector } from 'react-redux';

//Components
import Header from '../../../components/Header/Header';
import TitlePicture from '../../../components/TitlePicture/TitlePicture';
import UnderlineTextIcon from '../../../components/UnderlineTextIcon/UnderlineTextIcon';
import BorderDivider from '../../../components/BorderDivider/BorderDivider';
import FoodItem from '../../../components/FoodItem/FoodItem';
import CartItem from '../../../components/CartItem/CartItem';
import LongButton from '../../../components/LongButton/LongButton';
import NoInformationText from '../../../components/NoInformationText/NoInformationText';

//Publicly Available Icons that Can be Used for Commercial Purposes
import Edit from '../../../assets/icons/discoverMenuIcons/editSVG.svg';
import DeleteCross from '../../../assets/icons/storeIcons/deleteSVG.svg';
import DateIcon from '../../../assets/icons/storeIcons/dateSVG.svg';
import TimeIcon from '../../../assets/icons/storeIcons/inactive/inactive_clockSVG.svg';

//Utils
import Action from '../../../redux/action';
import globalStyles from '../../../assets/styles/globalStyles';
import Routes from '../../../navigation/Routes';
import styles from './style';
import { allColors } from '../../../assets/styles/mainColors';
import { horizontalScale, verticalScale } from '../../../utility/Scale';
import { navigate } from '../../../utility/NavigationService';
import { BUTTON_TYPE, FONT_FAMILY } from '../../../constants/constants';

//Dummy Data
import SubItemsDummy from '../../../DummyData/SubItemsDummyData';

const CheckOutScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const [itemList, setItemList] = useState([])
  const [couponCode, setCouponCode] = useState('')
  //checkout list to redux store
  const storeCheckoutItemList = useCallback(() => dispatch(Action.storeCheckoutList(SubItemsDummy.data)), [dispatch])
  const checkoutList = useSelector(state => state.checkoutList, [])
  const currentAddress = useSelector(state => state.currentAddress, []);

  const [totalPrice, setTotalPrice] = useState(0)
  const [taxPrice, setTaxPrice] = useState(0)
  const [totalPriceWithTax, setTotalPriceWithTax] = useState(0)

  const current_store_id = useSelector(state => state.current_store_id, []);
  const current_store_name = useSelector(state => state.current_store_name, []);

  const cartitem = useSelector(state => state.cartitem, [])
  const optionitem = useSelector(state => state.optionitem);
  //after redux update, update thte screen
  useEffect(() => {
    storeCheckoutItemList()
  }, [])

  //set the checkout items
  useEffect(() => {
    setItemList(checkoutList)
  }, [checkoutList])

  //update the items
  useEffect(() => {
    updateItemList()
  }, [itemList])





  function total() { //데이터카트에 닮긴 옵션가격도 추가해주자.
    var total = 0;
    console.log("체크박스 중복 표시 " + JSON.stringify(cartitem));
    for (var i = 0; i < cartitem.length; i++) {
      total = total + ((cartitem[i].price
        + findOptionPrice(cartitem[i].menu_option_insert)
        + findOptionPrice(cartitem[i].taste_option_insert)
        + findOptionPrice(cartitem[i].add_option_insert)         // 체크박스로 변경될시 여러개들어올것 체크 가격부분 저장 콤마로 나누기등등 다 고려해야함
      )
        * cartitem[i].quantity);
    }
    var total_price = total;
    return total_price;
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

  //update the items and add up the new totals
  function updateItemList() {
    if (itemList.length > 0) {
      let total = 0;
      for (let i = 0; i < itemList.length; i++) {
        total += itemList[i].totalPrice;
      }
      setTotalPrice(total)
    } else {
      setTotalPrice(0)
    }
  }

  //set tax price
  useEffect(() => {
    setTaxPrice(totalPrice * 0.12)
  }, [totalPrice])

  //set total price
  useEffect(() => {
    setTotalPriceWithTax(totalPrice + taxPrice)
  }, [taxPrice])

  //title with picture for checkout
  const TitlePictureView = () => {
    return (
      <View>
        <TitlePicture
          componentTopPadding={5}
          imageComponent={
            <Image
              source={require('../../../assets/placeholders/58x58.png')}
              style={{
                height: verticalScale(58),
                width: horizontalScale(58),
                borderRadius: 3,
              }}
            />
          }
          description={current_store_name}
          descriptionTopPadding={15}
        />
      </View>
    )
  }

  //delete an item from the list
  // const deleteItem = (item) => {
  //   dispatch(Action.deleteCheckoutItem(item.id))
  //   setTotalPrice((totalPrice - item.totalPrice))
  // }

  const DeleteCartitem = (menu_id, menu_option_insert, taste_option_insert, add_option_insert) => {
    console.log("삭제부분 타고잇는거임 ? ??" + JSON.stringify(menu_id))
    dispatch(Action.DeleteCartitem(menu_id, menu_option_insert, taste_option_insert, add_option_insert));
    //setTotalPrice((totalPrice - item.totalPrice))
  }


  //change the quantity of an item
  const changeCounter = (item, counter) => {
    dispatch(Action.updateCounterOfCheckoutList(item.id, counter))
    updateItemList()
  }

  //render the list of food items
  const renderFoodItemRows = ({ item }) => {
    return (
      <CartItem
        key={'food_item_checkout' + item.id}
        item={item}
        title={item.title}
        //rating={item.rating}
        //description={item.description}
        deliveryFee={'$' + item.price}
        //ratingNum={item.review}
        //isRateVisible={false}
        topRightIconComponent={<DeleteCross />}
        onTopRightIconPress={() => DeleteCartitem(item.menu_id, item.menu_option_insert, item.taste_option_insert, item.add_option_insert)}
        isCounterVisible={true}
        isAddToCartVisible={false}
        imageIconPath={item.imageview}
        counterStartingValue={item.quantity}
        onPressRate={() => DeleteCartitem(item.menu_id, item.menu_option_insert, item.taste_option_insert, item.add_option_insert)}
      //onCounterChange={(counter) => changeCounter(item, counter)}
      //onItemPress={() => navigate(Routes.AddToCartScreen)}
      />
    )
  }

  return (
    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      {/*------- Header Start -----*/}
      <Header onLeftIconPress={() => navigation.goBack()} onRightIconPress={() => navigation.toggleDrawer()} />
      {/*------- Header End -----*/}
      <ScrollView style={globalStyles.flex} showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.commonScrollViewPadding}>
        <View style={[globalStyles.horizontalGeneralPadding, globalStyles.flex]}>
          {/*---- Page Title and Picture Container Start ------*/}
          <TitlePictureView />
          {/*---- Page Title and Picture Container End ------*/}

          {/*------ Divider Start -----------*/}
          <BorderDivider containerTopMargin={15} containerBottomMargin={20} activeAreaAlignment={'left'} activeAreaWidth={60} isActiveOnly={true} activeAreaHeight={1.5} />
          {/*------ Divider End -----------*/}

          {
            cartitem.length > 0 ?
              <FlatList
                //performance settings
                //initialNumToRender={1} // Reduce initial render amount
                //removeClippedSubviews={true}
                //maxToRenderPerBatch={1} // Reduce number in each render batch
                // windowSize={7} // Reduce the window size
                showsVerticalScrollIndicator={false}
                data={cartitem}
                renderItem={renderFoodItemRows}
                contentContainerStyle={[globalStyles.paddingTop20]}
                ItemSeparatorComponent={() => <View style={styles.gapView} />}
                keyExtractor={(_item, index) => index.toString()} />
              : <NoInformationText />
          }
          {cartitem.length > 0 && <View>
            {/*------ Delivery Costs Start -----------*/}
            <View style={globalStyles.marginTop20}>
              <View style={[globalStyles.flexDirectionRow, globalStyles.justifySpaceBetween]}>
                <Text style={styles.deliverTitle}>총 가격 :</Text>
                <Text style={styles.deliverPriceText}>{total()}원</Text>
              </View>
              {/* <View>
                  <Text style={styles.deliverAddressText}>{currentAddress}
                    <Text>{''}
                      {
                        Platform.OS === 'android' ?
                            <Edit/>
                            : <TouchableOpacity><Edit/></TouchableOpacity>
                      }
                    </Text>
                  </Text>
                </View> */}
            </View>
            {/*------ Delivery Costs End -----------*/}


            {/*------ Divider Start -----------*/}
            <BorderDivider containerTopMargin={16} containerBottomMargin={15} activeAreaAlignment={'left'}
              activeAreaWidth={0} isActiveOnly={false} activeAreaHeight={0.5} />
            {/*------ Divider End -----------*/}

            {/*------ Delivery Information Start -----------*/}
            {/* <View>
                <View>
                  <Text style={styles.deliverTitle}>{'Delivery ㄴDate & Time:'}</Text>
                </View>
                <View style={[globalStyles.flexDirectionRow, globalStyles.marginTop5]}>
                  <View style={[globalStyles.flexDirectionRow, globalStyles.alignItemsCenter]}>
                    <DateIcon/>
                    <Text style={[styles.deliverAddressText, globalStyles.marginLeft5]}>{'Today'}</Text>
                  </View>
                  <View
                      style={[globalStyles.flexDirectionRow, globalStyles.marginLeft9, globalStyles.alignItemsCenter]}>
                    <TimeIcon/>
                    <Text style={[styles.deliverAddressText, globalStyles.marginLeft5]}> {'37 Min'}</Text>
                  </View>
                  <View style={[globalStyles.marginLeft9]}>
                    <Edit/>
                  </View>
                </View>
              </View> */}
            {/*------ Delivery Information End -----------*/}

            {/*------ Apply Promo Code Start -----------*/}
            <View style={globalStyles.marginTop20}>
              <View style={styles.sectionStyle}>
                <TextInput
                  style={[styles.textInput]}
                  underlineColorAndroid="transparent"
                  selectionColor={allColors.black}
                  placeholderTextColor={allColors.placeholderColor}
                  autoCorrect={false}
                  placeholder={'쿠폰번호를 입력하세요'}
                  value={couponCode}
                  onChangeText={(text) => setCouponCode(text)}
                />
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={styles.applyText}>{'적용하기'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/*------ Apply Promo Code End -----------*/}

            {/*------ Divider Start -----------*/}
            <BorderDivider containerTopMargin={27} containerBottomMargin={20} activeAreaAlignment={'right'}
              activeAreaWidth={144} isActiveOnly={true} activeAreaHeight={1.5} />
            {/*------ Divider End -----------*/}

            {/*------ Calculated Prices Start -----------*/}
            <View style={globalStyles.alignItemsFlexEnd}>
              <View style={globalStyles.flexDirectionRow}>
                <Text style={styles.taxText}>{'할인율 : '}</Text>
                <Text style={styles.priceText}>{'0 %'}</Text>
              </View>
              <View style={[globalStyles.flexDirectionRow, globalStyles.marginTop5]}>
                <Text style={styles.totalText}>{'최종가격 : '}</Text>
                <Text style={styles.totalPriceText}>{total()} 원</Text>
              </View>
            </View>
            {/*------ Calculated Prices End -----------*/}

            {/*------ Continue Shopping Button Start -----------*/}
            <View style={[globalStyles.marginTop10, globalStyles.alignSelf]}>
              <UnderlineTextIcon
                fontFamily={FONT_FAMILY.RobotoLight}
                fontWeight={'300'}
                fontSize={14}
                onPress={() => navigate(Routes.SliderSelectedScreen)}
                isUnderlined={true}
                title={'메뉴 추가하기'}
                color={'rgb(255,0,0)'}
                style={{ opacity: 0.8 }}
              />
            </View>
            {/*------ Continue Shopping Button End -----------*/}

            {/*------ Checkout Button Start -----------*/}
            <View style={globalStyles.marginTop25}>
              <LongButton
                title={'결제하기'}
                titleFontSize={18}
                titleFontColor={allColors.white}
                titleFontWeight={'400'}
                titleFontFamily={FONT_FAMILY.RobotoRegular}
                type={BUTTON_TYPE.SECONDARY}
                onPress={() => navigate(Routes.DeliveryProcessScreen)}
              />
            </View>
            {/*------ Checkout Button End -----------*/}

                {/*------ Continue Shopping Button Start -----------*/}
            <View style={[globalStyles.marginTop10, globalStyles.alignSelf]}>
              <UnderlineTextIcon
                fontFamily={FONT_FAMILY.RobotoLight}
                fontWeight={'300'}
                fontSize={14}
                onPress={() => dispatch(Action.DeleteAllCart())}
                isUnderlined={true}
                title={'장바구니 비우기 테스트'}
                color={'rgb(255,0,0)'}
                style={{ opacity: 0.8 }}
              />
            </View>
            {/*------ Continue Shopping Button End -----------*/}

          </View>
          }

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CheckOutScreen;
