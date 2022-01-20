import React, { useEffect } from "react";
import {StyleSheet, View} from 'react-native';
import { ActivityIndicator } from "react-native-web";
import { useDispatch } from "react-redux";
import COLORS from "../constants/Colors";
import { autoLogin } from "../store/actions/authAction";
import { getUserData } from "../utils/storageHelper";



const LandingScreen= props=>{
    
    const autoLoginDispatch= useDispatch();
    useEffect(()=>{
        validateAutherization()
    });


    const validateAutherization= async()=>{
        let userData= await getUserData();
        if(userData!== null )
        {
            props.navigation.navigate('ShopDrawNav');
            console.log(userData)
            autoLoginDispatch(autoLogin(userData.userId,userData.token))
        }
        else{
            props.navigation.navigate('LoginNav');
        }
    }

    return (
        <View style={styles.conatainer}>
                <ActivityIndicator size='large' color={COLORS.accentColor} />
        </View>
    );
};


const styles=StyleSheet.create({
    conatainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
});

export default LandingScreen;
