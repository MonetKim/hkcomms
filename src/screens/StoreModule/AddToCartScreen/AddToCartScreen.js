/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  CheckBox,
  Alert
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
import Action from '../../../redux/action';
import globalStyles from '../../../assets/styles/globalStyles';
import Routes from '../../../navigation/Routes';
import styles from './style';
import { allColors } from '../../../assets/styles/mainColors';
import { BUTTON_TYPE, FONT_FAMILY } from '../../../constants/constants';
import { horizontalScale, verticalScale } from '../../../utility/Scale';
import { navigate } from '../../../utility/NavigationService';
import { Item } from 'native-base';
import RadioButton from '../../../components/RadioButton/RadioButton';
//Third party
import { useSelector, useDispatch } from 'react-redux';
//import RadioButtonRN from 'radio-buttons-react-native';
import RadioButtonRN from 'radio-buttons-react-native';

const AddToCartScreen = ({ navigation, route }) => {
  const [isImagePopUpShow, setImagePopUpShow] = useState(false);
  const [counterValue, setCounterValue] = useState(1);
  const [totalValue, setTotalValue] = useState(0);
  const [ischeck, setIscheck] = useState(false);
  const [total, setTotal] = useState(0);
  const baseValue = 65.0;
  let menudetail = JSON.parse(JSON.stringify(route.params.menudetail));
  const carttemp = useSelector(state => state.carttemp);
  console.log("지금 재 초기화 되고잇는건가요 ?"+JSON.stringify(carttemp) )
  const optionitem = useSelector(state => state.optionitem);
  const cartitem = useSelector(state => state.cartitem);

  //파람 루트복사를 통해서 리덕스쓰지않고 여기서 옵션설정 수량설정후 카트로 그대로 넘긴다.
  const dispatch = useDispatch();
  //update according to counter value
  useEffect(() => {
    setTotalValue((menudetail.price * counterValue));
  }, [counterValue]);

  //console.log("메뉴상세 설정 !! = " + JSON.stringify(route.params))
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
    //console.log("^^^^^^^^^^^^^^^^^^^^^^라디오 이전 카트탬프 값 "+JSON.stringify(carttemp) +"    값  ");
    var arrtes = option_display.split(",");
    var contest = [];
    for (var i = 0; i < arrtes.length; i++) {
      contest = [...contest, {
        label: optionitem[arrtes[i] - 1].option_name + "   +" + optionitem[arrtes[i] - 1].option_price,
        num: optionitem[arrtes[i] - 1].option_id
      }]
      //setSaveoption(contest);;
    }
    //menudetail.title = '변경가능하냐';

    return (
      <View>
        <RadioButtonRN
          data={contest}
          initial={1}
          checkBoxColor={'#ea4335'}
          selectedBtn={(e) => save_option(e.num, kind_num)}
          box={true}
          activeColor={'#ffaa1d'}
          //boxActiveBgColor={'#ffaa1d'}
        />
      </View>
    )
  }
  function checkbox_add(option_display, kind_num) {  //옵션데이터를 리덕스로 갖고오고 옵션 아이디를 arr 담고있다 ,, 찾아올땐  모두 갖고온 옵션데이터에서 배열순서로 갖고오고잇다
    //console.log("@@@@@@@@@@@@@@@@@@@체크박스이전 카트탬프 값 "+JSON.stringify(carttemp) +"    값  ");
    var arrtes = option_display.split(",");
    var contest = [];
    for (var i = 0; i < arrtes.length; i++) {
      contest = [...contest, { key: optionitem[arrtes[i] - 1].option_name, id: optionitem[arrtes[i] - 1].option_id }]
      //setSaveoption(contest);;
    }

    return contest.map((item, id) => {
      return (
        <View style={{ flexDirection: "row" }} key={id}>
          <CheckBox value={ischeck} onValueChange={() => save_option(item.id, kind_num)}
          />
          <Text style={{ fontSize: 20, color: '#333' }}>    {item.id}    {item.key}{JSON.stringify(ischeck)}</Text>
        </View>
      )
    })
  }

  function save_option(option_num, kind_num) {
    // 이부분 리덕스안통하고 그냥바로 메뉴디테일 값바꺼서 넣ㄱ고 해도 괜찮다고 ????????????????
    console.log(kind_num+" 세이브 라디오버튼이  "+option_num);
    if (kind_num == 1) {
      dispatch(Action.setDataCart(option_num, 2));
      console.log(" 라디오버튼이후 변화된 "+JSON.stringify(carttemp) +"   토탈1 값  ");
    }
    else if (kind_num == 2) {
      dispatch(Action.setDataCart(option_num, 3));
      console.log(" 라디오버튼이후 변화된 "+JSON.stringify(carttemp) +"   토탈2 값  ");
    }
    else if (kind_num == 3) {  //@@@@@@@@ 체크박스로 교체될시   값 저장을 바꾸는게아니라 체크박스 리스트 읽고 트루인것들만 바꺼야한다
      dispatch(Action.setDataCart(option_num, 4));
      console.log(" 라디오버튼이후 변화된 "+JSON.stringify(carttemp) +"   토탈3 값  ");
    }
    
  }
  function find_checkbox() {
    // if (!ischeck) {
    //   save_option(save_id, 3);
    // }
    // else {
    //   save_option(null, 3);
    // }
    //setIscheck(!ischeck);
    console.log("콜백 완료2")
  }

  function callback_num(num, useCallback){
    dispatch(Action.setDataCart(num, 1));
    console.log("콜백 완료1");
    useCallback();
  }
  async function save_cart() { //주문하기  리덕스 메뉴디테일 넣어서 거기 임시저장 그걸 카트변수넘기는걸로하자

    
    //callback_num(counterValue,find_checkbox);
    dispatch(Action.setDataCart(counterValue, 1));

    if (check_cart()) {
      //중복된 카트데이터찾아서 수량만 증가시키기 전시는 useselector로  값을 넘기는건 임시데이터 menudata로하자
    }
    else {
      console.log(JSON.stringify(carttemp) + "카트탬프  ");
      console.log("콜백 완료3");
      dispatch(Action.insertCart(carttemp,counterValue)); //수량 반영하려면 await써야하는데 흠 어케하지
    }
    console.log("콜백 완료4");
    go_cart_screen();
  }

  function go_cart_screen() {
    console.log(JSON.stringify(cartitem) + "카트데이터 보여줘 ");
    console.log("콜백 완료5");
    Alert.alert(
      "장바구니로 이동 하시겠습니까?",
      ` `,
      [

        { text: "네", onPress: () => navigateToScreen() },
        { text: "아니오", onPress: () => navigate(Routes.SliderSelectedScreen) },
      ],
      { cancelable: false }
    );
  }

  // 페이지 새로고침안하면서 옵션이 똑같아지지가않앗음 .
  function check_cart() { //기존 카트에 존재유무 중복체크
    var check = false;  // 근데 add_option인경우 여러개선택간으해서 소트한후 비교를해야 정확할듯
    for (var i = 0; i < cartitem.length; i++) {
      if (cartitem[i].menu_id == carttemp.menu_id &&
        cartitem[i].menu_option_insert == carttemp.menu_option_insert &&
        cartitem[i].taste_option_insert == carttemp.taste_option_insert &&
        cartitem.add_option_insert == carttemp.add_option_insert) {
        check = true;
        dispatch(Action.changeCartNum(i, counterValue));
      }
    }
    return check;
  }
  function get_price() {
    var sum = Number(carttemp.price);
    console.log(" 카트탬프는 "+JSON.stringify(carttemp));
    if (carttemp.menu_option_insert != null) {
      sum = sum + Number(optionitem[Number(carttemp.menu_option_insert) - 1].option_price);// 원래는 함수를 통해서 props.옵션.옵션아이디 == menu option insert 해서갖고와야함
      console.log(JSON.stringify("1인서트 넘버는 "+carttemp.menu_option_insert));
    }
    if (carttemp.taste_option_insert != null) {
      sum = sum + Number(optionitem[Number(carttemp.taste_option_insert) - 1].option_price);
      console.log(JSON.stringify("2인서트 넘버는 "+carttemp.taste_option_insert));
    }
    if (carttemp.add_option_insert != null) {
      sum = sum + Number(optionitem[Number(carttemp.add_option_insert) - 1].option_price);
      console.log(JSON.stringify("3인서트 넘버는 "+carttemp.add_option_insert));
    }
    sum = sum * counterValue;
    console.log("썸값은!!  "+sum);
    return sum;
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
          {
            menudetail.add_option == null ?
              <View></View>
              : <View>
                <Text style={{ fontSize: 17, color: '#333' }}>추가선택</Text>
                {checkbox_add(menudetail.add_option, 3)}
              </View>
          }

          {/*------ Counter Start --------*/}
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.justifySpaceBetween,
              globalStyles.marginTop13,
            ]}>
            <Text style={styles.priceText}>{get_price()}</Text>
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
              title={'Add to Cart ' + get_price()}
              titleFontColor={allColors.black}
              titleFontFamily={FONT_FAMILY.RobotoCondensedLight}
              titleFontSize={18}
              type={BUTTON_TYPE.PRIMARY}
              titleFontWeight={'300'}
              hasCircularIcon={true}
              onPress={() => save_cart()}
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
