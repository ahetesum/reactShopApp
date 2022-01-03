import React from "react";
import { FlatList, StyleSheet, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch ,useSelector} from "react-redux";
import CustomHeaderButton from "../components/CustomHeaderButton";
import ProductItem from "../components/Productitem";
import COLORS from "../constants/Colors";
import DIMENS from "../constants/Dimens";
import { addToCart } from "../store/actions/cartAction";


const ProductScreen=props=>{
    
    const products= useSelector(state=>state.products.availableProducts);

    const dispathAddCart=useDispatch();


    const onViewDetails =(itemData)=>{
        props.navigation.navigate('DetailScreenNav',{'productid':itemData.item.id,'productTitle':itemData.item.title});

    }

    return (
            <FlatList 
                style={styles.list}
                keyExtractor={(item)=>item.id}
                data={products} 
                renderItem= {(itemData)=>
                    <ProductItem 
                        product={itemData.item}
                        onSelect= {()=>onViewDetails(itemData)} >
                        <Button 
                            style={styles.viewDetails} 
                            title="View Details" 
                            onPress={()=>{
                            onViewDetails(itemData)
                        }}/>
                        <Button style={styles.addToCart} title="Add To Cart" onPress={()=>{
                            dispathAddCart(addToCart(itemData.item));
                        }}/>
                    </ProductItem>}
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
        </HeaderButtons>,
        headerLeft:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            iconName="md-menu" 
            title="Menu" 
            onPress={()=>navData.navigation.toggleDrawer()} />
        </HeaderButtons>
   }
 
}


const styles= StyleSheet.create({
    list:{
        marginHorizontal:DIMENS.paddingStand,
        marginVertical:DIMENS.paddingLR
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

export default ProductScreen;