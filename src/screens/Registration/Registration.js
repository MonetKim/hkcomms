import React, {useState, useEffect, useContext} from 'react';
import {View, Text,Button, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

//Third Party
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDispatch,useSelector, shallowEqual  } from 'react-redux';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//import { onSignup, onSignin } from '../dataStore/';
//Components
import EmailIcon from '../../components/icons/EmailIcon/EmailIcon';
import EyeIcon from '../../components/icons/EyeIcon/EyeIcon';
import FooterText from '../../components/FooterText/FooterText';
import GenericInputField from '../../components/GenericInputField/GenericInputField';
import LongButton from '../../components/LongButton/LongButton';
import PasswordIcon from '../../components/icons/PasswordIcon/PasswordIcon';
import PhoneNumber from '../../components/PhoneNumber/PhoneNumber';
import TabBar from '../../components/TabBar/TabBar';
import TitlePicture from '../../components/TitlePicture/TitlePicture';
import UnderlineTextIcon from '../../components/UnderlineTextIcon/UnderlineTextIcon';
import LogoIcon from '../../components/icons/LogoIcon/LogoIcon';
import Action from '../../redux/action';
import { isEmail, isName } from '../../utility/utils';
import globalStyles from '../../assets/styles/globalStyles';
import Routes from '../../navigation/Routes';
import styles from './style'; 
//import Passwordfinder from '../screens/PassFinderModule/Passwordfinder';
import {allColors} from '../../assets/styles/mainColors';
import {
  BUTTON_TYPE,
  FONT_FAMILY,
  TEXTFIELD_TYPE,
} from '../../constants/constants';
import {navigate} from '../../utility/NavigationService';


const Tab = createMaterialTopTabNavigator();
//const { state, onSignin, onDissmiss } = useContext(UserContext);
/*------------------------------------------ Login Tab Content Start --------------------------------*/
const LoginTab = (props) => {

  console.log(JSON.stringify(props)+'프롭');
  const dispatch = useDispatch();      
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState('');
  //dispatch(Action.fetchStores());

  return (
    <View style={[globalStyles.flex, globalStyles.bgWhite]}>
      {/*---- Phone Number Input Start ------*/}
      <View style={[globalStyles.marginTop13]}>
      <GenericInputField
              placeholder="이메일"
              iconComponent={<EmailIcon height={15} width={11} />}
              imageLeftPadding={20}
              imageRightPadding={12}
              //autoCapitalize={false}
              //autoCorrect={false}
              onChangeText={setEmail}
      /> 
      </View>
      {/*---- Phone Number Input End ------*/}

      {/*---- Password Input Start ------*/}
      <View style={[globalStyles.marginTop10]}>
        <GenericInputField
          iconComponent={<PasswordIcon height={15} width={11} />}
          imageLeftPadding={20}
          imageRightPadding={12}
          placeholder={'비밀번호'}
          type={TEXTFIELD_TYPE.PASSWORD} 
          value={password}
          onChange={text => setPassword(text)}
        />
      </View>
      {/*---- Password Input End ------*/}

      {/*---- Login Button Start ------*/}
      
      <View style={[globalStyles.marginTop20]}>
        <LongButton
          title={'로그인'}
          titleFontSize={18}
          titleFontColor={allColors.black}
          titleFontWeight={'400'}
          titleFontFamily={FONT_FAMILY.RobotoCondensedRegular}
          //type={BUTTON_TYPE.SECONDARY}
          onPress={() => dispatch(Action.onSignin(email,password))}
          buttonShadow={true}
          buttonShadowOpacity={0.5}
        />
      </View>
      {/*---- Login Button End ------*/}

      {/*---- Forgot Password Start ------*/}
      <View
        style={[
          globalStyles.marginTop10,
          globalStyles.alignItemsCenter,
          globalStyles.flex,
        ]}>
        <TouchableOpacity onPress={() => navigate(Routes.Passwordfinder)}>
          <Text style={styles.forgotPasswordText}>비밀번호를 잃어버리셨나요?</Text>
        </TouchableOpacity>
      </View>
      {/*---- Forgot Password End ------*/}

      {/*----Footer Start ------*/}
      <FooterText
        title={'Copyright ⓒHankyung Comm. All Right Reserved'}
        componentBottomPadding={22}
      />
      {/*----Footer End ------*/}
    </View>
  );
};
/*------------------------------------------ 로그인 탭 끝  --------------------------------*/

