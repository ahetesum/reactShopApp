import React from "react";
import {View,StyleSheet} from 'react-native';
import COLORS from "../constants/Colors";
import DIMENS from "../constants/Dimens";


const CardView =props=>{

    return (<View style={{...styles.CardView,...props.style}}>
        {props.children}
    </View>)
}

const styles= StyleSheet.create({
    CardView:{
        marginVertical:DIMENS.paddingLR,
        shadowColor: COLORS.dividerColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1, 
        elevation:DIMENS.paddingSm,
        backgroundColor:COLORS.whiteColor,
        borderTopLeftRadius:DIMENS.paddingLR,
        borderTopRightRadius:DIMENS.paddingLR,
        overflow:'hidden'
    }
});

export default CardView;