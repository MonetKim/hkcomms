/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';

//Components
import Header from '../../../components/Header/Header';
import ReviewDisplay from '../../../components/ReviewDisplay/ReviewDisplay';
import UnderlineTextIcon from '../../../components/UnderlineTextIcon/UnderlineTextIcon';
import LongButton from '../../../components/LongButton/LongButton';
import CachableImage from '../../../components/CachableImage/CachableImage';
import Counter from '../../../components/Counter/Counter';
import ImagePopUp from '../../../components/ImagePopUp/ImagePopUp';

//Publicly Available Icons that Can be Used for Commercial Purposes
import ChevronRightIcon from '../../../components/icons/ChevronRightIcon/ChevronRightIcon';

//Utils
import globalStyles from '../../../assets/styles/globalStyles';
import Routes from '../../../navigation/Routes';
import styles from './style';
import { allColors } from '../../../assets/styles/mainColors';
import { BUTTON_TYPE, FONT_FAMILY } from '../../../constants/constants';
import { horizontalScale, verticalScale } from '../../../utility/Scale';
import { navigate } from '../../../utility/NavigationService';
import { Item } from 'native-base';
//Third party
import {useSelector, useDispatch} from 'react-redux';
//import RadioButtonRN from 'radio-buttons-react-native';


const AddToCartScreen = ({ navigation, route }) => {
  const [isImagePopUpShow, setImagePopUpShow] = useState(false);
  const [counterValue, setCounterValue] = useState(1);
  const [totalValue, setTotalValue] = useState(0);
  const baseValue = 65.0;
  let menudetail = route.params.menudetail
  const optionitem = useSelector(state => state.optionitem);
  //update according to counter value
  useEffect(() => {
    setTotalValue((menudetail.price * counterValue));
  }, [counterValue]);

  console.log("메뉴상세 설정 !! = " + JSON.stringify(route.params))
  //checkout screen with title
  const navigateToScreen = () => {
    if (route.params) {
      navigate(Routes.CheckOutScreen, { title: route.params.title });
    } else {
      navigate(Routes.CheckOutScreen);
    }
  };

  //라디오버튼
  function eachtest(option_display, kind_num) {  //옵션데이터를 리덕스로 갖고오고 옵션 아이디를 arr 담고있다 ,, 찾아올땐  모두 갖고온 옵션데이터에서 배열순서로 갖고오고잇다

    var arrtes = option_display.split(",");
    var contest = [];
    for (var i = 0; i < arrtes.length; i++) {
        contest = [...contest, { label: optionitem[arrtes[i] - 1].option_name+"   +"+optionitem[arrtes[i] - 1].option_price, 
                    num: optionitem[arrtes[i] - 1].option_id }]
        //setSaveoption(contest);;
    }
    console.log(JSON.stringify(optionitem));
    return (
        <View>
            <Text>{JSON.stringify(contest)}</Text>
        </View>
    )
}



  return (
    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      {/*------- Header Start -----*/}
      <Header
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => navigation.toggleDrawer()}
      />
      {/*------- Header End -----*/}
      <ScrollView
        style={globalStyles.flex}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.commonScrollViewPadding}>
        <View
          style={[globalStyles.horizontalGeneralPadding, globalStyles.flex]}>
          {/*-Item Image Start--*/}
          <TouchableOpacity
            onPress={() => setImagePopUpShow(true)}
            style={styles.imageView}>
            <CachableImage
              style={globalStyles.flex}
              source={{
                uri:
                  menudetail.imageview,
              }}
            />
          </TouchableOpacity>
          {/*-Item Image End--*/}

          <View style={styles.titleView}>
            {/*-Title Start--*/}
            <Text style={styles.titleText}>{menudetail.title}</Text>
            {/*-Title End--*/}

            {/*-Description Start--*/}
            <Text style={styles.titleDesc}>
              {'메뉴설명!~~'}
            </Text>
            {/*-Description End--*/}
            <View style={styles.reviewView}>

            </View>
            {/*-Read Review Container End--*/}
          </View>

          {
            menudetail.menu_option == null ?
              <View></View>
              : <View>
                <Text style={{ fontSize: 17, color: '#333' }}>메뉴선택</Text>
                {eachtest(menudetail.menu_option, 1)}
              </View>
          }
          {               //탑 보더 주기
            menudetail.taste_option == null ?
              <View></View>
              : <View>
                <Text style={{ fontSize: 17, color: '#333' }}>맛선택</Text>
                {eachtest(menudetail.taste_option, 2)}
              </View>
          }
          

          {/*------ Counter Start --------*/}
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.justifySpaceBetween,
              globalStyles.marginTop13,
            ]}>
            <Text style={styles.priceText}>{menudetail.price}</Text>
            <Counter
              minValue={1}
              isLarge={true}
              initialValue={counterValue}
              onChange={value => setCounterValue(value)}
            />
          </View>
          {/*------ Counter End --------*/}

          {/*------ Food Item Description Start -------*/}
          <View style={styles.descView}>
            <Text style={styles.descriptionTitle}>{'What is?'}</Text>
            <Text style={styles.descriptionText}>
              {
                'hhbhbCurabiturs sit amet massa nunc. Lusce iresticia magna. Fusce eget dapibus dui. Lorem ipsum curabitur sit amet massa nunc. Fusce at tristique magna. Fusce eget dapibus dui.'
              }
            </Text>
          </View>
          {/*------ Food Item Description End -------*/}

          {/*------ Add to Cart Button Start -------*/}
          <View style={styles.buttonView}>
            <LongButton
              title={'Add to Cart ' + totalValue}
              titleFontColor={allColors.black}
              titleFontFamily={FONT_FAMILY.RobotoCondensedLight}
              titleFontSize={18}
              type={BUTTON_TYPE.PRIMARY}
              titleFontWeight={'300'}
              hasCircularIcon={true}
              onPress={() => navigateToScreen()}
              circularIconComponent={
                <Image
                  source={require('../../../assets/placeholders/20x20.png')}
                  style={{
                    height: verticalScale(20),
                    width: horizontalScale(20),
                    borderRadius: 3,
                  }}
                />
              }
            />
          </View>
          {/*------ Add to Cart Button End -------*/}
        </View>
      </ScrollView>

      {/*------ Image Popup Start -------*/}
      <ImagePopUp
        closeModal={() => setImagePopUpShow(false)}
        showImage={isImagePopUpShow}
        imagePath={
          menudetail.imageview
        }
      />
      {/*------ Image Popup Start -------*/}
    </SafeAreaView>
  );
};

export default AddToCartScreen;
