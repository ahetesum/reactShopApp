import moment from "moment";
import React from "react";
import { Image, StyleSheet, View,Text, Button, TouchableOpacity, Platform, TouchableNativeFeedback } from "react-native";
import COLORS from "../constants/Colors";
import DIMENS from "../constants/Dimens";
import CartListItem from "./CartListItem";


const OrderListItem=props=>{

    const TouchableComp= TouchableOpacity;
    if(Platform.OS=='android' && Platform.Version>21)
        TouchableComp= TouchableNativeFeedback;    
        console.log("props.item")

        console.log(props.item)

    return(
        <TouchableComp onPress={props.onViewDetails} >
            <View style={styles.container}> 
                <View style={styles.contentGeneral}>
                    <Text style={styles.titleText}>Order ID: {props.item.id}</Text>
                    <Text style={styles.titleText}>Date: {moment(props.item.date).format("YYYY-MM-DD hh:mm") } </Text>   
                    <Text style={styles.titleText}>Total Amount: {props.item.amount} $</Text>         
                </View>
                <View style={styles.divider}></View>
                <View style={styles.containerDetails}>
                    {
                        props.item.items.map((cartItem)=>{
                            return (
                                <CartListItem key={cartItem.id} item={cartItem} isDetails={false} />
                            )
                        })
                    }
         
                </View>

            </View>
        </TouchableComp>
    );
};

const styles= StyleSheet.create({
    container:{
        padding:DIMENS.paddingLR,
        marginTop:DIMENS.paddingSm,
        shadowColor: COLORS.dividerColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1, 
        borderWidth:1,
        borderColor:COLORS.dividerColor,
        elevation:DIMENS.paddingSm,
        backgroundColor:COLORS.whiteColor,
        overflow:'hidden'
    },
    contentGeneral:{

    },
    image:{
        width:100,
        height:60
    },
    titleText:{
        color:COLORS.primaryTextColor,
        fontSize:DIMENS.large,
        fontFamily:'open-sans',
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
    divider:{
        height:1,
        width:'80%',
        marginVertical:2,
        color:COLORS.dividerColor
    },
    titleContainer:{
        flexDirection:'row'
    },
    containerDetails:{
        marginTop:DIMENS.paddingLR
    }

});

export default OrderListItem;