import React,{useCallback, useEffect, useState} from "react";
import { FlatList, StyleSheet, Button ,ActivityIndicator, View,Text} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch ,useSelector} from "react-redux";
import CustomHeaderButton from "../components/CustomHeaderButton";
import ProductItem from "../components/Productitem";
import COLORS from "../constants/Colors";
import DIMENS from "../constants/Dimens";
import { addToCart } from "../store/actions/cartAction";
import { setProducts } from "../store/actions/productAction";


const ProductScreen=props=>{
    
    const [isLoading,setIsLoading]= useState(false);
    const [isError,setIsError]= useState(false);

    const dispathAddCart=useDispatch();
    const products= useSelector(state=>state.products.availableProducts);


    useEffect(()=>{
        const willFocusSub= props.navigation.addListener('willFocus',loadProducts);
        return ()=>{
            willFocusSub.remove();
        };
    },[loadProducts]);

    const loadProducts= useCallback(async()=>{
        try{
            console.log('LOAD Product')
            setIsError(false);
            setIsLoading(true);
            await dispathAddCart(setProducts())
    
            setIsLoading(false);

        }catch(err)
        {
            setIsLoading(false);
            console.log(err.message)
            setIsError(true);
        }
    },[dispathAddCart,setIsError,setIsLoading])

    useEffect(()=>{
        loadProducts()
    },[dispathAddCart]);




    const onViewDetails =(itemData)=>{
        props.navigation.navigate('DetailScreenNav',{'productid':itemData.item.id,'productTitle':itemData.item.title});

    }

    if(isLoading)
    {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color={COLORS.accentColor} />
            </View>
        );
    }

    if(!isLoading && products.length==0)
    {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.noDataText}>No Products Found ! Start Adding Some.</Text>
            </View>
        );
    }

    if(isError)
    {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Some Error Occured While Fetching</Text>
                <Button style={styles.addToCart} title="Retry" onPress={()=>{loadProducts()}} />
            </View>
        );
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
    loadingContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    noDataText:{
        fontSize:DIMENS.large,
        color:COLORS.warningColor,
        fontFamily:'open-sans-bold'   
    },
    errorText:{
        fontSize:DIMENS.large,
        color:COLORS.dangerColor,
        fontFamily:'open-sans-bold'   
    },

});

export default ProductScreen;