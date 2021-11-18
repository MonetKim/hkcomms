import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import CompletedIcon from '../../assets/icons/generalIcons/completedSVG.svg';
import InCompletedIcon from '../../assets/icons/generalIcons/incompleteSVG.svg';
import globalStyles from '../../assets/styles/globalStyles';
import styles from './style';

const CaselistItem = props => {
  return (

    <TouchableOpacity
      onPress={() => props.onPress && props.onPress()}
      style={[
        globalStyles.flexDirectionRow,
        styles.mainContainer,
        globalStyles.alignItemsCenter,
      ]}>

      <View style={styles.nameView}>
        {/*-Name Start--*/}
        <Text style={styles.nameText}>{props.casename}</Text>

        {props.casenumber && (
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignItemsCenter,
            ]}>
            <Text style={styles.inviteCodeTitle}>{'문의번호: '}</Text>

            <Text style={styles.inviteCodeText}>{props.casenumber}</Text>

            <Text style={styles.inviteCodeTitle}>{'문의날짜: '}</Text>

            <Text style={styles.inviteCodeTitle}>{props.date}</Text>

          </View>
        )}
        
        
      </View>
      <View style={styles.priceView}>
        
        <Text style={styles.amountToPayText}>
          {props.casetitle}
        </Text>
        
        {props.isCompleted ? (
          <CompletedIcon width={25} height={25} />
        ) : (
          <InCompletedIcon width={25} height={25} />
        )}

      </View>
    </TouchableOpacity>
  );
};

CaselistItem.defaultProps = {
  casename: '',
  date: '',
  casedetail: '',
  casenumber: 0,
  isCompleted: false,
 
};

CaselistItem.propTypes = {
  casenumber: PropTypes.number,
  date: PropTypes.string,
  casedetail: PropTypes.string,
  isCompleted: PropTypes.bool,
  casename: PropTypes.string,
  onPress: PropTypes.func,  
};

export default CaselistItem;
