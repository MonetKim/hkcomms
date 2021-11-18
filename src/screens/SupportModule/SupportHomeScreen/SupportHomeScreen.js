/* eslint-disable */
import React, {useEffect, useCallback} from 'react';
import {SafeAreaView, View, Image} from 'react-native';

//Third Party
import {useDispatch} from 'react-redux';

//Components
import Header from '../../../components/Header/Header';
import SquareListIcon from '../../../components/SquareListIcon/SquareListIcon';

//Publicly Available Icons that Can be Used for Commercial Purposes
import ArrowRightLongIcon from '../../../components/icons/ArrowRightLongIcon/ArrowRightLongIcon';
import FaqIcon from '../../../assets/icons/supportIcons/faqSVG.svg';
import OnlineSupportIcon from '../../../assets/icons/supportIcons/headphonesSVG.svg';



//Utils
import globalStyles from '../../../assets/styles/globalStyles';
import TitlePicture from '../../../components/TitlePicture/TitlePicture';
import {navigate} from '../../../utility/NavigationService';
import Routes from '../../../navigation/Routes';
import {horizontalScale, verticalScale} from '../../../utility/Scale';
import Action from '../../../redux/action';
import FAQData from '../../../DummyData/FAQDummyData';

const SupportHomeScreen = ({navigation}) => {

  const dispatch = useDispatch();

  

  //store faq information
  const storeFAQs = useCallback(
    () => dispatch(Action.storeFAQs(FAQData.data)),
    [dispatch],
  );

  //get faqs and update
  useEffect(() => {
    storeFAQs();
  }, []);

  return (
    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      <Header
        title={'고객센터'}
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => navigation.toggleDrawer()}
      />
      <View style={globalStyles.flex}>
        <View style={globalStyles.horizontalGeneralPadding}>
          <View>
            <TitlePicture
              componentTopPadding={10}              
              titleTopPadding={23}
              title={'고객센터 문의하기'}
              description={
                '담당자 확인 후 빠르게 답변 드리겠습니다.'
              }
              descriptionTopPadding={10}
              componentBottomPadding={23}
            />
          </View>
          <View>
            <SquareListIcon
              showBorder={true}
              onPress={() => navigate(Routes.OnlineSupport)}
              leftIconComponent={<OnlineSupportIcon />}
              title={'문의하기'}
              leftIconRightPadding={19}
              leftIconLeftPadding={21}
              rightIconComponent={<ArrowRightLongIcon />}
            />
            <SquareListIcon
              containerTopPadding={10}
              showBorder={true}
              onPress={() => navigate(Routes.FAQScreen)}
              leftIconComponent={<FaqIcon/>}
              title={'이전문의보기'}
              leftIconRightPadding={19}
              leftIconLeftPadding={21}
              rightIconComponent={<ArrowRightLongIcon />}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SupportHomeScreen;
