/* eslint-disable */
import React, {useState} from 'react';
import {SafeAreaView, View, ScrollView,Text, Image} from 'react-native';

//Components
import ArrowRightLongIcon from '../../../components/icons/ArrowRightLongIcon/ArrowRightLongIcon';
import Header from '../../../components/Header/Header';
import RadioButton from '../../../components/RadioButton/RadioButton';
import SquareListIcon from '../../../components/SquareListIcon/SquareListIcon';
import TitlePicture from '../../../components/TitlePicture/TitlePicture';


import {useDispatch,useSelector, shallowEqual  } from 'react-redux';
import CreditCard from '../../../assets/images/mastercardSVG.svg';
import styles from '../AddCardDetails/style';
import SquareGenericInputField from '../../../components/SquareGenericInputField/SquareGenericInputField';

import {allColors} from '../../../assets/styles/mainColors';

//Utils
import globalStyles from '../../../assets/styles/globalStyles';
import Routes from '../../../navigation/Routes';
import {horizontalScale, verticalScale} from '../../../utility/Scale';
import {navigate} from '../../../utility/NavigationService';

/*-------------------- Payment Method Options Displayed Data Start --------------------*/
const paymentOptionsDisplayedArr = [
  {
    id: 0,
    isActive: true,
    title: '등록 카드 현황',  
    component: (
      <SquareListIcon
        onPress={() => navigate(Routes.AddCardDetails)}
        showBorder={true}
        leftIconRightPadding={20}
        leftIconLeftPadding={20}
        leftIconComponent={<CreditCard />}
        title={'신용/체크 카드'}
        rightIconComponent={<ArrowRightLongIcon />}
      />
    ),
  } 
];
/*-------------------- Payment Method Options Displayed Data End --------------------*/

const PaymentMethodHomeScreen = ({navigation}) => {
  
  const [optionArray, setOptionArray] = useState(paymentOptionsDisplayedArr);
  
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cardValid, setcardValid] = useState(false);
  const [lastname, setlastName] = useState('');

  const loginInformation = useSelector(state => state.loginInfomation, shallowEqual );
  
  const selectOption = id => {
    setOptionArray(
      optionArray.map(object => {
        if (object.id === id) {
          return {...object, isActive: true};
        } else {
          return {...object, isActive: false};
        }
      }),
    );
  };
  return (
    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      
      <Header
        title={'카드 등록'}
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => navigation.toggleDrawer()}
      />

      <ScrollView
        style={[globalStyles.flex]}
        contentContainerStyle={globalStyles.commonScrollViewPadding}
        showsVerticalScrollIndicator={false}>
        <View style={globalStyles.horizontalGeneralPadding}>
          <View>
            <TitlePicture
              componentTopPadding={35}
              imageComponent={
                <Image
                    source={require('../../../assets/images/card.png')}
                  style={{height: horizontalScale(100), width: verticalScale(95), borderRadius: 3}}
                />
              }
              titleTopPadding={16}
              title={'나만의 카드 등록'}
              description={
                '타인 카드 등록은 불법입니다'
              }
              descriptionTopPadding={7}
              componentBottomPadding={25}
            />
          </View>          
          <View>
            <RadioButton
              onItemSelection={id => selectOption(id)}
              paddingBottom={23}
              alignmentPaddingSize={6}
              align={'top'}
              optionArr={optionArray}
            />
           
          </View>
        </View>        
      <View 
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
                value= {loginInformation[0].cardnum == '' ? cardNumber : loginInformation[0].cardnum}
                keyboardType={'number-pad'}
                cardValidation={true}
                maxLength={19}
                editable={false}  
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
                      value= {loginInformation[0].expmon == '' ? expirationMonth : loginInformation[0].expmon}                  
                      keyboardType={'number-pad'}
                      maxLength={2}
                      editable={false}  
                      backgroundColor={allColors.lightYellowBg}
                    />                                                            
                  </View>
                  <View style={styles.expirationField}>
                    <SquareGenericInputField
                      placeholder="21"
                      value={loginInformation[0].expyear == '' ? expirationYear : loginInformation[0].expyear}    
                      editable={false}  
                      keyboardType={'number-pad'}
                      maxLength={2}
                      backgroundColor={allColors.lightYellowBg}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={[globalStyles.marginTop15]}>
              <Text style={styles.titleText}>카드소지자 이름</Text>
              <SquareGenericInputField
                placeholder={'정확한 이름을 입력해주세요'}
                value={loginInformation[0].lastname == '' ? lastname : loginInformation[0].lastname}
                editable={false}  
                backgroundColor={allColors.lightYellowBg}
              />
            </View>            
          </View>          
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentMethodHomeScreen;
