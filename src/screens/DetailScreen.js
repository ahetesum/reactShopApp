import React from "react";
import {  Button, Image, StyleSheet, Text, View ,ScrollView} from "react-native";
import { useSelector } from "react-redux";
import COLORS from "../constants/Colors";
import DIMENS from "../constants/Dimens";


const DetailScreen=props=>{
    const productId= props.navigation.getParam('productid');
    const product= useSelector(state=>state.products.availableProducts.find(p=>p.id===productId));
    return (
            <ScrollView style={styles.scull}>
                <View style={styles.container}> 
                    <Image style={styles.image} source={{uri:product.imageUrl}} />
                    <View style={styles.content}>
                        <Text style={styles.titleText}>{product.title}</Text>
                        <Text style={styles.priceText}>${product.price}</Text>
                        <View style={styles.acrtionContainer}>
                            <Button style={styles.addToCart} title="Add To Cart" onPress={props.onAddToCart}/>
                        </View>
                        <Text style={styles.priceText}>{product.description}</Text>
                    </View>
                </View>
            </ScrollView>
        );

}


DetailScreen.navigationOptions=navData=>{
    return{
        headerTitle: navData.navigation.getParam('productTitle')
    }
}



const styles= StyleSheet.create({
    scull:{
        backgroundColor:COLORS.whiteColor
    },
    container:{
        width:'100%',
        height:450,
        backgroundColor:COLORS.whiteColor,
        borderTopLeftRadius:DIMENS.paddingLR,
        borderTopRightRadius:DIMENS.paddingLR,
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
        fontFamily:'open-sans'

    },
    priceText:{
        fontSize:DIMENS.large,
        color:COLORS.secondaryTextColor,
        fontFamily:'open-sans'
    },
    acrtionContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
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


export default DetailScreen;