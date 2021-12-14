import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProductItem from "../components/Productitem";
import DIMENS from "../constants/Dimens";
import { addToCart } from "../store/actions/cartAction";


const ProductScreen=props=>{
    
    const products= useSelector(state=>state.products.availableProducts);

    const dispathAddCart=useDispatch();

    return (
            <FlatList 
                style={styles.list}
                keyExtractor={(item)=>item.id}
                data={products} 
                renderItem= {(itemData)=>
                    <ProductItem 
                        product={itemData.item} 
                        onViewDetails= {()=>{
                            props.navigation.navigate('DetailScreenNav',{'productid':itemData.item.id,'productTitle':itemData.item.title});
                        }}
                        onAddToCart= {()=>{
                            console.log(itemData.item)
                            dispathAddCart(addToCart(itemData.item));
                        }}
                    />}
            />
        );

}


ProductScreen.navigationOptions={
    headerTitle:"All Products"
}


const styles= StyleSheet.create({
    list:{
        marginHorizontal:DIMENS.paddingStand,
        marginVertical:DIMENS.paddingLR
    },

});

export default ProductScreen;