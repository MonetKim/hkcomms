import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

//Third Party
import PropTypes from 'prop-types';

//Component
import CachableImage from '../CachableImage/CachableImage';

//Publicly Available Icons that Can be Used for Commercial Purposes
import CompletedIcon from '../../assets/icons/generalIcons/completedSVG.svg';
import InCompletedIcon from '../../assets/icons/generalIcons/incompleteSVG.svg';

//Utils
import globalStyles from '../../assets/styles/globalStyles';
import styles from './style';

const OrderedItem = props => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress && props.onPress()}
      style={[
        globalStyles.flexDirectionRow,
        styles.mainContainer,
        globalStyles.alignItemsCenter,
      ]}>
      {/*--Order Image Start--*/}
      <View style={styles.profileView}>
    
          <CachableImage
            style={styles.imageView}
            source={{uri: props.imageview}}
          />
        {/* <Image source={{ uri: props.imageview }} /> */}
        {/* <CachableImage
            source={{uri: 'https://hkclient.herokuapp.com/images/STORE_IMAGE/gangnam.jpg'}}
            style={[globalStyles.flex, {borderRadius: 10}]}
            resizeMode={'stretch'}
          /> */}
        {/*props.restaurantIconPath.length === 0 &&
          props.restaurantIconComponent && (
            <View>{props.restaurantIconComponent}</View>
          )*/}
      </View>
      {/*--Order Image End--*/}

      <View style={styles.nameView}>
        {/*-Name Start--*/}
        <Text style={styles.nameText}>{props.name}</Text>
        {/*-Name End--*/}

        {/*-Invoice Information Start--*/}
        {props.invoiceNumber && (
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignItemsCenter,
            ]}>
            <Text style={styles.inviteCodeTitle}>{'주문번호: '}</Text>

            <Text style={styles.inviteCodeText}>{props.invoiceNumber}</Text>
          </View>
        )}
        <Text style={styles.inviteCodeTitle}>{props.orderdetail}</Text>
        {/*-Invoice Information End--*/}
        <Text style={styles.nameText}>{(props.date).substr(0,10)+" " +(props.date).substr(11,5)}</Text>
        {/*--Description Start--*/}
        
        {/*--Description End--*/}
      </View>
      <View style={styles.priceView}>
        {/*-Amount Paid Start--*/}
        <Text style={styles.amountToPayText}>
          {props.amountPaid}
        </Text>
        {/*-Amount Paid End--*/}

        {/*-Completed Icon Start--*/}
        {props.isCompleted ? (
          <CompletedIcon width={25} height={25} />
        ) : (
          <InCompletedIcon width={25} height={25} />
        )}
        {/*-Completed Icon End--*/}
      </View>
    </TouchableOpacity>
  );
};

/*---- Default Props Start -------*/
OrderedItem.defaultProps = {
  amountPaid: 0,
  date: '',
  description: '',
  invoiceNumber: 0,
  isCompleted: false,
  name: '',
  restaurantIconPath: '',
  restaurantIconComponent: {},
  orderdetail:'',
  imageview:'',
};
/*---- Default Props End -------*/

/*---- Prop Type Expectations Start -------*/
OrderedItem.propTypes = {
  amountPaid: PropTypes.number,
  date: PropTypes.string,
  description: PropTypes.string,
  invoiceNumber: PropTypes.number,
  isCompleted: PropTypes.bool,
  name: PropTypes.string,
  onPress: PropTypes.func,
  restaurantIconComponent: PropTypes.object,
  restaurantIconPath: PropTypes.string,
  orderdetail: PropTypes.string,
  imageview: PropTypes.string,
};
/*---- Prop Type Expectations End -------*/
export default OrderedItem;
