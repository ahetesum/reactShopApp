import React from "react";
import {  Button, Image, StyleSheet, Text, View ,FlatList} from "react-native";
import { color } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import CartItemList from "../components/CartItemList";
import COLORS from "../constants/Colors";
import DIMENS from "../constants/Dimens";
import { addToCart } from "../store/actions/cartAction";


const CartScreen=props=>{
    const cart= useSelector(state=>state.cart);
    const dispathAddCart=useDispatch();
    const products= useSelector(state=>state.products.availableProducts);  

    const noOfProducts= Object.keys(cart.items).length;

    const cartList=[];
    for (const [key, value] of Object.entries(cart.items)) {
        let item= {};
        item.id=key;
        item.title=value.item.title;
        item.description=value.item.description;
        item.price=value.item.price;
        item.imageUrl=value.item.imageUrl;
        item.quantity= value.quantity
        cartList.push(item)
      }

      const addIncrementCart=(id)=>
      {
        console.log(id)
        let product = products.find(p=>p.id===id);
        dispathAddCart(addToCart(product));

      }
      const onOrderPlaced=()=>
      {}

    return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <View style={styles.cartContainer}>
                        <Text style={styles.titleText}>No Of Products: <Text style={{color:COLORS.accentColor}} >{noOfProducts}</Text></Text>
                        <Text style={styles.titleText}>Total Amount: <Text style={{color:COLORS.accentColor}}>{cart.totalAmount.toFixed(2)} $</Text></Text>
                    </View>
                    <View style={styles.cartList}>
                        <CartItemList  data={cartList} addToCart={addIncrementCart} />
                    </View>
                </View>
                <View style={styles.addToCart}>
                    <Button  title="Place Order" onPress={onOrderPlaced}/>
                </View>
            </View>
        );

}


CartScreen.navigationOptions=navData=>{
    return{
        headerTitle: "Cart"
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
        border:1,
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


export default CartScreen;