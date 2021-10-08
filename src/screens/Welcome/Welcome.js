/* eslint-disable */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';

//Utils
import globalStyles from '../../assets/styles/globalStyles';
import Routes from '../../navigation/Routes';
import styles from './style';
import {horizontalScale} from '../../utility/Scale';


class Welcome extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      black: true
    }
  } 
 
  render() {
    return (
      <View
        style={{          
          flex: 1,
          backgroundColor: 'white',
          //paddingHorizontal: horizontalScale(74),
        }}>
        <ImageBackground 
                source={require('../../assets/images/mainlogo.png')}
                style={styless.image}>

        <Text style={[globalStyles.logoFontDobule, globalStyles.marginTop15 ,
                     styless.innerText   
        ]}>
          Paranmanjan          
        </Text>
        
        <Text style={[
                     styless.innerText   
        ]}>
          지구 한 바퀴를 오간 파란만잔한 원두 여행 
        </Text>
        <TouchableOpacity
          style={[globalStyles.marginTop30, styless.buttonContainer]}
          onPress={() => this.props.navigation.navigate(Routes.Registration)         
          }>
          <Text style={styles.buttonTitle}>환영합니다</Text>
        </TouchableOpacity>
            </ImageBackground>
      </View>
    );
  }
}
const styless = StyleSheet.create({
  buttonContainer:{
    //borderWidth: 1.74,
    borderColor: 'white',
    backgroundColor:'#FFB800',
    paddingVertical: 15,
    borderRadius: 30,
    width: '70%',
    alignContent:'center',
    //display: 'flex',
    alignItems: 'center', 
    justifyContent:'center'
  },

  innerText:{
    textAlign:'center'
  },  

  image:{
        flex: 1,        
        alignContent:'center',
    //display: 'flex',
        alignItems: 'center', 
        justifyContent:'center'
    //  justifyContent: "center"
  }
});

export default Welcome;
