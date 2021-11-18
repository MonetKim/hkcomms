import React, {useEffect, useState, useCallback} from 'react';
import {Image, SafeAreaView, Text, View,Keyboard,TouchableWithoutFeedback} from 'react-native';

//Components
import Header from '../../../components/Header/Header';
import LongButton from '../../../components/LongButton/LongButton';
import MultiLineTextInput from '../../../components/MultiLineTextInput/MultiLineTextInput';
import TitlePicture from '../../../components/TitlePicture/TitlePicture';
import SquareGenericInputField from '../../../components/SquareGenericInputField/SquareGenericInputField';
import {useDispatch,useSelector, shallowEqual  } from 'react-redux';
import CaselistItem from '../../../components/CaselistItem/CaselistItem';
import ActionType from '../../../redux/action-type';
import SendIcon from '../../../assets/icons/generalIcons/sendIconSVG.svg';
import Action from '../../../redux/action';
//Utils
import globalStyles from '../../../assets/styles/globalStyles';
import styles from './style';
import Routes from '../../../navigation/Routes';
import {
  horizontalScale,
  screenHeight,
  verticalScale,
} from '../../../utility/Scale';
import {allColors} from '../../../assets/styles/mainColors';
import {BUTTON_TYPE, FONT_FAMILY} from '../../../constants/constants';
import {navigate} from '../../../utility/NavigationService';


const OnlineSupport = ({navigation}) => {

  const loginInformation = useSelector(state => state.loginInfomation, shallowEqual );
  const caseInformation = useSelector(state => state.caseResult, shallowEqual );
  
  const [supportText, setSupportText] = useState('');
  const [supportTitle, setsupportTitle] = useState('');

  //미리 호출해서 이전 정보 가져오기
  const storeCases = useCallback(
    () => dispatch(Action.caseResult(loginInformation[0].index_id)),
    [dispatch],
  );
  useEffect(()=>{
    storeCases();
  },[])

  //박스 사이즈 Expandable
  const [sizes, setSizes] = useState({
    width:'0px',
    height: '0px' 
  });
  const dispatch = useDispatch();
  //있을 경우 늘리기
  const changeView = () => {
      
      if(sizes.width=='0px'){
          setSizes({
              width:'100%',
              height:'300px'
          });
      } else {  
        setSizes({
          width:'0px',
          height:'0px'
        })
      }
  }
  const sendQna = () => {
      if(supportTitle != null && supportText != null && supportTitle !='' && supportText !=''){
        dispatch(Action.caseInsert(loginInformation[0].index_id, supportTitle,supportText));      
        setsupportTitle('');
        setSupportText('');
        navigate(Routes.SupportHomeScreen);
      }      
  }

  // const renderListRows = ({item, index}) => {
  //   return (
  //     <CaselistItem
  //       key={'CaselistItem' + index}
  //       casename={item.casetitle}
  //       casenumber={item.caseid}
  //       isCompleted={item.ischeck}    
  //       casedetail= {item.casedetail}    
  //       date={item.timezone}
  //       //onPress={() => navigate(Routes.InvoiceScreen,{isCompleted: item.ischeck, 
  //         //                                            order_id: item.order_id })}
  //     />
  //   );
  // };  




  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>      
      <Header
        title={'문의현황'}
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => navigation.toggleDrawer()}
      />
      {/*------- Header End -----*/}
      <View style={globalStyles.flex}>
        <View style={globalStyles.horizontalGeneralPadding}>          
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignItemsCenter,
            ]}>

        <Text style={styles.commentText}>{'고객문의 제목'}</Text>                                    

          </View>
            <SquareGenericInputField
                placeholder={'제목을 입력해주세요'}                
                value={supportTitle}
                onChange={text => setsupportTitle(text)}
            />

          <Text style={styles.commentText}>{'고객문의 내용'}</Text>                             
          <View style={styles.textInputView}>
            <MultiLineTextInput
              height={screenHeight * 0.207}
              value={supportText}
              onChange={text => setSupportText(text)}
            />              
          </View>
          
          {supportText != '' &&
          <View>
            <LongButton
              title={'보내기'}
              titleFontColor={allColors.black}
              titleFontFamily={FONT_FAMILY.RobotoLight}
              titleFontSize={18}
              titleFontWeight={'300'}
              hasTailingIcon={true}
              tailingIconPaddingLeft={10}
              tailingIconPaddingTop={-10}
              tailingIconComponent={<SendIcon/>}
              type={BUTTON_TYPE.SECONDARY}
              onPress={() => sendQna()}
              />
          </View>
          }
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignItemsCenter,
            ]}>
            <Text style={styles.dotView}>*</Text>
            <Text style={styles.commentText}>{'지난 문의 보기'}</Text>
          </View>
          </View>
        </View>
      </SafeAreaView>
  </TouchableWithoutFeedback>
  );
};

export default OnlineSupport;
