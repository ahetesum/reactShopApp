import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider ,} from 'react-redux';
import { combineReducers, createStore } from 'redux';
import ShopNavigator from './src/navigations/ShopNavigator';
import productReducer from './src/store/reducers/productReducer';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './src/store/reducers/cartReducer';


const rootReducer= combineReducers({
  products: productReducer,
  cart: cartReducer
});
const store = createStore(rootReducer,composeWithDevTools());

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;