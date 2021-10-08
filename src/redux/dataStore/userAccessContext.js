import AsyncStorage from '@react-native-async-storage/async-storage';
import createAppContext from "../dataStore/createAppContext";
import API from "../../API/WebService";
import aType from "./ActionTypes";
import userReducer from "../dataStore/reducer";
//import { navigate } from "./NavigationRef";
//import { navigate } from '../../../utility/NavigationService';

const onSignup = (dispatch) => async ({name,password,Phonenum,birth,pi_agreement,email}) => { 
  API.post("user/signup", {    
    name, 
    password, 
    Phonenum,
    birth,
    pi_agreement,
    email, 
  })
    .then((response) => {      
      configureAPI({ token: `Bearer ${response.data}` }); 
      dispatch({ type: aType.LOGIN, payload: response.data });
     // navigate("HomeScreen");     
    })
    .catch((err) => {
      dispatch({ 
        type: aType.ERROR,
        payload: "이미 등록된 이메일 입니다.",
      });
    });  
};
//아래 에러 부분 home stack 지우기
const onSignin = (dispatch) => async ({ email, password }) => {
  
  API.post("user/login", {
    email,
    password,
  }) 
    .then((response) => {
      configureAPI({ token: `Bearer ${response.data}` });       
      dispatch({ type: aType.LOGIN, payload: response.data });               
      console.log(JSON.stringify(response.data)+'리스폰드 데이터');
    })
    .catch((err) => {
      dispatch({
        type: aType.ERROR,
        payload: "잘못된 비밀번호 혹은 존재하지 않은 ID입니다"+err,        
      });
      alert("잘못된 비밀번호 혹은 존재하지 않은 ID입니다"); 
 
    });
};

//비밀번호 찾기 호출 되는 곳
const PasswordFinder = (dispatch) => async({Phonenum,name,email}) => {
  API.post("user/passfinder",{
    name,
    Phonenum, 
    email,
  })
  .then((response) => {
      configureAPI({ token: `Bearer ${response.data}` }); 
      dispatch({ type: aType.PasswordFinder, payload: response.data});  
      console.log(response.data+'리스폰 데이터');    
      //navigate("LoginScreen");       
  })
  .catch((err) => {     
    dispatch({ 
      type: aType.ERROR,
      payload: err,
    });
      //navigate("LoginScreen");  
  });
} 

//이메일찾기 보내는 곳 
const emailFinder = (dispatch) => async ({name,Phonenum,birth}) => { 
  //alert('성공일껄?');
  //navigate("loginStack");      
  API.post("user/emailfinder",{
    name,
    Phonenum,
    birth,
  })
  .then((response) => {
      configureAPI({ token: `Bearer ${response.data}` }); 
      dispatch({ type: aType.EmailFinder, payload: response.data});  
      console.log(response.data+'리스폰 데이터');    
      //navigate("LoginScreen");       
  })
  .catch((err) => {     
    dispatch({
      type: aType.ERROR,
      payload: "존재하지 않은 아이디 입니다"+err,
    });
    //navigate("LoginScreen");  
  });
}; 
 
const emailCheck = (dispatch) => async({email}) => {
  console.log('여기오낭');
  API.post("user/emailcheck",{
    email
  })
  .then((response) => {
    configureAPI({ token: `Bearer ${response.data}` }); 
    dispatch({ type: aType.EmailCheck, payload: response.data});  
    console.log(response.data+'리스폰 데이터');    
              
})
  .catch((err) => {     
  dispatch({
    type: aType.ERROR,
    payload: "이미 등록된 이메일 입니다"+err,
  });
  //navigate("LoginScreen");  
});

};

  
const onLogout = (dispatch) => () => {
  //navigate("loginStack");
  dispatch({ type: aType.LOGOUT });
}; 
const onDissmiss = (dispatch) => () => {
  dispatch({ type: aType.DISSMISS });
};

const configureAPI = ({ token }) => {
  API.defaults.headers.common["Authorization"] = token;  
};
 
const onCheckLogin = (dispatch) => async () => {  
  const token = await AsyncStorage.getItem("token");  
  if (token) {
    dispatch({ type: aType.LOGIN, payload: token });
    //navigate("homeStacks"); 
    configureAPI({ token });    
  } else { 
    //navigate("loginStack");
  }
};



/**
 * Export Methods with Create Context
 */
export const { Provider, Context } = createAppContext(
  userReducer,
  {
    PasswordFinder,
    emailFinder, 
    onCheckLogin,
    onSignup,
    onSignin,
    onLogout,     
    onDissmiss,
    emailCheck,
  },
  { accessToken: null, msg: 'null' }
);
