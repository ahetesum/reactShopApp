import React from "react";
import { Image, StyleSheet, View,Text, Button, TouchableOpacity, Platform, TouchableNativeFeedbackBase, TouchableNativeFeedback } from "react-native";
import COLORS from "../constants/Colors";
import DIMENS from "../constants/Dimens";
import CardView from "./CardView";


const ProductItem=props=>{

    const TouchableComp= TouchableOpacity;
    if(Platform.OS=='android' && Platform.Version>21)
        TouchableComp= TouchableNativeFeedback;    

    return(
        <CardView>
        <TouchableComp onPress={props.onSelect} >
            <View style={styles.container}> 
                <Image style={styles.image} source={{uri:props.product.imageUrl}} />
                <View style={styles.content}>
                    <Text style={styles.titleText}>{props.product.title}</Text>
                    <Text style={styles.priceText}>${props.product.price}</Text>
                    <View style={styles.acrtionContainer}>
                        {props.children}
                    </View>
                </View>
            </View>
        </TouchableComp>
        </CardView>
    );
};

const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:340,
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
    },
    image:{
        width:'100%',
        height:'60%'
    },
    content:{
        marginVertical:DIMENS.paddingLR,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    titleText:{
        marginTop:DIMENS.paddingLR,
        fontSize:DIMENS.xxlarge,
        color:COLORS.primaryTextColor,
        fontFamily:'open-sans-bold',
    },
    priceText:{
        fontSize:DIMENS.large,
        color:COLORS.secondaryTextColor,
        fontFamily:'open-sans',

    },
    acrtionContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:DIMENS.paddingDouble,
        paddingVertical:DIMENS.paddingStand,
    },
    viewDetails:{
        color:COLORS.primaryColor,
        marginStart:DIMENS.paddingStand,
    },
    addToCart:{
        color:COLORS.accentColor,
        marginRight:DIMENS.paddingStand,

    },

});

export default ProductItem;