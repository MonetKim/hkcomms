import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//Third Party
import SignatureCapture from 'react-native-signature-capture';

//Publicly Available Icons that Can be Used for Commercial Purposes
import DeleteIcon from '../../assets/icons/generalIcons/deleteIconSVG.svg';

//Utils
import styles from './style';

const SignatureInputField = () => {
  const signatureRef = useRef(null);

  return (
    <View>
      <View style={styles.mainView}>
        <Text style={styles.signatureText}>서명</Text>
        {/*--Signature Delete Start--*/}
        <TouchableOpacity onPress={() => signatureRef.current?.resetImage()}>
          <DeleteIcon />
        </TouchableOpacity>
        {/*--Signature Delete End--*/}
      </View>
      {/*--Signature Container Start--*/}
      <View style={styles.borderImage}>
        <SignatureCapture
          style={styles.signatureView}
          ref={signatureRef}
          showBorder={false}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={'portrait'}
        />
      </View>
      {/*--Signature Container End--*/}
      <Text style={styles.doNotText}>서명시 개인정보 약관에 동의됩니다.</Text>
    </View>
  );
};

export default SignatureInputField;
