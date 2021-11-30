/* eslint-disable */
import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

//Third party
import {useSelector, useDispatch} from 'react-redux';

//Components
import Header from '../../../components/Header/Header';
import LongButton from '../../../components/LongButton/LongButton';
import NoInformationText from '../../../components/NoInformationText/NoInformationText';
import OrderedItem from '../../../components/OrderedItem/OrderedItem';
import TitleText from '../../../components/TitleText/TitleText';

//Publicly Available Icons that Can be Used for Commercial Purposes
import PriceUp from '../../../assets/icons/discoverMenuIcons/down_arrowSVG.svg';
import PriceDown from '../../../assets/icons/discoverMenuIcons/up_arrowSVG.svg';

//Dummy Data
import OrderHistoryData from '../../../DummyData/OrderHistoryDummyData';

//Utils
import Action from '../../../redux/action';
import globalStyles from '../../../assets/styles/globalStyles';
import Routes from '../../../navigation/Routes';
import styles from './styles';
import {allColors} from '../../../assets/styles/mainColors';
import {BUTTON_TYPE, FONT_FAMILY} from '../../../constants/constants';
import {navigate} from '../../../utility/NavigationService';
import {loadPagination} from '../../../utility/Helper';


const OrderHistoryHomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const sharedList = useSelector(state => state.orderHistoryList, []);
  //get order history data in redux store
  const storeSharedData = useCallback(
    () => dispatch(Action.storeOrderHistoryList(OrderHistoryData.data)),
    [dispatch],
  );
  const [itemList, setItemList] = useState([]);
  const [offset, setOffset] = useState(1);
  const [noDataAvailable, setNoDataAvailable] = useState(false);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  //get order history data and update
  useEffect(() => {
    storeSharedData();
  }, []);

  //오더 아이템 갖고오기
  useEffect(() => {
    dispatch(Action.getOrderresults(22)); // 이부분 아이디값 갖고와서 넣어주기
  }, []);
  const orderitem = useSelector(state => state.orderitem);
  const orderdetail = useSelector(state => state.orderdetail);
  //오더상세 아이템 갖고오기
  useEffect(() => {
    dispatch(Action.getOrderresultsDetail(22));
  }, []);

  useEffect(() => {
    dispatch(Action.fetchGetOption());
  }, []);


  //pagination
  useEffect(() => {
    pagination(sharedList, 2, offset);
  }, [sharedList]);

  //pagination
  useEffect(() => {
    if (offset > 1) {
      pagination(sharedList, 2, offset);
    }
  }, [offset]);

  //sorting
  useEffect(() => {
    if (itemList.length > 0) {
      setItemList(Array.from(itemList).reverse());
    }
  }, [ascendingOrder]);

  //pagination function
  function pagination(array, page_size, page_number) {
    let temp = loadPagination(array, page_size, page_number);
    if (temp.length > 0) {
      if (ascendingOrder) {
        setItemList([...itemList, ...temp]);
      } else {
        setItemList([...temp, ...itemList]);
      }

      if (sharedList.length <= itemList.length + page_size) {
        setNoDataAvailable(true);
      } else {
        setNoDataAvailable(false);
      }
    } else {
      setNoDataAvailable(true);
    }
  }


  //주문 번호당 이미지 갖고오기
  function showorderimage(temp) {

    var sum = '';
    sum = '';
    var count = 0;
    
    for (var i = 0; i < orderdetail.length; i++) {
        if(orderdetail[i].order_id == temp){
                sum = sum +orderdetail[i].imageview ;
                break;
        }
        //sum = 'tt';
    }
    return sum
}

  //주문번호당 메뉴 찾아오기
  function showorderdetail(temp) {

    var sum = '';
    sum = '';
    var count = 0;
    
    for (var i = 0; i < orderdetail.length; i++) {
        if(orderdetail[i].order_id == temp){
            if(count === 0){
                sum = sum +orderdetail[i].menu_title ;
            }
            count++;
        }
        //sum = 'tt';
    }
    if(count >1){
        count--;
        sum = sum+' 외 '+ count+'개';
    }
    return sum
}

  //render list items
  const renderListRows = ({item, index}) => {
    return (
      <OrderedItem
        key={'ordered_item' + index}
        name={item.store_name}
        invoiceNumber={item.order_id}
        //description={item.description}
        amountPaid={item.total_price}
        isCompleted={item.ischeck}
        imageview={showorderimage(item.order_id)}
        //restaurantIconPath={item.order_image}
        //restaurantIconComponent={item.restaurantIconComponent}
        orderdetail ={showorderdetail(item.order_id)}
        date={item.timezone}
        onPress={() => navigate(Routes.InvoiceScreen,{isCompleted: item.ischeck, 
                                                      order_id: item.order_id })}
      />
    );
  };

  //load more button definition
  const LoadMoreButton = () => (
    <View style={globalStyles.marginTop20}>
      {noDataAvailable ? null : (
        <LongButton
          title={'LOAD MORE###'}
          titleFontSize={18}
          titleFontColor={allColors.white}
          titleFontWeight={'400'}
          titleFontFamily={FONT_FAMILY.RobotoCondensedRegular}
          type={BUTTON_TYPE.SECONDARY}
          onPress={() => setOffset(offset => offset + 1)}
        />
      )}
    </View>
  );

  //separator
  const SeparatorComponent = () => <View style={{height: 15}} />;

  //for performance reasons of the list
  const getOrderHistoryItemLayout = (data, index) => ({
    length: 300,
    offset: 300 * index,
    index,
  });

  return (
    <SafeAreaView style={[globalStyles.bgWhite, globalStyles.flex]}>
      {/*------- Header Start -----*/}
      <Header
        title={'주문 내역'}
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={() => navigation.toggleDrawer()}
      />
      {/*------- Header End -----*/}
      <ScrollView
        style={globalStyles.flex}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.commonScrollViewPadding}>
        <View style={globalStyles.horizontalGeneralPadding}>
          {/*------- Page Introductory Title Start ------*/}
          <TitleText
            title={'주문 내역'}
            description={
              '고객님 파란만잔한 하루 보내세요'
            }
            containerBottomPadding={13}
            containerTopPadding={10}
            titleFontWeight={'300'}
          />
          {/*------- Page Introductory Title End ------*/}
          {/*------- All Orders List Title Start ------*/}
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.justifySpaceBetween,
            ]}>
            <View>
              <Text style={styles.sectionText}>{'주문 내역'}</Text>
            </View>
            {/* <TouchableOpacity
              onPress={() => setAscendingOrder(!ascendingOrder)}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
              ]}>
              <Text style={styles.sectionText}>{'Date:'}</Text>
              <View style={globalStyles.marginLeft5}>
                {ascendingOrder ? <PriceDown /> : <PriceUp />}
              </View>
            </TouchableOpacity> */}
          </View>
          {/*------- All Orders List Title End ------*/}

          {/*------- All Orders List Start ------*/}
          {itemList.length > 0 ? (
            <View style={styles.flatListView}>
              <FlatList
                //performance settings
                //initialNumToRender={1} // Reduce initial render amount
                //maxToRenderPerBatch={1} // Reduce number in each render batch
                // windowSize={7} // Reduce the window size
                showsVerticalScrollIndicator={false}
                //data={orderitem}
                data={orderitem.sort((a, b) => (String(b.timezone)).localeCompare(String(a.timezone)))}
                renderItem={renderListRows}
                // getItemLayout={getOrderHistoryItemLayout}
                keyExtractor={(item, index) => index.toString()}
                //ListFooterComponent={() => <LoadMoreButton />}
                ItemSeparatorComponent={() => <SeparatorComponent />}
              />
            </View>
          ) : (
            <View style={globalStyles.marginTop30}>
              <NoInformationText />
            </View>
          )}
          {/*------- All Orders List Title End ------*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderHistoryHomeScreen;
