
import React from "react";
import { FlatList, Text,Image,StyleSheet,View,TouchableOpacity} from "react-native";
import COLORS from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import DIMENS from "../constants/Dimens";



const CartItemList=props=>{

    const getItem=({item})=>
    {
        return (
            <View style={styles.cartContainer}>
                <View style={styles.titleContainer}>
                    <Image style={styles.image} source={{uri: item.imageUrl}} />
                    <View style={styles.titleContent}>
                        <Text style={styles.titleText}>{item.title}</Text>
                        <Text style={styles.titleText}>$ {item.price}</Text>
                    </View>
              
                </View>
                <View style={styles.quntityContainer} >
                        <TouchableOpacity onPress={props.addToCart(item.id)} > 
                            <Ionicons style={{marginHorizontal:10}} name="add-outline" color={COLORS.blackColor} size={22}/>
                        </TouchableOpacity>
                        <Text style={{fontSize:21}} >{item.quantity}</Text>
                        <TouchableOpacity>
                            <Ionicons style={{marginLeft:10}} name="remove-outline" color={COLORS.blackColor} size={22}/>
                        </TouchableOpacity>
                    </View>
            </View>
        );
    }


    return(
        <FlatList 
            data={props.data}
            renderItem={getItem}
        />
    );
};



const styles= StyleSheet.create({


    image:{
        width:100,
        height:60
    },
    titleContent:{
        marginHorizontal:DIMENS.paddingLR,
        marginVertical:DIMENS.paddingLR,
        justifyContent:'center',
    },
    quntityContainer:{
        flexDirection:'row',
        marginVertical:DIMENS.paddingStand,
        alignSelf:'center',

    },
    titleText:{
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
    titleContainer:{
        flexDirection:'row'
    },

});


export default CartItemList;