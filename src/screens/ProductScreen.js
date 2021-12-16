import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch ,useSelector} from "react-redux";
import CustomHeaderButton from "../components/CustomHeaderButton";
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
                            dispathAddCart(addToCart(itemData.item));
                        }}
                    />}
            />
        );

}


ProductScreen.navigationOptions=navData=>{
    return{
        headerTitle:"All Products",
        headerRight:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            iconName="md-cart" 
            title="Cart" 
            onPress={()=>navData.navigation.navigate('CartScreenNav')} />
        </HeaderButtons>
   }
 
}


const styles= StyleSheet.create({
    list:{
        marginHorizontal:DIMENS.paddingStand,
        marginVertical:DIMENS.paddingLR
    },

});

export default ProductScreen;