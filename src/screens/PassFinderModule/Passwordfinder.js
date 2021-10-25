import React, {useState, useEffect, useContext} from 'react';
import {View, Text,Button, Modal, StyleSheet ,TouchableHighlight ,TouchableOpacity, TextInput} from 'react-native';
import {useDispatch,useSelector, shallowEqual  } from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EmailIcon from '../../components/icons/EmailIcon/EmailIcon';
import FooterText from '../../components/FooterText/FooterText';
import GenericInputField from '../../components/GenericInputField/GenericInputField';
import LongButton from '../../components/LongButton/LongButton';
import PhoneNumber from '../../components/PhoneNumber/PhoneNumber';
import UnderlineTextIcon from '../../components/UnderlineTextIcon/UnderlineTextIcon';
import Action from '../../redux/action';
import { isEmail, isName } from '../../utility/utils';
import globalStyles from '../../assets/styles/globalStyles'; 
import {navigate} from '../../utility/NavigationService';
//import styles from './style';
import styles from '../Registration/style';
import {allColors} from '../../assets/styles/mainColors';
import {
  BUTTON_TYPE,
  FONT_FAMILY,
  TEXTFIELD_TYPE,
} from '../../constants/constants';

const passScreen = () => {

  const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [disable, setDisable] = useState(true);
    const UserPassword = useSelector(state => state.passwordFinder, shallowEqual );
    const [email,setemail] = useState("");
    const [formattedNumber, setFormattedNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');


    useEffect(() => {
      if (mobileNumber.trim().length > 0 && email.trim().length > 0) {
        if (JSON.stringify(email) !== JSON.stringify(mobileNumber)) {
          setDisable(false);
        } else {
          setDisable(true);
        }
      } else {
        setDisable(true);
      }
    }, [mobileNumber, email]);
    
    
    const emailChangeHandler = (text) => {
      if(!isEmail(text)){  
        //setEmailValid(false);     
        //alert('시발 똑바로 입력해');
      } else { 
      } 
      setemail(text);
    }

    const onPressCheck = (email,mobileNumber) => {
      if(mobileNumber != null && mobileNumber !='' && email != '' && email != null) {
        dispatch(Action.passwordFinder(email,formattedNumber));   
        setDisable(true);
        setModalVisible(true);
      } else {   
        Alert.alert('안내','정확히 입력해주세요');         
        return;
      }
    }

//////////////여기 비밀번호 찾기 하기
    //생년월일 및 광고 배너 등록 예정
    return (
      <View style={[globalStyles.flex, globalStyles.bgWhite]}>
        
        
        <Modal
          transparent={true}
          visible={modalVisible}          
        >
          <View style={Modalstyles.view}>
            <View style={Modalstyles.modalView}>
              <Text style={Modalstyles.modalText}>{UserPassword}</Text>
              <TouchableHighlight
                style={{ ...Modalstyles.openButton, backgroundColor: allColors.yellow }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={Modalstyles.textStyle}>취소</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          enableOnAndroid={true}
          keyboardDismissMode="interactive"
          style={globalStyles.flex}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          enableAutomaticScroll={true}
          extraScrollHeight={20}>
          {/*---- Password Input Start ------*/}
          <View style={[globalStyles.marginTop10]}>         
            <GenericInputField
              iconComponent={<EmailIcon height={15} width={11} />}
              imageLeftPadding={20}
              imageRightPadding={12}              
              placeholder={'이메일'} 
              type={TEXTFIELD_TYPE.EMAIL}
              value={email}
              onChangeText={(text) => emailChangeHandler(text)}
            />                                  
          </View>              
          {/*---- Password Input End ------*/}
          {/*---- Phone Number Input Start ------*/}
          <View style={[globalStyles.marginTop13]}>
            <PhoneNumber
              value={mobileNumber}
              onChangeText={number => setMobileNumber(number)}
              onChangeFormattedText={number => setFormattedNumber(number)}
            />
         
          </View>
          {/*---- Phone Number Input End ------*/}               
  
          <View style={[globalStyles.marginTop15]}>
          <LongButton
            title={'비밀번호 찾기'}
            titleFontSize={18}
            titleFontColor={disable ? allColors.black : allColors.black}
            titleFontWeight={'400'}
            titleFontFamily={FONT_FAMILY.RobotoCondensedRegular}
            type={disable ? BUTTON_TYPE.DISABLED : BUTTON_TYPE.SECONDARY}
            onPress={() =>
              onPressCheck(email,mobileNumber)              
            }

            buttonShadow={!disable}
            buttonShadowOpacity={0.5}            
            />

            

          </View>
          <View style={[globalStyles.flex, globalStyles.marginBottom15]}>
          <View
            style={[
              globalStyles.marginTop10,
              globalStyles.alignSelf,
              globalStyles.alignItemsCenter,
              globalStyles.flexDirectionRow,
            ]}>
            <Text style={styles.alreadyHaveAccountText}>
              비밀번호를 찾으셨나요?
            </Text>
            <UnderlineTextIcon
              fontSize={13}
              titleFontColor={'black'}
              onPress={() => navigate('로그인')}
              style={{marginTop: -2, marginLeft: 7}}
              isUnderlined={true}
              title={'로그인하러가기'}
            />
          </View>
        </View>

          {/*----Footer Start ------*/}
          <View style={{backgroundColor: allColors.transparent}}>
            <FooterText
              title={'Copyright ⓒHankyung Comm. All Right Reserved'} 
              componentBottomPadding={22}
            />
          </View>
          {/*----Footer End ------*/}
        </KeyboardAwareScrollView>

      </View>
    );
};



const Modalstyles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",    
  },
  openButton: {
    backgroundColor: "#115454",
    borderRadius: 5,
    color: allColors.yellow,
    padding: 15,   
    elevation: 2
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "black",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
  }
});


export default passScreen;