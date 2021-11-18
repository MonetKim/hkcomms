import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform
} from 'react-native';
import SettingsPic from '../../../assets/images/Settings2.svg';
import TitlePicture from '../../../components/TitlePicture/TitlePicture';

//Components
import Header from '../../../components/Header/Header';
import TitleText from '../../../components/TitleText/TitleText';
import TitleWithUnderline from '../../../components/TitleWithUnderline/TitleWithUnderline';
import {screenHeight, screenWidth} from '../../../utility/Scale';
//Utils
import globalStyles from '../../../assets/styles/globalStyles';
import Routes from '../../../navigation/Routes';
import styles from './style';
import {allColors} from '../../../assets/styles/mainColors';
import {navigate} from '../../../utility/NavigationService';

const Settings = ({navigation}) => {

  //toggler state definitions

  const [isNotificationEnabled, setNotificationEnabled] = useState(false);
  const [isChangePWDEnabled, setChangePWDEnabled] = useState(false);
  const [isDoNotCallEnabled, setDoNotCallEnabled] = useState(false);
  const [isShareLocationEnabled, setShareLocationEnabled] = useState(false);
  

  if(Platform.OS === 'ios'){

    console.log('나는 IOS');

  } else if (Platform.OS ==='android'){

    console.log('나는 안드로이드');
  }

  //노티 알람 설정 enable
  //노티 예시 코드 카메라로 해보기
  const toggleNotificationSwitch = async () => {    
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "카메라 푸시하자",
          message:
            "찍고싶으면 눌러임마" +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        setNotificationEnabled(previousState => !previousState);
      } else {
        console.log("Camera permission denied");
      }
      
    } catch (err) {
      console.warn(err);
    }
  }
  const toggleChangePWDSwitch = () => {
  setChangePWDEnabled(previousState => !previousState);    
  }
  const toggleDoNotCallSwitch = () => {

  setDoNotCallEnabled(previousState => !previousState);

  }
  
  const toggleShareLocationSwitch = () => {   
    setShareLocationEnabled(previousState => !previousState);
    console.log(PermissionsAndroid.RESULTS.GRANTED+'위치 서비스 동의 여부');

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(response => {        
        if(response ===true){

          console.log('오픈 완료');

        } else {

          console.log('미오픈 완료');
        }
    })
  }

  return (
    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      {/*------- Header Start -----*/}
      <Header
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => navigation.toggleDrawer()}
      />
      {/*------- Header End -----*/}
      <ScrollView style={globalStyles.flex}>
        <View
          style={[
            globalStyles.horizontalGeneralPadding,
            globalStyles.marginTop15,
          ]}>
          <View style={[globalStyles.marginTop5]}>
            {/*------- Page Introductory Title Start ------*/}
            <TitleText
              title={'권한 설정'}              
              titleFontWeight={'300'}
            />
            {/*------- Page Introductory Title End ------*/}
          </View>

          <View style={[globalStyles.marginTop20]}>
            {/*------- Notifications Start ---------*/}
            <View style={[globalStyles.flexDirectionRow, styles.toggleStyle]}>
              <TitleWithUnderline
                borderBottomColor={allColors.grey}
                bottomBorderWidth={'100%'}
                titleFontSize={18}
                titleFontWeight={'normal'}
                title={'푸시 알림'}
              />

              <Switch
                thumbColor={allColors.white}
                trackColor={{true: allColors.yellow}}
                onValueChange={toggleNotificationSwitch}
                value={isNotificationEnabled}
              />
            </View>
            {/*------- Notifications End ---------*/}

            {/*------- Change Password Start ---------*/}
            <View
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.marginTop15,
                styles.toggleStyle,
              ]}>
              <TitleWithUnderline
                borderBottomColor={allColors.grey}
                bottomBorderWidth={'100%'}
                titleFontSize={18}
                titleFontWeight={'normal'}
                title={'프로모션/이벤트 알림 수신'}
                onPress={() => navigate(Routes.ChangePassword)}
              />
              <Switch
                thumbColor={allColors.white}
                trackColor={{true: allColors.yellow}}
                onValueChange={toggleChangePWDSwitch}
                value={isChangePWDEnabled}
              />
            </View>                            
            <View
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.marginTop15,
                styles.toggleStyle,
              ]}>
              <TitleWithUnderline
                borderBottomColor={allColors.grey}
                bottomBorderWidth={'100%'}
                titleFontSize={18}
                titleFontWeight={'normal'}
                title={'위치 정보 서비스 이용약관 동의'}
              />
              <Switch
                thumbColor={allColors.white}
                trackColor={{true: allColors.yellow}}
                onValueChange={toggleShareLocationSwitch}
                value={isShareLocationEnabled}
              />
            </View>
            {/*------- Share My Location End ---------*/}

            {/*------- Terms Of Use Start ---------*/}
            <TouchableOpacity
              onPress={() => navigate(Routes.TermsOfUse)}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.marginTop15,
                styles.toggleStyle,
              ]}>
              <TitleWithUnderline
                borderBottomColor={allColors.grey}
                bottomBorderWidth={'100%'}
                titleFontSize={18}
                titleFontWeight={'normal'}
                title={'약관 보기'}
              />
            </TouchableOpacity>
            
            <TitlePicture
                imageComponent={
                    <SettingsPic
                        width={screenWidth * 0.5} 
                        height={screenHeight * 0.45}
                    />
                }                     
                  componentTopPadding={34}
                  componentBottomPadding={10}
            />
              
            {/*------- Privacy Policy Start --------
            <TouchableOpacity
              onPress={() => navigate(Routes.PrivacyPolicy)}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.marginTop15,
                styles.toggleStyle,
              ]}>
              <TitleWithUnderline
                borderBottomColor={allColors.grey}
                bottomBorderWidth={'100%'}
                titleFontSize={18}
                titleFontWeight={'normal'}
                title={'Privacy Policy'}

                
              />
            </TouchableOpacity>
            -*/}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
