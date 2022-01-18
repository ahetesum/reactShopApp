import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider ,} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ShopNavigator from './src/navigations/ShopNavigator';
import productReducer from './src/store/reducers/productReducer';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './src/store/reducers/cartReducer';
import orderReducer from './src/store/reducers/orderReducer';
import authReducer from './src/store/reducers/authReducer';
import COLORS from './src/constants/Colors';


const rootReducer= combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders:orderReducer,
  auth:authReducer,
});
const store = createStore(
                          rootReducer,
                          applyMiddleware(ReduxThunk),
                          composeWithDevTools());

const fetchFonts=()=>{
  return Font.loadAsync({
    'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),

  });
}

const  App=()=> {

  const [fontLoaded,setFontLoaded] = useState(false);

  if(!fontLoaded)
  return <AppLoading startAsync={fetchFonts} onError={(err)=>{ console.log(err)}} onFinish={()=>{
    setFontLoaded(true)
  }} />

  return (
    <Provider store={store} >
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;