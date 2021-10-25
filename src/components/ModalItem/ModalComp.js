import React,{useState} from 'react';
import {Modal, Pressable,StyleSheet, Text ,View} from 'react-native';
import styles from '../IconText/style';

const ModalComp = () => {

    const [modalVisible, setModalVisible] = useState(false);
    return(
        <>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>

                <Text>오예</Text>

                <Text
                onPress={()=> setModalVisible(!modalVisible)}
                >   
                    닫기
                </Text>
        </Modal>

        <Pressable style={Styles.button} onPress={()=>setModalVisible(true)}>
            <View>
                <Text>모달작동 완료</Text>
            </View>
        </Pressable>    
        </>
    );

}

const Styles = StyleSheet.create({
    button : {
        display:'flex',
        height:60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems:'center',
        width:'100%',
        backgroundColor : '#009688'

    }

})

export default ModalComp

