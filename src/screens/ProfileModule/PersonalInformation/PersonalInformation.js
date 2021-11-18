import React, {useState} from 'react';
import {SafeAreaView, View, ScrollView, Platform} from 'react-native';

//Third Party

import ActionSheet from 'react-native-action-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch,useSelector, shallowEqual  } from 'react-redux';

//Components
import GenericInputField from '../../../components/GenericInputField/GenericInputField';
import Header from '../../../components/Header/Header';
import LongButton from '../../../components/LongButton/LongButton';
import PhoneNumber from '../../../components/PhoneNumber/PhoneNumber';
import PasswordIcon from '../../../components/icons/PasswordIcon/PasswordIcon';
import CallIcon from '../../../components/icons/CallIcon/CallIcon';

import SignatureInputField from '../../../components/SignatureInputField/SignatureInputField';
import TitlePicture from '../../../components/TitlePicture/TitlePicture';
//Publicly Available Icons that Can be Used for Commercial Purposes
import AvtarIcon from '../../../assets/images/profile_imageSVG.svg';
import Action from '../../../redux/action';
import CameraIcon from '../../../assets/images/cameraUploadSVG.svg';
import EmailIcon from '../../../assets/images/emailSVG.svg';
import PersonalInfoIcon from '../../../assets/images/personalInformationSVG.svg';
import SaveIcon from '../../../assets/images/saveWhiteSVG.svg';
import EyeIcon from '../../../components/icons/EyeIcon/EyeIcon';
import { isEmail, isName } from '../../../utility/utils';

//Utils
import globalStyles from '../../../assets/styles/globalStyles';
import Routes from '../../../navigation/Routes';
import {allColors} from '../../../assets/styles/mainColors';
import {ButtonIOS, ButtonAndroid} from '../../../constants/constants';

import {
  BUTTON_TYPE,
  FONT_FAMILY,
  TEXTFIELD_TYPE,
} from '../../../constants/constants';

import {
  checkCameraPermission,
  checkPhotoLibraryPermission,
  showPermissionAlert,
} from '../../../utility/Helper';
import {screenHeight, screenWidth} from '../../../utility/Scale';

