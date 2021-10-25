/* eslint-disable */
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

//Components
import Header from '../../../components/Header/Header';
import SquareListIcon from '../../../components/SquareListIcon/SquareListIcon';
import TitlePicture from '../../../components/TitlePicture/TitlePicture';

//Publicly Available Icons that Can be Used for Commercial Purposes
import ArrowRightLongIcon from '../../../components/icons/ArrowRightLongIcon/ArrowRightLongIcon';
import AddressIcon from '../../../assets/images/mapSVG.svg';
import PasswordIcon from '../../../assets/images/passwordSVG.svg';
import PersonalInfoIcon from '../../../assets/images/personalInformationSVG.svg';
//import ProfileIcon from '../../../assets/images/profile_mainSVG.svg';

import ProfileIcon from '../../../assets/images/profilelogo.svg';

//Utils
import globalStyles from '../../../assets/styles/globalStyles';
import Routes from '../../../navigation/Routes';
import {navigate} from '../../../utility/NavigationService';
import {screenHeight, screenWidth} from '../../../utility/Scale';

const ProfileHomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      {/*------- Header Start -----*/}
      <Header
        title={'설정'}
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => navigation.toggleDrawer()}
      />
      {/*------- Header End -----*/}
      <ScrollView>
        <View style={globalStyles.flex}>
          <View style={globalStyles.horizontalGeneralPadding}>
            {/*---- Page Title and Picture Container Start ------*/}
            <View>
              <TitlePicture
                componentTopPadding={40}
                imageComponent={
                  <ProfileIcon
                    width={screenWidth * 0.85}
                    height={screenHeight * 0.11}
                  />
                }
                titleTopPadding={10}
                title={'내 정보'}
                description={
                  '안녕하세요, 고객님 오늘도 파란만잔한 하루 되세요'
                }
                descriptionTopPadding={10}
                componentBottomPadding={35}
              />
            </View>
            {/*---- Page Title and Picture Container End ------*/}

            {/*---- 프로필 셋팅부분 ------*/}
            <View>
              <SquareListIcon
                showBorder={true}
                onPress={() => navigate(Routes.AddressSetting)}
                leftIconComponent={<AddressIcon />}
                title={'내 위치 변경하기'}
                leftIconRightPadding={19}
                leftIconLeftPadding={21}
                rightIconComponent={<ArrowRightLongIcon />}
              />
              <SquareListIcon
                containerTopPadding={10}
                showBorder={true}
                onPress={() => navigate(Routes.PersonalInformation)}
                leftIconComponent={<PersonalInfoIcon />}
                title={'개인정보 변경'}
                leftIconRightPadding={19}
                leftIconLeftPadding={21}
                rightIconComponent={<ArrowRightLongIcon />}
              />

              <SquareListIcon
                containerTopPadding={10}
                showBorder={true}
                onPress={() => navigate(Routes.PersonalInformation)}
                leftIconComponent={<PersonalInfoIcon />}
                title={'위치 정보 서비스 이용약관 동의'}
                leftIconRightPadding={19}
                leftIconLeftPadding={21}
                rightIconComponent={<ArrowRightLongIcon />}
              />

              <SquareListIcon
                showBorder={true}
                containerTopPadding={10}
                onPress={() => navigate(Routes.ChangePassword)}
                leftIconComponent={<PasswordIcon />}
                title={'비밀번호 변경'}
                leftIconRightPadding={19}
                leftIconLeftPadding={21}
                rightIconComponent={<ArrowRightLongIcon />}
              />
            </View>
            {/*---- Profile Settings End ------*/}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileHomeScreen;
