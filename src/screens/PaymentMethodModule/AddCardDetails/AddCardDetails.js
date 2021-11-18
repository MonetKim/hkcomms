import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

//컴포낸트
import Header from '../../../components/Header/Header';
import LongButton from '../../../components/LongButton/LongButton';
import SquareGenericInputField from '../../../components/SquareGenericInputField/SquareGenericInputField';
import CreditCard from '../../../assets/images/mastercardSVG.svg';
import SaveIcon from '../../../assets/images/saveWhiteSVG.svg';
import Action from '../../../redux/action';

import {useDispatch,useSelector, shallowEqual  } from 'react-redux';
import {navigate} from '../../../utility/NavigationService';
//유틸
import globalStyles from '../../../assets/styles/globalStyles';
import Routes from '../../../navigation/Routes';
import styles from './style';
import {allColors} from '../../../assets/styles/mainColors';
import {BUTTON_TYPE, FONT_FAMILY} from '../../../constants/constants';
import {cc_format} from '../../../utility/Helper';

const AddCardDetails = ({navigation}) => {

  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cardValid, setcardValid] = useState(false);
  const [lastname, setlastName] = useState('');


  // 귀찮으니까 여기서 reg 날리자
  //var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  //var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  //var amexpRegEx = /^(?:3[47][0-9]{13})$/;
  //var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  
  //받아온 현재 로그인 멤버 정보
  const loginInformation = useSelector(state => state.loginInfomation, shallowEqual );
  
  
  //다음 redux에 액션 지정
  const dispatch = useDispatch();

  const numValidCheck = (text) =>{   
    setCardNumber(text);            
  }

  const updateCards = () => {                 
      //cardNumber, expirationMonth, expirationYear, lastname, index_id 
      dispatch(Action.cardUpdate(cardNumber,expirationMonth, expirationYear, lastname, loginInformation[0].index_id));
      navigate(Routes.ProfileHomeScreen);
  }

  return (

    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      <Header
        title={'카드 정보 변경'}
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => navigation.toggleDrawer()}
      />

      <ScrollView 
        keyboardShouldPersistTaps={'always'}
        style={globalStyles.flex}
        contentContainerStyle={globalStyles.commonScrollViewPadding}        
        showsVerticalScrollIndicator={false}>

        <View style={globalStyles.horizontalGeneralPadding}>                     
          <View style={globalStyles.marginTop30}>
            <View>
              <Text style={styles.titleText}>카드번호</Text>
              <SquareGenericInputField              
                rightIconComponent={<CreditCard />}
                rightIconPaddingLeft={10}
                keyboardType="numeric"
                rightIconPaddingRight={15}
                placeholder="**** **** **** 8888"
                value={cardNumber}                
                onChangeText={text => numValidCheck(cc_format(text))}
                keyboardType={'number-pad'}
                cardValidation={true}
                maxLength={19}
                backgroundColor={allColors.lightYellowBg}              
              />
            </View>            
            <View
              style={[
                globalStyles.marginTop15,
                globalStyles.flexDirectionRow,
                globalStyles.justifySpaceBetween,
              ]}>

              <View style={globalStyles.flex}>
                <Text style={styles.titleText}>유효기간</Text>
                <View style={globalStyles.flexDirectionRow}>
                  <View
                    style={[
                      globalStyles.marginRight10,
                      styles.expirationField,
                    ]}>
                    <SquareGenericInputField
                      placeholder="01"
                      value={expirationMonth}
                      onChange={text => setExpirationMonth(text)}
                      keyboardType={'number-pad'}
                      maxLength={2}
                      backgroundColor={allColors.lightYellowBg}
                    />
                  </View>
                  <View style={styles.expirationField}>
                    <SquareGenericInputField
                      placeholder="21"
                      value={expirationYear}
                      onChange={text => setExpirationYear(text)}
                      keyboardType={'number-pad'}
                      maxLength={2}
                      backgroundColor={allColors.lightYellowBg}
                    />
                  </View>
                </View>
              </View>
{/*
              <View>
                <View style={[globalStyles.flexDirectionRow, styles.cvvView]}>
                  <Text style={styles.cvvText}>CVV/CVC</Text>
                  <TouchableOpacity>
                    <Question />
                  </TouchableOpacity>
                </View>
                <SquareGenericInputField
                  value={cvv}
                  onChange={text => setCVV(text)}
                  largeTextBox={false}
                  backgroundColor={allColors.lightYellowBg}
                  width={70}
                  maxLength={3}
                />
              </View>
*/}
            </View>

            <View style={[globalStyles.marginTop15]}>
              <Text style={styles.titleText}>카드소지자 이름</Text>
              <SquareGenericInputField
                placeholder={'정확한 이름을 입력해주세요'}
                value={lastname}
                onChange={text => setlastName(text)}
                backgroundColor={allColors.lightYellowBg}
              />
            </View>

            <View style={[globalStyles.marginTop20]}>
              <LongButton
                title={'저장하기'}
                titleFontColor={allColors.black}
                titleFontFamily={FONT_FAMILY.RobotoCondensedRegular}
                titleFontSize={18}
                titleFontWeight={'400'}
                hasTailingIcon={true}
                tailingIconPaddingLeft={0}
                tailingIconComponent={<SaveIcon />}
                type={BUTTON_TYPE.SECONDARY}
                onPress={() =>
                  updateCards() 
                }
              />
            </View>
          </View>          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCardDetails;
