import React, {useRef} from 'react';
import {View} from 'react-native';

import PhoneInput from 'react-native-phone-number-input';
import PropTypes from 'prop-types';

import styles from './style';
import {allColors} from '../../assets/styles/mainColors';
import ArrowDownIcon from '../icons/ArrowDownIcon/ArrowDownIcon';

const PhoneNumber = props => {
  const phoneInput = useRef(null);

  return (
    <View style={styles.mainContainerStyle}>
      <PhoneInput 
        placeholder={props.placeHolder}
        renderDropdownImage={<ArrowDownIcon />}
        ref={phoneInput}
        defaultValue={props.value}
        defaultCode={props.defaultCode}
        onChangeText={text => {
          props.onChangeText(text);
        }}
        onChangeFormattedText={text => {
          props.onChangeFormattedText(text);
        }}
        textInputStyle={styles.textInputStyle}
        containerStyle={styles.containerStyle}
        textContainerStyle={styles.textContainerStyle}
        codeTextStyle={styles.codeTextStyle}
        textInputProps={{
          placeholderTextColor: allColors.placeholderColor,
        }}
      />
    </View>
  );
};

/*---- Default Props Start -------*/
PhoneNumber.defaultProps = {
  defaultCode: 'KR',
  placeHolder: '휴대폰 번호',
  value: '', 
};
/*---- Default Props End -------*/

/*---- Prop Type Expectations Start -------*/
PhoneNumber.propTypes = {
  defaultCode: PropTypes.string,
  onChangeFormattedText: PropTypes.func,
  onChangeText: PropTypes.func,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
};
/*---- Prop Type Expectations End -------*/
export default PhoneNumber;
