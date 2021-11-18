import React from 'react';
import {SafeAreaView, View, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import Header from '../../../components/Header/Header';
import TitlePicture from '../../../components/TitlePicture/TitlePicture';
import globalStyles from '../../../assets/styles/globalStyles';
import {horizontalScale, verticalScale} from '../../../utility/Scale';

const FAQScreen = ({navigation}) => {

  const FAQList = useSelector(state => state.FAQList);

  const RenderAccordions = () => {
    const items = [];
    for (const item of FAQList) {
      items.push(
        <AccordionItem title={item.title} description={item.description} />,
      );
    }
    return items;
  };

  return (
    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      {/*----- Header Start ----- */}
      <Header
        title={'FAQ'}
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => navigation.toggleDrawer()}
      />
      {/*----- Header End ----- */}

      <ScrollView
        style={globalStyles.flex}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.commonScrollViewPadding}>
        <View style={globalStyles.horizontalGeneralPadding}>
          {/*----- Title and Picture Start ----- */}
          <View>
            <TitlePicture
              componentTopPadding={15}
              imageComponent={
                  <Image
                  source={require('../../../assets/placeholders/105x90.png')}
                  style={{width: verticalScale(105), height: horizontalScale(90), borderRadius: 3}}
                  />
              }
              titleTopPadding={23}
              title={'FAQ'}             
              descriptionTopPadding={10}
              componentBottomPadding={17}
            />
          </View>
          {/*----- Title and Picture End ----- */}

          {/*----- Accordion Container Start ----- */}
          <View style={globalStyles.commonBorder}>
            <RenderAccordions />
          </View>
          {/*----- Accordion Container End ----- */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen;
