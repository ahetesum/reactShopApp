import React from "react";
import {  StyleSheet, Text, View ,FlatList} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {  useSelector } from "react-redux";
import CustomHeaderButton from "../components/CustomHeaderButton";
import OrderListItem from "../components/OrderListItem";
import COLORS from "../constants/Colors";
import DIMENS from "../constants/Dimens";

const OrderScreen=props=>{

    const orders= useSelector(state=>state.orders.orders)
    console.log(orders)
    return(
        <View style={styles.container}>
            <FlatList 
                keyExtractor={(item)=>item.id}
                style={styles.subContainer}
                data={orders}
                renderItem= {(itemData)=> <OrderListItem item={itemData.item} />}
            />
        </View>
    );
}

OrderScreen.navigationOptions=navData=>{
    return{
        headerTitle: "My Orders",
        headerLeft:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            iconName="md-menu" 
            title="Menu" 
            onPress={()=>navData.navigation.toggleDrawer()} />
        </HeaderButtons>
    }
}


const styles= StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:COLORS.whiteColor,
    },
    subContainer:{
        flex:1,
        marginVertical:DIMENS.paddingLR,
        marginHorizontal:DIMENS.paddingLR,
    },
    image:{
        width:'100%',
        height:'60%'
    },
    cartList:{
        flex:1,
        marginTop:DIMENS.paddingLR,
    },
    titleText:{
        margin:DIMENS.paddingLR,
        fontSize:DIMENS.large,
        color:COLORS.primaryTextColor,
        fontFamily:'open-sans-bold'
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
    cartContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:DIMENS.paddingLR,
        marginVertical:DIMENS.paddingLR,
        padding:DIMENS.paddingLR,
        shadowColor: COLORS.dividerColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        borderColor:COLORS.dividerColor,
        borderWidth:1,
        elevation:DIMENS.paddingSm,
        backgroundColor:COLORS.whiteColor,
        borderTopLeftRadius:DIMENS.paddingLR,
        borderTopRightRadius:DIMENS.paddingLR,
        overflow:'hidden'
    },
    addToCart:{
        color:COLORS.accentColor,
        margin:DIMENS.paddingStand,

    },

});


export default OrderScreen;