/*------------------------------------------ 회원가입 시작 --------------------------------*/
const SignUpTab = (props) => {

  const dispatch = useDispatch();      
  

  const emailCheckStatus = useSelector(state => state.isEmailCheck, shallowEqual );
  const [nameValid, setnameValid] = useState(true);
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setname] = useState("");
  const [password, setPassword] = useState('');
  const [cnfPassword, setcnfPassword] = useState('');
  //const [inviteCode, setInviteCode] = useState('');
  const [formattedNumber, setFormattedNumber] = useState('');
  const [disable, setDisable] = useState(true);
  const [emailValid, setEmailValid] = useState('');
  const [confirmValid, setconfirmValid] = useState('');
  const [phoneValid, setphoneValid] = useState(true);
  const [EmailStatus, setEmailStatusValid] = useState(true);
  
  //determine if the button should be disabled or enabled according to users input
  useEffect(() => {
    if (password.trim().length > 0 && cnfPassword.trim().length > 0) {
      if (JSON.stringify(password) === JSON.stringify(cnfPassword)) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    } else {
      setDisable(true);
    }
  }, [password, cnfPassword]);

  //이메일 최종 확인
  const emailChangeHandler = (text) => {
    if(!isEmail(text)){  
      setEmailValid(false);     
    } else { 
      setEmailValid(true);
    }    
    setEmail(text); 
  }
   
  const emailchecks = (email) =>{
 
  if(email!=null && email != ''){  
      dispatch(Action.emailCheck(email));
      
    } 
  }

  const onPressCheck = () => {
    if(email !=null && email !='' && emailValid==true && password != '' && password != null && 
    cnfPassword == password && formattedNumber != null && formattedNumber !='' && name != null && name != '') {      
      
      dispatch(Action.onSignup(email,formattedNumber,password,name));

    } else {
      alert('안내','정확히 입력해 주세요');
    }
  } 

/*
10-17 일 ToDo List
1. 회원가입 하단 이름 넣기 
2. DB 서버 수정 이름 포함해서
3. (최종 화면 단)
  - Discovery ---> 홈화면으로 대처 (광고)
  - account 삭제 --> setting 으로 변경
  - Favoirte 삭제 
*/

