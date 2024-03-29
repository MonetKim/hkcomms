import React from 'react';
import {Text} from 'react-native';

//Utils
import globalStyles from '../../assets/styles/globalStyles';

//Used for lists when no more items are left in the list
const NoInformationText = () => {
  return (
    <Text
      style={[
        globalStyles.RobotoCondensedFont400,
        globalStyles.fontSize20,
        globalStyles.textCenter,
      ]}>
      {'아무것도 없습니다.'}
    </Text>
  );
};
export default NoInformationText;
