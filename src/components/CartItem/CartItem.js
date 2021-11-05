import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

//Component
import CachableImage from '../CachableImage/CachableImage';
import Counter from '../Counter/Counter';
import ImagePopUp from '../ImagePopUp/ImagePopUp';
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay';

//Third Party
import PropTypes from 'prop-types';

//Utils
import globalStyles from '../../assets/styles/globalStyles';
import styles from './style';
import { horizontalScale, verticalScale } from '../../utility/Scale';
import { useSelector, useDispatch } from 'react-redux';

const CartItem = props => {
  //Image Popup set
  const [isImagePopUpShow, setImagePopUpShow] = useState(false);
  const optionitem = useSelector(state => state.optionitem);


  function total() { //데이터카트에 닮긴 옵션가격도 추가해주자. //여기선 각자 해야함...
    var total = 0;
    const cart = props.item;
    console.log("총가격구하기" + JSON.stringify(cart))
    total = total + ((cart.price
      + findOptionPrice(cart.menu_option_insert)
      + findOptionPrice(cart.taste_option_insert)
      + findOptionPrice(cart.add_option_insert)         // 체크박스로 변경될시 여러개들어올것 체크 가격부분 저장 콤마로 나누기등등 다 고려해야함
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



  return (
    <View>
      <TouchableOpacity
        onPress={() => props.onItemPress && props.onItemPress()}
        style={[
          styles.container,
          {
            borderBottomLeftRadius: props.isRateVisible ? 0 : 10,
            borderBottomRightRadius: props.isRateVisible ? 0 : 10,
            borderTopLeftRadius: props.isActive && props.leftTopIcon ? 0 : 10,
          },
        ]}>
        {/* --- Top Left Icon Start --*/}
        {props.isActive && props.leftTopIcon && (
          <View style={styles.leftProductIcon}>
            {props.leftTopIcon && props.leftTopIcon}
          </View>
        )}
        {/* --- Top Left Icon End --*/}

        {/* --- Top Right Icon Start --*/}
        <TouchableOpacity
          onPress={() =>
            props.onTopRightIconPress && props.onTopRightIconPress()
          }
          style={styles.productIcon}>
          {props.topRightIconComponent &&
            typeof props.topRightIconComponent === 'object' &&
            props.topRightIconComponent}
          {props.topRightIconComponent &&
            typeof props.topRightIconComponent !== 'object' && (
              <Image
                style={{
                  borderRadius: 3,
                  height: verticalScale(20),
                  width: horizontalScale(20),
                }}
                source={props.topRightIconComponent}
              />
            )}
        </TouchableOpacity>
        {/* --- Top Right Icon End --*/}

        <View style={[globalStyles.flexDirectionRow, styles.subContainer]}>
          {props.showTotalCount && (
            <View style={styles.totalCountView}>
              <Text style={styles.totalCountText}>
                {props.itemPurchasedCount}
              </Text>
            </View>
          )}

          {/*---Show Popup When Pressing the Food Item Image & Food Item Image Start ---*/}
          <TouchableOpacity
            onPress={() => setImagePopUpShow(props.showImagePopup)}
            style={styles.imageContainer}>
            {props.imageIconPath.length > 0 && (
              <CachableImage
                source={{ uri: props.imageIconPath }}
                style={styles.imageIcon}
              />
            )}
            {!props.imageIconPath && props.imageIconComponent && (
              <View style={styles.imageIcon}>{props.imageIconComponent}</View>
            )}
          </TouchableOpacity>
          {/*---Show Popup When Pressing the Food Item Image & Food Item Image End ---*/}

          <View style={globalStyles.flex}>
            {/*-- Food Item Title Start --*/}
            <View style={[globalStyles.flexDirectionRow, globalStyles.flex]}>
              <View style={globalStyles.flex}>
                {/*-- Shows only one line and if not completely visible puts dots instead --*/}
                <Text numberOfLines={1} style={styles.title}>
                  {props.title}
                </Text>
              </View>
              <Text numberOfLines={1} style={styles.title}>
                {props.item.price}
              </Text>
            </View>
            {/*-- Food Item Title End --*/}

            {/*-- Food Item Description Start --*/}
            <View style={[globalStyles.flex, globalStyles.justifyCenter]}>
              <Text numberOfLines={1} style={styles.descriptionText}>
                {props.description}
              </Text>
            </View>
            {/*-- Food Item Description End --*/}

            {/*-- Food Item Rating Start--*/}
            <View style={styles.cartRightSection}>
              {
                findOptionName(props.item.menu_option_insert) == 0 ? <View></View> :
                  <Text> {findOptionName(props.item.menu_option_insert)}</Text>
              }
              {
                findOptionPrice(props.item.menu_option_insert) == 0 ? <View></View> :
                  <Text> {findOptionPrice(props.item.menu_option_insert)}</Text>
              }
            </View>
            <View style={styles.cartRightSection}>
              {
                findOptionName(props.item.taste_option_insert) == 0 ? <View></View> :
                  <Text> {findOptionName(props.item.taste_option_insert)}</Text>
              }
              {
                findOptionPrice(props.item.taste_option_insert) == 0 ? <View></View> :
                  <Text> {findOptionPrice(props.item.taste_option_insert)}</Text>
              }
            </View>
            <View style={styles.cartRightSection}>
              {
                findOptionName(props.item.add_option_insert) == 0 ? <View></View> :
                  <Text> {findOptionName(props.item.add_option_insert)}</Text>
              }
              {
                findOptionPrice(props.item.add_option_insert) == 0 ? <View></View> :
                  <Text> {findOptionPrice(props.item.add_option_insert)}</Text>
              }
            </View>
            {/*-- Food Item Rating End--*/}

            {/*-- Food Item Total Count/Add To Cart/Counter Start--*/}

            {/*--Delivery Fee End--*/}
            <View style={styles.cartRightSection}>
              {/*--Counter Start--*/}
                <Text >수량</Text>
                  <Counter
                    isDisabled={props.isCounterDisabled}
                    onChange={number =>
                      props.onCounterChange && props.onCounterChange(number)
                    }
                    initialValue={props.counterStartingValue}
                  />
                  
              {/*--Counter End--*/}
            </View>
            <View style={styles.cartRightSection}>
              {/*--Delivery Fee Start--*/}
              {!props.showTotalCount && (
                <Text style={styles.deliveryFee}>{total()}</Text>
              )}
            </View>


          </View>


        </View>
        {/*-- Food Item Total Count/Add To Cart/Counter End--*/}
      </TouchableOpacity>

      {/*-- Food Item Rate and Reorder Start--*/}
      {props.isRateVisible && (
        <View style={styles.rateSectionView}>
          <TouchableOpacity
            onPress={() => props.onPressReorder && props.onPressReorder()}
            style={styles.sectionView}>
            <Text style={styles.sectionText}>{'Reorder'}</Text>
          </TouchableOpacity>
          <View style={styles.sectionBorderView} />
          <TouchableOpacity
            onPress={() => props.onPressRate && props.onPressRate()}
            style={styles.sectionView}>
            <Text style={styles.sectionText}>{'Rate'}</Text>
          </TouchableOpacity>
        </View>
      )}
      {/*-- Food Item Rate and Reorder End--*/}

      {/*-- Food Item Popup View Start--*/}
      {isImagePopUpShow && (
        <ImagePopUp
          closeModal={() => setImagePopUpShow(false)}
          showImage={isImagePopUpShow}
          imagePath={props.imageIconPath}
          imageComponent={props.imageIconComponent}
        />
      )}
      {/*-- Food Item Popup View End--*/}
    </View>
  );
};

/*---- Default Props Start -------*/
CartItem.defaultProps = {
  item: [],
  counterStartingValue: 1,
  deliveryFee: '$0',
  description: '',
  imageIconPath: '',
  imageIconComponent: null,
  isActive: false,
  isAddToCartVisible: true,
  isCounterDisabled: false,
  isCounterVisible: false,
  isRateVisible: true,
  itemPrice: 0,
  itemPurchasedCount: 0,
  leftTopIcon: null,
  rating: 0,
  ratingNum: 0,
  showTotalCount: false,
  showImagePopup: true,
  title: '',
  topRightIconComponent: null,
};
/*---- Default Props End -------*/

/*---- Prop Type Expectations Start -------*/
CartItem.propTypes = {
  item: PropTypes.object,
  addToCartOnPress: PropTypes.func,
  counterStartingValue: PropTypes.number,
  deliveryFee: PropTypes.string,
  description: PropTypes.string,
  imageIconPath: PropTypes.string,
  isActive: PropTypes.bool,
  isAddToCartVisible: PropTypes.bool,
  isCounterDisabled: PropTypes.bool,
  isCounterVisible: PropTypes.bool,
  imageIconComponent: PropTypes.object,
  isRateVisible: PropTypes.bool,
  itemPrice: PropTypes.number,
  itemPurchasedCount: PropTypes.number,
  leftTopIcon: PropTypes.object,
  onCounterChange: PropTypes.func,
  onItemPress: PropTypes.func,
  onPressRate: PropTypes.func,
  onPressReorder: PropTypes.func,
  onTopRightIconPress: PropTypes.func,
  rating: PropTypes.number,
  ratingNum: PropTypes.number,
  showTotalCount: PropTypes.bool,
  showImagePopup: PropTypes.bool,
  title: PropTypes.string,
  topRightIconComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
};
/*---- Prop Type Expectations End -------*/
export default CartItem;