const PersonalInformation = ({navigation}) => {

  const dispatch = useDispatch();      
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState('');
  const loginInformation = useSelector(state => state.loginInfomation, shallowEqual );


  //console.log('로그인 페이지 졲  정보 습득 완료' + JSON.stringify(loginInformation[0].name));

  //Profile Picture Placeholder and Camera Icon Definition
  const ReturnCameraIcon = () => {
    return (
      <View>
        <AvtarIcon width={screenWidth * 0.251} height={screenHeight * 0.116} />
        <View style={globalStyles.profileIconAbsolute}>
          <CameraIcon />
        </View>
      </View>
    );
  };

  //Image Uploader Action Sheet Definition    
  const btnPickImageClick = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: Platform.OS === 'ios' ? ButtonIOS : ButtonAndroid,
        cancelButtonIndex: 2,
        tintColor: allColors.grey,
      },
      openPickerForProfileImage,
    );
  };

  const emailChangeHandler = (text) => {
    if(!isEmail(text)){  
      setEmailValid(false);     
    } else { 
      setEmailValid(true);
    }    
    setEmail(text); 
  }

  const onPressCheck = () => {

    if(!password.trim()){
      alert('비밀번호를 입력하셔야 닉네임이 변경됩니다.');
      return;
    }

    let arr1 = {
      email : loginInformation[0].email,
      password : loginInformation[0].password,
      formattedNumber : loginInformation[0].phone
    };
    let arr2 = {
      email : loginInformation[0].email,
      password : password,
      formattedNumber : loginInformation[0].phone
    }      

    if(arr1 === arr2) {            
      return;       
    } else if (password==loginInformation[0].password && name != null){ 
      dispatch(Action.personalInfoChange(loginInformation[0].email,password,name));
      navigation.navigate(Routes.ProfileHomeScreen);        
    } else {
      alert('입력하신 비밀번호가 정확하지 않습니다');
    }
    
  } 
  const nameChangeHandler = (text) =>{    
    

    setName(text);
  } 


  const passChangeHandler = (text) =>{              
      setPassword(text);    
  } 




  //handle image picker on press
  const openPickerForProfileImage = pickerType => {
    switch (pickerType) {
      case 0:
        //take a picture now
        checkCameraPermission(granted => {
          if (granted) {
            ImagePicker.openCamera({
              mediaType: 'photo',
              multiple: false,
              compressImageQuality: 0.8,
              compressImageMaxHeight: 720,
              compressImageMaxWidth: 1080,
            })
              .then(images => {})
              .catch(err => {
                console.log('Error :' + err.toString());
              });
          } else {
            showPermissionAlert('Permission', 'Camera Permission Required');
          }
        });
        break;
      case 1:
        //choose from the library
        checkPhotoLibraryPermission(granted => {
          if (granted) {
            ImagePicker.openPicker({
              mediaType: 'photo',
              multiple: false,
              compressImageQuality: 0.8,
              compressImageMaxHeight: 720,
              compressImageMaxWidth: 1080,
            })
              .then(images => {})
              .catch(err => {
                console.log('Error :' + err.toString());
              });
          } else {
            showPermissionAlert(
              'Permission',
              'Photo Galley Permission Required',
            );
          }
        });
        break;
    }
  };

  return (
    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      {/*------- Header Start -----*/}
      <Header
        title={'개인정보설정'}
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => navigation.toggleDrawer()}
      />
      {/*------- Header End -----*/}
      <ScrollView
        style={[globalStyles.flex]}
        contentContainerStyle={globalStyles.commonScrollViewPadding}
        showsVerticalScrollIndicator={false}>
        <View style={globalStyles.flex}>
          <View style={globalStyles.horizontalGeneralPadding}>
            {/*---- Page Title and Picture Container Start ------*/}
            <View>
              <TitlePicture
                componentTopPadding={45}
                imageComponent={<ReturnCameraIcon />}
                titleTopPadding={15}
                title={'안녕하세요 '+' '+loginInformation[0].name+ '' + ' 님'}
                description={
                  '오늘도 파란만잔한 하루 보내세요'
                }
                descriptionTopPadding={7}
                componentBottomPadding={30}
                touchAllowed={true}
                onTouch={() => btnPickImageClick()}
              />
            </View>
            {/*---- Page Title and Picture Container End ------*/}

             {/*---- Email Input Start ------*/}
             <View style={[globalStyles.marginTop10]}>
              <GenericInputField
                  iconComponent={<EmailIcon height={20} width={15} />}
                  imageLeftPadding={20}
                  imageRightPadding={12}
                  placeholder={'이메일'} 
                  type={TEXTFIELD_TYPE.EMAIL}
                  value={loginInformation[0].email}
                  editable={false}  
              />
            </View>
            {/*---- Email Input End ------*/}      
            {/*---- Phone Number Input Start ------*/}
            <View>
            <GenericInputField
                  iconComponent={<CallIcon height={20} width={15} />}
                  imageLeftPadding={20}
                  imageRightPadding={12}
                  placeholder={'전화번호'} 
                  type={TEXTFIELD_TYPE.EMAIL}
                  value={loginInformation[0].phone}
                  editable={false}  
              />
            </View>
            {/*---- Phone Number Input End ------*/}

            {/*---- Name Input Start ------*/}
            <View style={[globalStyles.marginTop10]}>
             <GenericInputField
                iconComponent={<EyeIcon height={20} width={15} />}
                imageLeftPadding={20}
                imageRightPadding={12}                
                placeholder={'닉네임'} 
                type={TEXTFIELD_TYPE.NORMAL}
                value={name}
                onChangeText={(text) => nameChangeHandler(text)}
              />      
            </View>
   
            <View  style={[globalStyles.marginTop10]}>
            <GenericInputField
                iconComponent={<PasswordIcon height={20} width={15} />}
                imageLeftPadding={20}
                imageRightPadding={12}                                
                placeholder={'비밀번호'}
                type={TEXTFIELD_TYPE.PASSWORD}
                value={password}                
                onChangeText={(text) => passChangeHandler(text)}
              />
            </View>
            {/*---- Name Input End ------*/}

           

            {/*---- Signature Input Start ------
            <View style={[globalStyles.marginTop15]}>
              <SignatureInputField />
            </View>
            */}
            {/*---- Signature Input End ------*/}

            {/*---- Save Information Start ------*/}
            <View style={[globalStyles.marginTop20]}>
              <LongButton
                title={'저장'}
                titleFontColor={allColors.black}
                titleFontFamily={FONT_FAMILY.RobotoCondensedRegular}
                titleFontSize={18}
                titleFontWeight={'400'}
                hasTailingIcon={true}
                tailingIconPaddingLeft={0}
                tailingIconComponent={<SaveIcon />}
                type={BUTTON_TYPE.SECONDARY}
                onPress={() => onPressCheck()}
                buttonShadow={true}
              />
            </View>
            {/*---- Save Information End ------*/}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformation;
