import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, TouchableOpacity,Button ,Text, StyleSheet} from 'react-native';
//Components
import GenericInputField from '../../../components/GenericInputField/GenericInputField';
import Header from '../../../components/Header/Header';
import LongButton from '../../../components/LongButton/LongButton';
import TitlePicture from '../../../components/TitlePicture/TitlePicture';
import {useDispatch,useSelector, shallowEqual  } from 'react-redux';

import PasswordIcon from '../../../components/icons/PasswordIcon/PasswordIcon';
import EyeIcon from '../../../components/icons/EyeIcon/EyeIcon';


import ChangePasswordIcon from '../../../assets/images/passwordch.svg';
import SaveIcon from '../../../assets/icons/generalIcons/saveSVG.svg';
import Action from '../../../redux/action';

//Utils 
import globalStyles from '../../../assets/styles/globalStyles';
import {screenHeight, screenWidth} from '../../../utility/Scale';
import {
  BUTTON_TYPE,
  FONT_FAMILY,
  TEXTFIELD_TYPE,
} from '../../../constants/constants';

import {allColors} from '../../../assets/styles/mainColors';
import ActionType from '../../../redux/action-type';


const ChangePassword = ({navigation}) => {
  

  
  const [password, setPassword] = useState('');
  const [cnfPassword, setcnfPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const [isEditable, setIsEditable] = useState(true);
  const [checkEditable, setcheckEditable] = useState(false);
  
  //이전 비밀번호 입력 시
  const [prevPassword, setprevPassword] = useState('');
  
  //이메일 체크 후 
  const [emailCheck, setemailCheck] = useState('');
  const [emailToggle, setemailToggle] = useState('');
  
  
  //인증번호시  
  const [authpwdCheck, setauthpwdCheck] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cnfPasswordVisible, setcnfPasswordVisible] = useState(false);
  const [successfulCheck, setsuccess] = useState(true);  

  //state 변화 값 감지 
  const resetInformation = useSelector(state => state.passChange, shallowEqual);
  const loginInformation = useSelector(state => state.loginInfomation, shallowEqual );
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (password.trim().length > 0 && cnfPassword.trim().length > 0 && cnfPasswordVisible == true) {      
        setDisable(false);     
    } else {
      setDisable(true);
    }
  }, [password, cnfPassword, authpwdCheck]);


  //기존 비밀번호 및 향후 비밀번호 입력
  const passChangeHandler = (text) =>{     
    
    //if(loginInformation[0].password === text){

      console.log(loginInformation[0].password + ' 입력 받은 값 ' + text);
      setPassword(text);

        if(text != loginInformation[0].password){
          setemailToggle(false);          
        } else {
          setemailToggle(true);
        }
  } 


  const reSetChangeHandler = (text) => {
    setcnfPassword(text);
    if(emailToggle==true){
      setemailCheck(true);
    } else {
      setemailCheck(false);
      setprevPassword(false);
    }
  }
  const authChangeHandler = (text) =>{      

    setauthpwdCheck(text);
    console.log('authpwdCheck '+ authpwdCheck);

    if(authpwdCheck.trim().length>0){      
      setcnfPasswordVisible(true);
    } else {
      setcnfPasswordVisible(false);
    }
  } 





  //인증번호 발송 후 
  //API 만든 후 전달 서버 반영까지 완료하여야 함
  //setIsEditable(현재 비밀번호 막기)
  //setchekcEditable(인증번호 발송 막기)

  const authSend = () => {      
    setIsEditable(false);    
    setprevPassword(true);    
    setcheckEditable(true);
    dispatch(Action.passChange(loginInformation[0].index_id));
    alert('고객님의 이메일로 인증번호가 발송 되었습니다');    
         
  }

  const UpdateSend = () => {
    
    if(resetInformation[0].token === authpwdCheck){      
      dispatch(Action.passUpdates(authpwdCheck, cnfPassword, loginInformation[0].index_id));      
    } else {
      setsuccess(false);
    }
  }
    


  return (
    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      {/*------- Header Start -----*/}
      <Header
        navigation={navigation}
        title={'비밀번호 변경'}
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => navigation.toggleDrawer()}
      />
      {/*------- Header End -----*/}
      <ScrollView
        style={[globalStyles.flex]}
        contentContainerStyle={globalStyles.commonScrollViewPadding}
        showsVerticalScrollIndicator={false}>
        <View style={[globalStyles.horizontalGeneralPadding]}> 
          <TitlePicture
            imageComponent={
              <ChangePasswordIcon
                width={screenWidth * 0.251}
                height={screenHeight * 0.116}
              />
            }
            title={'비밀번호 변경'}
            description={
              '고객님의 비밀번호를 재설정 하실 경우에는 이메일에 발송된 메일을 체크하셔야 합니다.'
            }
            descriptionTopPadding={10}
            titleTopPadding={10}
            componentTopPadding={34}
            componentBottomPadding={10}
          />
          {/*---- Page Title and Picture Container End ------*/}

         

          <View style={[globalStyles.marginTop10]}>
            {emailCheck === true && 
            // <Button  
            //       title="인증번호 발송"
            //       style={Innerstyles.button}
            //       type="clear"   
            //       onPress={() => alert('흠')}                
            // />
            <TouchableOpacity style={Innerstyles.container}       
            disabled={checkEditable}         
            onPress={ () => authSend()}>
            <Text 
            style={Innerstyles.text}>인증번호 발송</Text>
            </TouchableOpacity>
            }
          </View>  

          <View>
            {prevPassword === true &&
            <GenericInputField
                iconComponent={<EyeIcon height={15} width={11} />}
                imageLeftPadding={20}
                imageRightPadding={12}                
                placeholder={'인증번호'} 
                value={authpwdCheck}
                onChangeText={(text) => authChangeHandler(text)}
          />                        
            }          
          </View>            


          <View> 
            {/*---- Password Input Field Start ------*/}
            <View style={[globalStyles.marginTop10]}>
              <GenericInputField
                
                iconComponent={<PasswordIcon height={15} width={11} />}
                imageLeftPadding={20}
                imageRightPadding={12}
                editable={isEditable}
                placeholder={'현재 비밀번호'}
                type={
                  passwordVisible
                    ? TEXTFIELD_TYPE.EMAIL
                    : TEXTFIELD_TYPE.PASSWORD
                }
                value={password}
                onChangeText={text => passChangeHandler(text)}
                hasTailingIcon={true}
                tailingIconPaddingLeft={23}
                tailingIconComponent={
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}>
                    <EyeIcon isClosed={passwordVisible} />
                  </TouchableOpacity>
                }
              />
              {emailToggle === false && emailToggle !=null && password !='' && <Text style={Innerstyles.innerText}>현재 비밀번호가 일치하지 않습니다.</Text>}
            </View> 
            {/*---- Password Input Field End ------*/}

            {/*---- Password Confirmation Input Field Start ------*/}
            <View style={[globalStyles.marginTop10]}>
              <GenericInputField
                iconComponent={<PasswordIcon height={15} width={11} />}
                imageLeftPadding={20}
                imageRightPadding={12}
                placeholder={'변경하실 비밀번호'}
                type={
                  cnfPasswordVisible
                    ? TEXTFIELD_TYPE.EMAIL
                    : TEXTFIELD_TYPE.PASSWORD
                }
                value={cnfPassword}
                onChangeText={text => reSetChangeHandler(text)}
                hasTailingIcon={true}
                tailingIconPaddingLeft={23}
                tailingIconComponent={
                  <TouchableOpacity
                    onPress={() => setcnfPasswordVisible(!cnfPasswordVisible)}>
                    <EyeIcon isClosed={cnfPasswordVisible} />
                  </TouchableOpacity>
                }
              />
            </View>
            {/*---- Password Confirmation Input Field End ------*/}
          </View>

          {/*---- Update Password Button Start ------*/}
          <View style={[globalStyles.marginTop15]}>
            <LongButton
              title={'비밀번호 변경하기'}
              titleFontSize={16}
              titleFontColor={allColors.black}
              titleFontWeight={'400'}
              titleFontFamily={FONT_FAMILY.RobotoCondensedRegular}
              type={disable ? BUTTON_TYPE.DISABLED : BUTTON_TYPE.PRIMARY}
              onPress={() => UpdateSend()}
              hasTailingIcon={true}
              tailingIconPaddingLeft={0}
              tailingIconComponent={<SaveIcon />}
            />
          </View>

          {
            successfulCheck == false && 
            <Text style={Innerstyles.innerText}>
                입력하신 인증번호가 3분이 초과하였거나 일치하지 않습니다.
            </Text>
          }
          {/*---- Update Password Button End ------*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Innerstyles = StyleSheet.create({
  innerText:{
    color: "red",
  },
  container : {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10    
  },  
  button: {
    width: 60,
    height: 60,
    justifyContent : 'center',
    alignItems: 'center',
    backgroundColor: "white",
    
  },
  text: {
    color: "blue",
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'left',
    fontWeight: 'bold'
  }
})


export default ChangePassword;