const nameChangeHandler = (text) =>{     
  if(!isName(text)){  
    setnameValid(false);     
  } else { 
    setnameValid(true);
  }
  setname(text);
} 


  return (
    <View style={[globalStyles.flex, globalStyles.bgWhite]}>
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

        

          {/*이메일 중복확인 만들기 !!!!*/} 
          {email!='' && emailValid==true && confirmValid ==false &&
          <Button  
                  buttonStyle={Innerstyles.btnmove}     
                  titleStyle={Innerstyles.buttons} title={"이메일 중복확인"}
                  type="clear" 
                  onPress={() =>  emailchecks(email)}                
          />
          }
            <Text style={Innerstyles.innerText}>{emailCheckStatus}</Text>           
          </View>  

        <View style={[globalStyles.marginTop5]}>
            <GenericInputField
                iconComponent={<EyeIcon height={15} width={11} />}
                imageLeftPadding={20}
                imageRightPadding={12}                
                placeholder={'닉네임'} 
                type={TEXTFIELD_TYPE.EMAIL}
                value={name}
                onChangeText={(text) => nameChangeHandler(text)}
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

        {/*---- Password Input Start ------*/}
        <View style={[globalStyles.marginTop10]}>
          <GenericInputField
            iconComponent={<PasswordIcon height={15} width={11} />}
            imageLeftPadding={20}
            imageRightPadding={12}
            placeholder={'비밀번호'}
            type={TEXTFIELD_TYPE.PASSWORD}
            value={password}
            onChange={text => setPassword(text)}
          />
        </View>
        {/*---- Password Input End ------*/}

        {/*---- Confirm Password Input Start ------*/}
        <View style={[globalStyles.marginTop10]}>
          <GenericInputField
            iconComponent={<PasswordIcon height={15} width={11} />}
            imageLeftPadding={20}
            imageRightPadding={12}
            placeholder={'비밀번호 확인'}
            type={TEXTFIELD_TYPE.PASSWORD}
            value={cnfPassword}
            onChange={text => setcnfPassword(text)}
          />
        </View>
        {/*---- Confirm Password Input End ------*/}

        {/*---- Invitation Code Input Start ------
        <View style={[globalStyles.marginTop10]}>
          <GenericInputField
            placeholder={'인증코드'}
            type={TEXTFIELD_TYPE.NORMAL}
            value={inviteCode}
            onChange={text => setInviteCode(text)}
          />
        </View>
        */}
        {/*---- Invitation Code Input End ------*/}

        {/*---- Sign Up Button Start ------*/}
        <View style={[globalStyles.marginTop15]}>
          <LongButton
            title={'회원가입'}
            titleFontSize={18}
            titleFontColor={disable ? allColors.black : allColors.white}
            titleFontWeight={'400'}
            titleFontFamily={FONT_FAMILY.RobotoCondensedRegular}
            type={disable ? BUTTON_TYPE.DISABLED : BUTTON_TYPE.SECONDARY}
            onPress={() =>
              onPressCheck()
            }
            buttonShadow={!disable}
            buttonShadowOpacity={0.5}
          />
        </View>
        {/*---- Sign Up Button End ------*/}

        {/*---- Tab View Buttons Start ------*/}
        <View style={[globalStyles.flex, globalStyles.marginBottom15]}>
          <View
            style={[
              globalStyles.marginTop10,
              globalStyles.alignSelf,
              globalStyles.alignItemsCenter,
              globalStyles.flexDirectionRow,
            ]}>
            <Text style={styles.alreadyHaveAccountText}>
              이미 계정이 있으신가요?
            </Text>
            <UnderlineTextIcon
              fontSize={13}
              onPress={() => navigate('로그인')} 
              style={{marginTop: -2, marginLeft: 7}}
              isUnderlined={true}
              title={'로그인하러가기'}
            />
          </View>
        </View>
        {/*---- Tab View Buttons End ------*/}

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
/*------------------------------------------ Sign Up Tab Content End --------------------------------*/

const Registration = () => {
  const [tab, setTab] = useState(0);

  //tab sign in description text
  const tab1 =
    '바리스타 학원 10년 운영의 노하우가 집약된 파란만잔 매년 200여명 이상의 바리스타를 양성하 전문 아카데미가 만든 특별한 커피.';
  //tab sign up
  const tab2 =
    '바리스타 학원 10년 운영의 노하우가 집약된 파란만잔 매년 200여명 이상의 바리스타를 양성하 전문 아카데미가 만든 특별한 커피.';

  //render tabs
  const renderTabBar = props => {
    setTab(props.state.index);
    return <TabBar {...props} />;
  };

  //get the tabTitleSelection according to the selected tab
  const tabTitleSelection = tab === 0 ? tab1 : tab2;

  return (
    <View style={[globalStyles.bgWhite, globalStyles.flex]}>
      
      <View style={[globalStyles.horizontalGeneralPadding]}>
        <TitlePicture
          //imageComponent={<LogoIcon colored />}
          description={tabTitleSelection}
          descriptionTopPadding={11}
          componentBottomPadding={34}
          imageTopPadding={10}
        />
      </View>
      
      <View style={[globalStyles.horizontalGeneralPadding, globalStyles.flex]}>      
        <Tab.Navigator tabBar={props => renderTabBar(props)}>
          <Tab.Screen name="로그인" component={LoginTab} />
          <Tab.Screen name="회원가입" component={SignUpTab} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

const Innerstyles = StyleSheet.create({
  btnmove:{
    marginTop:0,
    alignSelf: "flex-end",
  },
  buttons:{
    fontSize: 15,
    color: "black"
  },
  innerText:{
    color: "red",
  }
})



export default Registration;
