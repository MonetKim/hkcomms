import {StyleSheet} from 'react-native';
import {allColors} from '../../../assets/styles/mainColors';
import {FONT_FAMILY} from '../../../constants/constants';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../utility/Scale';

const styles = StyleSheet.create({
  horizontalStyle: {
    marginLeft: horizontalScale(1),
    alignSelf: 'center',
  },
  titleText: {
    color: allColors.black,
    fontFamily: FONT_FAMILY.RobotoCondensedLight,
    fontSize: scaleFontSize(14),
    fontWeight: '300',
    marginRight: horizontalScale(5),
  },
  verticalStyle: {
    marginTop: verticalScale(5),
    marginLeft: horizontalScale(5),
    alignSelf: 'center',
  },
  navs : {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navs_link : {
    backgroundColor : "#bdc3c7",
    height : 40,
    paddingHorizontal : 15,
    paddingVertical : 8,
    borderRadius : 30,
    width : 110, 
    marginRight : 5,
    justifyContent: "center",
    alignItems: "center"
  },
navs_link__active : {
    backgroundColor : allColors.darkYellow,
    justifyContent: "center",
    alignItems: "center"
  },
  navs_link__text : {
    color : 'white',
    alignSelf : "center",
    fontSize : 13,
  },
});

export default styles;
